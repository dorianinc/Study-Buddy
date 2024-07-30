import { Box, Image } from "@chakra-ui/react";
import "./LogoButton.css"

function LogoButton() {
    return (
      <Box  className="logoContainer" p={1}>
          <Image boxSize="40px" className ="logo" alt="potato"  src="/images/logos/papercliplogo.png"/>
          {/* <p className="title">Potato</p> */}
      </Box>
    );
  }

  export default LogoButton;
