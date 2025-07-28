import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  AlertTriangle,
  Target,
  Brain,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

// Mock stock data
const stockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.23, change: 2.45, changePercent: 1.34, aiRating: 'BUY', confidence: 87 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: -1.23, changePercent: -0.85, aiRating: 'HOLD', confidence: 72 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 5.67, changePercent: 1.52, aiRating: 'BUY', confidence: 91 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -8.34, changePercent: -3.25, aiRating: 'SELL', confidence: 83 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.23, change: 15.67, changePercent: 1.82, aiRating: 'STRONG_BUY', confidence: 94 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.78, change: 0.89, changePercent: 0.61, aiRating: 'HOLD', confidence: 69 },
];

const portfolioStats = {
  totalValue: 125430.50,
  dailyChange: 1845.23,
  dailyChangePercent: 1.49,
  weeklyReturn: 3.2,
  monthlyReturn: 7.8,
  aiRiskScore: 6.2
};

const StockTracker = () => {
  const [isDark, setIsDark] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStock, setSelectedStock] = useState(stockData[0]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Market data updated with AI analysis');
    }, 2000);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'STRONG_BUY': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'BUY': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'HOLD': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'SELL': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted';
    }
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
                <h1 className="text-3xl font-bold font-tomorrow">AI Stock Tracker</h1>
                <p className="text-muted-foreground">AI-powered market analysis and portfolio insights</p>
              </div>
              <Button 
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Updating...' : 'Refresh Data'}
              </Button>
            </div>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Portfolio Value</p>
                      <p className="font-bold text-lg">${portfolioStats.totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Change</p>
                      <p className="font-bold text-lg text-green-600">
                        +${portfolioStats.dailyChange.toLocaleString()} ({portfolioStats.dailyChangePercent}%)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Return</p>
                      <p className="font-bold text-lg">{portfolioStats.monthlyReturn}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">AI Risk Score</p>
                      <p className="font-bold text-lg">{portfolioStats.aiRiskScore}/10</p>
                    </div>
                  </div>
                  <Progress value={portfolioStats.aiRiskScore * 10} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stock List */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-tomorrow flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-primary ai-pulse" />
                      AI Market Analysis
                    </CardTitle>
                    <CardDescription>Real-time AI-powered stock recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stockData.map((stock, index) => (
                        <div 
                          key={stock.symbol}
                          onClick={() => setSelectedStock(stock)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedStock.symbol === stock.symbol 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border/50 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="font-semibold">{stock.symbol}</p>
                                <p className="text-sm text-muted-foreground">{stock.name}</p>
                              </div>
                              <Badge className={getRatingColor(stock.aiRating)}>
                                {stock.aiRating.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold">${stock.price}</p>
                              <div className="flex items-center space-x-2">
                                {stock.change >= 0 ? (
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                                <span className={`text-sm ${
                                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Brain className="w-3 h-3 text-primary" />
                              <span className="text-xs text-muted-foreground">
                                AI Confidence: {stock.confidence}%
                              </span>
                            </div>
                            <Progress value={stock.confidence} className="w-20 h-1.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Selected Stock Details */}
              <div>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-tomorrow">{selectedStock.symbol}</CardTitle>
                    <CardDescription>{selectedStock.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gradient-glass rounded-lg">
                      <p className="text-2xl font-bold">${selectedStock.price}</p>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        {selectedStock.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${
                          selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change} ({selectedStock.changePercent}%)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">AI Recommendation</p>
                        <Badge className={`${getRatingColor(selectedStock.aiRating)} w-full justify-center`}>
                          {selectedStock.aiRating.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">AI Confidence</p>
                          <span className="text-sm text-muted-foreground">{selectedStock.confidence}%</span>
                        </div>
                        <Progress value={selectedStock.confidence} className="h-2" />
                      </div>

                      <div className="bg-gradient-glass p-3 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Brain className="w-4 h-4 text-primary mt-0.5 ai-pulse" />
                          <div>
                            <p className="text-sm font-medium mb-1">AI Insights</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>• Strong technical indicators</li>
                              <li>• Above-average volume</li>
                              <li>• Positive earnings outlook</li>
                              <li>• Market sentiment: Bullish</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full gradient-primary text-white">
                        <Target className="w-4 h-4 mr-2" />
                        Add to Watchlist
                      </Button>
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

export default StockTracker;