import "../VideoHome/VideoHome.css";

import { useVideoManagement } from "../../contexts/useVideoManagement";

import { VideoCard } from "../VideoCard/VideoCard";

export const VideoHome = () => {
  const { state } = useVideoManagement();

  return (
    <div className="video-section">
      {state?.videos?.map((item) => {
        const { _id, thumbnailUrl, title, views, duration, creator } = item;

        return (
          <VideoCard
            key={_id}
            videoId={_id}
            thumbnailUrl={thumbnailUrl}
            title={title}
            views={views}
            duration={duration}
            creator={creator}
          />
        );
      })}
    </div>
  );
};
