import { useParams } from "react-router-dom";
import DocumentUpload from "../DocumentUpload/DocumentUpload";

// Display all documents related to a specific folder
function MyDocuments() {
    const { folderId } = useParams();
    return(
        <>
            <div>This is folder number: {folderId}</div>
            <DocumentUpload />
        </>
    )
}

export default MyDocuments;