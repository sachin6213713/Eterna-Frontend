"use client"

import { memo } from "react"
import { Star, TrendingUp } from "lucide-react"
import { Button } from "./ui/button"

export const SecondaryNav = memo(() => {
  return (
    <div className="flex items-center px-3 lg:px-4 py-0.5 bg-[#0a0a0a] border-b border-gray-800 min-h-[30px] max-h-[40px] overflow-hidden" style={{
      width: '100%',
      maxWidth: '100vw'
    }}>
      <div className="flex items-center space-x-0.5 min-w-0 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 rounded flex-shrink-0"
        >
          <Star className="w-2 h-2 lg:w-2.5 lg:h-2.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 rounded flex-shrink-0"
        >
          <TrendingUp className="w-2 h-2 lg:w-2.5 lg:h-2.5" />
        </Button>
      </div>
    </div>
  )
})

SecondaryNav.displayName = "SecondaryNav" 