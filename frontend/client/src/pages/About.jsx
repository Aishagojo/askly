import React from 'react';

const About = () => (
  <div className="min-h-screen bg-white py-16 px-4">
    <div className="max-w-2xl mx-auto text-center">
      <img src="/undraw_team_spirit.svg" alt="Team spirit" className="w-40 h-40 mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">About Askly</h1>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Our Mission:</strong> To make mental health support accessible, private, and available 24/7 for everyone.
      </p>
      <p className="text-gray-600 mb-6">
        Askly was founded by Aisha Omar Farah, inspired by the need for compassionate, judgment-free mental wellness support for students and young adults. Our team is passionate about using technology to break down barriers to mental health care.
      </p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Our Values</h2>
        <ul className="text-gray-600 list-disc list-inside">
          <li>Empathy and compassion in every interaction</li>
          <li>Complete privacy and data security</li>
          <li>Accessible support anytime, anywhere</li>
          <li>Encouraging self-care and emotional growth</li>
        </ul>
      </div>
      <p className="text-gray-600">
        Askly is not a replacement for professional therapy, but a companion to help you manage stress, track your mood, and find support when you need it most.
      </p>
    </div>
  </div>
);

export default About;
