import { useRef, useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdMusicOff, MdMusicNote } from "react-icons/md";

const VideoCard: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const updateDuration = () => {
        setDuration(videoRef.current!.duration);
      };

      const updateCurrentTime = () => {
        setCurrentTime(videoRef.current!.currentTime);
      };

      videoRef.current.addEventListener("loadedmetadata", updateDuration);
      videoRef.current.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        videoRef.current?.removeEventListener("loadedmetadata", updateDuration);
        videoRef.current?.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);
  return (
    <div className="video-card group">
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        autoPlay
        muted={isMuted}
        className="video"
      />
      <button
        className="play-button flex justify-center items-center"
        onClick={togglePlay}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <MdMusicOff /> : <MdMusicNote />}
      </button>

      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSliderChange}
        className="z-10 group-hover:block hidden  bg-black bottom-10 w-full px-10 border range-slider border-red-50 cursor-pointer absolute"
      />
      <div className="flex items-center"></div>
    </div>
  );
};
export default VideoCard