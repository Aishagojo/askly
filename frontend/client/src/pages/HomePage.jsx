import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, Flower, Shield, BarChart3, ArrowRight, Heart } from 'lucide-react';

const features = [
	{
		icon: MessageCircle,
		title: 'AI Chat Support',
		description: 'Get instant, judgment-free support from our AI therapist. Askly listens, understands, and guides you with empathy—anytime, anywhere.',
		benefit: '24/7 private, supportive conversations.',
	},
	{
		icon: BarChart3,
		title: 'Mood Tracking',
		description: 'Monitor your emotional well-being and discover patterns over time. Visualize your progress and take charge of your mental health.',
		benefit: 'See your growth and trends at a glance.',
	},
	{
		icon: BookOpen,
		title: 'Personal Journal',
		description: 'Express your thoughts and feelings in a secure, private space. Guided prompts help you reflect and grow.',
		benefit: 'Journaling made easy and meaningful.',
	},
	{
		icon: Flower,
		title: 'Mindfulness Tools',
		description: 'Practice breathing, meditation, and grounding exercises designed to help you relax and refocus.',
		benefit: 'Reduce stress and boost calm in minutes.',
	},
	{
		icon: Shield,
		title: 'Resources',
		description: 'Access emergency contacts and curated mental health resources whenever you need extra support.',
		benefit: 'Help is always just a click away.',
	},
];

const sampleChat = [
	{ sender: 'user', text: 'I feel anxious and can’t sleep.' },
	{ sender: 'bot', text: 'I’m here for you. Can you tell me more about what’s on your mind?' },
	{ sender: 'user', text: 'I keep worrying about my future.' },
	{ sender: 'bot', text: 'That sounds tough. Let’s try a short breathing exercise together. Would you like to begin?' },
];

const testimonials = [
	{
		name: 'Fatima A.',
		text: 'Askly helped me feel heard and supported when I needed it most. The AI chat is so easy to talk to!',
		role: 'University Student',
	},
	{
		name: 'Mohamed S.',
		text: 'The journaling prompts are thoughtful and really helped me reflect on my feelings.',
		role: 'Young Professional',
	},
	{
		name: 'Layla H.',
		text: 'I love the privacy and 24/7 access. Askly is always there for me.',
		role: 'Recent Graduate',
	},
];

const HomePage = () => (
	<div className="bg-white flex flex-col justify-between w-full">
		{/* Hero Section - updated color scheme only, more height */}
		<section className="flex flex-col justify-center items-center py-40 bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-700 text-white w-full">
			<div className="max-w-7xl mx-auto px-8 text-center w-full">
				<div className="mb-8">
					<div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
						<Heart className="w-10 h-10 text-white animate-bounce" fill="currentColor" />
					</div>
					<h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight text-white">
						Askly: Your Mental Wellness{' '}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
							Companion
						</span>
					</h1>
					<p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
						Our mission: Make mental health support accessible, private, and available 24/7 for everyone. Askly is built on empathy, privacy, and the belief that everyone deserves support.
					</p>
					<Link
						to="/login"
						className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all group transform hover:-translate-y-1"
					>
						Get Started
						<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Link>
				</div>
			</div>
		</section>
		{/* About Section - unified color scheme, more height */}
		<section id="about" className="py-24 bg-blue-50 w-full">
			<div className="max-w-7xl mx-auto px-8 text-center w-full">
				<h2 className="text-4xl font-bold mb-4 text-blue-900 tracking-tight">About Askly</h2>
				<p className="text-xl text-blue-800 mb-4 font-medium">Your 24/7 AI-powered mental wellness companion private, empathetic, and always here for you.</p>
				<p className="text-lg text-gray-700 mb-2 max-w-2xl mx-auto">Askly offers instant support, guided journaling, mood tracking, and mindfulness tools in a secure, judgment-free space. Our mission is to make mental health support accessible and compassionate for everyone.</p>
			</div>
		</section>
		{/* Features Section - unified color scheme, more height */}
		<section className="py-24 bg-blue-50 w-full">
			<div className="max-w-7xl mx-auto px-8 w-full">
				<h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">Features</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
					{features.map((feature, idx) => (
						<div
							key={idx}
							className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition-all"
						>
							<div className="p-4 rounded-xl mb-4 bg-gradient-to-br from-indigo-400 to-indigo-600">
								<feature.icon className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
							<p className="text-gray-600 text-center mb-2">{feature.description}</p>
							<span className="text-indigo-600 text-sm font-medium">{feature.benefit}</span>
						</div>
					))}
				</div>
			</div>
		</section>
		{/* How it works - Sample Chat Section - unified color scheme, more height */}
		<section className="py-20 bg-indigo-50">
			<div className="max-w-4xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">How Askly Works</h2>
				<div className="flex flex-col md:flex-row gap-10 items-center justify-center">
					{/* Chatbot Demo */}
					<div className="flex-1 bg-white rounded-2xl shadow p-6 mb-8 md:mb-0">
						<h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
							<MessageCircle className="w-5 h-5 mr-2" /> Chat with Askly
						</h3>
						<div className="space-y-3">
							{sampleChat.map((msg, idx) => (
								<div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
									<div
										className={`rounded-xl px-4 py-2 max-w-xs ${
											msg.sender === 'user'
												? 'bg-indigo-100 text-indigo-900'
												: 'bg-indigo-600 text-white'
										} text-sm shadow`}
									>
										{msg.text}
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Features Preview */}
					<div className="flex-1 bg-white rounded-2xl shadow p-6">
						<h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
							<BookOpen className="w-5 h-5 mr-2" /> Guided Journal
						</h3>
						<div className="bg-gray-100 rounded-xl p-4 text-left">
							<div className="text-xs text-gray-500 mb-1">Today’s Prompt</div>
							<div className="font-medium text-gray-700 mb-2">What’s one thing you’re grateful for today?</div>
							<div className="text-gray-800 italic">“I’m grateful for my supportive friend who checked in on me.”</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		{/* Testimonials Section - unified color scheme, more height */}
		<section className="py-24 bg-white">
			<div className="max-w-5xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">What Our Users Say</h2>
				<div className="grid md:grid-cols-3 gap-10">
					{testimonials.map((t, idx) => (
						<div key={idx} className="bg-white border border-indigo-100 rounded-2xl shadow p-8 flex flex-col items-center">
							<div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center mb-4">
								<span className="text-2xl font-bold text-indigo-700">{t.name[0]}</span>
							</div>
							<p className="text-gray-700 italic mb-4">“{t.text}”</p>
							<span className="text-indigo-600 font-semibold">{t.name}</span>
							<span className="text-indigo-400 text-sm">{t.role}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	</div>
);

export default HomePage;