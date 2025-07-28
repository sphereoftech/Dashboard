import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Mic, Sparkles, Brain } from 'lucide-react';
import { toast } from 'sonner';

const examplePrompts = [
  "Explain gradient descent in simple terms",
  "Help me debug this Python code",
  "What's the best way to learn neural networks?",
  "Create a study plan for machine learning"
];

const mockResponses = [
  {
    question: "Explain gradient descent in simple terms",
    response: "Gradient descent is like finding the bottom of a hill while blindfolded. You feel the slope around you and take steps in the direction that goes downhill fastest. In machine learning, the 'hill' represents error, and we want to find the lowest point (minimum error).",
    code: `# Simple gradient descent example
def gradient_descent(x, learning_rate=0.1):
    for i in range(100):
        gradient = 2 * x  # derivative of x²
        x = x - learning_rate * gradient
    return x`
  }
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', content: message, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[0]; // Use mock response for demo
      const aiMessage = { 
        type: 'ai', 
        content: response.response,
        code: response.code,
        timestamp: new Date() 
      };
      setConversation(prev => [...prev, aiMessage]);
      toast.success('AI response generated!');
    }, 1000);

    setMessage('');
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.info('Voice input activated (demo mode)');
      setTimeout(() => {
        setMessage("Explain gradient descent in simple terms");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleExamplePrompt = (prompt: string) => {
    setMessage(prompt);
    toast.info('Example prompt loaded');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full gradient-primary text-white shadow-ai ai-float"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="glass-card shadow-ai">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Brain className="w-5 h-5 text-white ai-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-tomorrow">AI Assistant</CardTitle>
                <CardDescription>Your learning companion</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Example Prompts */}
          {conversation.length === 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Try these examples:</p>
              <div className="grid grid-cols-1 gap-2">
                {examplePrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExamplePrompt(prompt)}
                    className="text-xs h-auto p-2 text-left justify-start"
                  >
                    <Sparkles className="w-3 h-3 mr-2 flex-shrink-0" />
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation */}
          <div className="max-h-60 overflow-y-auto space-y-3">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.code && (
                    <pre className="mt-2 p-2 bg-background/50 rounded text-xs overflow-x-auto">
                      <code>{msg.code}</code>
                    </pre>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about learning..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`absolute right-1 top-1 h-6 w-6 p-0 ${isListening ? 'text-accent' : 'text-muted-foreground'}`}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="gradient-primary text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <Badge variant="outline" className="text-xs">
              Voice input enabled • AI-powered responses
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};