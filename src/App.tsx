import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StockTracker from "./pages/StockTracker";
import NewsSummarizer from "./pages/NewsSummarizer";
import SmartPlanner from "./pages/SmartPlanner";
import AIRiskFeed from "./pages/AIRiskFeed";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import PredictiveCharts from "./pages/PredictiveCharts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock-tracker" element={<StockTracker />} />
          <Route path="/news" element={<NewsSummarizer />} />
          <Route path="/planner" element={<SmartPlanner />} />
          <Route path="/risk-feed" element={<AIRiskFeed />} />
          <Route path="/charts" element={<PredictiveCharts />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
