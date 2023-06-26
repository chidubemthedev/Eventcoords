import React, { useEffect } from "react";
import { useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import axios from "axios";

const Comments = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (showComments) {
        const response = await axios.get(`/api/comments/${eventId}`);
        const data = await response.data;
        console.log(data);
        setComments(data.comments);
      }
    };
    fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    const response = await axios.post(`/api/comments/${eventId}`, commentData);
    const data = await response.data;
    console.log(data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
