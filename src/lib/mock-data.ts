// Mock data for SportsBet Community Hub
// Using double curly braces {{}} format as specified

export const mockCommunities = [
  {
    id: "{{community-1}}",
    name: "{{NBA Finals Fanatics}}",
    description: "{{The ultimate destination for NBA championship betting and discussion. Join fellow basketball enthusiasts for playoff predictions and Finals betting action.}}",
    memberCount: 2547,
    activeMembers: 89,
    totalBets: 1432,
    winRate: 67,
    category: "nba" as const,
    isJoined: true,
    topMembers: [
      {
        id: "{{user-1}}",
        name: "{{CourtVision}}",
        avatar: "{{/avatars/courtvision.jpg}}",
        points: 15420
      },
      {
        id: "{{user-2}}",
        name: "{{DunkMaster}}",
        avatar: "{{/avatars/dunkmaster.jpg}}",
        points: 12890
      },
      {
        id: "{{user-3}}",
        name: "{{ThreePointKing}}",
        avatar: "{{/avatars/threepointking.jpg}}",
        points: 11650
      }
    ],
    recentActivity: "{{3 new bets created in the last hour}}"
  },
  {
    id: "{{community-2}}",
    name: "{{NFL RedZone Warriors}}",
    description: "{{Sunday football betting community focused on RedZone action, touchdown props, and game-changing plays. Perfect for fantasy football fans.}}",
    memberCount: 3821,
    activeMembers: 127,
    totalBets: 2108,
    winRate: 58,
    category: "nfl" as const,
    isJoined: false,
    topMembers: [
      {
        id: "{{user-4}}",
        name: "{{GridironGuru}}",
        avatar: "{{/avatars/gridironguru.jpg}}",
        points: 18930
      },
      {
        id: "{{user-5}}",
        name: "{{TouchdownTitan}}",
        avatar: "{{/avatars/touchdowntitan.jpg}}",
        points: 16750
      }
    ],
    recentActivity: "{{GameWinner just won 2,500 points on Chiefs vs Bills over/under}}"
  },
  {
    id: "{{community-3}}",
    name: "{{Baseball Diamond Bets}}",
    description: "{{America's pastime meets modern betting. World Series predictions, MVP races, and statistical analysis for true baseball enthusiasts.}}",
    memberCount: 1876,
    activeMembers: 52,
    totalBets: 987,
    winRate: 61,
    category: "mlb" as const,
    isJoined: true,
    topMembers: [
      {
        id: "{{user-6}}",
        name: "{{HomeRunHero}}",
        avatar: "{{/avatars/homerrunhero.jpg}}",
        points: 9870
      }
    ],
    recentActivity: "{{New World Series prediction bet opened}}"
  },
  {
    id: "{{community-4}}",
    name: "{{Hockey Puck Predictions}}",
    description: "{{Ice-cold takes and red-hot betting opportunities. Stanley Cup playoffs, hat trick props, and overtime thriller predictions for hockey fans.}}",
    memberCount: 1245,
    activeMembers: 31,
    totalBets: 654,
    winRate: 55,
    category: "nhl" as const,
    isJoined: false,
    topMembers: [
      {
        id: "{{user-7}}",
        name: "{{PuckMaster}}",
        avatar: "{{/avatars/puckmaster.jpg}}",
        points: 7650
      }
    ],
    recentActivity: "{{IceBreaker predicted correct playoff upset}}"
  }
];

