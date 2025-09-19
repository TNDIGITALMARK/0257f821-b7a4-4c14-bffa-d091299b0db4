'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, TrendingUp, Trophy, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activeMembers: number;
  totalBets: number;
  winRate?: number;
  category: 'nba' | 'nfl' | 'mlb' | 'nhl' | 'general';
  isJoined?: boolean;
  topMembers?: Array<{
    id: string;
    name: string;
    avatar?: string;
    points: number;
  }>;
  recentActivity?: string;
  className?: string;
}

const sportColors = {
  nba: 'sport-nba',
  nfl: 'sport-nfl',
  mlb: 'sport-mlb',
  nhl: 'sport-nhl',
  general: 'text-primary'
};

const sportBgColors = {
  nba: 'bg-sport-nba',
  nfl: 'bg-sport-nfl',
  mlb: 'bg-sport-mlb',
  nhl: 'bg-sport-nhl',
  general: 'bg-primary'
};

export function CommunityCard({
  id,
  name,
  description,
  memberCount,
  activeMembers,
  totalBets,
  winRate,
  category,
  isJoined = false,
  topMembers = [],
  recentActivity,
  className
}: CommunityCardProps) {
  const sportColorClass = sportColors[category];
  const sportBgColorClass = sportBgColors[category];

  return (
    <Card className={cn(
      'relative overflow-hidden hover-lift cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm',
      className
    )}>
      <div className={cn('absolute top-0 left-0 w-full h-1', sportBgColorClass)} />

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-card-foreground">{name}</h3>
              <Badge
                variant="secondary"
                className={cn('text-xs font-medium', sportColorClass)}
              >
                {category.toUpperCase()}
              </Badge>
              {isJoined && (
                <Badge variant="outline" className="text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Joined
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className={cn('w-4 h-4', sportColorClass)} />
            <div>
              <div className="text-sm font-medium text-card-foreground">
                {memberCount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Members</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className={cn('w-4 h-4', sportColorClass)} />
            <div>
              <div className="text-sm font-medium text-card-foreground">
                {activeMembers}
              </div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Trophy className={cn('w-4 h-4', sportColorClass)} />
            <div>
              <div className="text-sm font-medium text-card-foreground">
                {totalBets.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Bets</div>
            </div>
          </div>

          {winRate && (
            <div className="flex items-center gap-2">
              <div className={cn('w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white',
                winRate >= 60 ? 'bg-success' : winRate >= 45 ? 'bg-warning' : 'bg-danger'
              )}>
                %
              </div>
              <div>
                <div className={cn('text-sm font-medium',
                  winRate >= 60 ? 'status-winning' : winRate >= 45 ? 'text-warning' : 'status-losing'
                )}>
                  {winRate}%
                </div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>
            </div>
          )}
        </div>

        {/* Top Members */}
        {topMembers.length > 0 && (
          <div className="pt-2 border-t border-border/30">
            <div className="text-xs text-muted-foreground mb-2">Top Members</div>
            <div className="flex -space-x-2">
              {topMembers.slice(0, 4).map((member, index) => (
                <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">
                    {member.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {topMembers.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    +{topMembers.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {recentActivity && (
          <div className="text-xs text-muted-foreground pt-1 border-t border-border/30">
            {recentActivity}
          </div>
        )}
      </CardContent>
    </Card>
  );
}