import React, { useState } from "react";
import { useLoginMutation } from "../../../store/features/api";
import { useModal } from "../../../context/ModalContext";
import "./LoginForm.css";
import {
  Input,
  Stack,
  Container,
  FormLabel,
  Box,
  FormControl,
  Button,
} from "@chakra-ui/react";

function LoginFormModal() {
  const [login] = useLoginMutation();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    await login({ credential, password })
      .unwrap()
      .then(closeModal)
      .catch((error) => setErrors(error.data.errors));
  };

  const signInDemo = async (e) => {
    e.preventDefault();
    return await login({ credential: "demo_user123", password: "password1" })
      .unwrap()
      .then(closeModal)
      .catch((error) => setErrors(error.data.errors));
  };

  return (
    <>
      <h1 className="header">Log In</h1>
      <Box
        as="form"
        method="post"
        className="login-form"
        onSubmit={handleSubmit}
        width="280px"
      >
        <FormControl display="flex" flexDirection="column">
          <FormLabel mt={5}>
          Username or Email
            <Input
              w="100%"
              border="1px solid lightgray"
              borderRadius="5px"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
            <Box className="form-errors" mb=".5rem">
              {errors.credential}
            </Box>
          </FormLabel>

          <FormLabel mt={3}>
            Password
            <Input
              w="100%"
              border="1px solid lightgray"
              borderRadius="5px"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Container className="form-errors">{errors.password}{errors.login}</Container>
          </FormLabel>
          <Stack spacing='1px'>
            <Button className="submitBtn" type="submit">
              Log In
            </Button>
            <Button mt=".5rem" className="submitBtn" onClick={(e) => signInDemo(e)}>
              Demo User
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </>
  );
}

export default LoginFormModal;
