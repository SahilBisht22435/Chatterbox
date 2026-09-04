import { Box } from '@chakra-ui/react'
import { IoMdClose } from "react-icons/io";
import React from 'react'

const UserBadgeItem = ({ user, handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    // colorScheme="purple"
    cursor="pointer"
    color={"white"}
    background="blue"
    onClick={handleFunction}
    display={"flex"}
    gap={1}
    >
        {user.name}
        <IoMdClose  p1={1} />
    </Box>
  )
}

export default UserBadgeItem