import Button from "../../UI/Button";
import classes from "./NewPost.module.css";
import taClasses from "../../UI/Textarea.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faImage,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../store/post-slice";
import { storage } from "../../store/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

function NewPost() {
  const [imageUploadStatus, setImageUploadStatus] = useState({
    uploading: false,
    success: false,
    failed: false,
  });
  const [imageURL, setImageURL] = useState(null);
  const content = useRef();
  const dispatch = useDispatch();
  const author = useSelector((state) => state.users.authUser);

  function addPostHandler(e) {
    e.preventDefault();
    const contentData = content.current.value;
    dispatch(
      postActions.addPost({
        content: contentData,
        author: author.userName,
        authorDP: author.profilePicture,
        img: imageURL,
      })
    );

    content.current.value = "";
    setImageURL(null);
    setImageUploadStatus({
      uploading: false,
      success: false,
      failed: false,
    });
  }

  const uploadFile = useRef();

  function activateImageInput() {
    uploadFile.current.click();
  }

  async function uploadImageHandler(e) {
    const imageToUpload = e.target.files[0];

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedImage = await imageCompression(imageToUpload, options);

    const path = ref(storage, `post-images/${imageToUpload.name}`);

    try {
      setImageUploadStatus({
        success: false,
        uploading: true,
        failed: false,
      });

      await uploadBytes(path, compressedImage);
      const url = await getDownloadURL(path);
      setImageURL(url);
      setImageUploadStatus({
        success: true,
        uploading: false,
        failed: false,
      });

      // Reset uploaded image in browser
      e.target.value = null;
    } catch (error) {
      console.log(error.message);
      setImageUploadStatus({
        success: false,
        failed: true,
        uploading: false,
      });
    }
  }

  let attachContent = (
    <FontAwesomeIcon className={classes["attach-icon"]} icon={faImage} />
  );

  if (imageUploadStatus.uploading) attachContent = <p>Uploading...</p>;
  if (imageUploadStatus.success) attachContent = <p>Uploaded successfully!</p>;
  if (imageUploadStatus.failed) attachContent = <p>Failed to upload image!</p>;

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={addPostHandler}>
        <textarea
          className={taClasses.textarea}
          name="new-post"
          ref={content}
          placeholder="What's on your mind"
        ></textarea>
        <div className={classes.actions}>
          <Button
            disabled={imageUploadStatus.uploading}
            className={classes.upload}
            type="submit"
          >
            <FontAwesomeIcon icon={faArrowUp} />
            <span> Upload</span>
          </Button>
          <Button
            onClick={activateImageInput}
            disabled={imageUploadStatus.uploading || imageUploadStatus.success}
            type="button"
            className={classes["btn-attach-image"]}
          >
            <span className={classes.attach}>
              <FontAwesomeIcon icon={faPaperclip} />
            </span>
            {attachContent}
          </Button>
          <input
            onChange={uploadImageHandler}
            hidden
            ref={uploadFile}
            accept="image/*"
            type="file"
          />
        </div>
      </form>
    </div>
  );
}

export default NewPost;
