import MainContent from "./MainContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, postActions, sendPosts } from "../../store/post-slice";

function Home() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (postState.changed) {
      dispatch(sendPosts(postState.posts));
      dispatch(postActions.resetChange());
    }
  }, [postState, dispatch]);

  return <MainContent />;
}

export default Home;
