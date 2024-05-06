import "./VideoPlayer.css";
import { useParams } from "react-router-dom";

import ReactPlayer from "react-player";
// import axios from "axios";
import { useVideoManagement } from "../../hooks/useVideoManagement";

// import PlayListadd from "./Assets/playlist_add.svg";
import PlayListCheck from "./Assets/playlist_check.svg";
import WatchLaterAdd from "./Assets/watch_later_not.svg";
// import { useEffect, useState } from "react";
// import Like from "./Assets/thumb_up_off.svg";
// import WatchLaterRemove from "./Assets/watch_later.svg";

export const VideoPlayer = () => {
  const { videoId } = useParams();
  const { state } = useVideoManagement();
  const selectedVideo = state.videos.filter((item) => {
    return item._id === videoId;
  });

  console.log({ selectedVideo });

  // const [currentVideo, setCurrentVideo] = useState([]);

  // const fetchCurrentVideoDetails = async () => {
  //   const { data } = await axios.get(`http://localhost:3077/videos/${videoId}`);
  //   console.log(data);
  //   setCurrentVideo(data);
  // };

  // useEffect(() => {
  //   fetchCurrentVideoDetails();
  // }, []);

  return (
    <div className="video-page-video-section">
      {selectedVideo?.map((item) => {
        const { _id, videoUrl, title, creator, views } = item;
        return (
          <div key={_id} className="video-page-video-container">
            <ReactPlayer url={videoUrl} controls={true} width="100%" />

            <div className="video-page-video-bottom-section">
              <a href="#" className="video-page-channel-icon">
                <img
                  src={"dfdf"}
                  alt=""
                  className="video-page-channel-icon-image"
                />
              </a>
              <div className="video-page-video-details">
                <span className="video-page-video-title">{title}</span>
                <span className="video-page-channel-name">{creator}</span>
                <div className="video-page-video-view-data">
                  <span className="video-page-views">
                    {views}
                    views
                  </span>
                  <span className="video-page-date-posted">3 days Ago</span>
                </div>
              </div>
              <div className="bottom-section-icons">
                <span className="icon-links">
                  <img src={PlayListCheck} alt="Playlist" />
                </span>

                <span className="icon-links">
                  <img src={WatchLaterAdd} alt="like" />
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div className="modal-container" id="modal-container">
        <div className="modal">
          <h2>Playlist</h2>
          <input type="checkbox" id="playlist1" className="checkbox" />
          <label htmlFor="playlist1">finance</label>
          <br />

          <button className="button-primary-one" id="close-modal">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
