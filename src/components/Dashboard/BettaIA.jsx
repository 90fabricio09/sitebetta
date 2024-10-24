import SendIcon from '@mui/icons-material/Send';
import { useState, useRef, useEffect } from "react";
import useCreateChat from "../../hooks/useCreateChatBetta.jsx";
import { HashLoader } from "react-spinners";
import Markdown from 'react-markdown';
import botImage from '../../assets/bettaia.jpg';
import userImage from '../../assets/usuario.png';
import { auth } from '../../Firebase'; // Importar autenticação do Firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Usuário"); // Estado para armazenar o nome do usuário
  const messagesEndRef = useRef(null);
  const { sendMessage, messages, loading } = useCreateChat();
  const botName = 'Betta IA';

  // Função para buscar o nome do usuário logado
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.firstName || 'Usuário');
          } else {
            console.error('Nenhum documento encontrado para o usuário.');
          }
        } catch (err) {
          console.error('Erro ao buscar documento:', err);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message); // Enviar a mensagem
    setMessage(""); // Limpar o campo de mensagem
  };

  useEffect(() => {
    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight; // Rolar para baixo sempre que mensagens forem atualizadas
    }
  }, [messages, loading]);

  useEffect(() => {
    const title = "Em que posso ajudar?";
    let index = 0;
    const typingSpeed = 70;

    function typeTitle() {
      if (index < title.length) {
        document.getElementById("typed-title").innerHTML = title.substring(0, index + 1);
        index++;
        setTimeout(typeTitle, typingSpeed);
      }
    }

    document.getElementById("typed-title").innerHTML = "";
    typeTitle();
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
              const messageClass = isUser ? "message message-user" : "message message-bot-top";

              return (
                <li key={index} className={messageClass}>
                  <img 
                    src={isUser ? userImage : botImage} 
                    alt={isUser ? "User" : "Bot"} 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <div>
                    <strong>{isUser ? username : botName}:</strong> <Markdown>{msg.parts[0].text}</Markdown>
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
