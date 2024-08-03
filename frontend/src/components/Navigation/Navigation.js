import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton/ProfileButton";
import LogoButton from "./LogoButton/LogoButton";
import "./Navigation.css";
import { Flex } from "@chakra-ui/react";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    // <Flex className="nav-bar">
      <Flex justify="space-between" className="nav-bar-content" p={10}>
        <NavLink exact to="/">
          <LogoButton />
        </NavLink>
        {/* {isLoaded && <ProfileButton user={sessionUser} />} */}
        <ProfileButton user={sessionUser} />
      </Flex>
    // </Flex>
  );
}

export default Navigation;
