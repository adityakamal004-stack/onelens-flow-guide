import { cn } from "@/lib/utils";
import { BarChart3, Search, Shield, Home, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'analysis', name: 'Feature Analysis', icon: Search },
  { id: 'monitoring', name: 'Market Monitoring', icon: Shield },
  { id: 'alerts', name: 'Alerts', icon: Bell, badge: '3' },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-gradient-card border-r border-border/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">OneLens</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-12 px-4",
                isActive && "bg-accent/50 text-accent-foreground border border-primary/20"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{item.name}</span>
              {item.badge && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-border/30">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
          <div className="w-8 h-8 rounded-full bg-gradient-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">John Analyst</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}