import classes from "./MainContent.module.css";
import NewPost from "./NewPost";
import { useSelector } from "react-redux";

import Post from "./Post";

function MainContent() {
  const postsToRender = useSelector((state) => state.posts.posts);

  return (
    <section className={classes.container}>
      <NewPost />

      {postsToRender.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </section>
  );
}

export default MainContent;
