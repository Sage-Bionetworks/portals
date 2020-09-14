import React from "react"
import {UserProfile} from "synapse-react-client/dist/utils/synapseTypes";
import UserCard from "synapse-react-client/dist/containers/UserCard";
import {SynapseConstants} from "synapse-react-client";
import SvgIcon from "@material-ui/core/SvgIcon";

type NavUserLinkProps = {
  userProfile: UserProfile | undefined
}

const NavUserLink: React.FunctionComponent<NavUserLinkProps> = ({
  userProfile,
}) => {

  return(
    <>
      <UserCard
        userProfile={userProfile}
        size={SynapseConstants.SMALL_USER_CARD}
        preSignedURL={userProfile?.clientPreSignedURL}
        hideText={true}
        link="javascript:void(0)"
      />
      <SvgIcon className="arrow-down">
        {
          // Material expand more svg https://material.io/tools/icons/?icon=expand_more&style=baseline
        }
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </SvgIcon>
      <div className="mb-user-extra">
        <div className="user-fullname">
          {userProfile?.firstName} {userProfile?.lastName}
        </div>
        <div className="user-account">View Account</div>
      </div>
    </>
  )
}

export default NavUserLink