import React from "react"
import {UserProfile} from "synapse-react-client/dist/utils/synapseTypes";
import UserCard from "synapse-react-client/dist/containers/UserCard";
import {SynapseConstants} from "synapse-react-client";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      <ExpandMoreIcon className="user-expand" />
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