import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Minimize2, Maximize2, X, Sparkles, BarChart3, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your OneLens AI assistant. I can help you analyze features, create battle cards, interpret data, and guide you through the platform. What would you like to explore?',
      timestamp: new Date(),
      actions: [
        { label: 'Analyze Feature', action: () => console.log('Analyze feature') },
        { label: 'Create Battle Card', action: () => console.log('Create battle card') },
        { label: 'Explain Insights', action: () => console.log('Explain insights') }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        actions: getContextualActions(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('feature') || lowerInput.includes('analysis')) {
      return 'I can help you analyze features against competitors. To get started, I recommend using the Feature Analysis tool where you can input a feature name and get AI-powered competitive insights including market positioning, benchmarks, and demand signals.';
    }
    
    if (lowerInput.includes('battle card') || lowerInput.includes('competitor')) {
      return 'Great! I can help you create battle cards for competitive analysis. Head to the Battle Cards Generator where you can select competitors and templates. I\'ll populate the cards with strengths, weaknesses, differentiators, and pricing comparisons.';
    }
    
    if (lowerInput.includes('dashboard') || lowerInput.includes('metric')) {
      return 'Your dashboard shows key metrics like active analyses (24), market alerts (8), and a 94% success rate. The recent activity shows completed analyses for AI-Powered Search (85/100 score) and in-progress Mobile SDK analysis. Would you like me to explain any specific metrics?';
    }
    
    if (lowerInput.includes('alert') || lowerInput.includes('monitoring')) {
      return 'You have 3 active alerts and several monitoring profiles tracking competitors like OpenAI, Firebase, and AWS. Recent alerts include GPT-5 development news and new Firebase SDK features. I can help you create new monitoring profiles or explain alert priorities.';
    }
    
    return 'I understand you\'re looking for help with OneLens. I can assist with feature analysis, creating battle cards, setting up monitoring, explaining dashboard metrics, or navigating the platform. What specific task would you like guidance on?';
  };

  const getContextualActions = (input: string): Array<{label: string; action: () => void}> => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('feature') || lowerInput.includes('analysis')) {
      return [
        { label: 'Start Analysis', action: () => console.log('Navigate to analysis') },
        { label: 'View Examples', action: () => console.log('Show examples') }
      ];
    }
    
    if (lowerInput.includes('battle card')) {
      return [
        { label: 'Create Battle Card', action: () => console.log('Navigate to battle cards') },
        { label: 'See Templates', action: () => console.log('Show templates') }
      ];
    }
    
    return [
      { label: 'Tour Platform', action: () => console.log('Start tour') },
      { label: 'View Help Docs', action: () => console.log('Open docs') }
    ];
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-gradient-card border-border/50 shadow-xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>
        {/* Header */}
        <CardHeader className="p-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm text-foreground">OneLens AI</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto max-h-[340px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.actions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={action.action}
                              className="text-xs h-7"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-border/30">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about OneLens..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-muted/30"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}