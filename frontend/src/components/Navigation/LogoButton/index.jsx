import React from "react";
import { Box, Image } from "@chakra-ui/react";
import "./LogoButton.css";

function LogoButton() {
  return (
    <Box>
      <Image
        boxSize="40px"
        className="logo"
        alt="clippy"
        src="/images/logos/paper-clip-svgrepo-com.svg"
      />
    </Box>
  );
}

export default LogoButton;
