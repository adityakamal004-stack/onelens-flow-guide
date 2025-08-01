import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Target, TrendingUp, Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sampleResults = {
  feature: "AI-Powered Search",
  positioning: "Market Leader",
  score: 92,
  insights: [
    "25% faster than closest competitor",
    "Superior accuracy in voice recognition",
    "Missing advanced filtering options"
  ],
  competitors: [
    { name: "SearchCorp", score: 78, position: "Strong Challenger" },
    { name: "FindIt Pro", score: 65, position: "Niche Player" },
    { name: "QuickSearch", score: 58, position: "Follower" }
  ]
};

export function FeatureAnalysis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Feature Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter feature name (e.g., AI-Powered Search, Mobile SDK)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 bg-muted/30 border-border/50"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button 
                size="lg" 
                className="h-12 bg-gradient-primary hover:opacity-90 min-w-[120px]"
                onClick={handleAnalyze}
                disabled={!searchTerm || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-3">
                <div className="animate-pulse-glow w-3 h-3 bg-primary rounded-full" />
                <span className="text-primary font-medium">
                  AI analyzing "{searchTerm}" across competitive landscape...
                </span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                This may take a few moments while we gather market intelligence.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-slide-up">
          {/* Overview */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Analysis Results</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{sampleResults.score}/100</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-2">{sampleResults.positioning}</div>
                  <div className="text-sm text-muted-foreground">Market Position</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Leading
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">Trend</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleResults.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <Target className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-foreground">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitive Benchmark */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Competitive Benchmark</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleResults.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{competitor.name}</div>
                        <div className="text-sm text-muted-foreground">{competitor.position}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{competitor.score}/100</div>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary"
                          style={{ width: `${competitor.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}