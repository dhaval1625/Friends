import classes from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userImage from "../../images/user.png";
import moment from "moment/moment";
import {
  faComment,
  faHeart as heartSolidIcon,
  faShare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutlineIcon } from "@fortawesome/free-regular-svg-icons";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postActions } from "../../store/post-slice";
import Modal from "../../UI/Modal";
import Comment from "./Comment";

function Post(props) {
  const {
    author,
    authorDP,
    content,
    time,
    img: image,
    id,
    likes,
    comments,
    totalLikes,
    totalComments,
  } = props.data;
  const authUser = useSelector((state) => state.users.authUser);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const viewedByAuthUser = author === authUser.userName;

  useEffect(() => {
    if (likes) {
      const likedByAuthUser = likes.some(
        (like) => like.authorID === authUser.id
      );
      if (likedByAuthUser) setLiked(true);
    }
  }, [likes]);

  // * Like functionality
  function toggleLikeHandler() {
    if (!liked) {
      setLiked(true);

      const likeData = {
        postID: id,
        authorID: authUser.id,
        authorName: authUser.userName,
      };
      dispatch(postActions.addLike(likeData));
    } else {
      setLiked(false);

      const likeData = {
        postID: id,
        authorID: authUser.id,
      };
      dispatch(postActions.removeLike(likeData));
    }
  }

  const likesContent = likes ? likes.map((like) => like.authorName) : null;

  const showLikesModalHandler = () => setShowLikesModal(true);
  const hideLikesModalHandler = () => setShowLikesModal(false);

  // * Delete post functionality
  function deletePostHandler() {
    dispatch(postActions.deletePost(id));
  }

  const showDeleteModalHandler = () => setShowDeleteModal(true);
  const hideDeleteModalHandler = () => setShowDeleteModal(false);

  // * Comment functionality
  const showAddCommentHandler = () => setShowAddComment(true);
  const hideAddCommentHandler = () => setShowAddComment(false);
  const showCommentModalHandler = () => setShowCommentModal(true);
  const hideCommentModalHandler = () => setShowCommentModal(false);

  const commentsContent = comments
    ? comments.map((comment) => `${comment.authorName}: ${comment.content}`)
    : null;

  // * Calculates how old is this post.
  const timePassed = moment(time).fromNow();

  return (
    <div className={classes["post-container"]}>
      {viewedByAuthUser && (
        <button
          onClick={showDeleteModalHandler}
          className={classes["btn-close"]}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      {showDeleteModal && (
        <Modal
          onAction={deletePostHandler}
          heading="Are you sure?"
          action="Delete"
          hideModal={hideDeleteModalHandler}
        />
      )}
      {showLikesModal && (
        <Modal
          heading="Liked By"
          content={likesContent}
          hideModal={hideLikesModalHandler}
        />
      )}
      {showCommentModal && (
        <Modal
          heading="Comments"
          content={commentsContent}
          hideModal={hideCommentModalHandler}
        />
      )}
      <div className={classes.author}>
        <img
          className={classes["author-image"]}
          src={authorDP || userImage}
          alt="author profile picture"
        />
        <h4>{author}</h4>
      </div>
      <div className={classes.post}>
        <p>{content}</p>
      </div>
      {image && (
        <div className={classes["img-container"]}>
          <img className={classes["post-image"]} src={image} alt={content} />
        </div>
      )}
      <div className={classes.likes}>
        <button onClick={showLikesModalHandler}>{totalLikes} Likes</button>
        <button onClick={showCommentModalHandler}>
          {totalComments} Comments
        </button>
      </div>
      {showAddComment && (
        <Comment
          hideAddComment={hideAddCommentHandler}
          postID={id}
          authorID={authUser.id}
          authorName={authUser.userName}
        />
      )}
      <div className={classes.action}>
        <Button onClick={toggleLikeHandler} className={classes["btn-action"]}>
          <FontAwesomeIcon icon={liked ? heartSolidIcon : heartOutlineIcon} />
          <span className={classes["btn-text"]}> Like</span>
        </Button>
        <Button
          onClick={
            showAddComment ? hideAddCommentHandler : showAddCommentHandler
          }
          className={classes["btn-action"]}
        >
          <FontAwesomeIcon icon={faComment} />
          <span className={classes["btn-text"]}> Comment</span>
        </Button>
        <Button className={classes["btn-action"]}>
          <FontAwesomeIcon icon={faShare} />
          <span className={classes["btn-text"]}> Share</span>
        </Button>
      </div>
      <p className={classes.time}>{timePassed}</p>
    </div>
  );
}

export default Post;
