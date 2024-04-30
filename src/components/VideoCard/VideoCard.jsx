import "../VideoCard/VideoCard.css";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";

export const VideoCard = ({
  videoId,
  thumbnailUrl,
  title,
  views,
  duration,
  creator,
}) => {
  return (
    <>
      <div key={videoId} className="video-container">
        <Link to={`/videos/${videoId}`} className="thumbnail">
          <img className="thumbnail-image" src={thumbnailUrl} alt="" />
        </Link>
        <div className="video-bottom-section">
          <span className="finview-label finview-card-label">{duration}</span>

          <a href="#" className="channel-icon">
            <img
              src={faker.image.avatar()}
              alt=""
              className="channel-icon-image"
            />
          </a>
          <div className="video-details">
            <span className="video-title">{title}</span>
            <span className="channel-name">{creator}</span>
            <div className="video-view-data">
              <span className="views">{views}views</span> •
              <span className="date-posted">3daysAgo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
