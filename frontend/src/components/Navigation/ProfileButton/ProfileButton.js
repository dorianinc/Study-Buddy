import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useLogoutMutation } from "../../../store/features/api";
import ModalButton from "../../Modals/ModalButton";
import LoginFormModal from "../../Modals/LoginFormModal/LoginForm";
import SignupFormModal from "../../Modals/SignupFormModal/SignupForm";
import "./ProfileButton.css";
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function ProfileButton({ user }) {
  const [logout] = useLogoutMutation();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const history = useHistory();

  const openMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logoutUser = (e) => {
    e.preventDefault();
    logout();
    closeMenu();
    history.push("/");
  };

  // const dropdown = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        rounded={"full"}
        pt="1.5rem"
        pb="1.5rem"
        justifyContent="space-between"
        align="center"
        border="1px solid lightgrey"
        _hover={{
          cursor: "pointer",
          boxShadow: "xl",
        }}
        onClick={openMenu}
        leftIcon={<HamburgerIcon boxSize={5} />}
        rightIcon={
          <Avatar
            name={user ? `${user.firstName} ${user.lastName}` : ""}
            size="sm"
          />
        }
      ></MenuButton>
      {showMenu && (
        <MenuList ref={ulRef} borderRadius={"15px"}>
          {user ? (
            <>
              <Box p={2}>Hello, {user.firstName}</Box>
              <Box p={2}>{user.email}</Box>
              <MenuDivider />
              <MenuItem onClick={logoutUser}>Log Out</MenuItem>
            </>
          ) : (
            <>
              <ModalButton
                buttonContent={<MenuItem>Log In</MenuItem>}
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <ModalButton
                buttonContent={<MenuItem>Sign Up</MenuItem>}
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </MenuList>
      )}
    </Menu>
  );
}

export default ProfileButton;
