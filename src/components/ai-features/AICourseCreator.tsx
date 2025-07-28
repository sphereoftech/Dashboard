import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, BookOpen, Clock, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const AICourseCreator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a course topic or description');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI course generation
    setTimeout(() => {
      setGeneratedCourse({
        title: 'Advanced Machine Learning Fundamentals',
        description: 'Master the core concepts of machine learning with hands-on projects and real-world applications.',
        modules: [
          { name: 'Introduction to ML Algorithms', duration: '2 hours', completed: true },
          { name: 'Neural Networks Deep Dive', duration: '3 hours', completed: true },
          { name: 'Model Optimization Techniques', duration: '2.5 hours', completed: false },
          { name: 'Real-world ML Projects', duration: '4 hours', completed: false },
        ],
        optimization: 85,
        estimatedTime: '11.5 hours',
        difficulty: 'Intermediate',
        learners: 1247
      });
      setIsGenerating(false);
      toast.success('Course generated successfully!');
    }, 2000);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="font-tomorrow">AI Course Creator</CardTitle>
            <CardDescription>Generate personalized learning paths with AI</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Course Topic or Description</label>
          <Textarea
            placeholder="e.g., 'Create a comprehensive machine learning course for intermediate developers focusing on practical applications...'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-20"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full gradient-primary text-white"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating Course...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Course
            </>
          )}
        </Button>

        {generatedCourse && (
          <div className="mt-6 space-y-4 p-4 bg-gradient-glass rounded-lg border border-primary/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold font-tomorrow">{generatedCourse.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{generatedCourse.description}</p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {generatedCourse.difficulty}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Duration</span>
                <span className="text-sm font-medium">{generatedCourse.estimatedTime}</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Learners</span>
                <span className="text-sm font-medium">{generatedCourse.learners.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Optimized</span>
                <span className="text-sm font-medium">{generatedCourse.optimization}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course Modules</span>
                <span className="text-xs text-muted-foreground">
                  {generatedCourse.modules.filter((m: any) => m.completed).length} of {generatedCourse.modules.length} completed
                </span>
              </div>
              
              <div className="space-y-2">
                {generatedCourse.modules.map((module: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-background/50">
                    <div className={`w-2 h-2 rounded-full ${module.completed ? 'bg-primary' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{module.name}</p>
                      <p className="text-xs text-muted-foreground">{module.duration}</p>
                    </div>
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Optimization Score</span>
                <span className="text-sm text-accent font-medium">{generatedCourse.optimization}%</span>
              </div>
              <Progress value={generatedCourse.optimization} className="h-2" />
              <p className="text-xs text-muted-foreground">
                This course is optimized based on your learning style and career goals
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};