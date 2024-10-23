import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Maximize, Minimize } from "lucide-react";

export default function VideoPlayer({ src, onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const cursorTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(video.currentTime);
      if (progress === 100) {
        onComplete();
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onComplete]);

  const togglePlay = (e) => {
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest(".video-controls"))
    ) {
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        if (window.screen && window.screen.orientation) {
          await window.screen.orientation.lock("landscape");
        }
      } else {
        await document.exitFullscreen();
        if (window.screen && window.screen.orientation) {
          await window.screen.orientation.unlock();
        }
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setIsCursorVisible(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (cursorTimeoutRef.current) {
      clearTimeout(cursorTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (!isPlaying) return;
      setShowControls(false);
    }, 2000);

    cursorTimeoutRef.current = setTimeout(() => {
      if (!isPlaying) return;
      setIsCursorVisible(false);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`aspect-video bg-black relative rounded-lg overflow-hidden ${
        isFullscreen ? "rounded-none fixed inset-0 z-50" : ""
      } ${isCursorVisible ? "" : "cursor-none"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isFullscreen && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain cursor-pointer"
        src={src}
        onClick={togglePlay}
      />

      {/* Play/Pause Button Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onClick={togglePlay}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(e);
          }}
          className="bg-white bg-opacity-50 rounded-full p-4 transition-transform transform hover:scale-110 focus:outline-none"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-gray-800" />
          ) : (
            <Play className="w-8 h-8 text-gray-800" />
          )}
        </button>
      </div>

      {/* Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 video-controls ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200/30 rounded-full mb-2">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(e);
              }}
              className="hover:text-blue-400 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="hover:text-blue-400 transition-colors"
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}