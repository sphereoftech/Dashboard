import React from 'react';
import { Search, Bell, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

interface TopNavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-lg flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Sidebar trigger and search */}
      <div className="flex items-center space-x-4 flex-1">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, assessments..."
            className="pl-10 bg-background/50 border-border/30"
          />
        </div>
      </div>

      {/* Right side - Notifications and user menu */}
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-9 w-9 p-0"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-accent text-accent-foreground">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h4 className="font-medium">Notifications</h4>
            </div>
            <DropdownMenuItem className="p-3">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AI Risk Alert</p>
                  <p className="text-xs text-muted-foreground">
                    High volatility detected in your portfolio
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 mins ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <div className="flex items-start space-x-3">
                <div className="bg-accent/10 p-2 rounded-full">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Course Completed</p>
                  <p className="text-xs text-muted-foreground">
                    Advanced ML module finished
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-2 space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="/avatar-alex.jpg" alt="Alex" />
                <AvatarFallback className="bg-gradient-primary text-white text-xs">
                  AJ
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline">Alex Johnson</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-3 border-b">
              <p className="font-medium">Alex Johnson</p>
              <p className="text-sm text-muted-foreground">Data Scientist</p>
            </div>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};