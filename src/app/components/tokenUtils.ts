// Token interfaces and helpers extracted from Main.tsx

export interface Token {
  id: number;
  name: string;
  symbol: string;
  age: string;
  marketCap: number;
  price: number;
  volume24h: number;
  transactions24h: number;
  priceChange24h: number;
  image: string;
}

export interface EnhancedToken extends Token {
  category: "new" | "final" | "migrated";
  mcValue: string;
  priceValue: string;
  txValue: string;
  holders: number;
  creator: string;
  buys: number;
  sells: number;
  change5m: number;
  change1h: number;
  change24h: number;
}

export const mockTokens: Token[] = [
  {
    id: 1,
    name: "TIAGO",
    symbol: "tiago",
    age: "3",
    marketCap: 7000,
    price: 5000,
    volume24h: 7000,
    transactions24h: 7,
    priceChange24h: 16,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c40a6e45?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Viper",
    symbol: "Viper",
    age: "8",
    marketCap: 5000,
    price: 0,
    volume24h: 0,
    transactions24h: 0,
    priceChange24h: 7,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "priceless",
    symbol: "Mona Lisa",
    age: "14",
    marketCap: 5000,
    price: 134,
    volume24h: 11000,
    transactions24h: 11,
    priceChange24h: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/100px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  },
  {
    id: 4,
    name: "TRUTHF",
    symbol: "Truth Fiasco",
    age: "14",
    marketCap: 5000,
    price: 1,
    volume24h: 4000,
    transactions24h: 4,
    priceChange24h: 0,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "tiago",
    symbol: "Lofi Girl's friend",
    age: "16",
    marketCap: 5000,
    price: 2000,
    volume24h: 7000,
    transactions24h: 7,
    priceChange24h: -5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

export const formatMarketCap = (mc: number): string => {
  if (mc >= 1000000) return `$${(mc / 1000000).toFixed(1)}M`;
  if (mc >= 1000) return `$${(mc / 1000).toFixed(0)}K`;
  return `$${mc}`;
};

export const formatPrice = (price: number): string => {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(0)}M`;
  if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
  return `$${price}`;
};

export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const enhanceTokenData = (tokens: Token[]): EnhancedToken[] => {
  const expandedTokens: Token[] = [];
  for (let i = 0; i < 8; i++) {
    expandedTokens.push(...tokens.map(token => ({
      ...token,
      id: token.id + (i * 100),
      name: `${token.name}_${i + 1}`,
      symbol: `${token.symbol}_${i + 1}`
    })));
  }

  return expandedTokens.map((token, index) => {
    let category: 'new' | 'final' | 'migrated' = 'migrated';
    const categoryIndex = index % 3;
    if (categoryIndex === 0) {
      category = 'new';
    } else if (categoryIndex === 1) {
      category = 'final';
    } else {
      category = 'migrated';
    }
    const deterministicSeed = token.id + index;
    const holders = (deterministicSeed * 7) % 100;
    const creator = `Creator_${(deterministicSeed * 13) % 100000}`;
    const buys = Math.floor(token.transactions24h * 0.6);
    const sells = Math.floor(token.transactions24h * 0.4);
    const change5m = ((deterministicSeed * 3) % 20) - 10;
    const change1h = ((deterministicSeed * 5) % 30) - 15;
    const change24h = token.priceChange24h + ((deterministicSeed * 2) % 10) - 5;
    return {
      ...token,
      category,
      mcValue: formatMarketCap(token.marketCap),
      priceValue: formatPrice(token.price),
      txValue: formatNumber(token.volume24h / 1000, 2) + 'K',
      holders,
      creator,
      buys,
      sells,
      change5m,
      change1h,
      change24h
    };
  });
};