export const mockBets = [
  {
    id: "{{bet-1}}",
    title: "{{Lakers vs Warriors - Who Wins Game 7?}}",
    description: "{{The ultimate showdown between two Western Conference powerhouses. LeBron's experience vs Curry's clutch factor. Winner takes all!}}",
    category: "nba" as const,
    creator: {
      id: "{{user-1}}",
      name: "{{CourtVision}}",
      avatar: "{{/avatars/courtvision.jpg}}"
    },
    status: "active" as const,
    endDate: "{{2025-05-15T21:00:00Z}}",
    participants: 247,
    maxParticipants: 500,
    pointsPool: 124350,
    options: [
      {
        id: "{{option-1}}",
        label: "{{Los Angeles Lakers}}",
        participants: 142,
        odds: "{{-110}}"
      },
      {
        id: "{{option-2}}",
        label: "{{Golden State Warriors}}",
        participants: 105,
        odds: "{{+105}}"
      }
    ],
    userChoice: "{{option-1}}"
  },
  {
    id: "{{bet-2}}",
    title: "{{NFL MVP 2025 Season Winner}}",
    description: "{{Who will take home the Most Valuable Player award for the 2025 NFL season? Make your prediction now before the season starts!}}",
    category: "nfl" as const,
    creator: {
      id: "{{user-4}}",
      name: "{{GridironGuru}}",
      avatar: "{{/avatars/gridironguru.jpg}}"
    },
    status: "active" as const,
    endDate: "{{2025-12-31T23:59:59Z}}",
    participants: 1834,
    pointsPool: 918700,
    options: [
      {
        id: "{{option-3}}",
        label: "{{Josh Allen (Bills)}}",
        participants: 487,
        odds: "{{+350}}"
      },
      {
        id: "{{option-4}}",
        label: "{{Patrick Mahomes (Chiefs)}}",
        participants: 623,
        odds: "{{+280}}"
      },
      {
        id: "{{option-5}}",
        label: "{{Lamar Jackson (Ravens)}}",
        participants: 312,
        odds: "{{+450}}"
      },
      {
        id: "{{option-6}}",
        label: "{{Other Quarterback}}",
        participants: 412,
        odds: "{{+600}}"
      }
    ]
  },
  {
    id: "{{bet-3}}",
    title: "{{World Series 2025 Champion}}",
    description: "{{Spring training is over, regular season is underway. Which team will hoist the Commissioner's Trophy in October?}}",
    category: "mlb" as const,
    creator: {
      id: "{{user-6}}",
      name: "{{HomeRunHero}}",
      avatar: "{{/avatars/homerrunhero.jpg}}"
    },
    status: "active" as const,
    endDate: "{{2025-10-01T00:00:00Z}}",
    participants: 567,
    pointsPool: 283500,
    options: [
      {
        id: "{{option-7}}",
        label: "{{Los Angeles Dodgers}}",
        participants: 89,
        odds: "{{+400}}"
      },
      {
        id: "{{option-8}}",
        label: "{{New York Yankees}}",
        participants: 76,
        odds: "{{+450}}"
      },
      {
        id: "{{option-9}}",
        label: "{{Atlanta Braves}}",
        participants: 54,
        odds: "{{+550}}"
      },
      {
        id: "{{option-10}}",
        label: "{{Other Team}}",
        participants: 348,
        odds: "{{+200}}"
      }
    ],
    payout: {
      amount: 1250,
      status: "won" as const
    }
  }
];

