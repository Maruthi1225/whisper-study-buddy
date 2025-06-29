
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send, Brain, Heart } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
  studentName: string;
}

const ChatInterface = ({ onBack, studentName }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hi ${studentName}! I'm your Exam Whisperer 💡 What would you like to learn about today? Ask me anything - I'm here to help make it super simple!`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const encouragingResponses = [
    "Great question! Let's make this super simple.",
    "I love that you're curious about this!",
    "You're asking all the right questions!",
    "This is exactly the kind of thinking that leads to success!",
  ];

  const sampleResponses = {
    math: "Think of fractions like pizza slices! 🍕 If you have a pizza cut into 8 pieces and you eat 3, you've eaten 3/8 of the pizza. The bottom number (8) tells us how many pieces the whole pizza was cut into, and the top number (3) tells us how many pieces you took. Want to try a fun quiz about fractions?",
    science: "Great question! Let's think of the water cycle like a never-ending adventure! 💧 Water starts in the ocean, gets heated by the sun and becomes invisible water vapor (evaporation), floats up as clouds (condensation), then falls back down as rain (precipitation). It's like water is constantly traveling around the world! Want to explore this more?",
    history: "Awesome question! Think of the American Revolution like a big family argument that got really serious. The colonists (like teenagers) wanted more freedom from Britain (like strict parents), and when they couldn't agree, they decided to become independent. It wasn't easy, but they believed in their dream of freedom! What part interests you most?",
    english: "I love this question! A metaphor is like giving something a costume to help us understand it better. When we say 'time is money,' we're not saying time IS actually money - we're saying time is LIKE money because both are valuable and shouldn't be wasted. It's a fun way to paint pictures with words! Want to try creating some?"
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomEncouragement = encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)];
      
      let response = randomEncouragement + " ";
      
      // Simple keyword matching for demo
      const lowerInput = inputValue.toLowerCase();
      if (lowerInput.includes("math") || lowerInput.includes("fraction") || lowerInput.includes("number")) {
        response += sampleResponses.math;
      } else if (lowerInput.includes("science") || lowerInput.includes("water") || lowerInput.includes("biology")) {
        response += sampleResponses.science;
      } else if (lowerInput.includes("history") || lowerInput.includes("war") || lowerInput.includes("revolution")) {
        response += sampleResponses.history;
      } else if (lowerInput.includes("english") || lowerInput.includes("metaphor") || lowerInput.includes("writing")) {
        response += sampleResponses.english;
      } else {
        response += "That's such an interesting topic! While I'd love to give you the perfect explanation right now, I want to make sure I give you the most accurate and helpful answer. Can you tell me a bit more about what specifically you'd like to understand? I'm here to help make it clear and fun! 🌟";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast.success("You're doing great! Keep those questions coming! 🎉");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Chat with Exam Whisperer</h1>
              <p className="text-sm text-gray-600">Ask me anything - I'm here to help! 💡</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Learning Together
            </CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your studies..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-400 outline-none"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
