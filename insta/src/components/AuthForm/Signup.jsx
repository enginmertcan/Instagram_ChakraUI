import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

function Signup() {

    
    const [inputs, setinputs] = useState({
        fullName:"",
        username:"",
        email:"",
        password:""
      }) 

    const [showPassword, setShowPassword] = useState(false)
    const {loading,error,signup}=useSignUpWithEmailAndPassword()
  return (
    <>
        <Input type="email" placeholder='Email' size={"sm"}  fontSize={14} color={'white'} value={inputs.email} onChange={(e)=>setinputs({...inputs,email:e.target.value})}/>
        <Input type="text" placeholder='Kullanıcı Adı' size={"sm"}  fontSize={14} color={'white'} value={inputs.username} onChange={(e)=>setinputs({...inputs,username:e.target.value})}/>
        <Input type="text" placeholder='Ad' size={"sm"}  fontSize={14} color={'white'} value={inputs.fullName} onChange={(e)=>setinputs({...inputs,fullName:e.target.value})}/>

<InputGroup>
<Input type={showPassword ?"text": "password" } placeholder='Password' size={"sm"} fontSize={14} color={'white'} value={inputs.password} onChange={(e)=>{setinputs({...inputs,password:e.target.value})}}/>
<InputRightElement h={"full"} >
    <Button variant={"ghost"} size={"sm"} onClick={(()=>{setShowPassword(!showPassword)})}>
        {showPassword? <ViewIcon/> : <ViewOffIcon/>}

    </Button>

</InputRightElement>
</InputGroup>


{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert> )}



<Button w="full" colorScheme='blue' size={"sm"} fontSize={14}

  isLoading={loading}
onClick={()=>{signup(inputs)}} > 

          Sign Up
         </Button>


    </>
  )
}

export default Signup