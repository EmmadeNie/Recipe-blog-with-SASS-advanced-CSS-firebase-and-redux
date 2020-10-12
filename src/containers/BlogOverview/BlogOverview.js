import React, { useEffect, useContext } from "react";

//CONTAINERS
import FullPost from "./FullPost";

//COMPONENTS
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Post from "../../components/Post/Post";
import Updated from "../../components/UI/Updated";
import Modal from "../../components/UI/Modal/Modal";
import {DisplayContext} from "../../context/display-context"
import {PostsContext} from "../../context/posts-context"

function BlogOverview(props) {
  const displayContext = useContext(DisplayContext);
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    postsContext.getPosts()
  }, [displayContext.postDeleted]);

  const onRemoveBackdrop = () => {
    displayContext.updateCurrentPost(null);
    displayContext.toggleEditMode(false);
  };

  const postAdded = () => {};

  let postList = postsContext.posts.map((post) => {

    return (
      <Post
        style={{ textAlign: "center" }}
        post={post}
        key={post.id}
        viewPostHandler={() => displayContext.updateCurrentPost(post.id)}
      />
    );
  });

  let currentFullPost = displayContext.currentPost && (
    <Modal removeBackdrop={onRemoveBackdrop}>
      <FullPost
        currentId={displayContext.currentPost}
        editModeHandler={displayContext.toggleEditMode}
        editMode={displayContext.editMode}
      />
    </Modal>
  );

  return (
    <Aux>
    {displayContext.postDeleted && <Updated text="post deleted"/>}
      {currentFullPost}
      <section className="Posts">{postList}</section>
    </Aux>
  );
}

export default BlogOverview;
