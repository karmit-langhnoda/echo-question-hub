
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  Home, 
  MessageSquare, 
  Tag, 
  Users 
} from 'lucide-react';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Questions', href: '/questions', icon: MessageSquare },
  { name: 'Tags', href: '/tags', icon: Tag },
  { name: 'Users', href: '/users', icon: Users },
];

export const TopNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 h-12">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors relative",
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
