import React from "react";
import styles from "../styles/Gif.module.css";
export const GIF = ({ gif, setComment,setShowGifs }) => {
  const handleImageClick = () => {
    setComment((comment) => ({ ...comment, gifUrl: gif.url }));
    setShowGifs(false)
  };
  return (
    <div className={styles.gif}>
      <img key={gif.id} src={gif.url} alt="" onClick={handleImageClick} />
    </div>
  );
};
