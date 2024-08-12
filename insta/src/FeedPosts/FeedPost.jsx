import React from 'react';
import PostHeader from './PostHeader';
import { Image, Box } from '@chakra-ui/react';
import PostFooter from './PostFooter';
import useGetUserProfileById from '../hooks/useGetUserProfileById';
import useLikePost from '../hooks/useLikePost';

function FeedPost({ post }) {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const { handleLikePost, isLiked, likes } = useLikePost(post);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image 
          src={post.imageURL} 
          alt={"feed post img"}  
          onDoubleClick={handleLikePost} 
        /> 
      </Box>
      <PostFooter 
        post={post} 
        creatorProfile={userProfile}
        handleLikePost={handleLikePost}  
        isLiked={isLiked}                
        likes={likes}                  
      />
    </>
  );
}

export default FeedPost;
