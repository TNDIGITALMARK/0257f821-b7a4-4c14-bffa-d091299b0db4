'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MainNav } from '@/components/navigation/main-nav';
import { CommunityCard } from '@/components/ui/community-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Trophy,
  Star,
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';
import {
  mockCommunities,
  mockCommunityStats,
  mockUser
} from '@/lib/mock-data';

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Sports', count: mockCommunities.length },
    { id: 'nba', label: 'NBA', count: mockCommunities.filter(c => c.category === 'nba').length },
    { id: 'nfl', label: 'NFL', count: mockCommunities.filter(c => c.category === 'nfl').length },
    { id: 'mlb', label: 'MLB', count: mockCommunities.filter(c => c.category === 'mlb').length },
    { id: 'nhl', label: 'NHL', count: mockCommunities.filter(c => c.category === 'nhl').length },
    { id: 'general', label: 'General', count: mockCommunities.filter(c => c.category === 'general').length }
  ];

  const filters = [
    { id: 'all', label: 'All Communities' },
    { id: 'joined', label: 'My Communities' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'Newest' },
    { id: 'most-active', label: 'Most Active' }
  ];

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'joined' && community.isJoined) ||
                         (selectedFilter === 'trending' && community.winRate > 60) ||
                         (selectedFilter === 'new' && community.memberCount < 2000) ||
                         (selectedFilter === 'most-active' && community.activeMembers > 50);

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const joinedCommunities = mockCommunities.filter(c => c.isJoined);

  return (
    <div className="min-h-screen bg-background">
      <MainNav user={mockUser} />

      <main className="container mx-auto py-8 px-4">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Sports Communities
              </h1>
              <p className="text-lg text-muted-foreground">
                Join communities, make predictions, and compete with fellow sports fans
              </p>
            </div>
            <Button size="lg" className="md:shrink-0">
              <Plus className="w-5 h-5 mr-2" />
              Create Community
            </Button>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Communities</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockCommunityStats.totalCommunities}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Active Bets</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockCommunityStats.activeBets.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Total Members</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {mockCommunityStats.totalMembers.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Points Pool</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {(mockCommunityStats.totalPointsPool / 1000000).toFixed(1)}M
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* My Communities Quick Access */}
        {joinedCommunities.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Star className="w-6 h-6 text-primary fill-current" />
                My Communities
              </h2>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.slice(0, 3).map((community) => (
                <Link key={community.id} href={`/communities/${community.id}`}>
                  <CommunityCard {...community} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="shrink-0"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs md:text-sm"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            {filteredCommunities.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-muted-foreground">
                    {filteredCommunities.length} communities found
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Button variant="ghost" size="sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Most Popular
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCommunities.map((community) => (
                    <Link key={community.id} href={`/communities/${community.id}`}>
                      <CommunityCard {...community} />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-8 text-center">
                <CardContent>
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No communities found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? `No communities match "${searchQuery}"` : 'No communities match your current filters'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setSelectedFilter('all');
                      setSelectedCategory('all');
                    }}>
                      Clear Filters
                    </Button>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Communities Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Trending Communities</h2>
            <Button variant="ghost">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCommunities
              .filter(c => c.winRate > 60)
              .slice(0, 3)
              .map((community) => (
                <Link key={community.id} href={`/communities/${community.id}`}>
                  <CommunityCard {...community} />
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}