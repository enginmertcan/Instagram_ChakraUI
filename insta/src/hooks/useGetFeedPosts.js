    import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useShowToast from './useShowToast';
import userProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
    
    const useGetFeedPosts = () => {
        const [isLoading, setIsLoading] = useState(true)
     const {posts,setPosts}=usePostStore();
        const authUser =useAuthStore(state=>state.user)

            const showToast=useShowToast();
            const {setUserProfile} =userProfileStore();

            useEffect(()=>{
                const getFeedPosts =async ()=>{
                    setIsLoading(true)
                    if(authUser.following.length===0) {
                        setIsLoading(false)
                        setPosts([])
                        return 

                    }
                    const q =query(collection(fireStore,"posts"),where("createdBy","in",authUser.following))
                    try {

                            const querySnapshot = await getDocs(q)
                            const feedPosts = []
                            querySnapshot.forEach(doc=>{
                                feedPosts.push({...doc.data(),id:doc.id})
                            })

                            feedPosts.sort((a,b)=>b.createdAt-a.createdAt)
                            setPosts(feedPosts)


                        
                    } catch (error) {
                        showToast("Error",error.message,"error")
                        
                    }
                    finally {
                        setIsLoading(false)
                    }
                }
                    if(authUser) getFeedPosts()
            },[authUser,showToast,setPosts,setUserProfile])
        return {isLoading,posts}
        
    }
    
    export default useGetFeedPosts
    