export const mockLeaderboard = [
  {
    user: {
      id: "{{user-1}}",
      name: "{{CourtVision}}",
      avatar: "{{/avatars/courtvision.jpg}}",
      level: 47
    },
    rank: 1,
    points: 25890,
    weeklyChange: 1240,
    winRate: 73,
    totalBets: 89,
    streak: 7,
    badges: [
      { id: "{{badge-1}}", label: "{{NBA Expert}}", color: "gold" as const },
      { id: "{{badge-2}}", label: "{{Hot Streak}}", color: "red" as const }
    ]
  },
  {
    user: {
      id: "{{user-4}}",
      name: "{{GridironGuru}}",
      avatar: "{{/avatars/gridironguru.jpg}}",
      level: 52
    },
    rank: 2,
    points: 24150,
    weeklyChange: 890,
    winRate: 68,
    totalBets: 134,
    streak: 4,
    badges: [
      { id: "{{badge-3}}", label: "{{NFL Master}}", color: "gold" as const },
      { id: "{{badge-4}}", label: "{{Consistent}}", color: "blue" as const }
    ]
  },
  {
    user: {
      id: "{{user-8}}",
      name: "{{SportsBetKing}}",
      avatar: "{{/avatars/sportsbetking.jpg}}",
      level: 44
    },
    rank: 3,
    points: 22670,
    weeklyChange: 567,
    winRate: 71,
    totalBets: 76,
    streak: 5,
    badges: [
      { id: "{{badge-5}}", label: "{{Multi-Sport}}", color: "green" as const }
    ],
    isCurrentUser: true
  },
  {
    user: {
      id: "{{user-2}}",
      name: "{{DunkMaster}}",
      avatar: "{{/avatars/dunkmaster.jpg}}",
      level: 39
    },
    rank: 4,
    points: 21340,
    weeklyChange: -120,
    winRate: 65,
    totalBets: 98,
    streak: 0,
    badges: [
      { id: "{{badge-6}}", label: "{{Rookie}}", color: "bronze" as const }
    ]
  },
  {
    user: {
      id: "{{user-5}}",
      name: "{{TouchdownTitan}}",
      avatar: "{{/avatars/touchdowntitan.jpg}}",
      level: 41
    },
    rank: 5,
    points: 19780,
    weeklyChange: 234,
    winRate: 59,
    totalBets: 112,
    streak: 2,
    badges: [
      { id: "{{badge-7}}", label: "{{Team Player}}", color: "blue" as const }
    ]
  }
];

export const mockUser = {
  id: "{{user-8}}",
  name: "{{SportsBetKing}}",
  email: "{{sportsbetking@example.com}}",
  avatar: "{{/avatars/sportsbetking.jpg}}",
  level: 44,
  points: 22670,
  rank: 3,
  winRate: 71,
  totalBets: 76,
  activeBets: 12,
  notifications: 5,
  joinedCommunities: [
    "{{community-1}}",
    "{{community-3}}"
  ],
  badges: [
    { id: "{{badge-5}}", label: "{{Multi-Sport}}", color: "green" as const },
    { id: "{{badge-8}}", label: "{{Veteran}}", color: "silver" as const }
  ],
  stats: {
    thisWeek: {
      betsPlaced: 8,
      betsWon: 5,
      pointsEarned: 567,
      winRate: 63
    },
    thisMonth: {
      betsPlaced: 23,
      betsWon: 16,
      pointsEarned: 1890,
      winRate: 70
    },
    allTime: {
      betsPlaced: 76,
      betsWon: 54,
      pointsEarned: 22670,
      winRate: 71,
      longestStreak: 9,
      currentStreak: 5
    }
  }
};

export const mockTrendingBets = [
  {
    id: "{{trending-1}}",
    title: "{{Super Bowl 2026 Winner}}",
    participants: 4521,
    timeLeft: "{{287 days}}",
    category: "nfl" as const,
    trend: "up" as const
  },
  {
    id: "{{trending-2}}",
    title: "{{March Madness Bracket Challenge}}",
    participants: 2890,
    timeLeft: "{{45 days}}",
    category: "general" as const,
    trend: "up" as const
  },
  {
    id: "{{trending-3}}",
    title: "{{NBA Rookie of the Year}}",
    participants: 1567,
    timeLeft: "{{123 days}}",
    category: "nba" as const,
    trend: "stable" as const
  }
];

export const mockCommunityStats = {
  totalCommunities: 247,
  totalMembers: 15680,
  activeBets: 1432,
  totalPointsPool: 2847690,
  topCategories: [
    { category: "nfl" as const, count: 89, percentage: 36 },
    { category: "nba" as const, count: 67, percentage: 27 },
    { category: "mlb" as const, count: 45, percentage: 18 },
    { category: "nhl" as const, count: 34, percentage: 14 },
    { category: "general" as const, count: 12, percentage: 5 }
  ]
};