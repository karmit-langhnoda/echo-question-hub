
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageSquare, 
  Users, 
  Tag, 
  TrendingUp,
  Star,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Questions', href: '/questions', icon: MessageSquare },
  { name: 'Tags', href: '/tags', icon: Tag },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
];

const popularTags = [
  { name: 'React', count: 1234, color: 'bg-blue-500' },
  { name: 'JavaScript', count: 2567, color: 'bg-yellow-500' },
  { name: 'TypeScript', count: 987, color: 'bg-blue-600' },
  { name: 'Node.js', count: 1456, color: 'bg-green-500' },
  { name: 'Python', count: 1789, color: 'bg-green-600' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "md:sticky md:block md:translate-x-0",
          !isOpen && "md:w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Navigation
              </h3>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Popular Tags
              </h3>
              <div className="space-y-1">
                {popularTags.map((tag) => (
                  <Link
                    key={tag.name}
                    to={`/questions?tag=${tag.name.toLowerCase()}`}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <div className={cn("mr-2 h-2 w-2 rounded-full", tag.color)} />
                      <span>{tag.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tag.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4">
              <div className="mb-2 flex items-center">
                <Star className="mr-2 h-4 w-4 text-yellow-500" />
                <h3 className="text-sm font-semibold">This Week</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Questions</span>
                  <span className="font-medium">+127</span>
                </div>
                <div className="flex justify-between">
                  <span>Answers</span>
                  <span className="font-medium">+284</span>
                </div>
                <div className="flex justify-between">
                  <span>New Users</span>
                  <span className="font-medium">+43</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
