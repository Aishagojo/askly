import React, { useState } from 'react';
import { Calendar, TrendingUp, Smile, Frown, Meh, AlertTriangle, Heart, Plus } from 'lucide-react';
import { useMood } from '../contexts/MoodContext';

const MoodTracker = () => {
  const { entries, addEntry } = useMood();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [showAddEntry, setShowAddEntry] = useState(false);

  const moods = [
    { value: 5, label: 'Excellent', icon: Heart, color: 'text-green-500', bg: 'bg-green-100' },
    { value: 4, label: 'Good', icon: Smile, color: 'text-blue-500', bg: 'bg-blue-100' },
    { value: 3, label: 'Okay', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { value: 2, label: 'Not Great', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-100' },
    { value: 1, label: 'Difficult', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' }
  ];

  const handleSubmit = () => {
    if (selectedMood === null) return;

    const entry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note,
      date: new Date()
    };

    addEntry(entry);
    setSelectedMood(null);
    setNote('');
    setShowAddEntry(false);
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / entries.length).toFixed(1);
  };

  const getWeeklyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    }).reverse();

    return last7Days.map(dateString => {
      const dayEntries = entries.filter(entry => entry.date.toDateString() === dateString);
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length 
        : 0;
      
      return {
        date: dateString,
        mood: avgMood,
        count: dayEntries.length
      };
    });
  };

  const weeklyData = getWeeklyData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mood Tracker</h1>
              <p className="text-gray-600">Monitor your emotional well-being over time</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddEntry(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Log Mood</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-medium text-gray-600">Average Mood</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{getAverageMood()}/5</div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Total Entries</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{entries.length}</div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">This Week</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {weeklyData.filter(d => d.count > 0).length} days
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Mood Trend</h3>
        <div className="h-48 flex items-end justify-between space-x-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '160px' }}>
                {day.mood > 0 && (
                  <div
                    className="w-full bg-gradient-to-t from-orange-500 to-pink-500 rounded-t-lg absolute bottom-0"
                    style={{ height: `${(day.mood / 5) * 100}%` }}
                  ></div>
                )}
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                {new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">How are you feeling?</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                        selectedMood === mood.value
                          ? `border-orange-500 ${mood.bg}`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <mood.icon className={`w-6 h-6 ${mood.color}`} />
                      <span className="font-medium text-gray-900">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note (optional):
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's affecting your mood today?"
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddEntry(false);
                    setSelectedMood(null);
                    setNote('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedMood === null}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
        
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No mood entries yet</p>
            <button
              onClick={() => setShowAddEntry(true)}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Log Your First Mood
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.slice(0, 5).map((entry) => {
              const mood = moods.find(m => m.value === entry.mood);
              return (
                <div key={entry.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${mood?.bg}`}>
                    {mood && <mood.icon className={`w-5 h-5 ${mood.color}`} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{mood?.label}</span>
                      <span className="text-sm text-gray-500">
                        {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;