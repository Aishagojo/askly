import React from 'react';
import { Phone, MessageSquare, Globe, MapPin, Clock, AlertTriangle, Heart, Users } from 'lucide-react';

const ResourcesPage = () => {
  const emergencyContacts = [
    {
      name: 'Kenya National Crisis Helpline',
      phone: '1195',
      description: '24/7 mental health crisis support',
      type: 'emergency'
    },
    {
      name: 'Befrienders Kenya',
      phone: '+254 722 178 177',
      description: 'Suicide prevention and emotional support',
      type: 'crisis'
    },
    {
      name: 'Chiromo Lane Medical Centre',
      phone: '+254 20 272 6320',
      description: 'Professional mental health services',
      type: 'professional'
    }
  ];

  const onlineResources = [
    {
      title: 'World Health Organization Mental Health',
      url: 'https://www.who.int/mental_health',
      description: 'Global mental health information and resources',
      icon: Globe
    },
    {
      title: 'Mental Health Kenya',
      url: 'https://mentalhealthkenya.org',
      description: 'Local mental health advocacy and support',
      icon: Heart
    },
    {
      title: 'Crisis Text Line',
      url: 'https://www.crisistextline.org',
      description: 'Text-based crisis counseling service',
      icon: MessageSquare
    }
  ];

  const universityResources = [
    {
      title: 'KEMU Counseling Services',
      location: 'Student Affairs Office, Administration Block',
      hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
      contact: '+254 724 256162',
      description: 'Free counseling services for KEMU students'
    },
    {
      title: 'Student Health Center',
      location: 'Campus Health Facility',
      hours: 'Monday - Friday: 8:00 AM - 4:00 PM',
      contact: '+254 67 52909 ext. 204',
      description: 'Medical and basic mental health support'
    },
    {
      title: 'Peer Support Groups',
      location: 'Various campus locations',
      hours: 'Weekly meetings - Check student portal',
      contact: 'student.affairs@kemu.ac.ke',
      description: 'Student-led support groups for various challenges'
    }
  ];

  const selfCareStrategies = [
    {
      title: 'Maintain Regular Sleep',
      description: 'Aim for 7-9 hours of sleep per night with a consistent schedule',
      icon: Clock
    },
    {
      title: 'Stay Physically Active',
      description: 'Regular exercise can significantly improve mood and reduce anxiety',
      icon: Heart
    },
    {
      title: 'Connect with Others',
      description: 'Maintain relationships with friends, family, and supportive communities',
      icon: Users
    },
    {
      title: 'Practice Mindfulness',
      description: 'Use meditation, breathing exercises, or other mindfulness techniques',
      icon: Heart
    }
  ];

  const warningSignsData = [
    'Persistent feelings of sadness or hopelessness lasting more than two weeks',
    'Significant changes in appetite or sleep patterns',
    'Difficulty concentrating on academic work or daily tasks',
    'Withdrawal from friends, family, or activities you once enjoyed',
    'Increased use of alcohol or substances as coping mechanisms',
    'Thoughts of self-harm or suicide',
    'Extreme mood swings or irritability',
    'Physical symptoms without clear medical cause (headaches, stomachaches)'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mental Health Resources</h1>
            <p className="text-gray-600">Emergency contacts, support services, and self-care information</p>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Crisis Support - Available 24/7</h2>
        </div>
        <p className="text-red-100 mb-4">
          If you're experiencing a mental health emergency or having thoughts of self-harm, please reach out immediately.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="tel:1195"
            className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <div>
              <div className="font-semibold">Kenya Crisis Helpline</div>
              <div className="text-red-100">1195 - Free, 24/7</div>
            </div>
          </a>
          <a
            href="tel:+254722178177"
            className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <div>
              <div className="font-semibold">Befrienders Kenya</div>
              <div className="text-red-100">+254 722 178 177</div>
            </div>
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-500" />
            Emergency & Crisis Contacts
          </h3>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{contact.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* University Resources */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-500" />
            KEMU Campus Resources
          </h3>
          <div className="space-y-4">
            {universityResources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{resource.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{resource.contact}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Online Resources */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-500" />
          Online Resources & Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {onlineResources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-2">
                <resource.icon className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold text-gray-900">{resource.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
          When to Seek Professional Help
        </h3>
        <p className="text-gray-600 mb-4">
          It's important to recognize when you might benefit from professional mental health support. Consider reaching out if you experience:
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {warningSignsData.map((sign, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{sign}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Care Strategies */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-pink-500" />
          Self-Care & Wellness Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {selfCareStrategies.map((strategy, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-pink-50 rounded-lg">
              <strategy.icon className="w-5 h-5 text-pink-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{strategy.title}</h4>
                <p className="text-sm text-gray-600">{strategy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Important Disclaimer</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Askly is designed to provide supportive conversations and mental wellness tools, but it is not a substitute for professional mental health treatment. 
              If you're experiencing severe mental health symptoms, crisis situations, or thoughts of self-harm, please contact emergency services or a mental health professional immediately. 
              The resources listed above are provided for informational purposes and do not constitute medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;