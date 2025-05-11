import React from 'react';

const VideoHeroSection = () => {
  return (
    <section className="video-hero-container">
    <div className="body-cover">
      <video className="video-bg" autoPlay loop muted >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      </div>
    </section>
  );
};

export default VideoHeroSection;
