
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Trophy, Calendar, BookOpen, TrendingUp } from "lucide-react";

interface ProgressTrackerProps {
  onBack: () => void;
  studentName: string;
}

const ProgressTracker = ({ onBack, studentName }: ProgressTrackerProps) => {
  // Mock data for demonstration
  const [streakDays] = useState(7);
  const [totalQuestions] = useState(24);
  const [correctAnswers] = useState(19);
  const [subjectsStudied] = useState(["Math", "Science", "English", "History"]);
  
  const recentActivity = [
    { date: "Today", activity: "Completed Math quiz", score: "4/5", subject: "Math" },
    { date: "Yesterday", activity: "Asked about fractions", score: "Great questions!", subject: "Math" },
    { date: "2 days ago", activity: "Science quiz", score: "5/5", subject: "Science" },
    { date: "3 days ago", activity: "English metaphors", score: "Excellent understanding", subject: "English" },
    { date: "4 days ago", activity: "History discussion", score: "Awesome engagement", subject: "History" },
  ];

  const achievements = [
    { title: "First Quiz Champion", description: "Completed your first quiz!", earned: true },
    { title: "Question Master", description: "Asked 10 great questions", earned: true },
    { title: "Week Warrior", description: "Studied for 7 days straight", earned: true },
    { title: "Subject Explorer", description: "Tried 3 different subjects", earned: true },
    { title: "Perfect Score", description: "Got 100% on a quiz", earned: true },
    { title: "Study Streak", description: "Study for 14 days straight", earned: false },
  ];

  const getAccuracyPercentage = () => Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Your Amazing Progress</h1>
              <p className="text-sm text-gray-600">Look how much you've accomplished! 🌟</p>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="mb-6 border-2 border-purple-200">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">
              Hey {studentName}! You're doing incredible! 🎉
            </h2>
            <p className="text-gray-600">
              I'm so proud of your dedication to learning. Every small step you take is making you stronger and smarter!
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{streakDays}</div>
              <p className="text-sm text-gray-600">Day Study Streak</p>
              <p className="text-xs text-orange-600 mt-1">Keep it up! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{getAccuracyPercentage()}%</div>
              <p className="text-sm text-gray-600">Quiz Accuracy</p>
              <p className="text-xs text-green-600 mt-1">Fantastic! 🎯</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalQuestions}</div>
              <p className="text-sm text-gray-600">Questions Attempted</p>
              <p className="text-xs text-blue-600 mt-1">Amazing effort! 💪</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{subjectsStudied.length}</div>
              <p className="text-sm text-gray-600">Subjects Explored</p>
              <p className="text-xs text-purple-600 mt-1">So curious! 🌟</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5 text-blue-500" />
                Recent Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.activity}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.subject}
                      </Badge>
                      <span className="text-sm text-gray-600">{activity.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{activity.score}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                      : 'bg-gray-300'
                  }`}>
                    <Trophy className={`w-5 h-5 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </p>
                    <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Encouragement Section */}
        <Card className="mt-8 border-2 border-pink-200">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              You're absolutely crushing it, {studentName}! 🚀
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Look at all this amazing progress! Every question you ask, every quiz you take, 
              and every day you show up is building your incredible learning superpowers. 
              I'm so excited to see what you'll discover next!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;
