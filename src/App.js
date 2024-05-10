import React, { useEffect, useState } from "react";
import { storage } from "./Firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

  const imageListRef = ref(storage, "images/");

  const uploadFile = async () => {
    if (image == null) return;

    const imageRef = ref(storage, `images/${image.name}`);

    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl((prev) => [...prev]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <div className="App">
        <input
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>

      <div>
        {imageUrl.map((url) => (
          <img src={url} alt="" />
        ))}
      </div>
    </>
  );
}

export default App;
