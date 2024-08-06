import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { collection, limit, orderBy, query,where,getDocs, } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'

const useGetSuggestedUsers = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [suggestedUsers, setSuggestedUsers] = useState([])    
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()


    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true)

            try {
                const usersRef =collection(fireStore,"users")
                const q =query(
               usersRef,
               where("uid","not-in",[authUser.uid,...authUser.following]) ,
               orderBy("uid"),
               limit(20)
                )
                const querySnapshot =await getDocs(q)
                const users =[]
                
                querySnapshot.forEach((doc)=>{
                    users.push({...doc.data(),id:doc.id})
                })
                
                setSuggestedUsers(users)


            }
            catch(error) {
                showToast("Error",error.message,"error")
            }
            finally {
                setIsLoading(false)  
            }
        }
            if(authUser)getSuggestedUsers()
        
        
    },[authUser,showToast])  
    return {isLoading,suggestedUsers} 
 
}

export default useGetSuggestedUsers
