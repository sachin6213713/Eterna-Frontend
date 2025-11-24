import React from "react";
import DisplayDropdown from "./DisplayDropdown";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export interface ControlBarProps {
  showDisplayDropdown: boolean;
  setShowDisplayDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlBar: React.FC<ControlBarProps> = ({ showDisplayDropdown, setShowDisplayDropdown }) => (
  <div className="w-full flex justify-end px-8 py-2 bg-[#0A0A0A]">
    <div className="flex items-center space-x-3 relative">
      {/* Display Dropdown */}
      <DisplayDropdown showDisplayDropdown={showDisplayDropdown} setShowDisplayDropdown={setShowDisplayDropdown} />
      {/* Volume Controls */}
      <div className="flex items-center space-x-2 bg-[#1A1A1A] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#2A2A2A] transition-colors">
        <Volume2 className="w-4 h-4 text-[#9CA3AF] hover:text-white transition-colors" />
      </div>
      <div className="flex items-center space-x-2 bg-[#1A1A1A] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#2A2A2A] transition-colors">
        <VolumeX className="w-4 h-4 text-[#9CA3AF] hover:text-white transition-colors" />
      </div>
      {/* Numerical Display */}
      <div className="flex items-center space-x-2 bg-[#1A1A1A] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#2A2A2A] transition-colors">
        <span className="text-sm text-[#9CA3AF]">1</span>
        <span className="text-sm text-[#9CA3AF]">=</span>
        <span className="text-sm text-[#9CA3AF]">0</span>
        <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
      </div>
    </div>
  </div>
);

export default ControlBar;
