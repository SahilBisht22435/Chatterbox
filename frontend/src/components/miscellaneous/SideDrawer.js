import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  Input,
  DrawerBody,
  useToast,
   Spinner
} from "@chakra-ui/react";

import React, { useState } from "react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import NotificationBadge from 'react-notification-badge';
import Effect from 'react-notification-badge';
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  
  const { user, setSelectedChat, chats, setChats,notification,setNotification} = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast= useToast();

  // Search handler 
  const handleSearch = async () => {
    if (!search.trim()) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch{
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  //for accessing user Chat
  const accessChat = async (userId) => {
    try{
      setLoadingChat(true)

      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post('/api/chat',{userId},config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();// to close sidedrawer
    }catch (error){
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="1px"
      >
        {/* Search Button */}
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* App Title */}
        <Text fontSize="2xl" fontFamily="Work Sans">
          ChatterBox
        </Text>

        {/* Notification and Profile Menus */}
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
              count= {notification.length}
              effect={Effect.SCALE}
              />
              <FaBell fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* Drawer for Search */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}// for controlled value
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? ( 
              <ChatLoading />
            ) : (
                searchResult?.map((user) => (//if something there in search
                  <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction = {() =>accessChat(user._id)}

                  />
                ))
              )}
            
            
            
            
            {loadingChat && <Spinner ml="auto" color="teal.500" display="flex" />}
            
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
