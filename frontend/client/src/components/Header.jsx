import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogIn, MessageCircle, BookOpen, Flower, Shield, BarChart3, Cog } from 'lucide-react';
import { useAuth } from  '../contexts/AuthContext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicNavigationItems = [
    { path: '/', label: 'Home', icon: Heart },
  ];

  // Show more features after login
  const privateNavigationItems = [
    { path: '/chat', label: 'Chatbot', icon: MessageCircle },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/mood', label: 'Mood Tracker', icon: BarChart3 },
    { path: '/mindfulness', label: 'Mindfulness', icon: Flower },
    { path: '/resources', label: 'Resources', icon: Shield },
  ];

  const navigationItems = user ? privateNavigationItems : publicNavigationItems;

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const authItems = user
    ? [
        {
          label: user.displayName?.split(' ')[0]?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '',
          icon: null,
          onClick: handleLogout,
          isButton: true,
        },
      ]
    : [
        {
          path: '/login',
          label: 'Login',
          icon: LogIn,
        },
      ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white/90 backdrop-blur-md'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Askly</span>
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
            {authItems.map(({ path, label, icon: Icon, onClick, isButton }) =>
              isButton ? (
                <div className="relative">
                  <button
                    key={label}
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="flex items-center justify-center w-12 h-10 p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-2xl shadow-md hover:scale-105 transition-transform border-2 border-white"
                    title="Account"
                  >
                    {label}
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">
                      <button
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-t-xl"
                        onClick={() => { setShowMenu(false); /* open settings modal here */ }}
                      >
                        <Cog className="w-4 h-4 mr-2 text-indigo-500" />
                        Settings
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl"
                        onClick={() => { setShowMenu(false); onClick(); }}
                      >
                        <span className="font-bold mr-2">⎋</span>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-sm">{label}</span>
                </Link>
              )
            )}
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
              {[...navigationItems, ...authItems].map(({ path, label, icon: Icon, onClick, isButton }) =>
                isButton ? (
                  <button
                    key={label}
                    onClick={() => {
                      setIsMenuOpen(false);
                      onClick();
                    }}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-colors"
                    title="Logout"
                  >
                    {label}
                  </button>
                ) : (
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
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
