import React, { useCallback, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import styles from "../styles/SearchGifs.module.css";
import axios from "axios";
import { axiosConfig, debounce } from "../utils";
import { GIF } from "./GIF";
export const SearchGifs = ({setShowGifs, setComment}) => {
  const [trendingGIFs, setTrendingGIFs] = useState([]);
  const [searchedGIFs, setSearchedGIFs] = useState([]);
  const [text, setText] = useState("");

  const searchGIFs = async (text) => {
    if (text === "") return;
    try {
      const { data } = await axios.get(
        `search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${text}&limit=10&rating=g`,
        axiosConfig
      );
      const images = data.data.map((gif) => ({
        id: gif.id,
        url: gif.images.original.url,
      }));
      setSearchedGIFs(images);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(searchGIFs, 400), []);

  const inputSearchHandler = (e) => {
    setText(e.target.value);
    debouncedCallback(e.target.value);
  };

  const gifs = text==="" ? trendingGIFs :searchedGIFs;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=10&rating=g`,
          axiosConfig
        );
        const images = data.data.map((gif) => ({
          id: gif.id,
          url: gif.images.original.url,
        }));
        setTrendingGIFs(images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className={styles.gifsContainer}>
      <div className={styles.head}>
        <button type="button" onClick={()=>setShowGifs(false)}>
          <BsArrowLeftShort size={25} />
        </button>
        <h3>Choose GIF</h3>
      </div>

      <div className={styles.searchBar}>
        <BiSearch size={20} />
        <input
          type="text"
          name=""
          onChange={inputSearchHandler}
          placeholder="Search GIF"
          className={styles.inputSearch}
        />
      </div>
      <div className={styles.gifs}>
        {gifs.map((gif) => {
          return <GIF key={gif.id} gif={gif} setComment={setComment} setShowGifs={setShowGifs} />;
        })}
      </div>
    </section>
  );
};
