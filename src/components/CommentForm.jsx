import React, { useState } from "react";
import styles from "../styles/CommentForm.module.css";
import { SearchGifs } from "./SearchGifs";
export const CommentForm = ({ setComments }) => {
  const [comment, setComment] = useState({ text: "", gifUrl: "" });
  const [showGifs, setShowGifs] = useState(false);
  const handleInputChange = (e) => {
    setComment((comment) => ({ ...comment, text: e.target.value }));
  };
  const { text, gifUrl } = comment;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!text && !gifUrl) return;
    setComments((comments) => [comment, ...comments]);
    setComment({text:"", gifUrl:""})
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={styles.inputBox}>
        <textarea
          onChange={handleInputChange}
          value={text}
          type="text"
          name="description"
          id="create-post"
          rows={3}
          className={styles.input}
          placeholder="What's on your mind? "
        />
      </div>
      {gifUrl && <img src={gifUrl} alt="banner" className={styles.gif} />}
      <div className={styles.actionButtons}>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setShowGifs(true)}
        >
          GIF
        </button>
        <button className="btn btn-primary">Post</button>
      </div>
      {showGifs && (
        <SearchGifs setShowGifs={setShowGifs} setComment={setComment} />
      )}
    </form>
  );
};
