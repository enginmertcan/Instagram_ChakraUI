import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import React from 'react'
import useGetUserProfileById from '../hooks/useGetUserProfileById'
import { timeAgo } from "../utils/timeAgo";

function Comment({ comment }) {
    const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy)

    if (isLoading) return <CommentSkeleton/>

    return (
        <Flex gap={4}>
      <Avatar src={userProfile?.profilePicURL || ''} size={"sm"} />
      <Flex direction={"column"}>
                <Flex gap={2}>
                    <Text fontWeight={"bold"} fontSize={"12"}>
                        {userProfile ? userProfile.username : "Loading..."}
                    </Text>
                    <Text fontSize={10}>
                        {comment.comment}
                    </Text>
                </Flex>
                <Text fontSize={12} color={"gray.500"}>
                    {timeAgo(comment.createdAt)}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Comment

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w='10' />
            <Flex gap={1} flexDir={"column"}>
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>
        </Flex>
    );
};
