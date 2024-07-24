import { useState } from "react";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";

function HomePage() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pdf = new FormData();
    pdf.append("filename", file);
    console.log(pdf.filename);

    const response = await csrfFetch(`/api/test`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: pdf
    });

  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" action="/">
      <div>
        Upload File
        <label htmlFor="fileUpload">Choose File to upload</label>
        <input
          id="fileUpload"
          name="fileUpload"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {console.log("FROM FRONT END", file)}
      </div>
      <input type="submit" />
    </form>
  );
}

export default HomePage;

// <div className="main-container">
//   <h1>POTATOES!</h1>
//   <div className="potato-facts">
//   <div className="fact-container">
//       <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Potatoes.jpg" alt="Potato 1" />
//       <p>Potatoes are the fourth most consumed crop in the world.</p>
//     </div>
//     <div className="fact-container">
//       <img src="https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_640.jpg" alt="Potato 2" />
//       <p>Potatoes were the first vegetable grown in space.</p>
//     </div>
//     <div className="fact-container">
//       <img src="https://www.marthastewart.com/thmb/brdDip06MwtGyDixshehVAfgPaA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/potato-types-lead-getty-1023-8732f29b8ce94fccafb614f6ed6a79e2.jpg" alt="Potato 3" />
//       <p>There are over 4,000 different types of potatoes.</p>
//     </div>
//     <div className="fact-container">
//       <img src="https://media.istockphoto.com/id/533458700/photo/potato.jpg?s=612x612&w=0&k=20&c=HaN0DDduIxGtDIUwmz5rjTJdVu3dOZrSC7mh4diqH3w=" alt="Potato 4" />
//       <p>The largest potato ever grown weighed over 18 pounds.</p>
//     </div>
//   </div>
// </div>
