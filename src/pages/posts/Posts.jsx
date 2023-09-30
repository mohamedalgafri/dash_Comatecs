import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllposts } from "../../api/apiPosts";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const isLoding = useSelector((state) => state.posts.isLoding);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllposts());
  }, []);

  return (
    <>
      <h4>Posts</h4>
      {error ? <p>{error}</p> : ""}
      {isLoding ? (
        <p>Loding</p>
      ) : posts.length >= 1 ? (
        posts.map((item) => <p>{item.title}</p>)
      ) : (
        <p>no posts</p>
      )}
    </>
  );
};

export default Posts;
