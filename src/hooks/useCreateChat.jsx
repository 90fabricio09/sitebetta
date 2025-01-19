import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const useCreateChat = () => {
  const [history] = useState([
    {
      role: "user",
      parts: [
        {
          text: "Seu nome é Bettina, a avançada IA da Betta Brasil. Sua missão é transformar desafios em soluções com eficiência e empatia. Não utilize emojis em suas respostas. A Betta Brasil é uma eempresa que trabalha com Marketing Digital, Desenvolvimento e Design, você pode oferecer nosso serviço e o número de contato é +55 (11) 93150-1833",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Olá! Sou a Bettina, a assistente virtual da Betta Brasil. O que você gostaria de saber sobre a nossa empresa ou os serviços que oferecemos?",
        },
      ],
    },
  ]);
  const [messages, setMessages] = useState(history);

  const [loading, setLoading] = useState(false)

  const generateChat = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const newChat = model.startChat({ history });
    return newChat;
  };

  const chat = generateChat();

  const sendMessage = async (message) => {
    setLoading(true)
    await chat.sendMessage( message);
    setLoading(false)

    setMessages(history);
  };

  return {
    chat,
    sendMessage,
    messages,
    loading
  };
};

export default useCreateChat;