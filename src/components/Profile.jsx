import React from "react"
import "../styles/ProfileHeader.css"
import github_log from '../assets/github.svg'

const ProfileHeader = ({avatarUrl,name,link,theme}) => {


    return (
        <div className={"github-profile-header " + theme + "-header" }>
        <div>
          <img width={'50'} height={'50'} src={avatarUrl} alt="avatar" />
          <h3>{name}</h3>
        </div>
        <a style={{cursor:'pointer'}} href={link}><img src={github_log} alt = "github"></img></a>
      </div>
    )
}

export default ProfileHeader