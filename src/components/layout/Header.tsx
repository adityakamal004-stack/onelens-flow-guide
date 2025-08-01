import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="h-8 w-8" />
          <div className="text-sm text-muted-foreground">
            Product Intelligence Platform
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-6 h-6 rounded-full bg-gradient-primary" />
            <span className="text-foreground font-medium">John Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
}