'use client';

import { useState } from 'react';
import { MainNav } from '@/components/navigation/main-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  Plus,
  X,
  Calendar as CalendarIcon,
  Users,
  Trophy,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { mockCommunities, mockUser } from '@/lib/mock-data';

interface BetOption {
  id: string;
  label: string;
  odds?: string;
}

export default function CreateBetPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [betData, setBetData] = useState({
    title: '',
    description: '',
    category: '',
    community: '',
    endDate: null as Date | null,
    maxParticipants: '',
    pointsRequired: '100',
    isPublic: true,
    allowComments: true
  });

  const [betOptions, setBetOptions] = useState<BetOption[]>([
    { id: '1', label: '', odds: '' },
    { id: '2', label: '', odds: '' }
  ]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const sportCategories = [
    { value: 'nba', label: 'NBA Basketball', color: 'sport-nba' },
    { value: 'nfl', label: 'NFL Football', color: 'sport-nfl' },
    { value: 'mlb', label: 'MLB Baseball', color: 'sport-mlb' },
    { value: 'nhl', label: 'NHL Hockey', color: 'sport-nhl' },
    { value: 'general', label: 'General Sports', color: 'text-primary' }
  ];

  const addOption = () => {
    const newId = (betOptions.length + 1).toString();
    setBetOptions([...betOptions, { id: newId, label: '', odds: '' }]);
  };

  const removeOption = (id: string) => {
    if (betOptions.length > 2) {
      setBetOptions(betOptions.filter(option => option.id !== id));
    }
  };

  const updateOption = (id: string, field: 'label' | 'odds', value: string) => {
    setBetOptions(betOptions.map(option =>
      option.id === id ? { ...option, [field]: value } : option
    ));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Creating bet with data:', { betData, betOptions });
    // In a real app, this would make an API call
    alert('Bet created successfully! (This is a demo)');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return betData.title.trim() && betData.description.trim() && betData.category;
      case 2:
        return betOptions.every(option => option.label.trim());
      case 3:
        return betData.endDate && betData.pointsRequired;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const selectedCategory = sportCategories.find(cat => cat.value === betData.category);
  const availableCommunities = mockCommunities.filter(c =>
    !betData.category || c.category === betData.category || c.category === 'general'
  );

  return (
    <div className="min-h-screen bg-background">
      <MainNav user={{...mockUser, notifications: []}} />

      <main className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Bet</h1>
            <p className="text-muted-foreground">
              Set up a new betting opportunity for your community
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className={cn('text-center', currentStep >= 1 && 'text-primary font-medium')}>
                Basic Info
              </div>
              <div className={cn('text-center', currentStep >= 2 && 'text-primary font-medium')}>
                Options
              </div>
              <div className={cn('text-center', currentStep >= 3 && 'text-primary font-medium')}>
                Settings
              </div>
              <div className={cn('text-center', currentStep >= 4 && 'text-primary font-medium')}>
                Review
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {currentStep === 1 && 'Basic Information'}
                  {currentStep === 2 && 'Betting Options'}
                  {currentStep === 3 && 'Bet Settings'}
                  {currentStep === 4 && 'Review & Publish'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title" className="text-base font-medium">
                        Bet Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Lakers vs Warriors - Who wins Game 7?"
                        value={betData.title}
                        onChange={(e) => setBetData({ ...betData, title: e.target.value })}
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Make it clear and engaging - this is what people will see first
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base font-medium">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide more details about this bet, including context, rules, or any relevant information that will help participants make informed decisions..."
                        value={betData.description}
                        onChange={(e) => setBetData({ ...betData, description: e.target.value })}
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-base font-medium">
                        Sport Category *
                      </Label>
                      <Select
                        value={betData.category}
                        onValueChange={(value) => setBetData({ ...betData, category: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a sport category" />
                        </SelectTrigger>
                        <SelectContent>
                          {sportCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full bg-current ${category.color}`} />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="community" className="text-base font-medium">
                        Target Community (Optional)
                      </Label>
                      <Select
                        value={betData.community}
                        onValueChange={(value) => setBetData({ ...betData, community: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Post to all compatible communities" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCommunities.map((community) => (
                            <SelectItem key={community.id} value={community.id}>
                              {community.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-1">
                        Leave empty to make this bet available across all relevant communities
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Betting Options */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-base font-medium">
                          Betting Options *
                        </Label>
                        <Button variant="outline" size="sm" onClick={addOption}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {betOptions.map((option, index) => (
                          <div key={option.id} className="flex gap-3 items-start">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor={`option-${option.id}`} className="text-sm">
                                  Option {index + 1}
                                </Label>
                                <Input
                                  id={`option-${option.id}`}
                                  placeholder="e.g., Los Angeles Lakers"
                                  value={option.label}
                                  onChange={(e) => updateOption(option.id, 'label', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`odds-${option.id}`} className="text-sm">
                                  Odds (Optional)
                                </Label>
                                <Input
                                  id={`odds-${option.id}`}
                                  placeholder="e.g., +150"
                                  value={option.odds}
                                  onChange={(e) => updateOption(option.id, 'odds', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            {betOptions.length > 2 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(option.id)}
                                className="mt-6"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium mb-1">Tips for great betting options:</p>
                            <ul className="text-muted-foreground space-y-1">
                              <li>• Keep options clear and mutually exclusive</li>
                              <li>• Include odds if you want to simulate real betting</li>
                              <li>• Consider adding an "Other" option for unpredictable outcomes</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Settings */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">
                        End Date & Time *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full mt-2 justify-start text-left font-normal',
                              !betData.endDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {betData.endDate ? format(betData.endDate, 'PPP') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={betData.endDate}
                            onSelect={(date) => setBetData({ ...betData, endDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-sm text-muted-foreground mt-1">
                        When should this bet close for new participants?
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="points" className="text-base font-medium">
                        Entry Points Required *
                      </Label>
                      <Select
                        value={betData.pointsRequired}
                        onValueChange={(value) => setBetData({ ...betData, pointsRequired: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 points (Low stakes)</SelectItem>
                          <SelectItem value="100">100 points (Standard)</SelectItem>
                          <SelectItem value="250">250 points (Medium stakes)</SelectItem>
                          <SelectItem value="500">500 points (High stakes)</SelectItem>
                          <SelectItem value="1000">1000 points (Premium)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-1">
                        How many points should participants wager to join this bet?
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="maxParticipants" className="text-base font-medium">
                        Maximum Participants (Optional)
                      </Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        placeholder="No limit"
                        value={betData.maxParticipants}
                        onChange={(e) => setBetData({ ...betData, maxParticipants: e.target.value })}
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Public Bet</Label>
                          <p className="text-sm text-muted-foreground">
                            Anyone can discover and join this bet
                          </p>
                        </div>
                        <Switch
                          checked={betData.isPublic}
                          onCheckedChange={(checked) => setBetData({ ...betData, isPublic: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Allow Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Let participants discuss and share insights
                          </p>
                        </div>
                        <Switch
                          checked={betData.allowComments}
                          onCheckedChange={(checked) => setBetData({ ...betData, allowComments: checked })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        {selectedCategory && (
                          <Badge variant="secondary" className={selectedCategory.color}>
                            {selectedCategory.label}
                          </Badge>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{betData.title}</h3>
                          <p className="text-muted-foreground mt-2">{betData.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Ends</div>
                            <div className="text-sm text-muted-foreground">
                              {betData.endDate ? format(betData.endDate, 'PPP') : 'Not set'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Entry Fee</div>
                            <div className="text-sm text-muted-foreground">
                              {betData.pointsRequired} points
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Max Players</div>
                            <div className="text-sm text-muted-foreground">
                              {betData.maxParticipants || 'Unlimited'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="font-medium">Options:</div>
                        {betOptions.map((option, index) => (
                          <div key={option.id} className="flex justify-between items-center">
                            <span>{option.label}</span>
                            {option.odds && (
                              <Badge variant="outline" className="text-xs">
                                {option.odds}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <p className="font-medium">Ready to publish!</p>
                          <p className="text-sm text-muted-foreground">
                            Your bet looks great. Once published, community members can start participating.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button onClick={handleNext} disabled={!isStepValid()}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!isStepValid()}>
                      <Target className="w-4 h-4 mr-2" />
                      Create Bet
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    This is how your bet will appear to other users
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="space-y-2">
                      <div className="font-medium">
                        {betData.title || 'Bet Title'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {betData.description || 'Bet description...'}
                      </div>
                      {selectedCategory && (
                        <Badge variant="outline" className={`text-xs ${selectedCategory.color}`}>
                          {selectedCategory.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div>
                  <p className="font-medium">Create engaging titles</p>
                  <p className="text-muted-foreground">
                    Use specific matchups or events that sports fans will recognize
                  </p>
                </div>

                <div>
                  <p className="font-medium">Set appropriate entry fees</p>
                  <p className="text-muted-foreground">
                    Higher stakes attract serious players, lower stakes encourage participation
                  </p>
                </div>

                <div>
                  <p className="font-medium">Time your bets well</p>
                  <p className="text-muted-foreground">
                    Close betting just before the event starts for maximum excitement
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Bets must be based on real, verifiable outcomes</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>No harassment or inappropriate content</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Respect community standards and rules</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}