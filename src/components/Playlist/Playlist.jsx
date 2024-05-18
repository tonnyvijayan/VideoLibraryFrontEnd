import "../Playlist/Playlist.css";
import { useVideoManagement } from "../../hooks/useVideoManagement";
import { VideoCard } from "../VideoCard/VideoCard";

export const Playlist = () => {
  const { state } = useVideoManagement();

  return (
    <>
      {state?.playLists?.map((item) => {
        return (
          <div key={item._id} className="playlist-container">
            <h3>Playlist: {item.playListName}</h3>
            <div className="video-section-playlist">
              {item.videos.map((item) => {
                const { _id, thumbnailUrl, title, views, duration, creator } =
                  item;
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
          </div>
        );
      })}
    </>
  );
};
