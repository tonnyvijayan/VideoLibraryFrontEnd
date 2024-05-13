import "../VideoHome/VideoHome.css";

import { useVideoManagement } from "../../hooks/useVideoManagement";

import { VideoCard } from "../VideoCard/VideoCard";
import { Loader } from "../loader/Loader";

export const VideoHome = () => {
  const { state, loading } = useVideoManagement();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="video-section-home">
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
      )}
    </>
    // <div className="video-section">
    //   {state?.videos?.map((item) => {
    //     const { _id, thumbnailUrl, title, views, duration, creator } = item;

    //     return (
    //       <VideoCard
    //         key={_id}
    //         videoId={_id}
    //         thumbnailUrl={thumbnailUrl}
    //         title={title}
    //         views={views}
    //         duration={duration}
    //         creator={creator}
    //       />
    //     );
    //   })}
    // </div>
  );
};
