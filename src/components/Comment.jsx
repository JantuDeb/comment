import React from "react";
import styles from "../styles/CommentForm.module.css";
export const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <h4>{comment.text}</h4>
      <img src={comment.gifUrl} alt="" className={styles.gif} />
    </div>
  );
};
