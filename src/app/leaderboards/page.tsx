'use client';

import { useState } from 'react';
import { MainNav } from '@/components/navigation/main-nav';
import { LeaderboardItem } from '@/components/ui/leaderboard-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Crown, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  Filter,
  Medal
} from 'lucide-react';
import { mockLeaderboard, mockUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type TimeFrame = 'all-time' | 'monthly' | 'weekly';
type Category = 'all' | 'nba' | 'nfl' | 'mlb' | 'nhl';

export default function LeaderboardsPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all-time');
  const [category, setCategory] = useState<Category>('all');
  const [showStats, setShowStats] = useState(true);

  // Extended leaderboard data with more users
  const extendedLeaderboard = [
    ...mockLeaderboard,
    {
      user: {
        id: 'user-9',
        name: 'BaseballBoss',
        avatar: '/avatars/baseballboss.jpg',
        level: 38
      },
      rank: 6,
      points: 18450,
      weeklyChange: 345,
      winRate: 62,
      totalBets: 67,
      streak: 1,
      badges: [
        { id: 'badge-9', label: 'MLB Pro', color: 'blue' as const }
      ]
    },
    {
      user: {
        id: 'user-10',
        name: 'HockeyHero',
        avatar: '/avatars/hockeyhero.jpg',
        level: 35
      },
      rank: 7,
      points: 17230,
      weeklyChange: -45,
      winRate: 58,
      totalBets: 92,
      streak: 0,
      badges: [
        { id: 'badge-10', label: 'Ice Cold', color: 'silver' as const }
      ]
    },
    {
      user: {
        id: 'user-11',
        name: 'AllSportsAce',
        avatar: '/avatars/allsportsace.jpg',
        level: 42
      },
      rank: 8,
      points: 16890,
      weeklyChange: 678,
      winRate: 69,
      totalBets: 124,
      streak: 3,
      badges: [
        { id: 'badge-11', label: 'Versatile', color: 'green' as const },
        { id: 'badge-12', label: 'Rising Star', color: 'gold' as const }
      ]
    },
    {
      user: {
        id: 'user-12',
        name: 'BetMaster2000',
        avatar: '/avatars/betmaster2000.jpg',
        level: 33
      },
      rank: 9,
      points: 15670,
      weeklyChange: 123,
      winRate: 55,
      totalBets: 156,
      streak: 0,
      badges: [
        { id: 'badge-13', label: 'Grinder', color: 'bronze' as const }
      ]
    },
    {
      user: {
        id: 'user-13',
        name: 'ProPicker',
        avatar: '/avatars/propicker.jpg',
        level: 29
      },
      rank: 10,
      points: 14320,
      weeklyChange: -234,
      winRate: 64,
      totalBets: 78,
      streak: 0,
      badges: [
        { id: 'badge-14', label: 'Analyst', color: 'blue' as const }
      ]
    }
  ];

  const topThreeUsers = extendedLeaderboard.slice(0, 3);
  const otherUsers = extendedLeaderboard.slice(3);

  const stats = {
    totalUsers: 12547,
    averagePoints: 8750,
    topCategory: 'NFL',
    mostActiveUser: 'BetMaster2000'
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNav user={mockUser} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Leaderboards</h1>
                <p className="text-muted-foreground">Top performers and rankings across all communities</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant={showStats ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowStats(!showStats)}
              >
                <Target className="w-4 h-4 mr-2" />
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.averagePoints.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Avg Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Medal className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.topCategory}</p>
                    <p className="text-xs text-muted-foreground">Top Category</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-base font-bold text-foreground truncate">{stats.mostActiveUser}</p>
                    <p className="text-xs text-muted-foreground">Most Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <Select value={timeFrame} onValueChange={(value: TimeFrame) => setTimeFrame(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="nba">NBA</SelectItem>
              <SelectItem value="nfl">NFL</SelectItem>
              <SelectItem value="mlb">MLB</SelectItem>
              <SelectItem value="nhl">NHL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="categories">By Sport</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="rankings" className="space-y-6">
            {/* Podium Section */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 border-border/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Top 3 Champions
                </CardTitle>
                <CardDescription>The elite performers leading our community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topThreeUsers.map((item, index) => (
                    <div key={item.user.id} className={cn(
                      'relative p-6 rounded-lg border transition-all duration-200',
                      index === 0 && 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30',
                      index === 1 && 'bg-gradient-to-br from-gray-400/10 to-gray-600/10 border-gray-400/30',
                      index === 2 && 'bg-gradient-to-br from-orange-400/10 to-red-500/10 border-orange-400/30'
                    )}>
                      <LeaderboardItem
                        {...item}
                        showStats={showStats}
                        isCurrentUser={item.user.id === mockUser.id}
                        className="border-none bg-transparent"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rest of Rankings */}
            <Card className="bg-card/50 border-border/30">
              <CardHeader>
                <CardTitle className="text-foreground">Complete Rankings</CardTitle>
                <CardDescription>All community members ranked by points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherUsers.map((item) => (
                  <LeaderboardItem
                    key={item.user.id}
                    {...item}
                    showStats={showStats}
                    isCurrentUser={item.user.id === mockUser.id}
                    className="hover-lift"
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['NBA', 'NFL', 'MLB', 'NHL'].map((sport) => (
                <Card key={sport} className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle className={cn('text-foreground', 
                      sport === 'NBA' && 'text-red-400',
                      sport === 'NFL' && 'text-blue-400',
                      sport === 'MLB' && 'text-blue-400',
                      sport === 'NHL' && 'text-orange-400'
                    )}>
                      {sport} Leaders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {extendedLeaderboard.slice(0, 5).map((item, index) => (
                      <LeaderboardItem
                        key={`${sport}-${item.user.id}`}
                        {...item}
                        rank={index + 1}
                        compact={true}
                        showStats={false}
                        isCurrentUser={item.user.id === mockUser.id}
                      />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-card/50 border-border/30">
              <CardHeader>
                <CardTitle className="text-foreground">Achievement Categories</CardTitle>
                <CardDescription>Special recognition for outstanding performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Streak Masters', icon: '🔥', description: 'Longest winning streaks' },
                    { title: 'High Rollers', icon: '💎', description: 'Highest single bet wins' },
                    { title: 'Accuracy Experts', icon: '🎯', description: 'Best win percentages' },
                    { title: 'Volume Leaders', icon: '📊', description: 'Most bets placed' },
                    { title: 'Community Champions', icon: '👑', description: 'Top community contributors' },
                    { title: 'New Rising Stars', icon: '⭐', description: 'Best new members this month' }
                  ].map((achievement) => (
                    <Card key={achievement.title} className="hover-lift bg-gradient-to-br from-card/60 to-card/30 border-border/40">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h3 className="font-semibold text-foreground mb-1">{achievement.title}</h3>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Climb the Ranks?</h2>
              <p className="text-muted-foreground mb-6">
                Join our community competitions and show off your sports knowledge. Every bet brings you closer to the top!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="font-semibold">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Create Your First Bet
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Join Communities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}