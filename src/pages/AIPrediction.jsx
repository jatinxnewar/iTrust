import React, { useState } from 'react';

const AIPrediction = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I'm your AI Health Assistant. I can help you with health predictions, symptom analysis, medication guidance, and general health advice. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Hi, what can you help me with?",
    "Analyze my recent health metrics",
    "What should I do for a headache?",
    "Suggest a healthy diet plan for weight loss",
    "Interpret my recent blood report",
    "How can I improve my sleep quality?"
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = getAIResponse(inputMessage);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: aiResponses,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = getAIResponse(question);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: aiResponses,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hi') || input.includes('hello') || input.includes('what can you')) {
      return "Hello! I'm your AI Health Assistant. I'm here to help you with:\n\n🏥 Health Metrics Analysis - Track and interpret your vital signs\n💊 Medication Management - Information about your prescriptions\n🍎 Nutrition Planning - Personalized diet recommendations\n🏃 Fitness Guidance - Exercise and activity suggestions\n📊 Report Interpretation - Understanding your lab results\n😴 Sleep Improvement - Tips for better sleep quality\n\nFeel free to ask me anything about your health, or click on any quick question below!";
    } else if (input.includes('headache')) {
      return "Based on your input, here are some recommendations for headache relief:\n\n1. Stay hydrated - Drink plenty of water\n2. Rest in a quiet, dark room\n3. Apply a cold compress to your forehead\n4. Consider over-the-counter pain relievers like paracetamol\n5. Practice relaxation techniques\n\nIf the headache persists for more than 2 days or is severe, please consult with Dr. Priya Sharma or book an emergency consultation.";
    } else if (input.includes('diet') || input.includes('nutrition') || input.includes('weight loss')) {
      return "Based on your health profile, here's a personalized diet plan for weight loss:\n\n🥗 Breakfast (7-8 AM): Oatmeal with fruits and nuts (350 cal)\n🍱 Mid-Morning (10 AM): Green tea + almonds (100 cal)\n🥙 Lunch (12-1 PM): Grilled chicken with quinoa and vegetables (450 cal)\n🥤 Evening (4 PM): Greek yogurt with berries (150 cal)\n🍽️ Dinner (7-8 PM): Salmon with sweet potato and greens (400 cal)\n\nDaily targets for weight loss:\n• Calories: 1,450 kcal\n• Protein: 100g\n• Carbs: 150g\n• Fats: 45g\n• Water: 8-10 glasses\n\nTips: Avoid processed foods, eat slowly, and exercise 30 min daily!";
    } else if (input.includes('metrics') || input.includes('health')) {
      return "Analyzing your recent health metrics...\n\n✅ Heart Rate: 72 bpm (Normal)\n✅ Blood Pressure: 120/80 mmHg (Optimal)\n✅ Blood Oxygen: 98% (Excellent)\n✅ Steps: 8,250/day (Good)\n⚠️ Sleep: 6.5 hours (Could be improved)\n⚠️ Water Intake: 6/8 glasses (Low)\n\nRecommendation: Try to get 7-8 hours of sleep per night and increase water intake. Your cardiovascular health is excellent. Keep up the good work!";
    } else if (input.includes('blood') || input.includes('report')) {
      return "Based on your latest blood reports:\n\n📊 Complete Blood Count (Feb 2026):\n• Hemoglobin: 14.5 g/dL ✅ Normal\n• WBC: 7,200/µL ✅ Normal\n• Platelets: 250,000/µL ✅ Normal\n\n📊 Lipid Profile (Jan 2026):\n• Total Cholesterol: 180 mg/dL ✅ Good\n• LDL: 100 mg/dL ✅ Optimal\n• HDL: 55 mg/dL ✅ Good\n• Triglycerides: 120 mg/dL ✅ Normal\n\n📊 Blood Sugar (Feb 2026):\n• Fasting: 92 mg/dL ✅ Normal\n• HbA1c: 5.4% ✅ Excellent\n\nAll your reports are within normal range. Continue maintaining a healthy lifestyle!";
    } else if (input.includes('sleep')) {
      return "Here are personalized tips to improve your sleep quality:\n\n😴 Sleep Hygiene Tips:\n1. Maintain consistent sleep schedule (10 PM - 6 AM)\n2. Avoid screens 1 hour before bed\n3. Keep bedroom cool (18-20°C) and dark\n4. Avoid caffeine after 2 PM\n5. Practice relaxation: meditation or deep breathing\n\n🌙 Pre-Sleep Routine:\n• Light dinner by 7 PM\n• Warm shower at 9 PM\n• Read a book or listen to calm music\n• Avoid intense exercise 3 hours before bed\n\n💊 Natural aids:\n• Chamomile tea\n• Magnesium supplement (consult doctor)\n• Lavender aromatherapy\n\nYour current average: 6.5 hrs. Aim for 7-8 hours for optimal health!";
    } else if (input.includes('medication') || input.includes('medicine')) {
      return "I can help you with medication information. Here are your current medications:\n\n💊 Aspirin 75mg - Once daily (morning)\n💊 Vitamin D3 - Once daily (morning)\n💊 Omega-3 - Twice daily (with meals)\n\nNo major drug interactions detected. Remember to:\n• Take medications at the same time daily\n• Don't skip doses\n• Consult your doctor before adding new medications\n\nWould you like to set medication reminders?";
    } else {
      return "I understand you have a health-related question. I can help with:\n\n🏥 Symptom analysis and recommendations\n📊 Health metrics interpretation\n💊 Medication information and reminders\n🍎 Nutrition and diet planning\n🏃 Fitness and exercise suggestions\n📈 Health trend analysis\n😴 Sleep quality improvement\n\nPlease ask me a specific question, or choose from the quick questions below!";
    }
  };

  return (
    <div className="ai-prediction-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Health Assistant</h1>
          <p className="page-subtitle">Get personalized health insights and predictions powered by AI</p>
        </div>
      </div>

      <div className="ai-chat-container">
        <div className="chat-main">
          {/* Quick Questions Section */}
          <div className="quick-questions-section">
            <h3 className="quick-questions-title">Quick Questions</h3>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  className="quick-question-card"
                  onClick={() => handleQuickQuestion(question)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{question}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'ai' ? (
                    <div className="ai-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="currentColor"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="user-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p className="message-text">{message.text}</p>
                  </div>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message ai">
                <div className="message-avatar">
                  <div className="ai-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <div className="input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask me anything about your health..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button type="submit" className="send-button" disabled={!inputMessage.trim()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="input-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              AI responses are for informational purposes. Consult a doctor for medical advice.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;
