import { useReducer, createContext, useEffect, useState } from "react";
import axios from "../axios/axios";
import { useAuth } from "../hooks/useAuth";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const VideoContext = createContext();

const initialState = {
  videos: [],
  playLists: [],
  watchLater: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch-Videos-From-Server":
      return { ...state, videos: action.payload };
    case "Set-User-Playlist-From-Server":
      return { ...state, playLists: action.payload };
    case "Update-Playlist-State-After-Delete":
      return { ...state, playLists: action.payload };
    case "Add-New-Playlist":
      return { ...state, playLists: [...state.playLists, action.payload] };
    case "Add-Video-To-Playlist":
      return { ...state, playLists: action.payload };
    case "Remove-Video-From-Playlist":
      return { ...state, playLists: action.payload };
    case "Set-User-WatchLater-From-Server":
      return { ...state, watchLater: action.payload };
    case "Delete-From-Watch-Later":
      return { ...state, watchLater: action.payload };
    case "Add-To-Watch-Later":
      return { ...state, watchLater: action.payload };

    default:
      break;
  }
};

export const VideoContextProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const { authState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [toastDetails, setToastDetails] = useState({
    toastMessage: "",
    active: false,
    type: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const fetchAllVideos = async () => {
      try {
        const { data } = await axios.get("/videos", {
          signal: controller.signal,
        });

        const videoNew = data.data;
        isMounted &&
          dispatch({ payload: videoNew, type: "Fetch-Videos-From-Server" });
        setLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log("Failed to fetch Videos", error.message);
        }
      }
    };
    fetchAllVideos();
    return () => {
      isMounted = false;

      controller.abort();
    };
  }, []);
  useEffect(() => {
    const fetchUserPlayList = async () => {
      try {
        const userPlayList = await axiosPrivate.get("/user/fetchplaylists");
        dispatch({
          payload: userPlayList.data.playLists,
          type: "Set-User-Playlist-From-Server",
        });
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserWatchLater = async () => {
      try {
        const response = await axiosPrivate.get("/user/fetchwatchlater");
        dispatch({
          type: "Set-User-WatchLater-From-Server",
          payload: response.data.watchLaterVideos,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (authState) {
      fetchUserPlayList();
      fetchUserWatchLater();
    }
  }, [authState]);

  return (
    <VideoContext.Provider
      value={{
        state,
        dispatch,
        toastDetails,
        setToastDetails,
        loading,
        setLoading,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
