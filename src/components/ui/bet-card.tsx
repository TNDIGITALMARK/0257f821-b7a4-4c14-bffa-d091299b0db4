'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Trophy,
  Target,
  Calendar,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BetCardProps {
  id: string;
  title: string;
  description: string;
  category: 'nba' | 'nfl' | 'mlb' | 'nhl' | 'general';
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'active' | 'completed' | 'cancelled';
  endDate: string;
  participants: number;
  maxParticipants?: number;
  pointsPool: number;
  options: Array<{
    id: string;
    label: string;
    participants: number;
    odds?: string;
  }>;
  userChoice?: string;
  isCreator?: boolean;
  payout?: {
    amount: number;
    status: 'won' | 'lost' | 'pending';
  };
  className?: string;
  onParticipate?: (optionId: string) => void;
  onView?: () => void;
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

const statusColors = {
  active: 'bg-success',
  completed: 'bg-muted',
  cancelled: 'bg-destructive'
};

export function BetCard({
  id,
  title,
  description,
  category,
  creator,
  status,
  endDate,
  participants,
  maxParticipants,
  pointsPool,
  options,
  userChoice,
  isCreator = false,
  payout,
  className,
  onParticipate,
  onView
}: BetCardProps) {
  const sportColorClass = sportColors[category];
  const sportBgColorClass = sportBgColors[category];
  const totalOptionParticipants = options.reduce((sum, option) => sum + option.participants, 0);

  const isExpired = new Date() > new Date(endDate);
  const timeLeft = new Date(endDate).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <Card className={cn(
      'relative overflow-hidden hover-lift cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm',
      className
    )}>
      <div className={cn('absolute top-0 left-0 w-full h-1', sportBgColorClass)} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className={cn('text-xs font-medium', sportColorClass)}
              >
                {category.toUpperCase()}
              </Badge>
              <Badge
                variant="outline"
                className={cn('text-xs', statusColors[status])}
              >
                {status.toUpperCase()}
              </Badge>
              {isCreator && (
                <Badge variant="outline" className="text-xs">
                  Creator
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-lg text-card-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-2 mt-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback className="text-xs">
              {creator.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">by {creator.name}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Users className={cn('w-4 h-4', sportColorClass)} />
            <div>
              <div className="text-sm font-medium text-card-foreground">
                {participants}
                {maxParticipants && `/${maxParticipants}`}
              </div>
              <div className="text-xs text-muted-foreground">Players</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className={cn('w-4 h-4', sportColorClass)} />
            <div>
              <div className="text-sm font-medium text-card-foreground">
                {pointsPool.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className={cn('w-4 h-4', isExpired ? 'text-destructive' : sportColorClass)} />
            <div>
              <div className={cn('text-sm font-medium',
                isExpired ? 'text-destructive' : 'text-card-foreground'
              )}>
                {isExpired ? 'Ended' : `${daysLeft}d`}
              </div>
              <div className="text-xs text-muted-foreground">
                {isExpired ? 'Expired' : 'Left'}
              </div>
            </div>
          </div>
        </div>

        {/* Bet Options */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-card-foreground">Betting Options:</div>
          {options.map((option) => {
            const percentage = totalOptionParticipants > 0
              ? (option.participants / totalOptionParticipants) * 100
              : 0;
            const isUserChoice = userChoice === option.id;

            return (
              <div key={option.id} className={cn(
                'p-3 rounded-lg border transition-all',
                isUserChoice
                  ? 'border-primary bg-primary/10'
                  : 'border-border/50 bg-muted/30'
              )}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-card-foreground">
                      {option.label}
                    </span>
                    {isUserChoice && (
                      <Badge variant="outline" className="text-xs">
                        Your Pick
                      </Badge>
                    )}
                  </div>
                  {option.odds && (
                    <span className="text-sm text-muted-foreground">
                      {option.odds}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-3">
                    <Progress
                      value={percentage}
                      className="h-2"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {option.participants} ({percentage.toFixed(0)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payout Info */}
        {payout && (
          <div className={cn(
            'p-3 rounded-lg border',
            payout.status === 'won' ? 'border-success bg-success/10' :
            payout.status === 'lost' ? 'border-destructive bg-destructive/10' :
            'border-warning bg-warning/10'
          )}>
            <div className="flex items-center gap-2">
              {payout.status === 'won' ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : payout.status === 'lost' ? (
                <TrendingDown className="w-4 h-4 text-destructive" />
              ) : (
                <DollarSign className="w-4 h-4 text-warning" />
              )}
              <span className="text-sm font-medium">
                {payout.status === 'won' ? 'You Won!' :
                 payout.status === 'lost' ? 'You Lost' :
                 'Payout Pending'}
              </span>
              <span className={cn('text-sm font-bold ml-auto',
                payout.status === 'won' ? 'text-success' :
                payout.status === 'lost' ? 'text-destructive' :
                'text-warning'
              )}>
                {payout.status !== 'lost' && '+'}{payout.amount.toLocaleString()} pts
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {status === 'active' && !isExpired && !userChoice && onParticipate && (
            <Button
              className="flex-1"
              variant="default"
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              Place Bet
            </Button>
          )}

          <Button
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onView?.();
            }}
          >
            View Details
          </Button>
        </div>

        {/* End Date */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Ends: {new Date(endDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}