import {create} from "zustand";
const usePostStore = create((set) => ({
    posts : [],
    createPost : (post) => set((state) => ({posts : [post,...state.posts]})),

    deletePost:(id)=> set(state=>({posts:state.posts.filter(post=>post.id!==id)})),
    setPosts : (posts)=> set({posts}),

    addComment: (postId, comment) =>
        set((state) => ({
            posts: state.posts.map(post => {
                if (post.id === postId) {
                    // return { ...post, comments: [comment, ...post.comments] }: Eşleşen gönderiyi bulduğunda, bu gönderinin mevcut
                    // yorumlarına (post.comments) yeni yorumu (comment) ekler ve güncellenmiş gönderiyi geri döner.
                    return {
                        ...post,
                        comments: [comment, ...post.comments]
                    };
                  


                } 
                                    // postId ile eşleşmeyen gönderiler için mevcut gönderiyi olduğu gibi geri döner.

                else   return post;
                
            })
        }))




}));
export default usePostStore;

