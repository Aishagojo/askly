import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, Flower, Shield, BarChart3 } from 'lucide-react';


const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Support',
    description: 'Talk to our empathetic AI companion and get immediate support and guidance.',
    link: '/chat',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: BookOpen,
    title: 'Personal Journal',
    description: 'Express your thoughts and feelings through guided journaling exercises.',
    link: '/journal',
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    icon: Flower,
    title: 'Mindfulness Tools',
    description: 'Practice breathing exercises, meditation, and mindfulness techniques.',
    link: '/mindfulness',
    color: 'from-violet-400 to-violet-600'
  },
  {
    icon: BarChart3,
    title: 'Mood Tracking',
    description: 'Monitor your emotional well-being and track patterns over time.',
    link: '/mood',
    color: 'from-amber-400 to-amber-600'
  },
  {
    icon: Shield,
    title: 'Resources',
    description: 'Access emergency contacts and helpful mental health resources.',
    link: '/resources',
    color: 'from-indigo-400 to-indigo-600'
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
  <h2 className="text-2xl font-bold mb-2 text-indigo-700">Welcome, {user?.displayName?.split(' ')[0] || user?.email}!</h2>
        <p className="text-gray-700 mb-4">
          This is your Askly dashboard. Here you can access all the features designed to support your mental wellness journey:
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium mb-4"
        >
          Logout
        </button>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            to={feature.link}
            className="group p-6 bg-white rounded-xl shadow hover:shadow-xl border border-gray-100 transition-all flex flex-col items-start"
          >
            <div className={`p-4 rounded-xl mb-4 bg-gradient-to-br ${feature.color}`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <span className="text-indigo-600 font-medium mt-auto">Go to {feature.title} &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
