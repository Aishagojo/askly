// frontend/services/chatService.js

export const chatService = {
  getResponse: async (message, userId) => {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, userId })
      });

      const data = await res.json();
      return data.response; // this is the message from OpenAI via backend
    } catch (error) {
      console.error("❌ Error getting response from backend:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  }
};
