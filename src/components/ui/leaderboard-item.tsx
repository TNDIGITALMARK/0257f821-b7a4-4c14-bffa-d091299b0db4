'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Medal,
  Crown,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LeaderboardItemProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    level?: number;
  };
  rank: number;
  points: number;
  weeklyChange?: number;
  winRate?: number;
  totalBets?: number;
  streak?: number;
  badges?: Array<{
    id: string;
    label: string;
    color: 'gold' | 'silver' | 'bronze' | 'blue' | 'green' | 'red';
  }>;
  isCurrentUser?: boolean;
  showStats?: boolean;
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

const rankIcons = {
  1: Crown,
  2: Trophy,
  3: Medal
};

const rankColors = {
  1: 'text-yellow-400',
  2: 'text-gray-400',
  3: 'text-orange-400'
};

const badgeColors = {
  gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  silver: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  bronze: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30'
};

export function LeaderboardItem({
  user,
  rank,
  points,
  weeklyChange,
  winRate,
  totalBets,
  streak,
  badges = [],
  isCurrentUser = false,
  showStats = true,
  compact = false,
  className,
  onClick
}: LeaderboardItemProps) {
  const RankIcon = rankIcons[rank as keyof typeof rankIcons];
  const rankColor = rankColors[rank as keyof typeof rankColors];

  return (
    <Card className={cn(
      'transition-all duration-200',
      isCurrentUser
        ? 'bg-primary/10 border-primary/30 shadow-primary/20 shadow-lg'
        : 'bg-card/50 border-border/30 hover:bg-card/80',
      onClick && 'cursor-pointer hover:shadow-md',
      compact ? 'p-3' : 'p-4',
      className
    )} onClick={onClick}>
      <div className="flex items-center gap-3">
        {/* Rank */}
        <div className={cn(
          'flex items-center justify-center font-bold shrink-0',
          compact ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-lg'
        )}>
          {RankIcon ? (
            <RankIcon className={cn(rankColor, compact ? 'w-5 h-5' : 'w-6 h-6')} />
          ) : (
            <span className="text-muted-foreground">#{rank}</span>
          )}
        </div>

        {/* User Avatar and Name */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className={compact ? 'w-8 h-8' : 'w-10 h-10'}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className={compact ? 'text-sm' : 'text-base'}>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className={cn(
                'font-semibold text-card-foreground truncate',
                compact ? 'text-sm' : 'text-base'
              )}>
                {user.name}
              </h4>
              {isCurrentUser && (
                <Badge variant="outline" className="text-xs">
                  You
                </Badge>
              )}
              {user.level && (
                <Badge variant="secondary" className="text-xs">
                  Lv.{user.level}
                </Badge>
              )}
            </div>

            {/* Badges */}
            {badges.length > 0 && !compact && (
              <div className="flex gap-1 mt-1">
                {badges.slice(0, 3).map((badge) => (
                  <Badge
                    key={badge.id}
                    variant="outline"
                    className={cn('text-xs px-2 py-0', badgeColors[badge.color])}
                  >
                    {badge.label}
                  </Badge>
                ))}
                {badges.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{badges.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Points and Stats */}
        <div className="text-right shrink-0">
          <div className={cn(
            'font-bold text-primary',
            compact ? 'text-lg' : 'text-xl'
          )}>
            {points.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">points</div>

          {/* Weekly Change */}
          {weeklyChange !== undefined && !compact && (
            <div className="flex items-center gap-1 justify-end mt-1">
              {weeklyChange > 0 ? (
                <>
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">
                    +{weeklyChange.toLocaleString()}
                  </span>
                </>
              ) : weeklyChange < 0 ? (
                <>
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-red-400">
                    {weeklyChange.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Additional Stats */}
      {showStats && !compact && (winRate || totalBets || streak) && (
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
          {winRate && (
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3 text-muted-foreground" />
              <span className={cn('text-xs font-medium',
                winRate >= 60 ? 'text-green-400' :
                winRate >= 45 ? 'text-yellow-400' :
                'text-red-400'
              )}>
                {winRate}%
              </span>
              <span className="text-xs text-muted-foreground">win</span>
            </div>
          )}

          {totalBets && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">
                {totalBets} bets
              </span>
            </div>
          )}

          {streak && streak > 0 && (
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-medium text-orange-400">
                {streak}
              </span>
              <span className="text-xs text-muted-foreground">streak</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}