import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "./Firebase";
import Loader from "./components/Loader";
import { v4 } from "uuid";

function App() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const imageListRef = ref(storage, "images/");

  const imageUpload = (e) => {
    e.preventDefault();
    if (!image) {
      return alert("Image Not Found");
    }
    setIsLoading(true);

    const imageRef = ref(storage, `images/${image.name + v4()}`);

    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
        setIsLoading(false);
        setImage("");
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <form className="upload__form">
        <i
          className="bx bx-cloud-upload"
          style={image ? { color: "blue" } : { color: "gray" }}
        ></i>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={imageUpload}>
          {isLoading ? <Loader /> : "Upload Image"}
        </button>
      </form>

      <ul className="images__list">
        {imageList &&
          imageList.map((item) => (
            <li key={item}>
              <img src={item} alt="" />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
