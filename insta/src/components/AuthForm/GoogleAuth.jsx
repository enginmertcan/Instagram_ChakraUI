import { Flex ,Image,Text} from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { auth, fireStore } from '../../firebase/firebase';
import { doc,setDoc,getDoc } from 'firebase/firestore';

 

function GoogleAuth({prefix}) {
  const [signInWithGoogle,error] = useSignInWithGoogle(auth);

  const showToast = useShowToast();
  const loginUser =useAuthStore((state)=>state.login);

  const handleGoogleAuth = async()=> {
    try { 
      const newUser = await signInWithGoogle()
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
   
      <Flex alignItems={"Center"} justifyContent={"center"} cursor={"pointer"}
        onClick={handleGoogleAuth}
      
      >
  <Image src="/google.png" w={5} alt='Google Logo'></Image>
  <Text mx={2} color={"blue.500"}>
    
    {prefix} With Google
    </Text>
</Flex>

    
  )
}

export default GoogleAuth