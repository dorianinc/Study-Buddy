import React, { useEffect, useState } from "react";
import { useModal } from "../../../context/ModalContext";
import "./SignupForm.css";
import { useSignupMutation } from "../../../store/features/api";

function SignupFormModal() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonClass, setButtonClass] = useState("pink-button disabled");
  const { closeModal } = useModal();

  const [signup] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
    }
    setErrors({});
    try {
      await signup({
        firstName,
        lastName,
        email,
        username,
        password,
      })
      .unwrap()
      closeModal();
    } catch (error) {
      setErrors(error.data.errors); 
    }
  };

  useEffect(() => {
    if (
      email.length >= 1 &&
      firstName.length >= 1 &&
      lastName.length >= 1 &&
      username.length >= 4 &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      setButtonClass("pink-button");
    } else {
      setButtonClass("pink-button disabled");
    }
  }, [email.length, firstName.length, lastName.length, username, password, confirmPassword]);

  return (
    <>
      <div className="signup-container">
        <h1 className="header">Sign Up</h1>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </label>
          {errors.email && <p className="errors">{errors.email}</p>}
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </label>
          {errors.username && <p className="errors">{errors.username}</p>}
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </label>
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </label>
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </label>
          {errors.password && <p className="errors">{errors.password}</p>}
          <label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </label>
          {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
          <button
            className={buttonClass}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
