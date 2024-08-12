import { Box, Button, Flex,Input,Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { UnlikeLogo ,NotificationsLogo, CommentLogo} from '../assets/constants'
import usePostComment from '../hooks/usePostComment'
import { timeAgo } from '../utils/timeAgo';
import useLikePost from '../hooks/useLikePost'
import useAuthStore from '../store/authStore'
import CommentsModal from '../Modals/CommentsModal';




function PostFooter({ post, isProfilePage, creatorProfile, handleLikePost, isLiked, likes }) {
    const authUser = useAuthStore(state => state.user);
    const [comment, setComment] = useState("");
    const { isCommenting, handlePostComment } = usePostComment();
    const commentRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleSubmitComment = async () => {
      await handlePostComment(post.id, comment);
      setComment("");
    };
  
    return (
      <Box mb={10} marginTop={"auto"}>
        <Flex alignItems={"center"} gap={4} w={"full"} pt={"0"} mb={"2"} mt={"4"}>
          <Box onClick={handleLikePost} cursor={"pointer"} fontSize={17}>
            {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
          </Box>
          <Box cursor={"pointer"} fontSize={17} onClick={() => commentRef.current.focus()}>      
            <CommentLogo />
          </Box>  
        </Flex>
        <Text>{likes} Likes</Text>
  
        {isProfilePage && (
          <Text fontSize={"12"} color={"gray"}>
            posted {timeAgo(post.createdAt)} 
          </Text>
        )}
  
        {!isProfilePage && (
          <>
            <Text fontSize={"sm"} fontWeight={600}>
              {creatorProfile?.username} {" "}
              <Text as="span" fontWeight={400}>
                {post.caption} 
              </Text>
            </Text>
            <Text fontSize={"sm"} color={"gray"} cursor={"pointer"} onClick={onOpen}>
              View All {post.comments.length} Comments
            </Text>      
          </>
        )}
        {isOpen && <CommentsModal post={post} isOpen={isOpen} onClose={onClose} />}
  
        {authUser && (
          <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
            <Input
              placeholder={"Add a comment..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <Button
              fontSize={15}
              color={"blue.500"}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
              onClick={handleSubmitComment}
              isLoading={isCommenting}
            >
              Post
            </Button>
          </Flex>
        )}
      </Box>
    );
  }
  
  export default PostFooter;
  
