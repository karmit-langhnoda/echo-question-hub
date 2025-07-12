
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Tag, TrendingUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockTags } from '../data/mockData';

const Tags: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'newest'>('popular');

  const filteredTags = mockTags
    .filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id.localeCompare(a.id); // Mock newest sort
        default: // popular
          return b.questionsCount - a.questionsCount;
      }
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tags
            </h1>
            <p className="text-muted-foreground mt-1">
              Browse topics and find questions to answer
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {(['popular', 'name', 'newest'] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  sortBy === sort
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {sort === 'popular' && <TrendingUp className="inline h-3 w-3 mr-1" />}
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tags Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredTags.map((tag, index) => (
          <motion.div
            key={tag.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
              <Link to={`/questions?tag=${tag.name.toLowerCase()}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="group-hover:text-primary transition-colors">
                      {tag.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <CardDescription className="text-sm line-clamp-2">
                    {tag.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {tag.questionsCount.toLocaleString()} questions
                    </Badge>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      <span>#{tag.name.toLowerCase()}</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredTags.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Tag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No tags found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query or browse all available tags.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg p-6 border border-purple-200/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{mockTags.length}</div>
            <div className="text-sm text-muted-foreground">Total Tags</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {mockTags.reduce((sum, tag) => sum + tag.questionsCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(mockTags.reduce((sum, tag) => sum + tag.questionsCount, 0) / mockTags.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Questions per Tag</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Tags;
