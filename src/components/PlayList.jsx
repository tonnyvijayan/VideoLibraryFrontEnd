import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
// import axios from "../axios/axios";

export const PlayList = () => {
  const [playList, setPlaylist] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await axiosPrivate.get("/user/playlist");
        setPlaylist(data.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylist();
  }, []);

  return (
    <>
      <div>{playList}</div>
    </>
  );
};
