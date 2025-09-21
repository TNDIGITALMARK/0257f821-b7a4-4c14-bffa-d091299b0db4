'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainNav } from '@/components/navigation/main-nav';
import { CommunityCard } from '@/components/ui/community-card';
import { BetCard } from '@/components/ui/bet-card';
import { LeaderboardItem } from '@/components/ui/leaderboard-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import {
  TrendingUp,
  Users,
  Trophy,
  Target,
  Plus,
  ArrowRight,
  Flame,
  Clock,
  Star,
  BarChart3
} from 'lucide-react';
import {
  mockCommunities,
  mockBets,
  mockLeaderboard,
  mockUser,
  mockTrendingBets,
  mockCommunityStats,
  mockNotifications
} from '@/lib/mock-data';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  const filteredCommunities = selectedCategory === 'all'
    ? mockCommunities
    : mockCommunities.filter(c => c.category === selectedCategory);

  const filteredBets = selectedCategory === 'all'
    ? mockBets
    : mockBets.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <MainNav user={{...mockUser, notifications: mockNotifications}} />

      <main className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/generated/hero-background.png"
                alt="Sports betting arena background"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            <div className="relative z-10">
              {/* Logo and Title */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <Image
                    src="/generated/sportsbet-logo.png"
                    alt="SportsBet Community Hub Logo"
                    width={100}
                    height={100}
                    className="rounded-full bg-background/30 p-3 ring-2 ring-primary/30 shadow-xl"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-5xl md:text-7xl font-extrabold text-foreground hero-text-shadow leading-tight">
                    <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                      SportsBet
                    </span>
                    <br />
                    <span className="text-4xl md:text-5xl font-bold text-primary/90">
                      Community Hub
                    </span>
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
              </div>
              <div className="mb-10 max-w-3xl">
                <p className="text-xl md:text-2xl text-foreground/90 mb-4 font-medium leading-relaxed">
                  Join the ultimate social sports betting platform.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Compete with friends, climb leaderboards, and prove your sports knowledge in thriving communities.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="card-premium stat-card-enhanced rounded-xl p-6 hover-lift text-center group">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                    {mockCommunityStats.totalCommunities}
                  </div>
                  <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Communities</div>
                </div>
                <div className="card-premium stat-card-enhanced rounded-xl p-6 hover-lift text-center group">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                    {mockCommunityStats.totalMembers.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Members</div>
                </div>
                <div className="card-premium stat-card-enhanced rounded-xl p-6 hover-lift text-center group">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                    {mockCommunityStats.activeBets.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Active Bets</div>
                </div>
                <div className="card-premium stat-card-enhanced rounded-xl p-6 hover-lift text-center group">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                    {(mockCommunityStats.totalPointsPool / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Points Pool</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button 
                  size="lg" 
                  className="cta-button-primary neon-glow hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4 shadow-2xl"
                  onClick={() => router.push('/communities')}
                >
                  <Plus className="w-6 h-6 mr-3" />
                  Create Community
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-effect hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
                  onClick={() => router.push('/my-bets')}
                >
                  <Target className="w-6 h-6 mr-3" />
                  Place First Bet
                </Button>
              </div>
            </div>

            {/* Background gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40" />
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 px-4"
              onClick={() => setSelectedCategory('all')}
            >
              All Sports
            </Badge>
            {mockCommunityStats.topCategories.map((cat) => (
              <Badge
                key={cat.category}
                variant={selectedCategory === cat.category ? 'default' : 'outline'}
                className={`cursor-pointer text-sm py-2 px-4 ${
                  cat.category === 'nba' ? 'sport-nba hover:bg-sport-nba/20' :
                  cat.category === 'nfl' ? 'sport-nfl hover:bg-sport-nfl/20' :
                  cat.category === 'mlb' ? 'sport-mlb hover:bg-sport-mlb/20' :
                  cat.category === 'nhl' ? 'sport-nhl hover:bg-sport-nhl/20' :
                  ''
                }`}
                onClick={() => setSelectedCategory(cat.category)}
              >
                {cat.category.toUpperCase()} ({cat.count})
              </Badge>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">

            {/* Trending Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Trending Now</h2>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Sports Collage Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/generated/sports-collage.png"
                  alt="Sports action collage"
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockTrendingBets.map((bet) => (
                  <Card key={bet.id} className="card-premium border-border/30 hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {bet.category.toUpperCase()}
                        </Badge>
                        {bet.trend === 'up' && (
                          <TrendingUp className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <h3 className="font-semibold text-card-foreground mb-3">
                        {bet.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{bet.participants.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{bet.timeLeft}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Communities and Bets Tabs */}
            <section>
              <Tabs defaultValue="communities" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="communities" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Communities
                  </TabsTrigger>
                  <TabsTrigger value="bets" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Active Bets
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="communities" className="mt-6">
                  {/* Community Celebration Image */}
                  <div className="relative mb-8 rounded-xl overflow-hidden">
                    <Image
                      src="/generated/community-celebration.png"
                      alt="Community celebration"
                      width={600}
                      height={300}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">Join Our Winning Community</h3>
                      <p className="text-white/80 text-sm">Connect with fellow sports enthusiasts and climb the leaderboards together!</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCommunities.map((community) => (
                      <CommunityCard
                        key={community.id}
                        {...community}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bets" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredBets.map((bet) => (
                      <BetCard
                        key={bet.id}
                        {...bet}
                        onParticipate={(optionId) => console.log(`Participate in ${bet.id} with option ${optionId}`)}
                        onView={() => console.log(`View bet ${bet.id}`)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">

            {/* User Stats Card */}
            <Card className="card-premium float-animation">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {mockUser.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      #{mockUser.rank}
                    </div>
                    <div className="text-xs text-muted-foreground">Global Rank</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-semibold status-winning">
                      {mockUser.winRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {mockUser.activeBets}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Bets</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/30">
                  <div className="text-sm text-muted-foreground mb-2">This Week</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Bets Won</span>
                    <span className="font-medium">
                      {mockUser.stats.thisWeek.betsWon}/{mockUser.stats.thisWeek.betsPlaced}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Points Earned</span>
                    <span className="font-medium status-winning">
                      +{mockUser.stats.thisWeek.pointsEarned}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockLeaderboard.slice(0, 5).map((item) => (
                  <LeaderboardItem
                    key={item.user.id}
                    {...item}
                    compact={true}
                    showStats={false}
                  />
                ))}
                <Button variant="ghost" className="w-full mt-3" size="sm">
                  View Full Leaderboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Bet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Browse Featured
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}