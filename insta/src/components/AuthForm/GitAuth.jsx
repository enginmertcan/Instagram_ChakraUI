import React from 'react'
import { useSignInWithGithub } from 'react-firebase-hooks/auth'
import { Text, Flex, Image } from '@chakra-ui/react';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { auth, fireStore } from '../../firebase/firebase';
import { doc,setDoc,getDoc } from 'firebase/firestore';



function GitAuth({prefix}) {
const [signInWithGithub, error] = useSignInWithGithub(auth) 

const showToast = useShowToast();
const loginUser =useAuthStore((state)=>state.login);
const handleGithubAuth = async()=> {
    try { 
      const newUser = await signInWithGithub()
      if(!newUser &&error) {
        showToast("Error",error.message,"error")
        return
      }
      const userRef = doc(fireStore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if(userSnap.exists()){
        //Login 
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);

}
else {
//Register 
const userDoc = {
    username: newUser.user.displayName,
    email: newUser.user.email,
    profilePicURL: newUser.user.photoURL,
    uid: newUser.user.uid,
    followers: [],
    following: [],
    posts
}
await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
localStorage.setItem("user-info", JSON.stringify(userDoc));
loginUser(userDoc);
}
    }
catch(error) {
    showToast("Error",error.message,"error")
    }
}
  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}
    
    onClick={handleGithubAuth}
    >
    <Image src="github.png" h={8} cursor={"pointer"} alt="Github"></Image>
    <Text mx={2} color={"blue.500"}>
 {prefix} with Github
 </Text>
    </Flex>


  )
}

export default GitAuth