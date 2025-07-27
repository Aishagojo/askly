import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, MessageCircle, BookOpen, Flower, Shield, BarChart3 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/mindfulness', label: 'Mindfulness', icon: Flower },
    { path: '/mood', label: 'Mood Tracker', icon: BarChart3 },
    { path: '/resources', label: 'Resources', icon: Shield },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white/90 backdrop-blur-md'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Askly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive(path)
                    ? 'text-indigo-700 bg-indigo-50/80'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(path) ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={2} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-fadeIn">
            <div className="px-2 py-3 space-y-1">
              {navigationItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                    isActive(path)
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive(path) ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;