import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import JournalPage from './pages/JournalPage';
import MindfulnessPage from './pages/MindfulnessPage';
import ResourcesPage from './pages/ResourcePage';
import MoodTracker from './pages/MoodTracker';
import Signup from './pages/Signup'; // Add signup/login pages if needed
import Login from './pages/Login';
import { ChatProvider } from './contexts/ChatContext';
import { JournalProvider } from './contexts/JournalContext';
import { MoodProvider } from './contexts/MoodContext';
import { AuthProvider } from './contexts/AuthContext'; // ✅ Add this import
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Askly...</h2>
          <p className="text-gray-500 mt-2">Preparing your mental wellness companion</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <ChatProvider>
        <JournalProvider>
          <MoodProvider>
            <Router>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
                <Header />
                <main className="pt-16 flex-1 w-full flex flex-col items-center justify-center">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/mindfulness" element={<MindfulnessPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/mood" element={<MoodTracker />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </MoodProvider>
        </JournalProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
