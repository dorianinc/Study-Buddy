import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useLogoutMutation } from "../../../store/features/api";
import ModalButton from "../../Modals/ModalButton";
import LoginFormModal from "../../Modals/LoginFormModal/LoginForm";
import SignupFormModal from "../../Modals/SignupFormModal/SignupForm";
import "./ProfileButton.css";
import {
  Button,
  ButtonGroup,
  Flex,
  // Box,
  Container,
  Center,
  Avatar,
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

  const dropdown = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <Flex>
      <Flex
        className="my-box"
        justifyContent="space-between"
        gap={3}
        align="center"
        border="1px solid lightgrey"
        borderRadius="50px"
        pt=".5rem"
        pr="1rem"
        pb=".5rem"
        pl="1rem"
        onClick={openMenu}
        _hover={{
          cursor: "pointer",
          boxShadow: 'xl'
        }}
      >
        <HamburgerIcon boxSize={5} />
        <Avatar
          name={user ? `${user.firstName} ${user.lastName}` : ""}
          size="sm"
        />
      </Flex>
      {showMenu && (
        <Container
          className={dropdown}
          ref={ulRef}
          position="absolute"
          top="2.6rem"
          right="1rem"
          border="1px solid black"
          borderRadius="5px"
          w="min-content"
          bgColor="white"
        >
          {user ? (
            <div>
              <div>
                <p>Hello, {user.firstName}</p>
              </div>
              <div>
                <p>{user.email}</p>
              </div>

              <Link to="/options" onClick={closeMenu}>
                <button>Options</button>
              </Link>
              <hr />
              <div>
                <button onClick={logoutUser}>Log Out</button>
              </div>
            </div>
          ) : (
            <div>
              <ButtonGroup variant="link" colorScheme="black" pb="2px" pt="2px">
                <Center flexDirection="column">
                  <div>
                    <ModalButton
                      buttonContent={
                        <Button>
                          <p>Log In</p>
                        </Button>
                      }
                      onButtonClick={closeMenu}
                      modalComponent={<LoginFormModal />}
                    />
                  </div>
                  <div children="signup">
                    <ModalButton
                      buttonContent={
                        <Button>
                          <p>Sign Up</p>
                        </Button>
                      }
                      onButtonClick={closeMenu}
                      modalComponent={<SignupFormModal />}
                    />
                  </div>
                </Center>
              </ButtonGroup>
            </div>
          )}
        </Container>
      )}
    </Flex>
  );
}

export default ProfileButton;
