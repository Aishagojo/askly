import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, Flower, Shield, BarChart3, ArrowRight, Heart, Users, Clock, Lock } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Support',
      description: 'Talk to our empathetic AI companion anytime, anywhere. Get immediate support and guidance.',
      link: '/chat',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Personal Journal',
      description: 'Express your thoughts and feelings through guided journaling exercises and prompts.',
      link: '/journal',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: Flower,
      title: 'Mindfulness Tools',
      description: 'Practice breathing exercises, meditation, and other mindfulness techniques.',
      link: '/mindfulness',
      color: 'from-violet-400 to-violet-600'
    },
    {
      icon: BarChart3,
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being and track patterns over time.',
      link: '/mood',
      color: 'from-amber-400 to-amber-600'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Support is available whenever you need it, day or night.',
      color: 'text-blue-500'
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      description: 'Your conversations and data are secure and confidential.',
      color: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Judgment-Free Zone',
      description: 'Express yourself freely without fear of judgment or stigma.',
      color: 'text-emerald-500'
    },
    {
      icon: Heart,
      title: 'Empathetic Care',
      description: 'Receive compassionate responses designed to support your well-being.',
      color: 'text-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Heart className="w-12 h-12 text-white animate-bounce" fill="currentColor" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Your Mental Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Companion</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Askly provides compassionate AI support, mindfulness tools, and emotional tracking - all designed to support your mental health journey.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all group transform hover:-translate-y-1"
              >
                <MessageCircle className="mr-3 w-5 h-5" />
                Start Chatting Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/30"
              >
                <Shield className="mr-3 w-5 h-5" />
                Emergency Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">Comprehensive</span> Toolkit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed with care to support every aspect of your mental wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-0" />
                <div className="relative z-10 flex items-start">
                  <div className={`p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      Explore feature
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Askly</span> Stands Out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is built on principles of accessibility, privacy, and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${benefit.color} bg-opacity-10`}>
                    <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Hope</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who've found support through Askly
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl shadow-inner">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold mr-4">
                A
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Alex M.</h4>
                <p className="text-sm text-gray-500">Askly user since 2025</p>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
              "Askly has been a game-changer for my anxiety. The AI understands when I'm struggling and offers exactly the right kind of support. It's like having a compassionate friend available anytime I need."
            </blockquote>
            <div className="flex mt-6 space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-12 h-12 text-white animate-pulse" fill="currentColor" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 mt-8">
            Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">Wellness</span> Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards better mental health. Askly is here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Start Free Chat
              <MessageCircle className="ml-3 w-5 h-5" />
            </Link>
            
          </div>
          <p className="mt-6 text-blue-100 text-sm">
            No credit card required • 100% private • Always here for you
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;