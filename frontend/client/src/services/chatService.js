// frontend/services/chatService.js

export const chatService = {
  getResponse: async (message, mood = '') => {
    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, mood }) // You can include mood too!
      });

      const data = await res.json();
      return data.reply; // this is the message from OpenAI via backend
    } catch (error) {
      console.error("❌ Error getting response from backend:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  }
};
