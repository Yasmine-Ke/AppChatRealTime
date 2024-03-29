import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.io');
    });

    socket.on('message', (data) => {
      console.log('Message received from server:', data);
      setMessages([...messages, data]);
      setMessageStatus('Message received from server');
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);
/*
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.elements.message.value;
    const chatId = e.target.elements.chat.value; // Récupérer l'ID du chat
   
    const socket = io('http://localhost:5000');

    console.log('Socket connected:', socket.connected);

    socket.emit('message', { content, chatId, date: new Date(), heure: new Date().toLocaleTimeString() });

    const messageStatus = socket.connected ? 'Message sent' : 'Failed to send message';
    setMessageStatus(messageStatus);
    e.target.elements.message.value = '';
  };
*/
const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.message.value;
    const chatId = e.target.elements.chat.value;
  
    try {
      // Envoi du message au serveur via socket
      const socket = io('http://localhost:5000');
      socket.emit('message', { content, chatId });
  
      // Envoi du message au serveur via une requête HTTP POST
      const response = await fetch('/Message/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content , chatId }),
   
      });
  
      if (!response.ok) {
        throw new Error('Failed to add message to database');
      }
  
      // Continuer avec la logique de mise à jour de l'interface utilisateur, si nécessaire
    } catch (error) {
      console.error('Error adding message to database:', error.message);
      // Gérer l'erreur, afficher un message à l'utilisateur, etc.
    }
  };
  
  return (
    <div>
      <h1>Chat Room</h1>
      {messageStatus && <p>{messageStatus}</p>}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.content}</p>
            <p>{message.date}- {message.heure}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" placeholder="Enter your message" />
        <input type="text" name="chat" placeholder="Enter chat ID" /> {/* Champ pour spécifier l'ID du chat */}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;


