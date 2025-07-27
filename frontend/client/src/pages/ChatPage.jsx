import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Frown, Meh, AlertTriangle, Heart } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { chatService } from '../services/chatService';

const ChatPage = () => {
  const { messages, addMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      // Get AI response
      const aiResponse = await chatService.getResponse(inputMessage, selectedMood);
      
      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        addMessage(aiMessage);
        setIsTyping(false);
      }, 1000); // Simulate typing delay
    } catch (error) {
      setIsTyping(false);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      addMessage(errorMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const moods = [
    { value: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { value: 'sad', icon: Frown, label: 'Sad', color: 'text-blue-500' },
    { value: 'anxious', icon: AlertTriangle, label: 'Anxious', color: 'text-red-500' }
  ];

  const quickPrompts = [
    "I'm feeling stressed about exams",
    "I need someone to talk to",
    "Can you help me with anxiety?",
    "I'm having trouble sleeping"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chat with Askly</h1>
              <p className="text-gray-600">Your supportive AI companion</p>
            </div>
          </div>
          
          {/* Mood Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 mr-2">How are you feeling?</span>
            {moods.map(({ value, icon: Icon, label, color }) => (
              <button
                key={value}
                onClick={() => setSelectedMood(value)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedMood === value
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title={label}
              >
                <Icon className={`w-5 h-5 ${selectedMood === value ? color : ''}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Askly!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                I'm here to listen and support you. Feel free to share what's on your mind or try one of these prompts:
              </p>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(prompt)}
                    className="block w-full max-w-sm mx-auto px-4 py-2 text-left bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;