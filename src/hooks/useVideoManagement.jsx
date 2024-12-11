import { useContext } from "react";
import { VideoContext } from "../contexts/VideoContextProvider";

export const useVideoManagement = () => {
  return useContext(VideoContext);
};
