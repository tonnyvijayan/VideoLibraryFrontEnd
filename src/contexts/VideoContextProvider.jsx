import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
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

  const fetchAllVideos = async () => {
    try {
      const { data } = await axios.get("http://localhost:3077/videos/");

      const videoNew = data.data;
      dispatch({ payload: videoNew, type: "Fetch-Videos-From-Server" });
    } catch (error) {
      console.log("Failed to fetch Videos", error.message);
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
