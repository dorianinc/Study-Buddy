import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton/ProfileButton";
import LogoButton from "./LogoButton/LogoButton";
import { Flex, Text } from "@chakra-ui/react";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <Flex
      justify="space-between"
      borderBottom={"1px solid lightgrey"}
      boxShadow={"sm"}
      p={5}
    >
        <NavLink exact to="/">
      <Flex direction={'row'} align={'center'}>
          <LogoButton />
          <Text>Study Buddy</Text>
      </Flex>
        </NavLink>
      <ProfileButton user={sessionUser} />
    </Flex>
  );
}

export default Navigation;
