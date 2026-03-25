"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();

  const fileInputRef = useRef();

  function handlePickClick() {
    fileInputRef.current.click();
  }

  function handleImageChange(event) {
    const pickedFile = event.target.files[0];
    if (!pickedFile) {
      setPickedImage(null);
      return;
    }

    /**
     * FileReader is used to read the contents of the picked file and convert it to a data URL, which can be used to display the image in the UI. The readAsDataURL method reads the file and triggers the onload event when it's done, allowing us to set the picked image in the state.
     */
    const fileReader = new FileReader();
    fileReader.onload = function () {
      /**
       * When the file is successfully read, the onload event is triggered, and the result (which is the data URL of the image) is set as the picked image in the component's state. This allows us to display a preview of the selected image in the UI or use it for further processing when the form is submitted.
       */
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(pickedFile);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              layout="fill"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
