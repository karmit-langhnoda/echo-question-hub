
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Flag,
  CheckCircle,
  Clock,
  Eye,
  User,
  Edit,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../hooks/use-toast';
import { mockQuestions } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the question (in real app, this would be an API call)
  const question = mockQuestions.find(q => q.id === id);

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Question not found</h1>
        <Link to="/" className="text-primary hover:underline">
          ← Back to questions
        </Link>
      </div>
    );
  }

  const handleVote = (type: 'up' | 'down', target: 'question' | 'answer', targetId?: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to vote on questions and answers.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: `${type === 'up' ? 'Upvoted' : 'Downvoted'}!`,
      description: `You ${type === 'up' ? 'upvoted' : 'downvoted'} this ${target}.`,
    });
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Answer posted!",
        description: "Your answer has been added to the question.",
      });
      
      setNewAnswer('');
    } catch (error) {
      toast({
        title: "Error posting answer",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Questions</Link>
        <span className="mx-2">›</span>
        <span className="text-foreground">{question.title}</span>
      </nav>

      {/* Ask Question Button - Prominent placement */}
      <div className="flex justify-end">
        <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Link to={isAuthenticated ? "/ask" : "/login"}>
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Link>
        </Button>
      </div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-6">
              {/* Vote buttons */}
              <div className="flex flex-col items-center space-y-2 min-w-[50px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote('up', 'question')}
                  className="p-2 hover:bg-green-50 hover:text-green-600"
                >
                  <ArrowUp className="h-6 w-6" />
                </Button>
                <span className="text-xl font-bold">{question.votes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote('down', 'question')}
                  className="p-2 hover:bg-red-50 hover:text-red-600"
                >
                  <ArrowDown className="h-6 w-6" />
                </Button>
                
                <Button variant="ghost" size="sm" className="p-2 mt-4">
                  <Bookmark className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="sm" className="p-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views} views</span>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-foreground">
                    {question.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Author info */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={question.author.avatar} alt={question.author.username} />
                      <AvatarFallback>
                        {question.author.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{question.author.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {question.author.reputation} reputation
                      </div>
                    </div>
                  </div>
                  
                  {isAuthenticated && user?.id === question.author.id && (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Answers Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
        </h2>

        {question.answers.map((answer, index) => (
          <motion.div
            key={answer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={answer.isAccepted ? 'border-green-200 bg-green-50/30' : ''}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Vote buttons */}
                  <div className="flex flex-col items-center space-y-2 min-w-[50px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote('up', 'answer', answer.id)}
                      className="p-2 hover:bg-green-50 hover:text-green-600"
                    >
                      <ArrowUp className="h-6 w-6" />
                    </Button>
                    <span className="text-xl font-bold">{answer.votes}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote('down', 'answer', answer.id)}
                      className="p-2 hover:bg-red-50 hover:text-red-600"
                    >
                      <ArrowDown className="h-6 w-6" />
                    </Button>
                    
                    {answer.isAccepted && (
                      <div className="mt-2 p-2 bg-green-100 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap text-foreground">
                        {answer.content}
                      </p>
                    </div>

                    {/* Author info */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={answer.author.avatar} alt={answer.author.username} />
                          <AvatarFallback>
                            {answer.author.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{answer.author.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {answer.author.reputation} reputation • {formatDistanceToNow(answer.createdAt, { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isAuthenticated && user?.id === question.author.id && !answer.isAccepted && (
                          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept Answer
                          </Button>
                        )}
                        
                        {isAuthenticated && user?.id === answer.author.id && (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Comments */}
                    {answer.comments.length > 0 && (
                      <div className="ml-4 border-l-2 border-muted pl-4 space-y-2">
                        {answer.comments.map((comment) => (
                          <div key={comment.id} className="text-sm">
                            <span className="text-muted-foreground">{comment.content}</span>
                            <span className="mx-2">–</span>
                            <span className="font-medium">{comment.author.username}</span>
                            <span className="text-muted-foreground ml-1">
                              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                            </span>
                          </div>
                        ))}
                        
                        {isAuthenticated && (
                          <Button variant="ghost" size="sm" className="text-xs">
                            Add comment
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Answer Form - Available to all authenticated users */}
      {isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
              <form onSubmit={handleSubmitAnswer} className="space-y-4">
                <Textarea
                  placeholder="Write your answer here... Use @ to mention other users"
                  rows={8}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="min-h-[200px]"
                />
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Use markdown for formatting. Be clear and helpful.
                  </p>
                  
                  <Button
                    type="submit"
                    disabled={!newAnswer.trim() || isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Answer'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Want to answer this question?</h3>
            <p className="text-muted-foreground mb-4">
              Sign in to share your knowledge and help the community.
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionDetail;
