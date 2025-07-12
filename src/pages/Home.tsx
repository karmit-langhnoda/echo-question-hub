
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Filter, TrendingUp, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { QuestionCard } from '../components/Questions/QuestionCard';
import { useAuthStore } from '../store/authStore';
import { mockQuestions } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [sortBy, setSortBy] = useState<'newest' | 'trending' | 'votes'>('newest');

  const sortedQuestions = [...mockQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.votes + b.answers.length + b.views / 10) - (a.votes + a.answers.length + a.views / 10);
      case 'votes':
        return b.votes - a.votes;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            All Questions
          </motion.h1>
          <p className="text-muted-foreground mt-1">
            {mockQuestions.length} questions found
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link to="/ask">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as any)} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="newest" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Newest
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="votes" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Most Votes
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Questions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {sortedQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <QuestionCard question={question} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state for unauthenticated users */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-200/20"
        >
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Join our community!</h3>
            <p className="text-muted-foreground">
              Sign up to ask questions, answer others, and build your reputation.
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
