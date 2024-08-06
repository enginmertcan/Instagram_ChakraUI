import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import React from 'react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../hooks/useGetFeedPosts'

function FeedPosts() {
  const {isLoading,posts}=useGetFeedPosts()

  return (
    <Container maxW={"container.sm"} py={10} px={2} >
        {isLoading&&
        [0,1,2].map((_,idx)=>(
          <VStack key={idx} alignItems={"flex-start"} gap={"4"}>
            <Flex gap={"2"}>
            <SkeletonCircle size={"10"} />
            <VStack gap={"2"} alignItems={"center"}>
            <Skeleton height={"20px"} width={"100px"} />
            <Skeleton height={"20px"} width={"50px"} />
            </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"300px"}>contents Wrapped</Box>
            </Skeleton>
            </VStack>
        ))}
        {!isLoading&&posts.length>0 &&posts.map((post)=><FeedPost key={post.id} post={post}/>)}
        {!isLoading&&posts.length===0&&<Box textAlign={"center"}>No posts to show</Box>}
      

        
    </Container>
  )
}

export default FeedPosts