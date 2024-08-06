import { useState, useEffect } from 'react';
import useShowToast from './useShowToast';
import { fireStore } from '../firebase/firebase';
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';

const useLikePost = (post) => {
    const authUser = useAuthStore(state => state.user);
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const showToast = useShowToast();

    useEffect(() => {
        if (post && post.likes) {
            setLikes(post.likes.length);
            setIsLiked(post.likes.includes(authUser?.uid));
        }
    }, [post, authUser]);

    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast("Error", "Beğenebilmek için giriş yapmanız gerek", "error");

        setIsUpdating(true);
        try {
            const postRef = doc(fireStore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });
            setIsLiked(!isLiked);
            setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, likes, isLiked, handleLikePost };
};

export default useLikePost;
