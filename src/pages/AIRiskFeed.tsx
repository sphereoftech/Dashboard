import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  TrendingUp, 
  Brain, 
  Shield,
  Activity,
  Zap,
  Bell,
  Target,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

// Mock risk data
const riskAlerts = [
  {
    id: 1,
    title: "High Volatility Alert: Portfolio Risk Increase",
    description: "AI detected 23% increase in portfolio volatility over the last 48 hours",
    severity: "High",
    category: "Portfolio",
    timestamp: "2 minutes ago",
    impact: "Potential 8-12% short-term fluctuation",
    recommendation: "Consider reducing position in high-beta stocks",
    confidence: 89
  },
  {
    id: 2,
    title: "Market Sentiment Shift: Tech Sector",
    description: "AI sentiment analysis shows negative shift in tech sector mentions",
    severity: "Medium",
    category: "Market",
    timestamp: "15 minutes ago",
    impact: "Tech holdings may experience downward pressure",
    recommendation: "Monitor earnings reports and tech stock movements",
    confidence: 76
  },
  {
    id: 3,
    title: "Learning Fatigue Risk: Quiz Performance Decline",
    description: "AI detected 15% decline in quiz performance - cognitive fatigue indicated",
    severity: "Medium",
    category: "Learning",
    timestamp: "1 hour ago",
    impact: "Reduced learning efficiency and retention",
    recommendation: "Take a 30-minute break before next learning session",
    confidence: 92
  },
  {
    id: 4,
    title: "Economic Indicator Warning: Interest Rate Signal",
    description: "Fed policy indicators suggest potential rate changes affecting bond positions",
    severity: "Low",
    category: "Economic",
    timestamp: "3 hours ago",
    impact: "Bond portfolio may see 2-4% adjustment",
    recommendation: "Review fixed-income allocation strategy",
    confidence: 67
  }
];

const riskMetrics = {
  overallRiskScore: 6.8,
  portfolioRisk: 7.2,
  marketRisk: 6.1,
  learningRisk: 5.9,
  trendsLast24h: '+0.8',
  activeAlerts: 12,
  resolvedToday: 8
};

const AIRiskFeed = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(riskAlerts[0]);
  const [filterSeverity, setFilterSeverity] = useState('All');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Portfolio': return <BarChart3 className="w-4 h-4" />;
      case 'Market': return <TrendingUp className="w-4 h-4" />;
      case 'Learning': return <Brain className="w-4 h-4" />;
      case 'Economic': return <Activity className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleDismissAlert = (alert: any) => {
    toast.success(`Alert "${alert.title}" dismissed`);
  };

  const handleAcceptRecommendation = (alert: any) => {
    toast.success('AI recommendation accepted and applied');
  };

  const filteredAlerts = filterSeverity === 'All' 
    ? riskAlerts 
    : riskAlerts.filter(alert => alert.severity === filterSeverity);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar isDark={isDark} toggleTheme={toggleTheme} />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-tomorrow">AI Risk Feed</h1>
                <p className="text-muted-foreground">Real-time AI-powered risk monitoring and alerts</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
                  <Bell className="w-3 h-3 mr-1" />
                  {riskMetrics.activeAlerts} Active Alerts
                </Badge>
              </div>
            </div>

            {/* Risk Overview Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Risk</p>
                      <p className="font-bold text-lg text-red-600">{riskMetrics.overallRiskScore}/10</p>
                    </div>
                  </div>
                  <Progress value={riskMetrics.overallRiskScore * 10} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500/10 p-2 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Portfolio Risk</p>
                      <p className="font-bold text-lg text-yellow-600">{riskMetrics.portfolioRisk}/10</p>
                    </div>
                  </div>
                  <Progress value={riskMetrics.portfolioRisk * 10} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Market Risk</p>
                      <p className="font-bold text-lg">{riskMetrics.marketRisk}/10</p>
                    </div>
                  </div>
                  <Progress value={riskMetrics.marketRisk * 10} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Brain className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Learning Risk</p>
                      <p className="font-bold text-lg">{riskMetrics.learningRisk}/10</p>
                    </div>
                  </div>
                  <Progress value={riskMetrics.learningRisk * 10} className="mt-3 h-2" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Risk Alerts List */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <CardTitle className="font-tomorrow">Active Risk Alerts</CardTitle>
                      </div>
                      <select 
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="px-3 py-1 text-sm border border-border rounded-md bg-background"
                      >
                        <option value="All">All Severity</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <CardDescription>AI-detected risks requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredAlerts.map((alert) => (
                        <div 
                          key={alert.id}
                          onClick={() => setSelectedAlert(alert)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedAlert.id === alert.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border/50 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                                {getCategoryIcon(alert.category)}
                              </div>
                              <div>
                                <Badge className={getSeverityColor(alert.severity)}>
                                  {alert.severity}
                                </Badge>
                                <Badge variant="outline" className="ml-2">
                                  {alert.category}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          </div>

                          <h4 className="font-semibold mb-2">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Brain className="w-3 h-3 text-primary" />
                              <span className="text-xs text-muted-foreground">
                                Confidence: {alert.confidence}%
                              </span>
                            </div>
                            <Progress value={alert.confidence} className="w-20 h-1.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alert Details */}
              <div>
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getSeverityColor(selectedAlert.severity)}>
                        {selectedAlert.severity} Risk
                      </Badge>
                      <Badge variant="outline">{selectedAlert.category}</Badge>
                    </div>
                    <CardTitle className="font-tomorrow text-lg leading-tight">
                      {selectedAlert.title}
                    </CardTitle>
                    <CardDescription>{selectedAlert.timestamp}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Alert Description */}
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
                    </div>

                    {/* Impact Analysis */}
                    <div className="bg-gradient-glass p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-accent" />
                        <span className="font-medium text-sm">Impact Analysis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedAlert.impact}</p>
                    </div>

                    {/* AI Recommendation */}
                    <div className="bg-gradient-glass p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-primary ai-pulse" />
                        <span className="font-medium text-sm">AI Recommendation</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{selectedAlert.recommendation}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Confidence: {selectedAlert.confidence}%
                        </span>
                        <Progress value={selectedAlert.confidence} className="w-20 h-1.5" />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleAcceptRecommendation(selectedAlert)}
                        className="w-full gradient-primary text-white"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Accept AI Recommendation
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDismissAlert(selectedAlert)}
                      >
                        Dismiss Alert
                      </Button>
                    </div>

                    {/* Risk Metrics */}
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="font-medium mb-3">Risk Trends (24h)</h4>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Change</p>
                          <p className="font-semibold text-red-600">{riskMetrics.trendsLast24h}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Resolved</p>
                          <p className="font-semibold text-green-600">{riskMetrics.resolvedToday}</p>
                        </div>
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

export default AIRiskFeed;