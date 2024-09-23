import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  async function generateAnswer() {
    setAnswer("loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCPgGA3R00uvZmPCB1Jgkwe3txHD-_8WXY",
      method: "post",
      data: {
        contents: [
          { parts: [{ text: question }] },
        ],
      },
    });

    setAnswer(response.data.candidates[0].content.parts[0].text);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer)
      .then(() => {
        alert("Answer copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="chat-container">
      <h1 className='title'>AskMe AI</h1>
      <div className="chat-box">
        <div className="messages">
          {answer && <div className="message response">{answer}</div>}
        </div>
        <textarea 
              placeholder='Hello, Ask something!'
              className='text-area'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Mencegah textarea membuat baris baru
                  generateAnswer(); // Panggil fungsi untuk mengirim pertanyaan
                }
              }}
              cols="30"
              rows="3"
        />
        <div className="button-container">
          <button className='btn-generate' onClick={generateAnswer}>Generate Answer</button>
          {answer && (
            <button className='btn-generate' onClick={copyToClipboard}>Copy Answer</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
