
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  subject: string;
}

interface QuizSectionProps {
  onBack: () => void;
  studentName: string;
}

const QuizSection = ({ onBack, studentName }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const sampleQuestions: Question[] = [
    {
      id: "1",
      question: "If you have 3/4 of a pizza and eat 1/4 of it, how much pizza do you have left?",
      options: ["1/2", "2/4", "1/4", "Both A and B are correct"],
      correct: 3,
      explanation: "Great thinking! 3/4 - 1/4 = 2/4, and 2/4 is the same as 1/2! Both answers are correct because they're equivalent fractions. You're getting so good at this! 🍕",
      subject: "Math"
    },
    {
      id: "2",
      question: "What happens to water when it gets really hot?",
      options: ["It freezes", "It evaporates", "It gets heavier", "It changes color"],
      correct: 1,
      explanation: "Exactly right! When water gets hot enough, it turns into invisible water vapor and floats away - that's evaporation! Like when you see steam from hot cocoa. You're awesome! ☁️",
      subject: "Science"
    },
    {
      id: "3",
      question: "Which word is a metaphor in this sentence: 'Her voice is music to my ears'?",
      options: ["Voice", "Music", "Ears", "Her"],
      correct: 1,
      explanation: "Perfect! 'Music' is the metaphor because we're comparing her voice to music - saying it sounds as beautiful as music! You really understand metaphors now! 🎵",
      subject: "English"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    const isCorrect = selectedAnswer === sampleQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Boom! You got it! 🥳 That's so awesome!");
    } else {
      toast("That's okay - this one's tricky! Let's learn together! 😊", {
        duration: 3000,
      });
    }
  };

  const handleNextQuestion = () => {
    setAnsweredQuestions(answeredQuestions + 1);
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      toast.success(`Amazing work, ${studentName}! You completed the quiz! 🌟`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
  };

  const getCurrentQuestion = () => sampleQuestions[currentQuestion];
  const isQuizCompleted = answeredQuestions === sampleQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Fun Quiz Time!</h1>
              <p className="text-sm text-gray-600">No pressure - just say A, B, C, or D! 😊</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-800">
              {answeredQuestions}/{sampleQuestions.length} questions
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answeredQuestions / sampleQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {!isQuizCompleted ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {getCurrentQuestion().subject}
                </Badge>
                <Badge variant="outline">
                  Question {currentQuestion + 1}
                </Badge>
              </div>
              <CardTitle className="text-xl text-gray-800">
                {getCurrentQuestion().question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {getCurrentQuestion().options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === getCurrentQuestion().correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-blue-500 bg-blue-50 text-blue-800'
                      : showResult && index === getCurrentQuestion().correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      selectedAnswer === index
                        ? showResult
                          ? index === getCurrentQuestion().correct
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : 'border-blue-500 bg-blue-500 text-white'
                        : showResult && index === getCurrentQuestion().correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}

              {showResult && (
                <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-purple-800 font-medium mb-2">
                    {selectedAnswer === getCurrentQuestion().correct ? "Correct! 🎉" : "Let's learn together! 💡"}
                  </p>
                  <p className="text-purple-700">{getCurrentQuestion().explanation}</p>
                </div>
              )}

              <div className="flex justify-center pt-4">
                {!showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
                  >
                    {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Amazing Work, {studentName}! 🎉
                </h2>
                <p className="text-gray-600 mb-4">You completed the quiz with style!</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {score}/{sampleQuestions.length}
                </div>
                <p className="text-purple-700">Questions Correct</p>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-gray-700 mb-6">
                <p>Every question you try makes you stronger! 💪</p>
                <p>I'm so proud of how you tackled each challenge.</p>
                <p>Keep up this amazing learning journey! 🌟</p>
              </div>

              <Button 
                onClick={resetQuiz}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Another Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
