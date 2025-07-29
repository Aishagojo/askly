import React, { useState } from 'react';
import { Plus, Book, Calendar, Search, Trash2, Edit3 } from 'lucide-react';
import { useJournal } from '../contexts/JournalContext';

const JournalPage = () => {
  const { entries, addEntry, deleteEntry, updateEntry, loading, error } = useJournal();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newEntryContent, setNewEntryContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const prompts = [
    "What am I most grateful for today?",
    "What challenged me today and how did I handle it?",
    "What emotions did I experience today?",
    "What did I learn about myself today?",
    "What would I like to improve tomorrow?",
    "What made me smile today?",
    "How did I take care of my mental health today?",
    "What are three things that went well today?"
  ];

  const handleSaveEntry = async () => {
    if (!newEntryContent.trim()) return;
    
    try {
      await addEntry({
        content: newEntryContent,
        prompt: selectedPrompt
      });
      setNewEntryContent('');
      setSelectedPrompt('');
      setShowNewEntry(false);
    } catch (err) {
      alert("Failed to save entry. Please try again.");
    }
  };

  const handleUpdateEntry = async (id, content) => {
    try {
      await updateEntry(id, content);
      setEditingEntry(null);
    } catch (err) {
      alert("Failed to update entry. Please try again.");
    }
  };

  const filteredEntries = entries
    .filter(entry => 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.prompt && entry.prompt.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Personal Journal</h1>
              <p className="text-gray-600">Express your thoughts and reflect on your experiences</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowNewEntry(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            <Plus className="w-4 h-4" />
            <span>{loading ? "Processing..." : "New Entry"}</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search your entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{entries.length} entries</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && entries.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">Loading your journal entries...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredEntries.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No matching entries' : 'No entries yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try a different search term.' : 'Start by creating your first entry.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowNewEntry(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create First Entry
            </button>
          )}
        </div>
      )}

      {/* Journal Entries */}
      {!loading && filteredEntries.length > 0 && (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                    <span>{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {entry.prompt && (
                    <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 text-sm font-medium">{entry.prompt}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {editingEntry === entry.id ? (
                <div>
                  <textarea
                    defaultValue={entry.content}
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none mb-3"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingEntry(null)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const textarea = document.querySelector('textarea');
                        handleUpdateEntry(entry.id, textarea.value);
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Entry Modal */}
      {showNewEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Journal Entry</h2>
            </div>
            
            <div className="p-6">
              {/* Prompt Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a prompt (optional):
                </label>
                <select
                  value={selectedPrompt}
                  onChange={(e) => setSelectedPrompt(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="">Free writing - no prompt</option>
                  {prompts.map((prompt, index) => (
                    <option key={index} value={prompt}>{prompt}</option>
                  ))}
                </select>
              </div>

              {selectedPrompt && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">{selectedPrompt}</p>
                </div>
              )}

              <div className="mb-6">
                <textarea
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                  placeholder="Start writing your thoughts..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowNewEntry(false);
                    setNewEntryContent('');
                    setSelectedPrompt('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEntry}
                  disabled={!newEntryContent.trim() || loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Saving..." : "Save Entry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalPage;