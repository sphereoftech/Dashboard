import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, RotateCcw, Brain, Target, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const mockQuizData = {
  lastScore: 85,
  totalQuestions: 12,
  correctAnswers: 10,
  topic: "Neural Networks Fundamentals",
  completedAt: "2 hours ago",
  feedback: [
    "Excellent understanding of backpropagation concepts",
    "Consider reviewing activation functions",
    "Strong grasp of gradient descent optimization"
  ],
  nextRecommendation: "Advanced CNN Architectures Quiz"
};

export const SmartAssessments = () => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRegenerateQuiz = async () => {
    setIsRegenerating(true);
    
    setTimeout(() => {
      setIsRegenerating(false);
      toast.success('New quiz generated with adaptive difficulty!');
    }, 2000);
  };

  const handleShowFeedback = () => {
    setShowFeedback(!showFeedback);
    if (!showFeedback) {
      toast.info('AI feedback revealed');
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="font-tomorrow">Smart Assessments</CardTitle>
            <CardDescription>AI-powered adaptive quizzes</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Last Quiz Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Last Quiz: {mockQuizData.topic}</h4>
            <Badge variant="secondary" className="text-xs">
              {mockQuizData.completedAt}
            </Badge>
          </div>

          <div className="bg-gradient-glass p-4 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{mockQuizData.lastScore}%</p>
                  <p className="text-sm text-muted-foreground">
                    {mockQuizData.correctAnswers}/{mockQuizData.totalQuestions} correct
                  </p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            
            <Progress value={mockQuizData.lastScore} className="h-2 mb-3" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Performance</span>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                Above Average
              </Badge>
            </div>
          </div>
        </div>

        {/* AI Feedback Section */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShowFeedback}
            className="w-full justify-start"
          >
            <Brain className="w-4 h-4 mr-2" />
            {showFeedback ? 'Hide' : 'Show'} AI Feedback
          </Button>
          
          {showFeedback && (
            <div className="p-3 bg-muted/30 rounded-lg space-y-2">
              <h5 className="text-sm font-medium flex items-center">
                <Brain className="w-4 h-4 mr-2 text-primary ai-pulse" />
                Personalized Insights
              </h5>
              <ul className="space-y-1">
                {mockQuizData.feedback.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleRegenerateQuiz}
            disabled={isRegenerating}
            className="w-full gradient-primary text-white"
          >
            {isRegenerating ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Generate New Quiz
              </>
            )}
          </Button>

          <div className="bg-gradient-glass p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Next Recommended:</p>
            <p className="text-sm text-muted-foreground mb-2">
              {mockQuizData.nextRecommendation}
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Start Recommended Quiz
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
          <div className="text-center">
            <p className="text-lg font-semibold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Quizzes Taken</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-accent">87%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">Streak Days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};