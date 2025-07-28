import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Newspaper, 
  Clock, 
  TrendingUp, 
  Brain, 
  Search,
  ExternalLink,
  Bookmark,
  Share,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

// Mock news data
const newsData = [
  {
    id: 1,
    title: "AI Revolution in Financial Markets: Machine Learning Algorithms Drive 40% Increase in Trading Efficiency",
    summary: "Latest study reveals how AI-powered trading systems are transforming financial markets with unprecedented accuracy and speed.",
    content: "Financial institutions worldwide are reporting significant improvements in trading performance...",
    source: "TechFinance Today",
    category: "Technology",
    publishedAt: "2 hours ago",
    aiSentiment: "Positive",
    relevanceScore: 94,
    tags: ["AI", "Finance", "Trading", "Machine Learning"],
    impact: "High"
  },
  {
    id: 2,
    title: "Tesla Stock Surges Following Q4 Earnings Beat and AI Autonomous Driving Breakthrough",
    summary: "Tesla exceeded earnings expectations while announcing major advancements in AI-driven autonomous vehicle technology.",
    content: "Tesla's Q4 results show record deliveries and significant progress in FSD technology...",
    source: "Market Watch",
    category: "Stocks",
    publishedAt: "4 hours ago",
    aiSentiment: "Very Positive",
    relevanceScore: 89,
    tags: ["Tesla", "TSLA", "Earnings", "Autonomous Driving"],
    impact: "High"
  },
  {
    id: 3,
    title: "Federal Reserve Signals Potential Interest Rate Changes Amid AI Economic Impact Analysis",
    summary: "Fed officials are incorporating AI-driven economic models to better predict inflation and employment trends.",
    content: "The Federal Reserve is increasingly relying on artificial intelligence to analyze economic indicators...",
    source: "Economic Times",
    category: "Economics",
    publishedAt: "6 hours ago",
    aiSentiment: "Neutral",
    relevanceScore: 76,
    tags: ["Federal Reserve", "Interest Rates", "AI Economics"],
    impact: "Medium"
  },
  {
    id: 4,
    title: "Cryptocurrency Market Sees 15% Gain as AI Trading Bots Outperform Human Traders",
    summary: "Advanced AI algorithms are driving cryptocurrency trading volumes to new heights with superior risk management.",
    content: "The cryptocurrency market experienced significant gains this week, largely attributed to AI-powered trading systems...",
    source: "Crypto Insider",
    category: "Cryptocurrency",
    publishedAt: "8 hours ago",
    aiSentiment: "Positive",
    relevanceScore: 82,
    tags: ["Cryptocurrency", "AI Trading", "Bitcoin", "Market Performance"],
    impact: "Medium"
  },
  {
    id: 5,
    title: "NVIDIA Announces New AI Chip Architecture for Financial Modeling Applications",
    summary: "The latest GPU architecture promises 3x faster processing for complex financial risk calculations and market predictions.",
    content: "NVIDIA's new AI chip represents a breakthrough in computational finance...",
    source: "Tech Hardware News",
    category: "Hardware",
    publishedAt: "12 hours ago",
    aiSentiment: "Positive",
    relevanceScore: 78,
    tags: ["NVIDIA", "AI Chips", "Financial Modeling", "Hardware"],
    impact: "Medium"
  }
];

const NewsSummarizer = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(newsData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Very Positive': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Positive': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Neutral': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Negative': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const handleBookmark = (article: any) => {
    toast.success(`Article "${article.title}" bookmarked!`);
  };

  const handleShare = (article: any) => {
    toast.success('Article link copied to clipboard!');
  };

  const filteredNews = newsData.filter(article => 
    (filterCategory === 'All' || article.category === filterCategory) &&
    (searchTerm === '' || article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const categories = ['All', ...Array.from(new Set(newsData.map(article => article.category)))];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar isDark={isDark} toggleTheme={toggleTheme} />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-tomorrow">AI News Summarizer</h1>
                <p className="text-muted-foreground">AI-curated financial news with sentiment analysis</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news, stocks, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* News List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredNews.map((article) => (
                  <Card 
                    key={article.id}
                    className={`glass-card cursor-pointer transition-all ${
                      selectedArticle.id === article.id ? 'border-primary' : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSentimentColor(article.aiSentiment)}>
                            {article.aiSentiment}
                          </Badge>
                          <span className={`text-xs font-medium ${getImpactColor(article.impact)}`}>
                            {article.impact} Impact
                          </span>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-2 leading-tight">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{article.summary}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span>{article.source}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.publishedAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Brain className="w-3 h-3 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            {article.relevanceScore}% relevant
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Article Details */}
              <div>
                <Card className="glass-card sticky top-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{selectedArticle.category}</Badge>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(selectedArticle)}
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(selectedArticle)}
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="font-tomorrow text-lg leading-tight">
                      {selectedArticle.title}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{selectedArticle.source}</span>
                      <span>•</span>
                      <span>{selectedArticle.publishedAt}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* AI Analysis */}
                    <div className="bg-gradient-glass p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-4 h-4 text-primary ai-pulse" />
                        <span className="font-medium text-sm">AI Analysis</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Sentiment</span>
                          <Badge className={getSentimentColor(selectedArticle.aiSentiment)}>
                            {selectedArticle.aiSentiment}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Market Impact</span>
                          <span className={`text-sm font-medium ${getImpactColor(selectedArticle.impact)}`}>
                            {selectedArticle.impact}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Relevance Score</span>
                          <span className="text-sm font-medium">{selectedArticle.relevanceScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Article Summary */}
                    <div>
                      <h4 className="font-medium mb-2">AI Summary</h4>
                      <p className="text-sm text-muted-foreground">{selectedArticle.summary}</p>
                    </div>

                    {/* Article Content Preview */}
                    <div>
                      <h4 className="font-medium mb-2">Content Preview</h4>
                      <p className="text-sm text-muted-foreground">{selectedArticle.content}</p>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-medium mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedArticle.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full gradient-primary text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Button>
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

export default NewsSummarizer;