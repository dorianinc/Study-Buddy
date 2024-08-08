import React, { useEffect, useState } from "react";
import { useModal } from "../../../context/ModalContext";
import "./SignupForm.css";
import { useSignupMutation } from "../../../store/features/api";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Container,
} from "@chakra-ui/react";

function SignupFormModal() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const [signup] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!email) errs.email = "Email is required";
    if (!username) errs.username = "Username must be between 5 and 15 characters long."
    if (username === email) errs.username = "Username cannot be an email address."
    if (!firstName) errs.firstName = "First name is required."
    if (firstName.length < 1 || firstName.length > 25) errs.firstName = "First name must be between 1 and 25 characters long."
    if (!lastName) errs.lastName = "Last name is required"
    if(lastName.length < 1 || lastName.length > 25) errs.lastName = "Last name must be between 1 and 25 characters long."
    if(!password) errs.password = "Password must be between 6 and 20 characters long."


    if (password !== confirmPassword || !confirmPassword) errs.confirmPassword = "Passwords do not match"

    // setErrors({});
    try {
      await signup({
        firstName,
        lastName,
        email,
        username,
        password,
      }).unwrap();
      closeModal();
    } catch (error) {
      return setErrors({...errs,...error.data.errors});
    }
  };

  return (
    <>
      <h1 className="header">Sign Up</h1>
      <Box
        as="form"
        className="signUpForm"
        onSubmit={handleSubmit}
        width="330px"
      >
        <FormControl display="flex" flexDirection="column">
          <FormLabel>
            Email
            <Input
              w="100%"
              type="text"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </FormLabel>
          <Container className="form-errors" mb='.5rem'>
              {errors.email}
            </Container>
          <FormLabel>
            Username
            <Input
              w="100%"
              type="text"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </FormLabel>
          <Container className="form-errors" mb='.5rem'>
              {errors.username}
            </Container>
          <FormLabel>
            First Name
            <Input
              w="100%"
              type="text"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </FormLabel>
          <Container className="form-errors" mb='.5rem'>
              {errors.firstName}
            </Container>
          <FormLabel>
            Last Name
            <Input
              w="100%"
              type="text"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </FormLabel>
          <Container className="form-errors" mb='.5rem'>
              {errors.lastName}
            </Container>
          <FormLabel>
            Password
            <Input
              w="100%"
              type="password"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </FormLabel>
          <Container className="form-errors" mb='.5rem'>
              {errors.password}
            </Container>
          <FormLabel>
            Confirm Password
            <Input
              w="100%"
              type="password"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </FormLabel>
          <Container className="form-errors" mb='.5rem'>
              {errors.confirmPassword}
            </Container>
          <Button className="submitBtn" type="submit">
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

export default SignupFormModal;
