// Bridges browser speech recognition to Gemini
import { askGemini } from './gemini.js';

export function startListening(callback) {
  // Using Web Speech API; on some browsers `webkitSpeechRecognition` is prefixed
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = async (event) => {
    const input = event.results[0][0].transcript;
    const reply = await askGemini(input);
    callback(reply);
  };

  recognition.onerror = (err) => {
    console.error('Voice recognition error', err);
  };

  recognition.start();
}
