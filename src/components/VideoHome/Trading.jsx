import "../VideoHome/VideoHome.css";
import { useVideoManagement } from "../../hooks/useVideoManagement";
import { VideoCard } from "../VideoCard/VideoCard";
import { Loader } from "../loader/Loader";

export const Trading = () => {
  const { state, loading } = useVideoManagement();
  const filteredVideos = state?.videos?.filter(
    (item) => item.category === "trading"
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="video-section-home">
          {filteredVideos?.map((item) => {
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
      )}
    </>
  );
};
