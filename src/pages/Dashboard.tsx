import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { AICourseCreator } from '@/components/ai-features/AICourseCreator';
import { ProgressAnalytics } from '@/components/ai-features/ProgressAnalytics';
import { SmartAssessments } from '@/components/ai-features/SmartAssessments';
import { AIChatbot } from '@/components/ai-features/AIChatbot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp, 
  Brain, 
  Clock, 
  Award,
  AlertTriangle,
  Zap
} from 'lucide-react';

// Mock data for Alex - mid-level Data Scientist
const mockUserData = {
  name: "Alex Johnson",
  role: "Data Scientist",
  currentCourse: "Advanced Machine Learning Fundamentals",
  courseProgress: 68,
  weeklyProgress: 24,
  learningStreak: 7,
  nextSession: "Tomorrow, 2:00 PM",
  riskAlert: "Take a break before next quiz",
  totalHours: 45.5,
  completedCourses: 8,
  skillLevel: "Intermediate"
};

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar isDark={isDark} toggleTheme={toggleTheme} />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Welcome Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-tomorrow bg-gradient-primary bg-clip-text text-transparent">
                Welcome back, {mockUserData.name}
              </h1>
              <p className="text-muted-foreground">
                Continue your AI-powered learning journey
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Course</p>
                      <p className="font-semibold">{mockUserData.courseProgress}% Complete</p>
                    </div>
                  </div>
                  <Progress value={mockUserData.courseProgress} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Learning Streak</p>
                      <p className="font-semibold">{mockUserData.learningStreak} days</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    On fire!
                  </Badge>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-primary p-2 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-semibold">{mockUserData.completedCourses} Courses</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {mockUserData.totalHours}h total learning time
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AI Alert</p>
                      <p className="font-semibold text-sm">Take a break</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Fatigue detected before next quiz
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Current Course Progress */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-tomorrow">{mockUserData.currentCourse}</CardTitle>
                    <CardDescription>Continue where you left off</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {mockUserData.skillLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Module 3: Neural Networks Deep Dive</span>
                    <span className="text-sm text-muted-foreground">{mockUserData.courseProgress}%</span>
                  </div>
                  <Progress value={mockUserData.courseProgress} className="h-3" />
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Next session: {mockUserData.nextSession}</span>
                    </div>
                    <Button className="gradient-primary text-white">
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AICourseCreator />
              <ProgressAnalytics />
              <SmartAssessments />
              
              {/* Quick Actions Card */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-tomorrow flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-primary ai-pulse" />
                    AI Quick Actions
                  </CardTitle>
                  <CardDescription>Powered by your learning data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Learning Path
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Find Study Group
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule Review Session
                  </Button>
                  
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">
                      📊 Weekly Progress: +{mockUserData.weeklyProgress}% improvement
                    </p>
                    <Progress value={mockUserData.weeklyProgress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        {/* AI Chatbot - Always available */}
        <AIChatbot />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;