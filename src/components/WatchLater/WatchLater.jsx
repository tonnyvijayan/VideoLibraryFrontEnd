import "../WatchLater/WatchLater.css";
import { useVideoManagement } from "../../hooks/useVideoManagement";
import { VideoCard } from "../VideoCard/VideoCard";
import { EmptyWatchLater } from "./EmptyWatchLater";

export const WatchLater = () => {
  const { state } = useVideoManagement();

  return (
    <>
      {state.watchLater.length > 0 ? (
        <div className="video-section-watchlater">
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
      ) : (
        <EmptyWatchLater />
      )}
    </>
  );
};
