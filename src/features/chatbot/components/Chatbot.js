import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'Pantry mate', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages([...messages, { from: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setMessages(msgs => [
        ...msgs,
        { from: 'Pantry mate', text: data.reply }
      ]);
    } catch {
      setMessages(msgs => [
        ...msgs,
        { from: 'Pantry mate', text: "Sorry, I couldn't process your request." }
      ]);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: 16,
      width: 320,
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'Pantry mate' ? 'left' : 'right', margin: '4px 0' }}>
            <b>{msg.from === 'Pantry mate' ? 'Pantry mate' : 'You'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        style={{ width: '70%', marginRight: 4 }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;