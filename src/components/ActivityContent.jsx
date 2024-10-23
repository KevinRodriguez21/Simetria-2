import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import { BookOpen, Link as LinkIcon, Play, Pause, Timer } from "lucide-react";

export default function ActivityContent({ activity, onComplete, isCompleted }) {
  const [progress, setProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Convert duration from minutes to seconds
  const getDurationInSeconds = () => {
    return parseInt(activity.duration) * 60;
  };

  const startReading = () => {
    setIsReading(true);
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => {
        const newTime = prev + 1;
        const duration = getDurationInSeconds();
        const newProgress = (newTime / duration) * 100;
        setProgress(Math.min(newProgress, 100));
        
        if (newTime >= duration) {
          clearInterval(timerRef.current);
          onComplete();
        }
        return newTime;
      });
    }, 1000);
  };

  const pauseReading = () => {
    setIsReading(false);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderContent = () => {
    switch (activity.type) {
      case "video":
        return (
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
            <VideoPlayer src={activity.content} onComplete={onComplete} />
          </div>
        );
      case "reading":
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="text-green-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Material de Lectura</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Timer className="text-gray-500" size={18} />
                  <span className="text-sm text-gray-600">
                    {formatTime(timeSpent)} / {formatTime(getDurationInSeconds())}
                  </span>
                </div>
                <button
                  onClick={isReading ? pauseReading : startReading}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                    isReading
                      ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {isReading ? (
                    <>
                      <Pause size={18} />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      <span>{timeSpent > 0 ? "Continuar" : "Comenzar"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="prose prose-indigo max-w-none">
              {activity.content}
            </div>
          </div>
        );
      case "url":
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <LinkIcon className="text-blue-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Contenido Externo</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Timer className="text-gray-500" size={18} />
                  <span className="text-sm text-gray-600">
                    {formatTime(timeSpent)} / {formatTime(getDurationInSeconds())}
                  </span>
                </div>
                <button
                  onClick={isReading ? pauseReading : startReading}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                    isReading
                      ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {isReading ? (
                    <>
                      <Pause size={18} />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      <span>{timeSpent > 0 ? "Continuar" : "Comenzar"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="aspect-[16/9] w-full bg-white rounded-lg overflow-hidden shadow-inner">
              <iframe
                src={activity.content}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderContent()}
    </div>
  );
}