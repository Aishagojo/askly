import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flower, Wind, Heart, Sun } from 'lucide-react';

const MindfulnessPage = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(60); // seconds

  const exercises = [
    {
      id: 'breathing',
      title: 'Guided Breathing',
      icon: Wind,
      description: 'Deep breathing exercise to calm your mind and reduce stress',
      color: 'bg-blue-500',
      instructions: [
        'Find a comfortable position and close your eyes',
        'Breathe in slowly through your nose for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly through your mouth for 6 counts',
        'Repeat this cycle throughout the exercise'
      ]
    },
    {
      id: 'meditation',
      title: 'Mindfulness Meditation',
      icon: Flower,
      description: 'Simple meditation to center yourself and find inner peace',
      color: 'bg-purple-500',
      instructions: [
        'Sit comfortably with your back straight',
        'Focus on your natural breath',
        'When thoughts arise, gently acknowledge them',
        'Return your attention to your breathing',
        'Be kind to yourself throughout the practice'
      ]
    },
    {
      id: 'gratitude',
      title: 'Gratitude Practice',
      icon: Heart,
      description: 'Reflect on positive aspects of your life to boost mood',
      color: 'bg-pink-500',
      instructions: [
        'Think of three things you\'re grateful for today',
        'Focus on why each one matters to you',
        'Feel the positive emotions associated with each',
        'Let gratitude fill your heart and mind',
        'Carry this feeling with you throughout your day'
      ]
    },
    {
      id: 'body-scan',
      title: 'Body Scan Relaxation',
      icon: Sun,
      description: 'Progressive relaxation technique to release physical tension',
      color: 'bg-orange-500',
      instructions: [
        'Lie down or sit comfortably',
        'Start by relaxing your toes and feet',
        'Gradually move up through each part of your body',
        'Notice any tension and consciously release it',
        'End by relaxing your face and head completely'
      ]
    }
  ];

  useEffect(() => {
    let interval;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const startExercise = (exerciseId) => {
    setActiveExercise(exerciseId);
    setTimeRemaining(selectedDuration);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeRemaining(selectedDuration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExercise = exercises.find(ex => ex.id === activeExercise);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Flower className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mindfulness & Relaxation</h1>
            <p className="text-gray-600">Practice mindfulness to reduce stress and improve well-being</p>
          </div>
        </div>
      </div>

      {activeExercise ? (
        /* Active Exercise View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className={`${currentExercise?.color} text-white p-8`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {currentExercise && <currentExercise.icon className="w-8 h-8" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentExercise?.title}</h2>
                  <p className="text-white/90">{currentExercise?.description}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveExercise(null)}
                className="text-white/80 hover:text-white text-sm"
              >
                Back to exercises
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Timer */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-gray-900 mb-4">
                {formatTime(timeRemaining)}
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                  onClick={togglePlayPause}
                  className={`p-4 rounded-full text-white transition-colors ${
                    isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>

              {/* Duration Selection */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <span className="text-sm text-gray-600">Duration:</span>
                {[60, 180, 300, 600].map(duration => (
                  <button
                    key={duration}
                    onClick={() => {
                      setSelectedDuration(duration);
                      if (!isPlaying) setTimeRemaining(duration);
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedDuration === duration
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {duration < 60 ? `${duration}s` : `${duration / 60}m`}
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${currentExercise?.color}`}
                  style={{
                    width: `${((selectedDuration - timeRemaining) / selectedDuration) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
              <ul className="space-y-3">
                {currentExercise?.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Exercise Selection */
        <div className="grid md:grid-cols-2 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => startExercise(exercise.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 ${exercise.color} rounded-xl`}>
                  <exercise.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {exercise.description}
                  </p>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                    <Play className="w-4 h-4" />
                    <span>Start Exercise</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      {!activeExercise && (
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mindfulness Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best Times to Practice</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Morning to start your day calmly</li>
                <li>• Before stressful situations</li>
                <li>• During study breaks</li>
                <li>• Before bedtime to unwind</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Creating the Right Environment</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Find a quiet, comfortable space</li>
                <li>• Turn off distracting devices</li>
                <li>• Use soft lighting or natural light</li>
                <li>• Consider calming background sounds</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindfulnessPage;