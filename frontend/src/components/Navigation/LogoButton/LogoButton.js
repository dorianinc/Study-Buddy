import "./LogoButton.css"
import { Box,Image } from "@chakra-ui/react";
function LogoButton() {
    return (
      <Box>
          <Image boxSize="40px" className ="logo" alt="potato" src="/images/logos/paper-clip-svgrepo-com.svg"/>
      </Box>
    );
  }

  export default LogoButton;
