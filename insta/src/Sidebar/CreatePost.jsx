import React, { useRef } from "react";
import {  Tooltip, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, Image, CloseButton, useDisclosure,Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { CreatePostLogo } from "../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";

import userProfileStore from "../store/userProfileStore";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import { useLocation } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { fireStore, storage } from "../firebase/firebase";




const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setcaption] = useState("");
	const imageRef = useRef(null);
	const {handleImageChange,selectedFile,setSelectedFile} = usePreviewImg() 
	const showToast = useShowToast();
	const {handleCreatePost, isLoading} = useCreatePost();
	const addPost =userProfileStore((state)=>state.addPost)
	const userProfile = userProfileStore((state)=>state.userProfile)

   const handlePostCreation = async()=> {
		try{
		await handleCreatePost(selectedFile, caption);
		onClose();
		setcaption("")
		setSelectedFile(null)

		}
		catch(error){
			showToast("error", error.message, "Error")
		}

	}
	
	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			
	<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...'
						value={caption}	
						onChange={(e) => setcaption(e.target.value)}
						/>
						
						<Input type='file' hidden ref={imageRef} onChange={handleImageChange}
						
						/>

						<BsFillImageFill
						onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={50}
						/>
						{selectedFile && (

							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
									<Image src ={selectedFile} alt="Selected img" />
									<CloseButton position={"absolute"} 
									right={2} 
									top={2} 
									onClick={() => setSelectedFile(null)} />

							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> 


			
		</>
	);
};

export default CreatePost;


function useCreatePost () {
	const showToast = useShowToast();
	const authUser = useAuthStore((state)=> state.user)
	const [isLoading,setIsLoading] = useState(false)
	const createPost = usePostStore((state) => state.createPost);
	const addPost =userProfileStore((state) => state.addPost);
	const {pathname} = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if(!selectedFile) throw new Error("Please select an image")
			setIsLoading(true)
			const newPost ={
				caption: caption,
				likes: [],
				comments: [],
				createdAt:Date.now(),
				createdBy: authUser.uid,
			}

			try {
				const postDocRef= await addDoc(collection(fireStore,"posts"), newPost)
				const userDocRef =doc(fireStore,"users",authUser.uid)
				const imageRef=ref(storage,`posts/${postDocRef.id}`)


				await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)})
				await uploadString(imageRef, selectedFile, "data_url");
				const downloadURL = await getDownloadURL(imageRef);
				
				await updateDoc (postDocRef,{imageURL: downloadURL})

				
				newPost.imageURL = downloadURL;

				if(userProfile.uid === authUser.uid) createPost({...newPost,id:postDocRef.id})
				if(pathname !=="/" &&userProfile.uid ===authUser.uid)
				addPost({...newPost,id:postDocRef.id})

				
				showToast("Success", "Post Yüklendi", "success")

			}
			catch(error){
					showToast("Error", error.message, "error") 
			}
			finally{
				setIsLoading(false)
			}
		}


	
	return {handleCreatePost, isLoading}

}

