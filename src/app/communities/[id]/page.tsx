'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MainNav } from '@/components/navigation/main-nav';
import { BetCard } from '@/components/ui/bet-card';
import { LeaderboardItem } from '@/components/ui/leaderboard-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Trophy,
  Target,
  Plus,
  Star,
  TrendingUp,
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  UserPlus,
  Share2,
  Flag,
  Clock,
  Crown
} from 'lucide-react';
import {
  mockCommunities,
  mockBets,
  mockLeaderboard,
  mockUser
} from '@/lib/mock-data';

export default function CommunityDetailPage() {
  const params = useParams();
  const communityId = params.id as string;

  // Find the community (in real app, this would come from API)
  const community = mockCommunities.find(c => c.id === communityId) || mockCommunities[0];

  // Filter bets for this community (mock logic)
  const communityBets = mockBets.filter(bet =>
    bet.category === community.category || community.category === 'general'
  );

  // Mock community-specific leaderboard
  const communityLeaderboard = mockLeaderboard.slice(0, 10);

  const [activeTab, setActiveTab] = useState('overview');
  const [isJoined, setIsJoined] = useState(community.isJoined || false);

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined);
  };

  const sportColorClass = {
    nba: 'sport-nba',
    nfl: 'sport-nfl',
    mlb: 'sport-mlb',
    nhl: 'sport-nhl',
    general: 'text-primary'
  }[community.category];

  const sportBgColorClass = {
    nba: 'bg-sport-nba',
    nfl: 'bg-sport-nfl',
    mlb: 'bg-sport-mlb',
    nhl: 'bg-sport-nhl',
    general: 'bg-primary'
  }[community.category];

  return (
    <div className="min-h-screen bg-background">
      <MainNav user={{...mockUser, notifications: []}} />

      <main className="container mx-auto py-8 px-4">
        {/* Community Header */}
        <section className="mb-8">
          <div className={`relative overflow-hidden rounded-2xl p-8 md:p-12 ${sportBgColorClass}/10 border border-border/30`}>
            <div className={`absolute top-0 left-0 w-full h-2 ${sportBgColorClass}`} />

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Community Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {community.name}
                  </h1>
                  <Badge
                    variant="secondary"
                    className={`${sportColorClass} font-medium`}
                  >
                    {community.category.toUpperCase()}
                  </Badge>
                  {isJoined && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Joined
                    </Badge>
                  )}
                </div>

                <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                  {community.description}
                </p>

                {/* Community Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className={`w-4 h-4 ${sportColorClass}`} />
                      <span className="text-sm text-muted-foreground">Members</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {community.memberCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {community.activeMembers} active today
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className={`w-4 h-4 ${sportColorClass}`} />
                      <span className="text-sm text-muted-foreground">Total Bets</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {community.totalBets.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className={`w-4 h-4 ${sportColorClass}`} />
                      <span className="text-sm text-muted-foreground">Win Rate</span>
                    </div>
                    <div className={`text-2xl font-bold ${
                      community.winRate >= 60 ? 'status-winning' :
                      community.winRate >= 45 ? 'text-warning' : 'status-losing'
                    }`}>
                      {community.winRate}%
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className={`w-4 h-4 ${sportColorClass}`} />
                      <span className="text-sm text-muted-foreground">Rank</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      #12
                    </div>
                    <div className="text-xs text-success">↑ 3 this week</div>
                  </div>
                </div>

                {/* Top Members Preview */}
                {community.topMembers && community.topMembers.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-3">Top Members</div>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {community.topMembers.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="w-10 h-10 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        and {(community.memberCount - 5).toLocaleString()} others
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 md:min-w-[200px]">
                <Button
                  size="lg"
                  onClick={handleJoinCommunity}
                  className={isJoined ? 'bg-success hover:bg-success/80' : ''}
                >
                  {isJoined ? (
                    <>
                      <Star className="w-5 h-5 mr-2 fill-current" />
                      Joined
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Join Community
                    </>
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                {isJoined && (
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Bet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Community Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bets">Active Bets</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="xl:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/avatars/courtvision.jpg" />
                        <AvatarFallback>CV</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">CourtVision</span> created a new bet
                          <span className="font-medium ml-1">"Lakers vs Warriors Game 7"</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/avatars/dunkmaster.jpg" />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">DunkMaster</span> won
                          <span className="font-medium status-winning ml-1">+2,500 points</span> on playoff prediction
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/avatars/threepointking.jpg" />
                        <AvatarFallback>TK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">ThreePointKing</span> joined the community
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Bets */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Featured Bets</h3>
                  <div className="grid gap-4">
                    {communityBets.slice(0, 2).map((bet) => (
                      <BetCard
                        key={bet.id}
                        {...bet}
                        onParticipate={(optionId) => console.log(`Participate in ${bet.id} with ${optionId}`)}
                        onView={() => console.log(`View bet ${bet.id}`)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                {/* Community Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Keep discussions sports-related and respectful</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>No harassment or personal attacks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Only create bets based on factual information</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Have fun and enjoy friendly competition!</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {communityLeaderboard.slice(0, 3).map((item) => (
                      <LeaderboardItem
                        key={item.user.id}
                        {...item}
                        compact={true}
                        showStats={false}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Bets Tab */}
          <TabsContent value="bets" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {communityBets.map((bet) => (
                <BetCard
                  key={bet.id}
                  {...bet}
                  onParticipate={(optionId) => console.log(`Participate in ${bet.id} with ${optionId}`)}
                  onView={() => console.log(`View bet ${bet.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-8">
            <div className="space-y-4">
              {communityLeaderboard.map((item) => (
                <LeaderboardItem
                  key={item.user.id}
                  {...item}
                  showStats={true}
                />
              ))}
            </div>
          </TabsContent>

          {/* Discussion Tab */}
          <TabsContent value="discussion" className="mt-8">
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community Discussions</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with fellow community members, share insights, and discuss upcoming games and betting strategies.
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}