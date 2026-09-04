import React, { useEffect } from "react";
import "./Homepage.css";
import { Box, Container, TabList, TabPanel, TabPanels, Tabs, Text, Tab} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Homepage = () => {

  const history = useHistory();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));//storing userinfo after login/signup in local storage.
     

        if(user) history.push("/chats");
    }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
      d='flex'
      justifyContent='center'
      p={3}
      bg={"white"}
      w="100%"
      m="50px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
>
        <Text fontSize={'3xl'} fontFamily={'work sans'} color={"black"} textAlign={"center"}>CHATTERBOX</Text>
      </Box>
      <Box bg={"white"} w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb = "lem">
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;