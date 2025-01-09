import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./ChatBot.css"
import { TypeAnimation } from 'react-type-animation';

const Chatbot = ({user}) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponses, setChatResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedMessages, setAnimatedMessages] = useState(new Set());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatResponses]);

  useEffect(() => {
    // Send welcome message when chat becomes visible
    if (chatVisible && chatResponses.length === 0) {
      const welcomeMessage = {
        user: "",
        bot: `Hello! 👋 Welcome to Rail Madad Chat Support. How may I assist you today? Please describe your problem or concern.`,
        isTyping: true
      };
      setChatResponses([welcomeMessage]);
      // Focus input after chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Reduced timeout for faster focus
    }
  }, [chatVisible]);

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    setIsLoading(true);

    // Add user message immediately
    const userMessage = {
      user: chatInput,
      bot: null
    };
    setChatResponses(prev => [...prev, userMessage]);

    try {
      // Send the user message to the backend
      const response = await axios.post("http://localhost:8000/save", {
        message: chatInput,
        userId : user._id
      },{
        withCredentials: true,
      });
      
      // Delay bot response by 1 seconds
      setTimeout(() => {
        const newMessage = {
          user: chatInput,
          bot: response.data.answer,
          isTyping: true,
          messageId: Date.now() // Add unique ID for tracking animation state
        };
        setChatResponses(prev => [...prev.slice(0, -1), newMessage]);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error sending message to backend:", error);
      setTimeout(() => {
        const errorMessage = {
          user: chatInput,
          bot: "Sorry, I encountered an error. Please try again.",
          isTyping: true,
          messageId: Date.now()
        };
        setChatResponses(prev => [...prev.slice(0, -1), errorMessage]);
        setIsLoading(false);
      }, 1000);
    }

    setChatInput("");
  };

  return (
    <>
      {chatVisible ? (
        <section className="chatbot fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-100 animate-slideUp transition-all duration-500 transform scale-100 opacity-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Chatbot</h3>
            <button 
              onClick={() => setChatVisible(false)} 
              className="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 text-1xl flex items-center justify-center leading-none"
            >
              X
            </button>
          </div>
          <div className="chatbox-messages overflow-y-auto h-100 mb-4">
            {chatResponses.map((response, index) => (
              <div key={index} className="mb-4">
                {response.user && (
                  <div className="flex justify-end">
                    <div className="bg-blue-100 p-2 rounded-lg max-w-[80%]">
                      <p className="text-sm font-semibold">You:</p>
                      <p>{response.user}</p>
                    </div>
                  </div>
                )}
                {response.bot && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 p-2 rounded-lg mt-2 max-w-[80%]">
                      <p className="text-sm font-semibold">Bot:</p>
                      {response.isTyping && !animatedMessages.has(response.messageId) ? (
                        <TypeAnimation
                          sequence={[
                            response.bot,
                            () => {
                              setAnimatedMessages(prev => new Set([...prev, response.messageId]))
                            }
                          ]}
                          wrapper="p"
                          speed={80}
                          cursor={false}
                        />
                      ) : (
                        <p>{response.bot}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 p-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleChatSubmit} className="flex mt-11">
            <input
              ref={inputRef}
              type="text"
              value={chatInput}
              onChange={handleChatInputChange}
              placeholder="Ask me anything..."
              className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Send</button>
          </form>
        </section>
      ) : (
        <button
          onClick={() => setChatVisible(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center w-16 h-16 hover:scale-110 transition-transform duration-300"
        >
          <img 
            src="images/chat.png" 
            alt="Chat"
            className="w-14 h-14 animate-pulse"
          />
        </button>
      )}
    </>
  );
};

export default Chatbot;
