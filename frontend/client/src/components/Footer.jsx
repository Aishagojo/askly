import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-teal-800 text-white py-5 border-t border-indigo-900/30 mt-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
      <span className="font-extrabold text-4xl tracking-tight mb-2 drop-shadow-lg">Askly</span>
      <span className="text-lg text-blue-100 mb-2">Empowering your mental wellness journey with privacy, empathy, and 24/7 support.</span>
      <div className="flex gap-6 items-center mb-2">
        <a href="https://github.com/aisha-lul/askly-chatbot" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-transform scale-100 hover:scale-110">
          <Github className="w-8 h-8" />
        </a>
        <a href="https://linkedin.com/in/aisha-omar-farah" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-transform scale-100 hover:scale-110">
          <Linkedin className="w-8 h-8" />
        </a>
        <a href="mailto:hello@askly.com" className="hover:text-yellow-300 transition-transform scale-100 hover:scale-110">
          <Mail className="w-8 h-8" />
        </a>
      </div>
      <span className="text-xs text-blue-200 mt-2">&copy; {new Date().getFullYear()} Askly. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
