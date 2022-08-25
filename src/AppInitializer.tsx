import SynapseRedirectDialog from 'portal-components/SynapseRedirectDialog'
import React, { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import { DOWNLOAD_FILES_MENU_TEXT } from 'synapse-react-client/dist/containers/table/SynapseTableConstants'
import { SynapseContextProvider } from 'synapse-react-client/dist/utils/SynapseContext'
import { UserProfile } from 'synapse-react-client/dist/utils/synapseTypes'
import docTitleConfig from './config/docTitleConfig'

export type AppInitializerState = {
  token?: string
  showLoginDialog: boolean
  synapseRedirectUrl?: string
  userProfile: UserProfile | undefined
  // delay render until get session is called, o.w. theres an uneccessary refresh right
  // after page load
  hasCalledGetSession: boolean
}

export type SignInProps = {
  userProfile: UserProfile | undefined
  resetSession: Function
  getSession: Function
  showLoginDialog: boolean
  onSignIn: Function
  handleCloseLoginDialog: Function
}

const COOKIE_CONFIG_KEY = 'org.sagebionetworks.security.cookies.portal.config'

function AppInitializer(props: { children?: React.ReactNode }) {
  const location = useLocation()
  const [cookies, setCookie] = useCookies([COOKIE_CONFIG_KEY])
  const [token, setToken] = useState<string | undefined>(undefined)
  const [hasCalledGetSession, setHasCalledGetSession] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [synapseRedirectUrl, setSynapseRedirectUrl] = useState<
    string | undefined
  >(undefined)
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined,
  )

  const initAnonymousUserState = useCallback(() => {
    SynapseClient.signOut(() => {
      // reset token and user profile
      setToken(undefined)
      setUserProfile(undefined)
      setHasCalledGetSession(true)
    })
  }, [])

  const getSession = useCallback(async () => {
    try {
      const token = await SynapseClient.getAccessTokenFromCookie()
      if (!token) {
        initAnonymousUserState()
        return
      }
      setToken(token)
      setHasCalledGetSession(true)
      // get user profile
      const userProfile = await SynapseClient.getUserProfile(token)
      if (userProfile.profilePicureFileHandleId) {
        userProfile.clientPreSignedURL = `https://www.synapse.org/Portal/filehandleassociation?associatedObjectId=${userProfile.ownerId}&associatedObjectType=UserProfileAttachment&fileHandleId=${userProfile.profilePicureFileHandleId}`
      }
      setUserProfile(userProfile)
    } catch (e) {
      console.error('Error on getSession: ', e)
      // intentionally calling sign out because there token could be stale so we want
      // the stored session to be cleared out.
      initAnonymousUserState()
    }
  }, [initAnonymousUserState])

  const resetSession = useCallback(() => {
    SynapseClient.signOut(getSession)
    setShowLoginDialog(false)
  }, [getSession])

  useEffect(() => {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    document
      .querySelector('meta[name="description"]')!
      .setAttribute('content', docTitleConfig.description)

    getSession()
    // Technically, the AppInitializer is only mounted once during the portal app lifecycle.
    // But it's best practice to clean up the global listener on component unmount.
    window.addEventListener('click', updateSynapseCallbackCookie)
    // on first time, also check for the SSO code
    SynapseClient.detectSSOCode()
    return () => {
      window.removeEventListener('click', updateSynapseCallbackCookie)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only on mount
  }, [])

  const onSignIn = useCallback(() => {
    setShowLoginDialog(true)
  }, [])

  const handleCloseLoginDialog = React.useCallback(() => {
    setShowLoginDialog(false)
  }, [])

  /**
   * PORTALS-490: Set Synapse callback cookie
   * Will attempt to set a .synapse.org domain cookie that has enough information to lead the user
   * back to this portal after visiting www.synapse.org.
   */
  const updateSynapseCallbackCookie = React.useCallback(
    (ev: MouseEvent) => {
      if (!cookies) {
        return
      }
      let isInvokingDownloadTable: boolean = false
      if (ev.target instanceof HTMLAnchorElement) {
        const anchorElement = ev.target as HTMLAnchorElement
        isInvokingDownloadTable =
          anchorElement.text === DOWNLOAD_FILES_MENU_TEXT
        if (anchorElement.href) {
          const { hostname } = new URL(anchorElement.href)
          if (hostname.toLowerCase() === 'www.synapse.org') {
            // && anchorElement.target !== '_blank') {  // should we skip the dialog if opening in a new window?
            ev.preventDefault()
            if (!synapseRedirectUrl) {
              setSynapseRedirectUrl(anchorElement.href)
            }
          }
        }
      }
      if (
        ev.target instanceof HTMLButtonElement ||
        ev.target instanceof HTMLAnchorElement
      ) {
        const el = ev.target as HTMLElement
        if (el.classList.contains(SynapseConstants.SRC_SIGN_IN_CLASS)) {
          if (!showLoginDialog) {
            setShowLoginDialog(true)
          }
        }
      }
      let name = ''
      let icon = ''
      const logoImgElement = document.querySelector('#header-logo-image')
      if (logoImgElement) {
        let imageSrc = logoImgElement.getAttribute('src')
        if (imageSrc) {
          if (!imageSrc.toLowerCase().startsWith('http')) {
            imageSrc = SynapseClient.getRootURL() + imageSrc.substring(1)
          }
          icon = imageSrc
        }
      }
      const footerLinkElement = document.querySelector('#footer-logo-link')
      if (footerLinkElement && footerLinkElement.textContent) {
        name = footerLinkElement.textContent
      }
      const cookieValue = {
        isInvokingDownloadTable,
        callbackUrl: window.location.href,
        logoUrl: icon,
        portalName: name,
      }
      // expire after 10 seconds
      const domainValue = window.location.hostname
        .toLowerCase()
        .includes('.synapse.org')
        ? '.synapse.org'
        : undefined
      // Cookies provider exists above AppInitializer so the cookies prop will exist
      setCookie(COOKIE_CONFIG_KEY, JSON.stringify(cookieValue), {
        path: '/',
        domain: domainValue,
        maxAge: 20,
      })
    },
    [cookies, setCookie, showLoginDialog, synapseRedirectUrl],
  )

  useEffect(() => {
    // send page view event to Google Analytics
    // (casting to 'any' type to get compile-time access to gtag())
    const windowAny: any = window
    const gtag = windowAny.gtag
    if (gtag) {
      gtag('config', 'G-CEKFPZDZX7', {
        page_location: window.location.href,
        page_path: `/${location.pathname}`,
      })
    }
  }, [location])

  const clonedChildren = useMemo(
    () =>
      React.Children.map(props.children, (child: any) => {
        if (!child) {
          return false
        } else {
          const props: SignInProps = {
            showLoginDialog: showLoginDialog,
            getSession: getSession,
            onSignIn: onSignIn,
            userProfile: userProfile,
            resetSession: resetSession,
            handleCloseLoginDialog: handleCloseLoginDialog,
          }
          return React.cloneElement(child, props)
        }
      }),
    [
      getSession,
      handleCloseLoginDialog,
      onSignIn,
      props.children,
      resetSession,
      showLoginDialog,
      userProfile,
    ],
  )

  if (!hasCalledGetSession) {
    // prevent componentDidUpdate all over the page by waiting for get session call
    return <></>
  }
  return (
    <SynapseContextProvider
      synapseContext={{
        accessToken: token,
        isInExperimentalMode: SynapseClient.isInSynapseExperimentalMode(),
        utcTime: SynapseClient.getUseUtcTimeFromCookie(),
      }}
    >
      {clonedChildren}
      <SynapseRedirectDialog
        onCancelRedirect={() => {
          setSynapseRedirectUrl(undefined)
        }}
        synapseRedirectUrl={synapseRedirectUrl}
      />
    </SynapseContextProvider>
  )
}

export default AppInitializer
