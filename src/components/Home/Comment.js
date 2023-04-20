import classes from "./Comment.module.css";
import taClasses from "../../UI/Textarea.module.css";
import Button from "../../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { postActions } from "../../store/post-slice";

function Comment(props) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (comment !== "") setFormValid(true);
  }, [comment]);

  const setContentHandler = (e) => setComment(e.target.value);

  function addCommentHandler(e) {
    e.preventDefault();

    // todo add comment functionality
    const commentData = {
      postID: props.postID,
      authorID: props.authorID,
      authorName: props.authorName,
      content: comment,
    };
    dispatch(postActions.addComment(commentData));

    // * last step
    props.hideAddComment();
  }

  return (
    <form onSubmit={addCommentHandler} className={classes.container}>
      <textarea
        onChange={setContentHandler}
        value={comment}
        placeholder="add comment..."
        className={taClasses.textarea}
      ></textarea>
      <Button
        disabled={!formValid}
        type="submit"
        className={classes["btn-add-comment"]}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </form>
  );
}

export default Comment;
