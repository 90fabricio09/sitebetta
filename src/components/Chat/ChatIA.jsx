import SendIcon from '@mui/icons-material/Send';
import { useState, useRef, useEffect } from "react";
import useCreateChat from "../../hooks/useCreateChat";
import { HashLoader } from "react-spinners";
import Markdown from 'react-markdown';
import botImage from '../../assets/bettina.jpg';
import userImage from '../../assets/usuario.png';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); 
  const messagesEndRef = useRef(null);
  const { sendMessage, messages, loading } = useCreateChat();
  const botName = 'Bettina';
  const userName = 'Você';

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
    setIsTyping(true); 
  };

  useEffect(() => {
    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  useEffect(() => {
    const title = "Em que posso ajudar?";
    let index = 0;
    const typingSpeed = 70;

    function typeTitle() {
      const titleElement = document.getElementById("typed-title"); // Verifica se o elemento existe
      if (titleElement && index < title.length) {
        titleElement.innerHTML = title.substring(0, index + 1);
        index++;
        setTimeout(typeTitle, typingSpeed);
      }
    }

    const titleElement = document.getElementById("typed-title");
    if (titleElement) {
      titleElement.innerHTML = ""; 
      typeTitle();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span id="typed-title"></span>
      </div>
      <div className="chat-box">
        <ul className="messages">
          {messages && messages.map((msg, index) => {
            if (index > 0) {
              const isUser = msg.role === "user";
              const messageClass = isUser ? "message message-user" : "message message-bot";

              return (
                <li key={index} className={messageClass}>
                  <img
                    src={isUser ? userImage : botImage}
                    alt={isUser ? "User" : "Bot"}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <strong>{isUser ? userName : botName}:</strong> 
                    <Markdown>{msg.parts[0].text}</Markdown>
                  </div>
                </li>
              );
            }
            return null;
          })}
          {loading && (
            <li className="loading">
              <HashLoader color="#0084ff" />
            </li>
          )}
          <div ref={messagesEndRef} />
        </ul>
      </div>
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Digite sua mensagem"
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Chat;
