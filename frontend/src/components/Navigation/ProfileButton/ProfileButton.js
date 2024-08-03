import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useLogoutMutation } from "../../../store/features/api";
import ModalButton from "../../Modals/ModalButton";
import LoginFormModal from "../../Modals/LoginFormModal/LoginForm";
import SignupFormModal from "../../Modals/SignupFormModal/SignupForm";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const [logout] = useLogoutMutation();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
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
    <div className="userMenu">
      <div className="userButton">
        <button onClick={openMenu}>
          <div className="menuIcon">
            <i className="fa-solid fa-bars" />
          </div>
          <div className="userIcon">
            <i className="fas fa-user-circle" />
          </div>
        </button>
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
      </div>
    </div>
  );
}

export default ProfileButton;
