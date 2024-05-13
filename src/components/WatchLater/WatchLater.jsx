import "../WatchLater/WatchLater.css";

import { useVideoManagement } from "../../hooks/useVideoManagement";

import { VideoCard } from "../VideoCard/VideoCard";

export const WatchLater = () => {
  const { state } = useVideoManagement();

  return (
    <>
      <div className="video-section">
        <h1>Watch Later</h1>
        {state?.watchLater?.map((item) => {
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
    </>
  );
};
