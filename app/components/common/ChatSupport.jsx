"use client";

import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";

const ChatSupport = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "support", text: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { from: "user", text: inputValue.trim() };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        role="button"
        className="hover:bg-gray-700 bg-academia-general duration-200 text-white p-3 rounded-full transition-opacity"
        onClick={toggleChat}
      >
        <AiOutlineMessage className="w-6 h-6" />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-8 bg-white shadow-lg rounded-lg w-80">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">AI Study paddy</h2>
            <div className="flex flex-col space-y-2 mb-4 max-h-64 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex  ${
                    message.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      message.from === "user"
                        ? "bg-academia-general text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="bg-academia-general text-white p-2 rounded-r-lg"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
