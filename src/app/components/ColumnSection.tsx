import React, { useState } from "react";
import { Zap, BarChart3, ChevronUp } from "lucide-react";
import TokenCard from "./TokenCard";
import NewPairsTokenCard from "./NewPairsTokenCard";
import { EnhancedToken } from "./tokenUtils";

interface ColumnSectionProps {
  title: string;
  tokens: EnhancedToken[];
  count: number;
  isNewPairs?: boolean;
}

const ColumnSection: React.FC<ColumnSectionProps> = ({
  title,
  tokens,
  count,
  isNewPairs = false,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'1' | '2' | '3'>('1');
  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden" style={{backgroundColor: '#101114'}}>
      {/* Column Header - Responsive */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] flex-shrink-0" style={{backgroundColor: '#101114'}}>
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium text-sm">{title}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Zap className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-[#9CA3AF] text-sm">{count}</span>
          <BarChart3 className="w-4 h-4 text-[#9CA3AF]" />
          <div className="flex items-center space-x-1">
            <button onClick={()=>setSelectedPriority('1')} className={`${selectedPriority == '1' ? "bg-[#3B82F6]" : "text-[#9CA3AF]"} text-white px-2 py-1 rounded text-xs font-medium cursor-pointer`}>P1</button>
            <button onClick={()=>setSelectedPriority('2')} className={`${selectedPriority == '2' ? "bg-[#3B82F6]" : "text-[#9CA3AF]"} text-white px-2 py-1 rounded text-xs font-medium cursor-pointer`}>P2</button>
            <button onClick={()=>setSelectedPriority('3')} className={`${selectedPriority == '3' ? "bg-[#3B82F6]" : "text-[#9CA3AF]"} text-white px-2 py-1 rounded text-xs font-medium cursor-pointer`}>P3</button>
          </div>
          <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
        </div>
      </div>
      {/* Token List - Responsive content that expands to fill space */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #101114'}}>
        <div className="p-4 space-y-3 h-full" style={{minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
          {tokens.map((token) => (
            <div key={token.id} style={{minHeight: '120px', maxHeight: '200px', marginBottom: '30px'}}>
              {isNewPairs ? 
                <NewPairsTokenCard token={{
                  id: token.id.toString(),
                  name: token.name,
                  symbol: token.symbol,
                  age: token.age,
                  marketCap: token.marketCap.toString(),
                  price: token.price.toString(),
                  volume24h: token.volume24h.toString(),
                  transactions24h: token.transactions24h.toString(),
                  priceChange24h: token.priceChange24h.toString(),
                  image: token.image,
                  holders: token.holders.toString(),
                  buys: token.buys.toString(),
                  sells: token.sells.toString(),
                  creator: token.creator
                }} /> :
                <TokenCard token={{
                  id: token.id.toString(),
                  name: token.name,
                  symbol: token.symbol,
                  age: token.age,
                  marketCap: token.marketCap.toString(),
                  price: token.price.toString(),
                  volume24h: token.volume24h.toString(),
                  transactions24h: token.transactions24h.toString(),
                  priceChange24h: token.priceChange24h.toString(),
                  image: token.image,
                  holders: token.holders.toString(),
                  buys: token.buys.toString(),
                  sells: token.sells.toString(),
                  creator: token.creator
                }} />
              }
            </div>
          ))}
          {tokens.length === 0 && (
            <div className="text-center py-8 text-[#9CA3AF] flex-1 flex items-center justify-center">
              No tokens in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColumnSection;
