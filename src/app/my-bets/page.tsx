'use client';

import { useState } from 'react';
import { MainNav } from '@/components/navigation/main-nav';
import { BetCard } from '@/components/ui/bet-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Target,
  Plus,
  Filter,
  Calendar,
  BarChart3,
  DollarSign,
  Timer,
  Award,
  Activity
} from 'lucide-react';
import { mockUser, mockBets } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function MyBetsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('active');

  // Mock user's betting data - in real app this would come from API
  const userBets = [
    {
      ...mockBets[0],
      userChoice: 'option-1',
      status: 'active' as const,
      payout: undefined
    },
    {
      ...mockBets[1],
      userChoice: 'option-4',
      status: 'active' as const,
      payout: undefined
    },
    {
      ...mockBets[2],
      userChoice: 'option-7',
      status: 'completed' as const,
      payout: {
        amount: 1250,
        status: 'won' as const
      }
    },
    // Additional mock bets for demonstration
    {
      id: 'bet-4',
      title: 'Stanley Cup Finals 2025',
      description: 'Who will win the Stanley Cup championship this year?',
      category: 'nhl' as const,
      creator: {
        id: 'user-7',
        name: 'PuckMaster',
        avatar: '/avatars/puckmaster.jpg'
      },
      status: 'completed' as const,
      endDate: '2025-06-15T23:59:59Z',
      participants: 892,
      pointsPool: 446000,
      options: [
        {
          id: 'option-11',
          label: 'Boston Bruins',
          participants: 234,
          odds: '+300'
        },
        {
          id: 'option-12',
          label: 'Tampa Bay Lightning',
          participants: 189,
          odds: '+350'
        },
        {
          id: 'option-13',
          label: 'Colorado Avalanche',
          participants: 312,
          odds: '+250'
        },
        {
          id: 'option-14',
          label: 'Other Team',
          participants: 157,
          odds: '+400'
        }
      ],
      userChoice: 'option-13',
      payout: {
        amount: -500,
        status: 'lost' as const
      }
    }
  ];

  const activeBets = userBets.filter(bet => bet.status === 'active');
  const completedBets = userBets.filter(bet => bet.status === 'completed');
  const wonBets = completedBets.filter(bet => bet.payout?.status === 'won');
  const lostBets = completedBets.filter(bet => bet.payout?.status === 'lost');

  const totalWinnings = completedBets.reduce((sum, bet) => {
    return sum + (bet.payout?.amount || 0);
  }, 0);

  const winRate = completedBets.length > 0 
    ? (wonBets.length / completedBets.length) * 100 
    : 0;

  const getFilteredBets = () => {
    let bets = selectedTab === 'active' ? activeBets : completedBets;
    
    if (selectedFilter === 'won') {
      bets = wonBets;
    } else if (selectedFilter === 'lost') {
      bets = lostBets;
    } else if (selectedFilter !== 'all') {
      bets = bets.filter(bet => bet.category === selectedFilter);
    }
    
    return bets;
  };

  const filteredBets = getFilteredBets();

  return (
    <div className="min-h-screen bg-background">
      <MainNav user={mockUser} />

      <main className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Bets</h1>
                <p className="text-muted-foreground">Track your betting history and performance</p>
              </div>
            </div>
            <Button className="neon-glow">
              <Plus className="w-4 h-4 mr-2" />
              Create New Bet
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="card-premium hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {activeBets.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Bets</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Trophy className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {winRate.toFixed(0)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', totalWinnings >= 0 ? 'bg-success/10' : 'bg-destructive/10')}>
                    <DollarSign className={cn('w-5 h-5', totalWinnings >= 0 ? 'text-success' : 'text-destructive')} />
                  </div>
                  <div>
                    <div className={cn('text-2xl font-bold',
                      totalWinnings >= 0 ? 'text-success' : 'text-destructive'
                    )}>
                      {totalWinnings >= 0 ? '+' : ''}{totalWinnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total P&L</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {userBets.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Bets</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <Card className="card-premium mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Won Bets</span>
                    <span className="text-sm font-medium">{wonBets.length}/{completedBets.length}</span>
                  </div>
                  <Progress 
                    value={completedBets.length > 0 ? (wonBets.length / completedBets.length) * 100 : 0}
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                    <span className="text-sm font-medium">{mockUser.stats.allTime.currentStreak} wins</span>
                  </div>
                  <Progress 
                    value={(mockUser.stats.allTime.currentStreak / mockUser.stats.allTime.longestStreak) * 100}
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="text-sm font-medium">
                      {mockUser.stats.thisWeek.betsWon}/{mockUser.stats.thisWeek.betsPlaced}
                    </span>
                  </div>
                  <Progress 
                    value={mockUser.stats.thisWeek.winRate}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 px-4"
              onClick={() => setSelectedFilter('all')}
            >
              All Bets
            </Badge>
            <Badge
              variant={selectedFilter === 'nba' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 px-4 sport-nba hover:bg-sport-nba/20"
              onClick={() => setSelectedFilter('nba')}
            >
              NBA
            </Badge>
            <Badge
              variant={selectedFilter === 'nfl' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 px-4 sport-nfl hover:bg-sport-nfl/20"
              onClick={() => setSelectedFilter('nfl')}
            >
              NFL
            </Badge>
            <Badge
              variant={selectedFilter === 'mlb' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 px-4 sport-mlb hover:bg-sport-mlb/20"
              onClick={() => setSelectedFilter('mlb')}
            >
              MLB
            </Badge>
            <Badge
              variant={selectedFilter === 'nhl' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 px-4 sport-nhl hover:bg-sport-nhl/20"
              onClick={() => setSelectedFilter('nhl')}
            >
              NHL
            </Badge>
            {selectedTab === 'completed' && (
              <>
                <Badge
                  variant={selectedFilter === 'won' ? 'default' : 'outline'}
                  className="cursor-pointer text-sm py-2 px-4 status-winning"
                  onClick={() => setSelectedFilter('won')}
                >
                  Won ({wonBets.length})
                </Badge>
                <Badge
                  variant={selectedFilter === 'lost' ? 'default' : 'outline'}
                  className="cursor-pointer text-sm py-2 px-4 status-losing"
                  onClick={() => setSelectedFilter('lost')}
                >
                  Lost ({lostBets.length})
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Bets Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Active Bets ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Completed Bets ({completedBets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {filteredBets.length === 0 ? (
              <Card className="card-premium">
                <CardContent className="p-8 text-center">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Active Bets</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active bets matching your current filters.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Bet
                  </Button>
                </CardContent>
              </Card>
            ) : (
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
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {filteredBets.length === 0 ? (
              <Card className="card-premium">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Completed Bets</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any completed bets matching your current filters.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Place Your First Bet
                  </Button>
                </CardContent>
              </Card>
            ) : (
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
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}