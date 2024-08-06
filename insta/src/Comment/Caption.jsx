import React from 'react'

import { Flex, Link, Avatar, Text } from "@chakra-ui/react";
import userProfileStore from '../store/userProfileStore';
import { timeAgo } from '../utils/timeAgo';


function Caption({post}) {
    const userProfile = userProfileStore((state) => state.userProfile);
  return (

    <Flex gap={4}>
        <Link to={`/${userProfile.username}`}> 
        <Avatar
         src={userProfile.profilePicURL}  size={"sm"}/>
        </Link>
        <Flex direction={"column"}>
            <Flex gap={2}>
            <Link to={`/${userProfile.username}`}> 

                <Text fontWeight={"bold"} fontSize={"12"}>
                    {userProfile.username}
                </Text>
                <Text fontStyle={"border"} fontSize={12} >{post.caption}
                </Text>
                </Link>
            </Flex>
            
            <Text fontSize={12} color={"gray.500"}>
            {timeAgo(post.createdAt)}
            </Text>
        </Flex>
    </Flex>
)
}

export default Caption