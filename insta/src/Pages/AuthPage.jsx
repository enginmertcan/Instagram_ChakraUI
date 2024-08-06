import React from 'react'
import { Container, Flex, VStack } from '@chakra-ui/react'
import { Box, Image } from '@chakra-ui/react'
import AuthForm from '../components/AuthForm/AuthForm'



function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0} >
              <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                  {/* Sol Bar */}
               <Box Box display={{base:"none",md:"block"}}>
                    <Image  src ="/auth.png" h={650} alt="Phone img"/>
                </Box>
                 {/* Sağ Bar */}
                 <VStack spacing={4} align={"strecth"}>
        
        <AuthForm/>
        <Box textAlign={"center"}>Get The App</Box>
        <Flex gap={5} justifyContent={"center"}></Flex>
        <Image src='/playstore.png' h={"10"} alt="PlayStore Logo"/>
        <Image src='/microsoft.png' h={"10"} alt="Microsoft Logo"/>


              </VStack>
              </Flex>
              
               
            </Container>

    </Flex>
  )
   
  
}

export default AuthPage