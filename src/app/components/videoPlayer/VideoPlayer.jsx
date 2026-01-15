import React from 'react';
import './videoPlayer.css';

const VideoPlayer = ({ url }) => {

  const isYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };


  const getYoutubeVideoId = (url) => {
    let videoId = '';
    const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(youtubeRegex);
    
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId;
  };

  if (!url) return null;

  if (isYoutubeUrl(url)) {
    const videoId = getYoutubeVideoId(url);
    return (
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-container">
      <video controls width="100%">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;