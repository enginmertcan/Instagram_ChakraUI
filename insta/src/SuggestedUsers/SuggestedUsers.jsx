import { Text, Flex, VStack,Box,Link } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers'

function SuggestedUsers() {

  const {isLoading,suggestedUsers}= useGetSuggestedUsers()

  // if(isLoading) return null;

  return (    
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>
        {suggestedUsers.length !== 0 && (
                  <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>

                  <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>Suggested For You</Text>
                  <Text fontSize={12} fontWeight={"bold"} _hover={{color:"white"}} cursor={"pointer"} color={"gray.500"}>See All</Text>
              </Flex>)}

        {suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id} />


        ))}

<Box fontSize={12} color={{color:"gray.500"}} mt={5} alignSelf={"start"} >
© Built By 

 <Link href='https://github.com/enginmertcan' target='_blank' color='blue.500' _hover={{color:"pink.300"}} fontSize={14}> Mertcan Engin</Link>
 </Box>
        

    </VStack>
  )
}

export default SuggestedUsers