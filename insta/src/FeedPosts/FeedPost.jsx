import React from 'react'
import PostHeader from './PostHeader'
import { Image,Box } from '@chakra-ui/react'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../hooks/useGetUserProfileById'
function FeedPost({post}) {
  
  const {userProfile} =useGetUserProfileById(post.createdBy)

  return (
    <>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={4} overflow={"hidden"}> 
          <Image src={post.imageURL} alt={"feed post ımg"}/> 
          </Box>
        <PostFooter post={post} creatorProfile={userProfile}/>
        

    </>
  )
}

export default FeedPost