import { create } from 'zustand';

const userProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    
    addPost:(post)=> set(state=>({
        userProfile:{...state.userProfile, posts:[post.id,...state.userProfile.posts] }

    })),

    deletePost :(postId) => set((state=>({
        userProfile:  {
            ...state.userProfile,    //önceki durum kopyalanır 
            posts:state.userProfile.posts.filter((id)=>id!== postId),}
            // postId'ye sahip gönderi dışındaki tüm gönderiler yeni diziye eklenir

    })))

}));

export default userProfileStore;
