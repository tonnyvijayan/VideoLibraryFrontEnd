import "./VideoPlayer.css";
import PlayListCheck from "./Assets/playlist_check.svg";
import WatchLaterRemove from "./Assets/watch_later.svg";
import WatchLaterAdd from "./Assets/watch_later_not.svg";
import DeleteButton from "./Assets/delete4.svg";
import Add from "./Assets/add.svg";
import { RouteNotFound } from "../RouteNotFound/RouteNotFound";
import { useParams } from "react-router-dom";
import { useVideoManagement } from "../../hooks/useVideoManagement";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import ReactPlayer from "react-player";

export const VideoPlayer = () => {
  const axiosPrivate = useAxiosPrivate();
  const { authState } = useAuth();
  const showToast = useToast();
  const [playlistModal, setPlaylistModal] = useState("");
  const [watchLaterModal, setWatchLaterModal] = useState("");
  const { videoId } = useParams();
  const { state, dispatch } = useVideoManagement();
  const [playlistName, setPlaylistName] = useState("");

  const selectedVideo = state.videos.filter((item) => {
    return item._id === videoId;
  });
  const [videoToBeAdded] = selectedVideo;
  const videoInWatchLater = state.watchLater.map((item) => item._id);

  const playlistInputHandler = (event) => {
    setPlaylistName(event.target.value);
  };

  const deletePlaylistHandler = async (event) => {
    try {
      const response = await axiosPrivate.delete(
        `/user/deleteplaylist/${event.target.name}`
      );
      if (response.status === 200) {
        const updatedPlaylist = state.playLists.filter((item) => {
          return item.playListName !== event.target.name;
        });
        dispatch({
          type: "Update-Playlist-State-After-Delete",
          payload: updatedPlaylist,
        });
        showToast(response.data.message, "success");
      }
    } catch (error) {
      console.log(error);
      showToast("failed to delete playlist", "fail");
    }
  };

  const createPlaylistHandler = async () => {
    try {
      const response = await axiosPrivate.post("/user/createplaylist", {
        playListName: playlistName,
      });
      if (response.status === 201) {
        setPlaylistName("");
        dispatch({
          type: "Add-New-Playlist",
          payload: response.data.newPlayList,
        });
        showToast(response.data.message, "success");
      }
    } catch (error) {
      error.response.status === 409
        ? showToast(error.response.data.message, "fail")
        : showToast("Unable to create playlist", "fail");
      setPlaylistName("");
    }
  };

  const checkBoxHandler = async (event) => {
    try {
      if (event.target.checked === true) {
        const response = await axiosPrivate.post("/user/addtoplaylist", {
          playListName: event.target.id,
          videoId: videoId,
        });
        if (response.status === 201) {
          const addVideoToPlayList = state.playLists.map((item) => {
            return item.playListName === event.target.id
              ? { ...item, videos: [...item.videos, videoToBeAdded] }
              : item;
          });

          dispatch({
            type: "Add-Video-To-Playlist",
            payload: addVideoToPlayList,
          });
          showToast(`Video added to ${event.target.id} playlist`, "success");
        }
      } else if (event.target.checked === false) {
        const response = await axiosPrivate.post("/user/removefromplaylist", {
          playListName: event.target.id,
          videoId: videoId,
        });
        if (response.status === 200) {
          const updatedPlayList = state.playLists.map((item) => {
            return item.playListName === event.target.id
              ? {
                  ...item,
                  videos: item.videos.filter((video) => video._id !== videoId),
                }
              : item;
          });
          dispatch({
            type: "Remove-Video-From-Playlist",
            payload: updatedPlayList,
          });
          showToast(
            `Video removed from ${event.target.id} playlist`,
            "success"
          );
        }
      }
    } catch (error) {
      console.log(error);
      error.response.status === 409
        ? showToast(
            `Video already exists in ${event.target.id} playlist`,
            "fail"
          )
        : showToast(`Unable to add video to playlist`, "fail");
    }
  };

  const removeFromWatchLaterHandler = async () => {
    try {
      const response = await axiosPrivate.post("/user/removefromwatchlater", {
        videoId: videoId,
      });
      if (response.status === 200) {
        const updatedWatchLater = state.watchLater.filter(
          (item) => item._id !== videoId
        );
        dispatch({
          type: "Delete-From-Watch-Later",
          payload: updatedWatchLater,
        });
        showToast("Video removed from watchlater", "success");
      }
    } catch (error) {
      console.log(error);
      showToast("unable to remove video from watchlater", "fail");
    }
  };

  const addToWatchLaterHandler = async () => {
    try {
      const response = await axiosPrivate.post("/user/addtowatchlater", {
        videoId: videoId,
      });
      if (response.status === 201) {
        const updatedWatchLater = [...state.watchLater, videoToBeAdded];
        dispatch({ type: "Add-To-Watch-Later", payload: updatedWatchLater });
        showToast("Video added to watchlater", "success");
      }
    } catch (error) {
      if (error.response.status === 409) {
        showToast("Video already exists in watchlater", "fail");
      } else {
        showToast("unable to add video to watchlater", "fail");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    showToast("Video loaded", "success");
  }, []);

  return (
    <div className="video-page-video-section">
      {selectedVideo.length > 0 ? (
        selectedVideo?.map((item) => {
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
                  <span
                    className="icon-links"
                    onClick={() => {
                      setPlaylistModal("show");
                    }}
                  >
                    <img src={PlayListCheck} alt="Playlist" />
                  </span>
                  {!authState ? (
                    <span className="icon-links">
                      <img
                        src={WatchLaterAdd}
                        alt="watchlater"
                        onClick={() => {
                          setWatchLaterModal("show-watchlater-modal");
                        }}
                      />
                    </span>
                  ) : videoInWatchLater.includes(videoId) ? (
                    <span className="icon-links">
                      <img
                        src={WatchLaterRemove}
                        alt="watchlater"
                        onClick={removeFromWatchLaterHandler}
                      />
                    </span>
                  ) : (
                    <span className="icon-links">
                      <img
                        src={WatchLaterAdd}
                        alt="watchlater"
                        onClick={addToWatchLaterHandler}
                      />
                    </span>
                  )}
                  <div
                    className={`modal-container ${watchLaterModal}`}
                    id="modal-container"
                  >
                    <div className="modal">
                      <h2>WatchLater</h2>
                      <strong>Log in to add to WatchLater</strong>
                      <br />
                      <button
                        className="modal-close-button"
                        id="close-modal"
                        onClick={() => {
                          setWatchLaterModal("");
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <RouteNotFound />
      )}
      {authState ? (
        <div
          className={`modal-container ${playlistModal}`}
          id="modal-container"
        >
          <div className="modal">
            <h2>Playlist</h2>
            {state?.playLists.map((item) => {
              const videoInPlaylist = item.videos.map((video) => video._id);

              return (
                <div
                  className="playlist-detail-container"
                  key={item.playListName}
                >
                  <input
                    type="checkbox"
                    id={item.playListName}
                    className="checkbox"
                    checked={videoInPlaylist.includes(videoId) ? true : false}
                    onChange={checkBoxHandler}
                  />
                  <label htmlFor={item.playListName} className="chekbox-label">
                    {item.playListName}
                  </label>
                  <span className="">
                    <img
                      src={DeleteButton}
                      alt="Delete-button"
                      className="delete-button-svg"
                      onClick={deletePlaylistHandler}
                      name={item.playListName}
                    />
                  </span>
                </div>
              );
            })}

            <div className="create-playlist-container">
              <input
                type="text"
                className="create-playlist-input"
                placeholder="Create New Playlist"
                onChange={playlistInputHandler}
                value={playlistName}
              />
              <button className="img-button" onClick={createPlaylistHandler}>
                <img
                  src={Add}
                  alt="add-to-playlist"
                  className="add-to-playlist-svg"
                />
              </button>
            </div>

            <button
              className="modal-close-button"
              id="close-modal"
              onClick={() => {
                setPlaylistModal("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`modal-container ${playlistModal}`}
          id="modal-container"
        >
          <div className="modal">
            <h2>Playlist</h2>
            <strong>Log in to create playlists</strong>
            <br />
            <button
              className="modal-close-button"
              id="close-modal"
              onClick={() => {
                setPlaylistModal("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
