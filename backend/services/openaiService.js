// openaiService.js
// Service to interact with OpenAI API for chatbot responses

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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',
});

async function getChatbotResponse(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 150,
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Sorry, I am having trouble responding right now.';
  }
}

module.exports = { getChatbotResponse };
