
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
  X,
  Clock,
  MessageCircle,
  Bookmark,
  Award,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
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
];

const filters = [
  { name: 'Unanswered', href: '/questions?filter=unanswered', icon: MessageCircle, count: 45 },
  { name: 'Trending', href: '/questions?filter=trending', icon: TrendingUp, count: 12 },
  { name: 'Recent', href: '/questions?filter=recent', icon: Clock, count: 89 },
  { name: 'Bookmarked', href: '/questions?filter=bookmarked', icon: Bookmark, count: 23 },
  { name: 'Featured', href: '/questions?filter=featured', icon: Star, count: 8 },
  { name: 'Oldest', href: '/questions?filter=oldest', icon: Calendar, count: 156 },
];

const popularTags = [
  { name: 'React', count: 1234, color: 'bg-blue-500' },
  { name: 'JavaScript', count: 2567, color: 'bg-yellow-500' },
  { name: 'TypeScript', count: 987, color: 'bg-blue-600' },
  { name: 'Node.js', count: 1456, color: 'bg-green-500' },
  { name: 'Python', count: 1789, color: 'bg-green-600' },
  { name: 'CSS', count: 892, color: 'bg-purple-500' },
  { name: 'HTML', count: 756, color: 'bg-orange-500' },
  { name: 'Vue.js', count: 543, color: 'bg-emerald-500' },
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
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "md:sticky md:block md:translate-x-0",
          !isOpen && "md:w-72"
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
              <h3 className="mb-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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

            <Separator />

            {/* Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-2">
                <Filter className="h-3 w-3 text-muted-foreground" />
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Filters
                </h3>
              </div>
              <div className="space-y-1">
                {filters.map((filter) => {
                  const isActive = location.search.includes(filter.href.split('?')[1]);
                  return (
                    <Link
                      key={filter.name}
                      to={filter.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="flex items-center">
                        <filter.icon className="mr-3 h-4 w-4" />
                        <span>{filter.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {filter.count}
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Popular Tags */}
            <div>
              <h3 className="mb-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Popular Tags
              </h3>
              <div className="space-y-1">
                {popularTags.map((tag) => (
                  <Link
                    key={tag.name}
                    to={`/questions?tag=${tag.name.toLowerCase()}`}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <div className={cn("mr-3 h-2 w-2 rounded-full", tag.color)} />
                      <span>{tag.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tag.count.toLocaleString()}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4">
              <div className="mb-2 flex items-center">
                <Award className="mr-2 h-4 w-4 text-yellow-500" />
                <h3 className="text-sm font-semibold">This Week</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>New Questions</span>
                  <span className="font-medium text-green-600">+127</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Answers</span>
                  <span className="font-medium text-blue-600">+284</span>
                </div>
                <div className="flex justify-between">
                  <span>New Users</span>
                  <span className="font-medium text-purple-600">+43</span>
                </div>
                <div className="flex justify-between">
                  <span>Votes Cast</span>
                  <span className="font-medium text-orange-600">+1.2k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
