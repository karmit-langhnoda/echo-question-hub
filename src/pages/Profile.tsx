
import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Award, 
  MessageSquare, 
  HelpCircle,
  TrendingUp,
  Edit
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuthStore } from '../store/authStore';
import { mockQuestions } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  // Mock user data (in real app, this would come from API)
  const userStats = {
    questionsAsked: 12,
    answersGiven: 34,
    reputation: user.reputation,
    badgesEarned: 5,
    joinDate: new Date('2023-06-15'),
  };

  const userQuestions = mockQuestions.filter(q => q.author.id === user.id);
  const userAnswers = mockQuestions.flatMap(q => 
    q.answers.filter(a => a.author.id === user.id).map(a => ({ ...a, questionId: q.id, questionTitle: q.title }))
  );

  const badges = [
    { name: 'Student', description: 'Asked first question', color: 'bg-blue-500' },
    { name: 'Teacher', description: 'Answered 10 questions', color: 'bg-green-500' },
    { name: 'Supporter', description: 'First upvote', color: 'bg-yellow-500' },
    { name: 'Scholar', description: '100+ reputation', color: 'bg-purple-500' },
    { name: 'Popular Question', description: 'Question with 100+ views', color: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-200/20"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-2xl">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              <Button variant="outline" className="self-start">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.reputation}</div>
                <div className="text-sm text-muted-foreground">Reputation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.questionsAsked}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.answersGiven}</div>
                <div className="text-sm text-muted-foreground">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userStats.badgesEarned}</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Member since {formatDistanceToNow(userStats.joinDate, { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userStats.reputation} reputation points</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Top 15% this month</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-3 w-3 text-green-600" />
                      <span className="font-medium">Answered a question</span>
                    </div>
                    <p className="text-muted-foreground text-xs ml-5">2 hours ago</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <HelpCircle className="h-3 w-3 text-blue-600" />
                      <span className="font-medium">Asked a question</span>
                    </div>
                    <p className="text-muted-foreground text-xs ml-5">1 day ago</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-3 w-3 text-yellow-600" />
                      <span className="font-medium">Earned "Teacher" badge</span>
                    </div>
                    <p className="text-muted-foreground text-xs ml-5">3 days ago</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Top Tags</CardTitle>
                <CardDescription>Your most active topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Questions ({userQuestions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userQuestions.length > 0 ? (
                  userQuestions.map((question) => (
                    <div key={question.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium mb-2 hover:text-primary cursor-pointer">
                        {question.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{question.votes} votes</span>
                        <span>{question.answers.length} answers</span>
                        <span>{question.views} views</span>
                        <span>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    You haven't asked any questions yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="answers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Answers ({userAnswers.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userAnswers.length > 0 ? (
                  userAnswers.map((answer) => (
                    <div key={answer.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium mb-2 hover:text-primary cursor-pointer">
                        {answer.questionTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {answer.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{answer.votes} votes</span>
                        {answer.isAccepted && (
                          <Badge variant="secondary" className="text-green-600">
                            Accepted
                          </Badge>
                        )}
                        <span>{formatDistanceToNow(answer.createdAt, { addSuffix: true })}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    You haven't answered any questions yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges ({badges.length})</CardTitle>
                <CardDescription>Achievements you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div key={badge.name} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`w-8 h-8 rounded-full ${badge.color} flex items-center justify-center`}>
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
