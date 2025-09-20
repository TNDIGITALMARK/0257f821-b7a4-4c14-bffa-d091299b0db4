'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Users,
  TrendingUp,
  Trophy,
  Plus,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreateBetModal } from '@/components/create-bet-modal';

interface MainNavProps {
  user?: {
    id: string;
    name: string;
    avatar?: string;
    notifications?: number;
  };
  className?: string;
}

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Community overview and trending bets'
  },
  {
    title: 'Communities',
    href: '/communities',
    icon: Users,
    description: 'Browse and join sports communities'
  },
  {
    title: 'Leaderboards',
    href: '/leaderboards',
    icon: Trophy,
    description: 'Top performers and rankings'
  },
  {
    title: 'My Bets',
    href: '/my-bets',
    icon: TrendingUp,
    description: 'Track your betting history'
  }
];

export function MainNav({ user, className }: MainNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}>
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <div className="flex items-center gap-3">
            <Image
              src="/generated/sportsbet-logo.png"
              alt="SportsBet Community Hub Logo"
              width={40}
              height={40}
              className="rounded-full bg-background/20 p-1"
            />
            <span className="text-xl font-bold text-foreground">
              SportsBet Community Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                        isActive && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="ml-auto flex items-center space-x-2">
          {/* Search */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          {user && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {user.notifications && user.notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 px-1 py-0 text-xs min-w-[18px] h-[18px] flex items-center justify-center"
                >
                  {user.notifications > 9 ? '9+' : user.notifications}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          )}

          {/* Create Bet */}
          <CreateBetModal
            trigger={
              <Button size="sm" className="hidden sm:flex">
                <Plus className="w-4 h-4 mr-2" />
                Create Bet
              </Button>
            }
          />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      isActive && 'bg-accent text-accent-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border/40 space-y-2">
                <CreateBetModal
                  trigger={
                    <Button size="sm" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Bet
                    </Button>
                  }
                />

                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}