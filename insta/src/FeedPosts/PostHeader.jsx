import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../hooks/useFollowUser'
import { Link } from 'react-router-dom'
import { timeAgo } from '../utils/timeAgo'

function PostHeader({post,creatorProfile}) {
   const{handleFollowUser,isfollowing,isUpdating}= useFollowUser(post.createdBy)

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={"2"}>
        <Flex alignItems={"center"} gap={2}>
          {creatorProfile? (
              <Link to ={`/${creatorProfile.username}`}>

              <Avatar src={creatorProfile.profilePicURL} alt="profil fotosu" size={"sm"}/>
              </Link>

          ):(
                <SkeletonCircle size={"10"} />

          )}
      

            <Flex fontSize={12}fontWeight={"bold"} gap={2}>

              {creatorProfile ?(
        <Link to ={`/${creatorProfile.username}`}>
                    {creatorProfile.username}
        </Link>
 
              ):(
                <Skeleton w={"100px"} width={"10px"} />
              )}
                <Box color={"gray.500"}> {timeAgo(post.createdAt)}</Box>
            </Flex>
        </Flex>
        <Box cursor={"pointer"}>
           <Button fontSize={"12"} color={"blue.500"} fontWeight={"bold"} 
        _hover={{color:"white"}} onClick={handleFollowUser} isLoading={isUpdating} >
          
          {isfollowing ? "Follow" : "Unfollow"}
          
          </Button> 
        </Box>
    </Flex>
  )
}

export default PostHeader