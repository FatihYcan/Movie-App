const VideoSection = ({ videoKey }) => {
  return (
    <div className="mb-3">
      <div
        className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-xl"
        style={{ paddingTop: "56.25%" }}
      >
        <iframe
          className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          allowFullScreen
          title="YouTube video"
          data-gtm-yt-inspected-2340190_699="true"
          id={240632615}
        />
      </div>
    </div>
  );
};

export default VideoSection;
