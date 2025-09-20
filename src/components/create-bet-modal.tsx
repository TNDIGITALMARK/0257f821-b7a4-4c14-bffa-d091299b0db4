'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, DollarSign, Users, Trophy, Clock, Target } from 'lucide-react';

interface CreateBetModalProps {
  trigger: React.ReactNode;
}

export function CreateBetModal({ trigger }: CreateBetModalProps) {
  const [open, setOpen] = useState(false);
  const [betData, setBetData] = useState({
    title: '',
    description: '',
    sport: '',
    betType: '',
    amount: '',
    expiry: '',
    community: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock implementation - would normally submit to API
    console.log('Palce bet:', betData);
    setOpen(false);
    // Reset form
    setBetData({
      title: '',
      description: '',
      sport: '',
      betType: '',
      amount: '',
      expiry: '',
      community: '',
    });
  };

  const sportOptions = [
    { value: 'nba', label: '🏀 NBA', color: 'sport-nba' },
    { value: 'nfl', label: '🏈 NFL', color: 'sport-nfl' },
    { value: 'mlb', label: '⚾ MLB', color: 'sport-mlb' },
    { value: 'nhl', label: '🏒 NHL', color: 'sport-nhl' },
    { value: 'soccer', label: '⚽ Soccer', color: 'text-green-500' },
  ];

  const betTypes = [
    { value: 'moneyline', label: 'Moneyline', description: 'Pick the winner' },
    { value: 'spread', label: 'Point Spread', description: 'Win by margin' },
    { value: 'over-under', label: 'Over/Under', description: 'Total points scored' },
    { value: 'prop', label: 'Prop Bet', description: 'Player/game props' },
    { value: 'parlay', label: 'Parlay', description: 'Multiple bets combined' },
  ];

  const communities = [
    { value: 'nba-fanatics', label: 'NBA Fanatics', members: 1247 },
    { value: 'nfl-legends', label: 'NFL Legends', members: 892 },
    { value: 'mlb-analytics', label: 'MLB Analytics', members: 634 },
    { value: 'college-hoops', label: 'College Hoops', members: 445 },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5 text-primary" />
            Palce Your Bet
          </DialogTitle>
          <DialogDescription>
            Create a new bet and share it with your community. Set your predictions and challenge others!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bet Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Bet Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Lakers vs Warriors - Who wins tonight?"
              value={betData.title}
              onChange={(e) => setBetData({ ...betData, title: e.target.value })}
              className="bg-input border-border"
              required
            />
          </div>

          {/* Sport Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Sport
            </Label>
            <Select value={betData.sport} onValueChange={(value) => setBetData({ ...betData, sport: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select a sport" />
              </SelectTrigger>
              <SelectContent>
                {sportOptions.map((sport) => (
                  <SelectItem key={sport.value} value={sport.value}>
                    <span className={sport.color}>{sport.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bet Type */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Bet Type
            </Label>
            <Select value={betData.betType} onValueChange={(value) => setBetData({ ...betData, betType: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Choose bet type" />
              </SelectTrigger>
              <SelectContent>
                {betTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bet Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Amount (Points)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={betData.amount}
                onChange={(e) => setBetData({ ...betData, amount: e.target.value })}
                className="bg-input border-border"
                min="1"
                required
              />
            </div>

            {/* Expiry */}
            <div className="space-y-2">
              <Label htmlFor="expiry" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Expires
              </Label>
              <Input
                id="expiry"
                type="datetime-local"
                value={betData.expiry}
                onChange={(e) => setBetData({ ...betData, expiry: e.target.value })}
                className="bg-input border-border"
                required
              />
            </div>
          </div>

          {/* Community Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Share with Community
            </Label>
            <Select value={betData.community} onValueChange={(value) => setBetData({ ...betData, community: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select community (optional)" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.value} value={community.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{community.label}</span>
                      <Badge variant="secondary" className="ml-2">
                        {community.members} members
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add any additional context, analysis, or reasoning for your bet..."
              value={betData.description}
              onChange={(e) => setBetData({ ...betData, description: e.target.value })}
              className="bg-input border-border min-h-[100px]"
              rows={4}
            />
          </div>

          <Separator />

          {/* Preview Section */}
          {betData.title && (
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Bet Preview</h4>
              <div className="space-y-2">
                <p className="font-semibold">{betData.title}</p>
                <div className="flex gap-2 flex-wrap">
                  {betData.sport && (
                    <Badge variant="outline">
                      {sportOptions.find(s => s.value === betData.sport)?.label}
                    </Badge>
                  )}
                  {betData.betType && (
                    <Badge variant="outline">
                      {betTypes.find(t => t.value === betData.betType)?.label}
                    </Badge>
                  )}
                  {betData.amount && (
                    <Badge variant="outline">
                      {betData.amount} points
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={!betData.title || !betData.sport || !betData.betType || !betData.amount}
            >
              Palce Bet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}