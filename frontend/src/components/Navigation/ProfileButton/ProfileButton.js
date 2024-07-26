import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useLogoutMutation } from "../../../store/features/api";
import ModalButton from "../../Modals/ModalButton";
import LoginFormModal from "../../Modals/LoginFormModal/LoginForm";
import SignupFormModal from "../../Modals/SignupFormModal/SignupForm";
import "./ProfileButton.css";
import { Center, Flex, Box } from "@chakra-ui/react";

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
        <Flex  onClick={openMenu}p={2}>
          <Box className="menuIcon">
            <i className="fa-solid fa-bars" />
          </Box>
          <Box className="userIcon">
            <i className="fas fa-user-circle" />
          </Box>
        {/* </Flex> */}
      </Flex>
      {showMenu && (
        <div className={dropdown} ref={ulRef}>
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
              <div className="login">
                <ModalButton
                  buttonContent={
                    <button className="modal-button auth">
                      <p>Log In</p>
                    </button>
                  }
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div children="signup">
                <ModalButton
                  className="modal-button auth"
                  buttonContent={
                    <button className="modal-button auth">
                      <p>Sign Up</p>
                    </button>
                  }
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Flex>
  );
}

export default ProfileButton;
