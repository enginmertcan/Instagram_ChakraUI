import { Flex,Button, GridItem, Avatar, Text, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Divider, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import userProfileStore from '../store/userProfileStore';
import { MdDelete } from 'react-icons/md';
import useAuthStore from "../store/authStore";
import useShowToast from "../hooks/useShowToast"
import { fireStore, storage } from '../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import usePostStore from '../store/postStore';
import Caption from '../Comment/Caption';





function ProfilePost({ post }) {
        const { isOpen, onOpen, onClose } = useDisclosure();
      const userProfile = userProfileStore((state) => state.userProfile);
      const authUser = useAuthStore((state) => state.user); 

      const showToast=useShowToast()
      const [isDeleting, setIsDeleting] = useState(false)
      const deletePost=usePostStore(state=>state.deletePost)
      const postsCount = userProfileStore((state)=>state.deletePost)


const handeDeletePost = async()=>{
  if(!window.confirm("Silmek İstediğinize Emin Misiniz")) return;

  try {
    const imageRef = ref(storage,`posts/${post.id}`)
    await deleteObject(imageRef)
    const userRef = doc(fireStore,"users",authUser.uid)
    await deleteDoc(doc(fireStore,"posts",post.id))
    await updateDoc(userRef,{
      posts:arrayRemove(post.id)
    })
    deletePost(post.id); // postu siler

    // showToast("Succes","Post Silindi","succes")
    //toast kullandığım zaman ekranda hata alıyorum

    postsCount(post.id) //post sayısını kontrol eder



  }
  catch(error){
    // showToast("Error",error.message,"error")
          //toast kullandığım zaman ekranda hata alıyorum
l
  }
  finally{
    setIsDeleting(false)

  }
}
if (!authUser) return null;


  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1}
        onClick={onOpen}
      >
        <Flex
          opacity={0} //Görünürlüğü kapatır
          _hover={{ opacity: 1 }} //üzerine gelince görünür yapar.
          position={"absolute"}
          top={0}  left={0} right={0} bottom={0}  //Tüm kenarları sıfırlar, tam ekran yapar.
          bg={"blackAlpha.700"}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>  
            <Flex //DİĞER 2 FLEKS ÜST FLESKTE İÇERİR VE BUNLARI YAN YANA SIRRALAR
            > 
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"}>{post.likes.length}</Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"}>{post.comments.length}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Image src={post.imageURL} alt='Profil Resmi' w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
      
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} maxH={"90vh"} minH={"50vh"}
             w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
              <Flex
                borderRadius={4} //içerideki fotunun keskinliğini
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {/* alt taraf resmi taşır */}
                <Image src={post.imageURL} alt='Profil fotosu' w={"100%"} h={"100%"} objectFit={"cover"} /> 

              </Flex>
              <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    {/* kullanıcının profil resmi */}
                    <Avatar src={userProfile.profilePicURL} size={"sm"} name='enginmertcan' />
                    {/* kullanıcı adı */}
                    <Text fontWeight={"bold"} fontSize={12}> {userProfile.username} </Text>
                  </Flex>
                  { authUser.uid ===userProfile.uid &&(

               <Button onClick={handeDeletePost} isLoading={isDeleting}
              _hover={{ bg: "blue.300", color: "red.600" }} borderRadius={4} p={1}>
          <MdDelete size={20} cursor={"pointer"} />
                </Button>
                  )
                    
                  }
                </Flex>
                <Divider my={4} bg={"blue.500"} />
                <VStack  alignItems={"start"} //yorumlara fotoğrafla soldan hizalar
                 maxH={"450px"}>

    {/* Captions */}
                      {post.caption &&(

                        <Caption post={post}></Caption>
                      )}



                  {/* 
                  Commentss
                   */}
                 
                 {post.comments.map(comment=>(
                    <Comment key={comment.id} comment={comment} />  
                  )  )} 
                </VStack>
                <PostFooter isProfilePage={true} post={post}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePost;
