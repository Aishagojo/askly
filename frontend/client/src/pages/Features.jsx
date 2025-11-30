import React from 'react';
import { MessageCircle, BookOpen, Flower, Shield, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Support',
    description: 'Chat with a compassionate AI therapist for immediate support and guidance.'
  },
  {
    icon: BarChart3,
    title: 'Mood Tracking',
    description: 'Monitor your emotional well-being and track patterns over time.'
  },
  {
    icon: BookOpen,
    title: 'Personal Journal',
    description: 'Express your thoughts and feelings through guided journaling exercises.'
  },
  {
    icon: Flower,
    title: 'Mindfulness Tools',
    description: 'Practice breathing exercises, meditation, and mindfulness techniques.'
  },
  {
    icon: Shield,
    title: 'Resources',
    description: 'Access emergency contacts and helpful mental health resources.'
  }
];

const Features = () => (
  <div className="min-h-screen bg-white py-16 px-4">
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">Features</h1>
      <p className="text-lg text-gray-600">Explore the tools Askly offers to support your mental wellness journey.</p>
    </div>
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start space-x-4 bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition-all">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600">
            <feature.icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
