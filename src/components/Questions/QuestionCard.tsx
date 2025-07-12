
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUp, 
  MessageSquare, 
  Eye, 
  Clock,
  CheckCircle 
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Question } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const hasAcceptedAnswer = question.answers.some(answer => answer.isAccepted);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Stats */}
            <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground min-w-[60px]">
              <div className="flex items-center space-x-1">
                <ArrowUp className="h-4 w-4" />
                <span className="font-medium">{question.votes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span className={`font-medium ${hasAcceptedAnswer ? 'text-green-600' : ''}`}>
                  {question.answers.length}
                </span>
                {hasAcceptedAnswer && <CheckCircle className="h-3 w-3 text-green-600" />}
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{question.views}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <Link 
                to={`/questions/${question.id}`}
                className="block group"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {question.title}
                </h3>
              </Link>

              <p className="text-muted-foreground text-sm line-clamp-2">
                {question.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary/10 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author and timestamp */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={question.author.avatar} alt={question.author.username} />
                    <AvatarFallback className="text-xs">
                      {question.author.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <span>{question.author.username}</span>
                    <span>•</span>
                    <span className="font-medium text-primary">{question.author.reputation}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
