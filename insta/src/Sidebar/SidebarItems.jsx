import React from 'react'
import Home from './Home'
import Notifications from './Notifications'
import Search from './Search'
import CreatePost from './CreatePost'
import Profile from './Profile'
const SidebarItems = () => {
  return (
    <>
    <Home />
    <Search/>
    <CreatePost />
    <Notifications />
    <Profile/>

      
    </>  
  )
}

export default SidebarItems
