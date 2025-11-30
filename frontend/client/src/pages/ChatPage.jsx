import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Frown, Meh, AlertTriangle, Heart } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { chatService } from '../services/chatService';
import { useAuth } from '../contexts/AuthContext';

const ChatPage = () => {
  const { user } = useAuth();
  const { messages, addMessage, clearMessages } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const messagesEndRef = useRef(null);

  const moods = [
    { value: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { value: 'sad', icon: Frown, label: 'Sad', color: 'text-blue-500' },
    { value: 'anxious', icon: AlertTriangle, label: 'Anxious', color: 'text-red-500' }
  ];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  } 


  // Show welcome message on first load
  useEffect(() => {
    // Clear messages when user changes (login/logout)
    clearMessages();
    if (user) {
      addMessage({
        id: 'welcome',
        text: `Welcome! I'm Askly, your AI therapist. How are you feeling today? Please select your mood above so I can support you better.`,
        sender: 'ai',
        timestamp: new Date()
      });
    }
  }, [user]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get AI response, pass selectedMood for personalization
      let moodText = '';
      if (selectedMood === 'happy') moodText = "I'm glad to hear you're feeling happy!";
      else if (selectedMood === 'neutral') moodText = "Thank you for sharing. I'm here to listen, whatever you're feeling.";
      else if (selectedMood === 'sad') moodText = "I'm sorry you're feeling sad. I'm here for you—would you like to talk about it?";
      else if (selectedMood === 'anxious') moodText = "Feeling anxious can be tough. Let's take a deep breath together. How can I help?";
      const aiResponse = await chatService.getResponse(inputMessage, user?.uid || user?.id || 'anonymous', selectedMood);
      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: (moodText ? moodText + '\n\n' : '') + aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        addMessage(aiMessage);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to format AI messages with lists and line breaks
  function formatMessage(text) {
    // Convert numbered lists
    text = text.replace(/(\d+)\.\s\*\*(.+?)\*\*:/g, '<li><strong>$2:</strong>');
    // Convert bullets
    text = text.replace(/\n-\s(.+)/g, '<li>$1</li>');
    // Wrap lists in <ul> if any <li> found
    if (text.includes('<li>')) {
      text = text.replace(/(<li>.*?<\/li>)+/gs, match => `<ul class='list-disc pl-5 mb-2'>${match}</ul>`);
    }
    // Replace double newlines with paragraph breaks
    text = text.replace(/\n\n/g, '<br/><br/>');
    // Replace single newlines with line breaks
    text = text.replace(/\n/g, '<br/>');
    return text;
  }

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-teal-50 py-4">
      <div className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border border-gray-100 bg-white/90 backdrop-blur-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 rounded-t-3xl px-8 py-6 flex items-center gap-4 border-b border-gray-200">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Chat with Askly</h1>
            <p className="text-indigo-100 text-base">Your supportive AI companion</p>
          </div>
        </div>
        {/* Mood Selector */}
        <div className="flex items-center gap-2 px-8 py-3 bg-white border-b border-gray-100">
          <span className="text-sm text-gray-500 mr-2">How are you feeling?</span>
          {moods.map(({ value, icon: Icon, label, color }) => (
            <button
              key={value}
              onClick={() => setSelectedMood(value)}
              className={`p-2 rounded-full border-2 transition-all duration-150 ${
                selectedMood === value
                  ? 'border-blue-500 bg-blue-100 scale-110 shadow'
                  : 'border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300'
              }`}
              title={label}
            >
              <Icon className={`w-6 h-6 ${selectedMood === value ? color : 'text-gray-400'}`} />
            </button>
          ))}
        </div>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-white">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex items-end mr-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    A
                  </div>
                </div>
              )}
              <div
                className={`max-w-xs sm:max-w-md px-5 py-3 rounded-2xl shadow-lg text-base font-medium ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-indigo-50 text-indigo-900 rounded-bl-none'
                }`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {msg.sender === 'ai' ? (
                  <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                ) : (
                  msg.text
                )}
                <div className="text-[10px] text-gray-400 mt-2 text-right">
                  {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {msg.sender === 'user' && (
                <div className="flex items-end ml-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-gray-700 font-bold shadow-lg">
                    U
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg mr-3">A</div>
              <div className="max-w-xs sm:max-w-md px-5 py-3 rounded-2xl shadow-lg text-base bg-indigo-50 text-indigo-900 rounded-bl-none animate-pulse">
                Askly is typing...
              </div>
            </div>
          )}
        </div>
        {/* Message Input */}
        <div className="border-t border-blue-200 px-8 py-3 bg-white/95 shadow-inner">
          <form className="flex items-center gap-3" onSubmit={e => { e.preventDefault(); handleSendMessage(); }}>
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-5 py-3 border-2 border-blue-400 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base shadow bg-white"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '100px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
              aria-label="Send message"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;