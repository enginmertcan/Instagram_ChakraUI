import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import { fireStore } from '../firebase/firebase'; 



const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
  const showToast=  useShowToast()

  const getUserProfile = async(username) =>{
    setIsLoading(true)
    setUser(null)
    
try {
    const q = query(collection(fireStore,"users"),where("username","==",username))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return showToast("Error","Kullanıcı bulunamadı","error")
        querySnapshot.forEach((doc)=>{
            setUser(doc.data())
        })


}
catch(error) {
    showToast("Error",error.message,"error")
    setUser(null)

}
finally{
    setIsLoading(false)
}
  }
  return{isLoading,getUserProfile,user,setUser}


}

export default useSearchUser
