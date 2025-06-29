
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Trophy, BookOpen, MessageCircle, Star, Mic } from "lucide-react";

const Index = () => {
  const [studentName, setStudentName] = useState("");
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Kind & Patient",
      description: "Like having a caring older sibling help with studies"
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "Smart Explanations",
      description: "Complex topics made simple with everyday examples"
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: "Fun Quizzes",
      description: "Zero pressure, all encouragement - learn through play"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: "Progress Tracking",
      description: "Celebrate every small win on your learning journey"
    }
  ];

  // Load the AI voice agent widget
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'omnidimension-web-widget';
    script.async = true;
    script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=bc958a50352a1ae43265b3498ce553c2';
    
    script.onload = () => {
      setWidgetLoaded(true);
      console.log('AI Study Widget loaded successfully');
    };
    
    script.onerror = () => {
      console.error('Failed to load AI Study Widget');
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById('omnidimension-web-widget');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Exam Whisperer
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-2">Your kind, patient study buddy</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-gray-500">Ready to learn something fun today?</span>
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>

          {!studentName ? (
            <Card className="max-w-md mx-auto mb-8 border-2 border-pink-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-pink-600">
                  Hi there! What's your name? 💡
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 outline-none"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && studentName.trim() && setStudentName(studentName.trim())}
                  />
                  <Button 
                    onClick={() => studentName.trim() && setStudentName(studentName.trim())}
                    disabled={!studentName.trim()}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    Let's Go!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Welcome back, {studentName}! 🌟
              </h2>
              <p className="text-gray-600">I'm so happy you're here. Start chatting with your AI study buddy below!</p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Voice Agent Widget Section */}
        {studentName && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Your AI Study Companion</CardTitle>
                <CardDescription className="text-blue-100">
                  Talk to me! I can help with questions, quizzes, and track your amazing progress
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 text-center">
                {widgetLoaded ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Hi {studentName}! Your AI voice agent is ready. Click the widget below to start our study session! 🎙️
                    </p>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      ✅ Voice Agent Ready
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">Loading your AI study companion...</p>
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Encouragement Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-pink-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Remember: You've got this! 💪
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every question you try makes you stronger. We'll take one small step at a time, 
              and I'm right here with you. Let's make learning feel less scary and more fun!
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
