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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  Users,
  TrendingUp,
  Trophy,
  Plus,
  Bell,
  Search,
  Menu,
  X,
  Check,
  Clock,
  Star,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreateBetModal } from '@/components/create-bet-modal';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl: string;
}

interface MainNavProps {
  user?: {
    id: string;
    name: string;
    avatar?: string;
    notifications?: Notification[];
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifications = user?.notifications?.filter(n => !n.read) || [];
  const unreadCount = unreadNotifications.length;
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'bet_won':
      case 'bet_lost':
      case 'bet_reminder':
        return Target;
      case 'achievement':
        return Star;
      case 'leaderboard_update':
        return Trophy;
      case 'community_member':
      case 'community_bet':
      case 'community_milestone':
        return Users;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (priority: string, type: string) => {
    if (type === 'bet_won') return 'text-success';
    if (type === 'bet_lost') return 'text-destructive';
    if (type === 'achievement') return 'text-primary';
    if (priority === 'high') return 'text-primary';
    if (priority === 'medium') return 'text-foreground';
    return 'text-muted-foreground';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp.replace(/{{|}}/g, ''));
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

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
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 px-1 py-0 text-xs min-w-[18px] h-[18px] flex items-center justify-center"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border/40">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} unread
                    </Badge>
                  )}
                </div>
                <ScrollArea className="h-[400px]">
                  {user.notifications && user.notifications.length > 0 ? (
                    <div className="space-y-1">
                      {user.notifications.slice(0, 10).map((notification) => {
                        const IconComponent = getNotificationIcon(notification.type);
                        const colorClass = getNotificationColor(notification.priority, notification.type);
                        
                        return (
                          <div
                            key={notification.id}
                            className={cn(
                              'flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer border-l-2 transition-colors',
                              !notification.read && 'bg-muted/20 border-l-primary',
                              notification.read && 'border-l-transparent'
                            )}
                            onClick={() => {
                              setNotificationsOpen(false);
                              // Handle navigation to actionUrl
                            }}
                          >
                            <div className={cn('mt-0.5 flex-shrink-0', colorClass)}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium leading-none">
                                  {notification.title.replace(/{{|}}/g, '')}
                                </p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground overflow-hidden max-h-8 leading-4">
                                {notification.message.replace(/{{|}}/g, '').slice(0, 100)}
                                {notification.message.replace(/{{|}}/g, '').length > 100 && '...'}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(notification.timestamp)}
                                {notification.priority === 'high' && (
                                  <>
                                    <span>•</span>
                                    <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                                      High Priority
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  )}
                </ScrollArea>
                {user.notifications && user.notifications.length > 10 && (
                  <div className="p-3 border-t border-border/40 text-center">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View all notifications
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
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