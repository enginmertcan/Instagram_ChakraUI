import {Button,Flex,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay, Text,} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose,post }) => {
    const {handlePostComment,isCommenting}=usePostComment() 
    const commentRef = useRef(null)
    const commentContainerRef = useRef(null)
    const handleSubmitComment =async(e)=>{
        e.preventDefault();
        await handlePostComment(post.id,commentRef.current.value)  
        commentRef.current.value=""
    }
  useEffect(()=>{
    const scrollToBottom = () => {
        commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
    }
    if(isOpen){
        setTimeout(() => {
            scrollToBottom()

        }, 100);
    }

  },[isOpen,post.comments.length])

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <Text fontStyle={"span"}  fontSize={"13"} justifyContent={"center"}>{post.caption}</Text>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}ref={commentContainerRef}
                    ></Flex>
                    {post.comments.map((comment)=>{
                        return <Comment key ={comment.id} comment={comment} />
                    })}
					<form onSubmit={handleSubmitComment}  style={{ marginTop: "2rem" }}>
						<Input placeholder='Comment' size={"sm"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;