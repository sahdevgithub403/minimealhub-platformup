import React, { useState } from 'react';
import api from '../api/axios';
import { IoSend } from 'react-icons/io5';

const AiAssistant = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your MiniMeal Nutrition Bot. 🤖 Ask me about recipes, allergies, or picky eaters!", isUser: false }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await api.post('/ai/chat', input, {
                headers: { 'Content-Type': 'text/plain' }
            });
            const botResponse = { text: response.data, isUser: false };
            setMessages(prev => [...prev, botResponse]);
        } catch (err) {
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the food network! 🍎", isUser: false }]);
        }
        setLoading(false);
    };

    return (
        <div className="py-10 pt-20 min-h-[85vh] flex flex-col">
            <div className="container mx-auto px-5 flex flex-col flex-1">
                <div className="text-center mb-10">
                    <span className="inline-block bg-[#E0FFF4] text-[#00C896] px-4 py-1.5 rounded-full text-sm font-bold mb-4">24/7 Support</span>
                    <h2 className="text-4xl font-fredoka mb-2">Nutrition Assistant</h2>
                    <p className="text-text-light font-semibold">Get instant advice for your child's dietary needs.</p>
                </div>

                <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-sm border border-gray-100">
                    {/* Header */}
                    <div className="p-5 bg-cream border-b border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center text-white text-xl">
                            🤖
                        </div>
                        <div>
                            <h4 className="font-bold text-text-dark m-0 leading-tight">MiniMeal Bot</h4>
                            <span className="text-xs text-primary-green font-bold flex items-center gap-1">
                                <span className="w-2 h-2 bg-primary-green rounded-full"></span> Online
                            </span>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-5 flex flex-col gap-4 bg-white min-h-[400px]">
                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-[85%] ${msg.isUser ? 'self-end' : 'self-start'}`}>
                                <div className={`px-5 py-3 shadow-sm text-sm md:text-base leading-relaxed ${msg.isUser
                                    ? 'bg-primary-orange text-white rounded-[18px_18px_0_18px]'
                                    : 'bg-gray-100 text-text-dark rounded-[18px_18px_18px_0]'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="self-start bg-gray-50 px-4 py-2 rounded-full text-gray-400 text-xs italic">
                                Typing...
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about allergies, calories, or recipes..."
                            className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary-orange bg-gray-50 focus:bg-white transition-colors font-quicksand"
                        />
                        <button type="submit" className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center text-xl hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <IoSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;
