import { useParams } from "react-router-dom";

// Display all documents related to a specific folder
function MyDocuments() {
    const { folderId } = useParams();
    return(
        <>
            <div>This is folder number: {folderId}</div>
        </>
    )
}

export default MyDocuments;