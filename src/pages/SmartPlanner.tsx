import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Calendar, 
  Brain, 
  Target,
  AlertTriangle,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

// Mock calendar data
const calendarEvents = [
  { 
    id: 1, 
    title: "Advanced ML Module Review", 
    time: "09:00 AM", 
    date: "Today", 
    type: "study", 
    aiOptimized: true,
    duration: "2 hours",
    priority: "High"
  },
  { 
    id: 2, 
    title: "Neural Networks Quiz", 
    time: "02:00 PM", 
    date: "Today", 
    type: "assessment", 
    aiOptimized: false,
    duration: "45 mins",
    priority: "Medium"
  },
  { 
    id: 3, 
    title: "Data Science Project Work", 
    time: "10:00 AM", 
    date: "Tomorrow", 
    type: "project", 
    aiOptimized: true,
    duration: "3 hours",
    priority: "High"
  },
  { 
    id: 4, 
    title: "Statistics Deep Dive", 
    time: "03:00 PM", 
    date: "Tomorrow", 
    type: "study", 
    aiOptimized: true,
    duration: "1.5 hours",
    priority: "Medium"
  },
  { 
    id: 5, 
    title: "Career Planning Session", 
    time: "11:00 AM", 
    date: "Friday", 
    type: "career", 
    aiOptimized: false,
    duration: "1 hour",
    priority: "Low"
  }
];

const weeklyProgress = {
  totalPlanned: 28,
  completed: 19,
  inProgress: 3,
  aiRescheduled: 5,
  productivityScore: 87
};

const aiInsights = [
  "Your productivity peaks at 10 AM - consider scheduling complex topics then",
  "You're 23% more effective on Tuesday and Wednesday mornings",
  "Taking 15-min breaks every 90 minutes increases retention by 18%",
  "Your quiz performance improves 31% when preceded by review sessions"
];

const SmartPlanner = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(calendarEvents[0]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-primary/10 text-primary border-primary/20';
      case 'assessment': return 'bg-accent/10 text-accent border-accent/20';
      case 'project': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'career': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const handleOptimizeSchedule = () => {
    toast.success('Schedule optimized with AI recommendations!');
  };

  const handleRescheduleEvent = (event: any) => {
    toast.info(`"${event.title}" rescheduled for optimal learning time`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar isDark={isDark} toggleTheme={toggleTheme} />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-tomorrow">Smart Learning Planner</h1>
                <p className="text-muted-foreground">AI-optimized schedule for maximum learning efficiency</p>
              </div>
              <Button 
                onClick={handleOptimizeSchedule}
                className="gradient-primary text-white"
              >
                <Brain className="w-4 h-4 mr-2 ai-pulse" />
                Optimize Schedule
              </Button>
            </div>

            {/* Weekly Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Planned</p>
                      <p className="font-bold text-lg">{weeklyProgress.totalPlanned}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-bold text-lg text-green-600">{weeklyProgress.completed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="font-bold text-lg text-yellow-600">{weeklyProgress.inProgress}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">AI Rescheduled</p>
                      <p className="font-bold text-lg">{weeklyProgress.aiRescheduled}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Productivity</p>
                      <p className="font-bold text-lg">{weeklyProgress.productivityScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar/Schedule */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-tomorrow flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      This Week's Schedule
                    </CardTitle>
                    <CardDescription>AI-optimized learning sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="today" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="today">Today</TabsTrigger>
                        <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                        <TabsTrigger value="week">This Week</TabsTrigger>
                      </TabsList>

                      <TabsContent value="today" className="space-y-3">
                        {calendarEvents.filter(event => event.date === "Today").map((event) => (
                          <div 
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedEvent.id === event.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border/50 hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="text-sm font-medium text-muted-foreground">
                                  {event.time}
                                </div>
                                <Badge className={getEventTypeColor(event.type)}>
                                  {event.type}
                                </Badge>
                                {event.aiOptimized && (
                                  <div className="flex items-center space-x-1">
                                    <Brain className="w-3 h-3 text-primary" />
                                    <span className="text-xs text-primary">AI Optimized</span>
                                  </div>
                                )}
                              </div>
                              <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                                {event.priority} Priority
                              </span>
                            </div>
                            
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">Duration: {event.duration}</p>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="tomorrow" className="space-y-3">
                        {calendarEvents.filter(event => event.date === "Tomorrow").map((event) => (
                          <div 
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedEvent.id === event.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border/50 hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="text-sm font-medium text-muted-foreground">
                                  {event.time}
                                </div>
                                <Badge className={getEventTypeColor(event.type)}>
                                  {event.type}
                                </Badge>
                                {event.aiOptimized && (
                                  <div className="flex items-center space-x-1">
                                    <Brain className="w-3 h-3 text-primary" />
                                    <span className="text-xs text-primary">AI Optimized</span>
                                  </div>
                                )}
                              </div>
                              <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                                {event.priority} Priority
                              </span>
                            </div>
                            
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">Duration: {event.duration}</p>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="week" className="space-y-3">
                        {calendarEvents.map((event) => (
                          <div 
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedEvent.id === event.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border/50 hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="text-sm font-medium text-muted-foreground">
                                  {event.date} • {event.time}
                                </div>
                                <Badge className={getEventTypeColor(event.type)}>
                                  {event.type}
                                </Badge>
                                {event.aiOptimized && (
                                  <div className="flex items-center space-x-1">
                                    <Brain className="w-3 h-3 text-primary" />
                                    <span className="text-xs text-primary">AI Optimized</span>
                                  </div>
                                )}
                              </div>
                              <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                                {event.priority} Priority
                              </span>
                            </div>
                            
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">Duration: {event.duration}</p>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Event Details & AI Insights */}
              <div className="space-y-6">
                {/* Selected Event Details */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-tomorrow text-lg">Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{selectedEvent.title}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Time:</span>
                          <span>{selectedEvent.date} • {selectedEvent.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{selectedEvent.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <Badge className={getEventTypeColor(selectedEvent.type)}>
                            {selectedEvent.type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          <span className={getPriorityColor(selectedEvent.priority)}>
                            {selectedEvent.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">AI Optimized:</span>
                          <span className={selectedEvent.aiOptimized ? 'text-green-600' : 'text-yellow-600'}>
                            {selectedEvent.aiOptimized ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleRescheduleEvent(selectedEvent)}
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        AI Reschedule
                      </Button>
                      <Button variant="outline" className="w-full">
                        Edit Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-tomorrow flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-primary ai-pulse" />
                      AI Learning Insights
                    </CardTitle>
                    <CardDescription>Personalized productivity recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="bg-gradient-glass p-3 rounded-lg border border-primary/20">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          Weekly Productivity Score
                        </p>
                        <div className="text-2xl font-bold text-primary mb-2">
                          {weeklyProgress.productivityScore}%
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          Above Average
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SmartPlanner;