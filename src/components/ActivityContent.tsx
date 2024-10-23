import React from "react";
import { Activity, ActivityType } from "./MisActividades";
import VideoPlayer from "./VideoPlayer";
import { BookOpen, PenTool } from "lucide-react";

interface ActivityContentProps {
  activity: Activity;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function ActivityContent({
  activity,
  onComplete,
  isCompleted,
}: ActivityContentProps) {
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
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="text-green-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Material de Lectura</h3>
            </div>
            <div className="prose prose-indigo max-w-none">
              {activity.content}
            </div>
          </div>
        );
      case "exercise":
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <PenTool className="text-purple-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Ejercicio Práctico</h3>
            </div>
            <div className="prose prose-indigo max-w-none">
              {activity.content}
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