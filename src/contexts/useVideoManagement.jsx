import { useContext } from "react";
import { VideoContext } from "./VideoContextProvider";

export const useVideoManagement = () => {
  return useContext(VideoContext);
};
