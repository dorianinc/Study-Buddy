import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useCreateDocMutation } from "../../store/features/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DocumentPageTest() {
  const { documentId } = useParams();

  return (
    <>
      <h1>Display Document {documentId} PDF HERE </h1>
      <br></br>
      <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Orci mattis dis
        duis habitant, praesent orci cubilia ultricies quis. Elementum lectus
        justo dictum fames purus; senectus nisi mauris ut. Nulla natoque nunc
        cubilia nullam justo laoreet conubia inceptos finibus. Urna metus
        ultrices cursus metus est. Interdum eleifend nulla potenti ipsum
        vestibulum duis fusce ante. Blandit vehicula elementum et tempus pretium
        metus nisl nulla. Venenatis cursus conubia augue praesent orci senectus
        nec. Aptent himenaeos venenatis per nulla nec phasellus dignissim est
        habitasse. Egestas scelerisque porta vehicula est vitae molestie
        elementum. Aenean faucibus condimentum ante elit nisl magnis a. Diam
        ipsum blandit purus id; facilisi vulputate hac augue. Mi tellus curae
        etiam, fusce nisi ridiculus cursus. Arcu est ultrices nisi vel, sagittis
        potenti cursus varius. Phasellus tristique suscipit natoque adipiscing
        tristique. Felis ultricies nulla cursus elit tincidunt purus. Sed vitae
        egestas dictum, egestas lacinia accumsan conubia. Mattis metus eros
        donec nibh convallis curabitur. Purus hendrerit turpis aenean sem proin
        sit. Ligula dictumst lorem nam ridiculus dui sollicitudin? Quam ultrices
        curae dapibus nunc sem. Aliquam dolor semper nunc elit fames tortor
        mollis auctor. Mus fringilla mauris aptent viverra scelerisque mauris
        non. Lacus sagittis vel sapien dapibus imperdiet nascetur. Inceptos
        dapibus rhoncus sodales tortor magnis laoreet erat.
      </p>
    </>
  );
}

export default DocumentPageTest;
