import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useLogoutMutation } from "../../../store/features/api";
import ModalButton from "../../Modals/ModalButton";
import LoginFormModal from "../../Modals/LoginFormModal/LoginForm";
import SignupFormModal from "../../Modals/SignupFormModal/SignupForm";
import "./ProfileButton.css";
import { Button, ButtonGroup, Flex, Box, Container, Center } from "@chakra-ui/react";

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
    <Flex className="userMenu" >
      {/* <Flex className="userButton"> */}
        <Flex  onClick={openMenu} position="absolute" right="1rem" top="1rem" border="1px solid gray" borderRadius="5px" pr=".5rem" pl=".5rem" _hover={{
          cursor: "pointer"
        }}>
          <Box className="menuIcon" pr="5px">
            <i className="fa-solid fa-bars" />
          </Box>
          <Box className="userIcon" >
            <i className="fas fa-user-circle" />
          </Box>
        {/* </Flex> */}
      </Flex>
      {showMenu && (
        <Container className={dropdown} ref={ulRef} position="absolute" top="2.6rem" right="1rem" border="1px solid black" borderRadius="5px" w="min-content" bgColor="white">
          {user ? (
            <div className="userInfo">
              <div>
                <p id="firstName">Hello, {user.firstName}</p>
              </div>
              <div>
                <p id="email">{user.email}</p>
              </div>
              <hr className="line userMenu" />
              <Link to="/options" onClick={closeMenu}>
                <button className="modal-button auth">Options</button>
              </Link>
              <hr className="line userModal" />
              <div>
                <button className="modal-button auth" onClick={logoutUser}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              <ButtonGroup variant="link" colorScheme="black" pb="2px" pt="2px">
                <Center flexDirection="column">

              <div className="login">
                <ModalButton
                  buttonContent={
                    <Button className="modal-button auth" >
                      <p>Log In</p>
                    </Button>
                  }
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                  />
              </div>
              <div children="signup">
                <ModalButton
                  className="modal-button auth"
                  buttonContent={
                    <Button className="modal-button auth">
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
