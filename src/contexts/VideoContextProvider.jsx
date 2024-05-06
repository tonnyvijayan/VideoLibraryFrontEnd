import { useReducer, createContext, useEffect } from "react";
import axios from "../axios/axios";

export const VideoContext = createContext();

const initialState = {
  videos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch-Videos-From-Server":
      return { ...state, videos: action.payload };

    default:
      break;
  }
};

export const VideoContextProvider = ({ children }) => {
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
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
