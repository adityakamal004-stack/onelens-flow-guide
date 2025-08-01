import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardWidgets } from "@/components/dashboard/DashboardWidgets";
import { FeatureAnalysis } from "@/components/analysis/FeatureAnalysis";
import { MarketMonitoring } from "@/components/monitoring/MarketMonitoring";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your product intelligence overview.</p>
            </div>
            <DashboardWidgets />
          </div>
        );
      case "analysis":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Feature Analysis</h1>
              <p className="text-muted-foreground">Analyze features against competitive landscape with AI-powered insights.</p>
            </div>
            <FeatureAnalysis />
          </div>
        );
      case "monitoring":
        return <MarketMonitoring />;
      case "alerts":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Alert Center</h1>
              <p className="text-muted-foreground">Manage your real-time market monitoring alerts.</p>
            </div>
            <div className="text-center py-12 text-muted-foreground">
              Alert management interface coming soon...
            </div>
          </div>
        );
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <main className="p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;