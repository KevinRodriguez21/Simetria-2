import React, { useState } from "react";
import {
  CheckCircle,
  Award,
  TrendingUp,
  Flame,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Play,
  BookOpen,
  PenTool,
} from "lucide-react";
import ActivityContent from "./ActivityContent.jsx";

export type ActivityType = "video" | "reading" | "exercise";

interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  content: string;
  duration: string;
  points: number;
}

export default function MisActividades() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  const activities: Activity[] = [
    {
      id: 1,
      type: "video",
      title: "Introducción a React Hooks",
      description: "Aprende los conceptos básicos de React Hooks",
      content: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: "15 min",
      points: 100,
    },
    {
      id: 2,
      type: "reading",
      title: "Patrones de Diseño en JavaScript",
      description: "Explora los patrones de diseño más comunes",
      content: "Los patrones de diseño son soluciones probadas a problemas comunes en el desarrollo de software...",
      duration: "10 min",
      points: 75,
    },
    {
      id: 3,
      type: "exercise",
      title: "Ejercicio Práctico: ToDo App",
      description: "Construye una aplicación de tareas",
      content: "Crea una aplicación de lista de tareas utilizando React y TypeScript...",
      duration: "20 min",
      points: 150,
    },
  ];

  const currentActivity = activities[currentActivityIndex];

  const handleComplete = () => {
    setIsCompleted(true);
    setStreak(streak + 1);
  };

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "video":
        return <Play className="text-blue-500" />;
      case "reading":
        return <BookOpen className="text-green-500" />;
      case "exercise":
        return <PenTool className="text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex text-gray-800">
      <div className="flex-grow flex flex-col items-center justify-start p-4 md:p-6">
        <header className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold text-center text-indigo-600">
            Actividad Diaria
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Completa la actividad para mantener tu racha
          </p>
        </header>

        <main className="w-full max-w-4xl space-y-6">
          {/* Activity Container */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getActivityIcon(currentActivity.type)}
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentActivity.title}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{currentActivity.duration}</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                  {currentActivity.points} pts
                </span>
              </div>
            </div>

            <ActivityContent
              activity={currentActivity}
              onComplete={handleComplete}
              isCompleted={isCompleted}
            />

            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`w-full mt-6 py-3 px-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="mr-2" size={20} />
                  Completado
                </>
              ) : (
                "Marcar como completado"
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${isCompleted ? 100 : 0}%` }}
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Streak Counter */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Racha actual</h3>
                  <p className="text-sm text-gray-500">¡Mantén tu progreso diario!</p>
                </div>
                <div className="flex items-center bg-orange-100 px-4 py-2 rounded-lg">
                  <Flame className="text-orange-500 mr-2" size={24} />
                  <span className="text-2xl font-bold text-orange-600">{streak}</span>
                </div>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-around">
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <span className="text-sm mt-1">Completadas</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="p-2 rounded-lg bg-yellow-100 group-hover:bg-yellow-200 transition-colors">
                    <Award className="text-yellow-600" size={24} />
                  </div>
                  <span className="text-sm mt-1">Insignias</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                    <TrendingUp className="text-purple-600" size={24} />
                  </div>
                  <span className="text-sm mt-1">Progreso</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Aside Toggle Button */}
      <button
        onClick={toggleAside}
        aria-expanded={isAsideOpen}
        aria-controls="aside-panel"
        className={`fixed top-1/2 ${
          isAsideOpen ? "right-72 md:right-80" : "right-0"
        } transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-xl p-3 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 z-50`}
      >
        {isAsideOpen ? (
          <ChevronRight className="w-6 h-6" />
        ) : (
          <ChevronLeft className="w-6 h-6" />
        )}
        <span className="sr-only">
          {isAsideOpen ? "Cerrar panel de retos" : "Abrir panel de retos"}
        </span>
      </button>

      {/* Aside Panel */}
      <div
        className={`fixed top-0 right-0 h-full transition-[z-index] duration-300 ${
          isAsideOpen ? "z-50" : "-z-10"
        }`}
      >
        <aside
          id="aside-panel"
          className={`w-72 lg:w-80 h-full bg-white border-l border-gray-200 shadow-2xl p-6 overflow-y-auto transition-all duration-300 ease-in-out ${
            isAsideOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Trophy className="w-7 h-7 text-yellow-500 mr-3" />
            Retos Disponibles
          </h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-300 ${
                  index === currentActivityIndex ? "ring-2 ring-indigo-400" : ""
                }`}
                onClick={() => setCurrentActivityIndex(index)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  {getActivityIcon(activity.type)}
                  <h3 className="text-lg font-medium text-gray-800">
                    {activity.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{activity.duration}</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full font-medium">
                    {activity.points} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}