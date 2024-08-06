import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import userProfileStore from '../store/userProfileStore';
import useAuthStore from '../store/authStore';
import EditProfile from './EditProfile';
import useFollowUser from '../hooks/useFollowUser';

function ProfileHeader() {
    const { userProfile } = userProfileStore();
    const authUser = useAuthStore((state) => state.user);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile?.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile?.username;



    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
          
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1} justifyContent={"center"}>
                <Flex gap={4} direction={{ base: "column", sm: 'row' }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>


                    {visitingOwnProfileAndAuth && (
                        <Flex gap={4} justifyContent={"center"} alignItems={"center"}>

                    <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifyContent={"center"} alignItems={"flex-start"} mx={"auto"}>
                                    <Avatar src={userProfile.profilePicURL} alt="Profil Fotoğrafı" onClick={onOpen} />
                                        </AvatarGroup>
                            <Button bg={"white"} color={"black"} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.300" }} size={{ base: "xs", md: "sm" }} onClick={onOpen}>
                               Edit Profile
                            </Button>
                        </Flex>
                    )}

                    {visitingAnotherProfileAndAuth && (
                        <Flex gap={4} justifyContent={"center"} alignItems={"center"}>

                                <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifyContent={"center"} alignItems={"flex-start"} mx={"auto"}>
                                <Avatar src={userProfile.profilePicURL} alt="Profil Fotoğrafı"  />
                                </AvatarGroup>
                            <Button bg={"blue.500"} color={"white"} cursor={"pointer"} _hover={{ bgColor: "blue.600" }} size={{ base: "xs", md: "sm" }} onClick={handleFollowUser} isLoading={isUpdating}>
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>

                        </Flex>
                    )}
                    <Text fontSize={{ base: "sm", md: "lg" }} fontWeight={"bold"}>{userProfile.username}</Text>

                </Flex>
                <Flex alignItems={"center"} justifyContent={"center"} gap={{ base: "2", sm: "4" }}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text> Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text> Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text> Following
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.fullName}</Text>
                </Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.bio}</Text>
            </VStack>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    );
}

export default ProfileHeader;
