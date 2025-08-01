import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Filter, ArrowUpDown, Calendar, Users, TrendingUp, MessageSquare, ExternalLink } from "lucide-react";

const demandRequests = [
  {
    id: 1,
    title: "Advanced Search Filters",
    description: "Users want more granular filtering options in search results",
    segment: "Enterprise",
    status: "High Priority",
    impact: 95,
    votes: 147,
    revenue: 250000,
    effort: "Medium",
    lastUpdated: "2 days ago",
    quotes: [
      "We desperately need better filters to find relevant content",
      "Current search is too basic for our enterprise needs"
    ]
  },
  {
    id: 2,
    title: "Mobile App Dark Mode",
    description: "Native dark mode support for mobile applications",
    segment: "Consumer",
    status: "In Progress",
    impact: 78,
    votes: 89,
    revenue: 50000,
    effort: "Low",
    lastUpdated: "5 hours ago",
    quotes: [
      "Dark mode is essential for night usage",
      "All modern apps should have dark mode"
    ]
  },
  {
    id: 3,
    title: "Real-time Collaboration",
    description: "Live document editing with multiple users simultaneously",
    segment: "Teams",
    status: "Research",
    impact: 87,
    votes: 203,
    revenue: 180000,
    effort: "High",
    lastUpdated: "1 week ago",
    quotes: [
      "Google Docs style collaboration would be game changing",
      "We need to edit documents together in real-time"
    ]
  },
  {
    id: 4,
    title: "API Rate Limiting Controls",
    description: "Allow developers to configure custom rate limits",
    segment: "Developers",
    status: "Backlog",
    impact: 65,
    votes: 45,
    revenue: 75000,
    effort: "Medium",
    lastUpdated: "3 days ago",
    quotes: [
      "Rate limits are too restrictive for our use case",
      "Need more flexibility in API consumption"
    ]
  }
];

export function DemandDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "High Priority": return "bg-destructive/20 text-destructive";
      case "In Progress": return "bg-warning/20 text-warning";
      case "Research": return "bg-info/20 text-info";
      case "Backlog": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 90) return "text-destructive";
    if (impact >= 70) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Demand Dashboard</h2>
          <p className="text-muted-foreground">Track and prioritize feature requests from your users</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect Tools
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">147</div>
                <div className="text-sm text-muted-foreground">Total Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-foreground">$555K</div>
                <div className="text-sm text-muted-foreground">Revenue Impact</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-info" />
              <div>
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <div className="text-sm text-muted-foreground">User Votes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="table" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Feature Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground">{request.title}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {request.segment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Impact:</span>
                            <span className={`font-medium ${getImpactColor(request.impact)}`}>
                              {request.impact}/100
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Votes:</span>
                            <span className="font-medium text-foreground">{request.votes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Revenue:</span>
                            <span className="font-medium text-success">${request.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Effort:</span>
                            <span className="font-medium text-foreground">{request.effort}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    
                    {/* User Quotes Preview */}
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">User Feedback:</span>
                      </div>
                      <div className="text-sm text-foreground italic">
                        "{request.quotes[0]}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["High Priority", "In Progress", "Research", "Backlog"].map((status) => (
              <Card key={status} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">{status}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {demandRequests.filter(req => req.status === status).map((request) => (
                    <div key={request.id} className="p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                      <h4 className="font-medium text-foreground text-sm mb-2">{request.title}</h4>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${getImpactColor(request.impact)}`}>
                          {request.impact}/100
                        </span>
                        <span className="text-muted-foreground">{request.votes} votes</span>
                      </div>
                      <Badge variant="outline" className="text-xs mt-2">
                        {request.segment}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}