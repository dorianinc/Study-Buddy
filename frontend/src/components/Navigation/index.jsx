import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LogoButton from "./LogoButton";
import { Flex, Text } from "@chakra-ui/react";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);


  return (
    <Flex
      justify="space-between"
      borderBottom={"1px solid lightgrey"}
      boxShadow={"sm"}
      p={5}
      bg={"blue.300"}
    >
      <NavLink  to="/">
        <Flex direction={"row"} align={"center"} gap={2}>
          <LogoButton />
          <Text fontFamily={"logo"} fontSize={30} color={"white"}>
            Study Buddy
          </Text>
        </Flex>
      </NavLink>
      <ProfileButton user={sessionUser} />
    </Flex>
  );
}

export default Navigation;
