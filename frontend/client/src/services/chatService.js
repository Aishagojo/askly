// Mock AI service for demonstration
// In production, this would integrate with OpenAI GPT or similar service

const responseTemplates = {
  greeting: [
    "Hello! I'm here to listen and support you. How are you feeling today?",
    "Hi there! Thank you for reaching out. What would you like to talk about?",
    "Welcome! I'm glad you're here. What's on your mind?"
  ],
  stress: [
    "I understand you're feeling stressed. That's completely normal, especially during university. Let's explore some ways to manage this together. What specifically is causing you the most stress right now?",
    "Stress can feel overwhelming, but you're taking a positive step by talking about it. Can you tell me more about what's been weighing on your mind?",
    "I hear that you're stressed. It takes courage to acknowledge these feelings. What would help you feel more at ease right now?"
  ],
  anxiety: [
    "Anxiety can be really challenging to deal with. You're not alone in feeling this way. Let's work through this together. What situations tend to trigger your anxiety the most?",
    "Thank you for sharing that with me. Anxiety affects many students, and it's okay to feel this way. What physical sensations do you notice when you feel anxious?",
    "I want you to know that your feelings are valid. Anxiety can be managed with the right tools and support. Have you tried any breathing exercises before?"
  ],
  sadness: [
    "I'm sorry you're feeling this way. It's important to acknowledge these feelings rather than pushing them away. What's been contributing to your sadness lately?",
    "Thank you for trusting me with your feelings. Sadness is a natural human emotion, and it's okay to feel this way. You don't have to go through this alone.",
    "I hear that you're going through a difficult time. It's brave of you to reach out. What would comfort you most right now?"
  ],
  support: [
    "I'm here for you, and you don't have to face this alone. Sometimes just talking about our feelings can help lighten the load. What feels most important to share right now?",
    "Thank you for trusting me. I want you to know that seeking support shows strength, not weakness. How can I best support you today?",
    "I'm glad you reached out. Remember, it's okay to not be okay sometimes. What kind of support would be most helpful for you right now?"
  ],
  general: [
    "I appreciate you sharing that with me. Can you tell me more about how you've been feeling?",
    "That sounds like it could be challenging. How has this been affecting your daily life?",
    "Thank you for opening up. What would you like to explore or work through together?"
  ]
};

const keywords = {
  greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
  stress: ['stress', 'stressed', 'pressure', 'overwhelmed', 'busy', 'deadline', 'exam', 'test'],
  anxiety: ['anxiety', 'anxious', 'worried', 'nervous', 'panic', 'fear', 'scared'],
  sadness: ['sad', 'depressed', 'down', 'upset', 'crying', 'tears', 'lonely', 'hurt'],
  support: ['help', 'support', 'talk', 'listen', 'need someone', 'alone']
};

export const chatService = {
  getResponse: async (message, mood) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const lowerMessage = message.toLowerCase();
    
    // Determine response category based on keywords
    let category = 'general';
    
    for (const [key, wordList] of Object.entries(keywords)) {
      if (wordList.some(keyword => lowerMessage.includes(keyword))) {
        category = key;
        break;
      }
    }

    // Use mood to influence response if provided
    if (mood && mood !== 'neutral') {
      if (mood === 'sad') category = 'sadness';
      if (mood === 'anxious') category = 'anxiety';
      if (mood === 'happy') category = 'support';
    }

    // Get random response from category
    const responses = responseTemplates[category] || responseTemplates.general;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return randomResponse;
  }
};