
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users as UsersIcon, Award, MessageSquare, Star, MapPin } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const mockUsers = [
  {
    id: 1,
    username: 'techmaster',
    displayName: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    reputation: 15420,
    location: 'San Francisco, CA',
    joinDate: '2022-01-15',
    questionsCount: 45,
    answersCount: 128,
    badges: { gold: 5, silver: 12, bronze: 23 },
    topTags: ['React', 'JavaScript', 'TypeScript'],
    bio: 'Full-stack developer passionate about modern web technologies',
  },
  {
    id: 2,
    username: 'codequeen',
    displayName: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    reputation: 12890,
    location: 'New York, NY',
    joinDate: '2021-08-22',
    questionsCount: 32,
    answersCount: 95,
    badges: { gold: 3, silver: 18, bronze: 31 },
    topTags: ['Python', 'Django', 'PostgreSQL'],
    bio: 'Backend engineer with expertise in Python and database optimization',
  },
  {
    id: 3,
    username: 'devwizard',
    displayName: 'Michael Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    reputation: 9560,
    location: 'Austin, TX',
    joinDate: '2022-05-10',
    questionsCount: 28,
    answersCount: 76,
    badges: { gold: 2, silver: 14, bronze: 28 },
    topTags: ['Node.js', 'Express', 'MongoDB'],
    bio: 'MERN stack developer and open source contributor',
  },
  {
    id: 4,
    username: 'frontendguru',
    displayName: 'Emily Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    reputation: 8340,
    location: 'Seattle, WA',
    joinDate: '2023-02-14',
    questionsCount: 19,
    answersCount: 64,
    badges: { gold: 1, silver: 9, bronze: 19 },
    topTags: ['CSS', 'Tailwind', 'Vue.js'],
    bio: 'UI/UX developer focused on creating beautiful user experiences',
  },
];

const Users: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'reputation' | 'newest' | 'oldest'>('reputation');

  const filteredUsers = mockUsers
    .filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'oldest':
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        default: // reputation
          return b.reputation - a.reputation;
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
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2"
          >
            <UsersIcon className="h-8 w-8" />
            Community Members
          </motion.h1>
          <p className="text-muted-foreground mt-1">
            {filteredUsers.length} active members in our community
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
          <TabsList>
            <TabsTrigger value="reputation">Top Reputation</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Users Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <Link to={`/users/${user.username}`}>
                  <Avatar className="h-20 w-20 mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <AvatarImage src={user.avatar} alt={user.displayName} />
                    <AvatarFallback className="text-lg font-semibold">
                      {user.displayName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
                    {user.displayName}
                  </h3>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </Link>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Reputation */}
                <div className="flex justify-center">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {user.reputation.toLocaleString()} reputation
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>Questions</span>
                    </div>
                    <div className="font-semibold">{user.questionsCount}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>Answers</span>
                    </div>
                    <div className="font-semibold">{user.answersCount}</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>{user.badges.gold}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span>{user.badges.silver}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    <span>{user.badges.bronze}</span>
                  </div>
                </div>

                {/* Location */}
                {user.location && (
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                )}

                {/* Top Tags */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {user.topTags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className="text-xs text-muted-foreground text-center line-clamp-2">
                    {user.bio}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No results */}
      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No users found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search query or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Users;
