import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Users, 
  TrendingUp, 
  Brain, 
  Target, 
  Award,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for skills
const skillsData = [
  { skill: 'Machine Learning', current: 85, cohort: 72, target: 90 },
  { skill: 'Python Programming', current: 92, cohort: 78, target: 95 },
  { skill: 'Data Analysis', current: 78, cohort: 65, target: 85 },
  { skill: 'Statistics', current: 70, cohort: 68, target: 80 },
  { skill: 'Deep Learning', current: 65, cohort: 55, target: 75 },
  { skill: 'SQL', current: 88, cohort: 82, target: 90 },
];

const achievements = [
  { title: 'ML Fundamentals', earned: true, date: '2 days ago' },
  { title: 'Python Expert', earned: true, date: '1 week ago' },
  { title: 'Data Wizard', earned: false, date: null },
  { title: 'Statistics Master', earned: false, date: null },
];

export const ProgressAnalytics = () => {
  const [compareMode, setCompareMode] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const overallProgress = Math.round(skillsData.reduce((acc, skill) => acc + skill.current, 0) / skillsData.length);

  const handleShowInsights = () => {
    setShowInsights(!showInsights);
    if (!showInsights) {
      toast.success('AI insights revealed!');
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <BarChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="font-tomorrow">Progress Analytics</CardTitle>
              <CardDescription>Track your learning journey with AI insights</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShowInsights}
            className="text-primary"
          >
            <Info className="w-4 h-4 mr-1" />
            AI Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="skills">Skills Mastery</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-medium">Overall Progress</span>
                <Badge variant="secondary">{overallProgress}%</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareMode(!compareMode)}
                className="text-xs"
              >
                <Users className="w-3 h-3 mr-1" />
                {compareMode ? 'Hide' : 'Compare with'} Cohort
              </Button>
            </div>

            <div className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-foreground">{skill.current}%</span>
                      {compareMode && (
                        <span className="text-xs text-muted-foreground">
                          (Cohort: {skill.cohort}%)
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Progress value={skill.current} className="h-2" />
                    {compareMode && (
                      <Progress 
                        value={skill.cohort} 
                        className="h-1 opacity-50" 
                      />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Target: {skill.target}%
                    </span>
                    {skill.current > skill.cohort && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Above avg
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {showInsights && (
              <div className="mt-4 p-4 bg-gradient-glass rounded-lg border border-primary/20">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-primary mt-0.5 ai-pulse" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">AI Insights</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Your ML skills are 18% above the cohort average</li>
                      <li>• Focus on Deep Learning to reach industry standards</li>
                      <li>• Statistics improvement will boost overall performance by 12%</li>
                      <li>• Recommended: Complete "Advanced Neural Networks" course next</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-gradient-glass border-primary/20' 
                      : 'bg-muted/30 border-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className={`w-4 h-4 ${
                      achievement.earned ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-sm font-medium ${
                      achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </span>
                  </div>
                  {achievement.earned ? (
                    <Badge variant="secondary" className="text-xs">
                      Earned {achievement.date}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      In Progress
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};