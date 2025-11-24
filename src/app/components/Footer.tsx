"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeTab } from "../slices/tabsSlice";
import { setSelectedPreset } from "../slices/presetSlice";
import {
  Star,
  ChevronDown,
  X,
  Clock,
  TrendingUp,
  Bell,
} from "lucide-react";

const trackerTabs = [
  {
    key: "wallet",
    label: "Wallet Tracker",
    alert: 2,
    icon: <i className="text-[16px] ri-wallet-3-line text-[#888] mr-1"></i>,
    closeable: false,
  },
  {
    key: "twitter",
    label: "Twitter Tracker",
    alert: 1,
    icon: <i className="text-[16px] ri-twitter-x-line text-[#888] mr-1"></i>,
    closeable: false,
  },
  {
    key: "pulse",
    label: "Pulse Tracker",
    alert: 3,
    icon: <i className="text-[16px] ri-pulse-line text-[#888] mr-1"></i>,
    closeable: false,
  },
  {
    key: "pnl",
    label: "PnL Tracker",
    alert: null,
    icon: <i className="text-[16px] ri-bar-chart-line text-[#888] mr-1"></i>,
    closeable: false,
  },
];

const presetList = [
  "PRESET 1",
  "PRESET 2",
  "PRESET 3"
];

// Replace the localeList and selectedLocale logic with the new region options
const regionList = [
  "US-W",
  "US-C",
  "US-E",
  "EU-W",
  "EU-C",
  "EU-E",
  "ASIA",
  "AUS",
  "GLOBAL"
];

export default function Footer() {
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("wallet");
  const dispatch = useDispatch();
  const tabs = useSelector((state: RootState) => state.tabs);
  const selectedPreset = useSelector((state: RootState) => state.preset.selectedPreset);
  const [selectedRegion, setSelectedRegion] = useState(regionList[8]); // Default to GLOBAL
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showDisplayDropdown, setShowDisplayDropdown] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const presetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (showPresetDropdown && presetRef.current && !presetRef.current.contains(e.target as Node)) {
        setShowPresetDropdown(false);
      }
      if (showRegionDropdown && regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setShowRegionDropdown(false);
      }
    }
    window.addEventListener('mousedown', handle);
    return () => window.removeEventListener('mousedown', handle);
  }, [showPresetDropdown, showRegionDropdown]);

  const handleCloseTab = (key: string) => dispatch(closeTab(key));
  const switchTab = (key: string) => setActiveTab(key);

  return (
    <>
    {/* ...existing code... */}
      <footer
        className="fixed z-50 bottom-0 left-0 right-0 w-full bg-[#16181c] border-t border-[#2a2d34] font-['-apple-system',BlinkMacSystemFont,'Segoe_UI',Roboto] text-xs"
        style={{ boxShadow: "0 -1.5px 8px 0 #0008" }}
      >
        <div className="
          flex items-center justify-between
          min-h-[44px] px-2 sm:px-3 md:px-5 lg:px-8
          font-normal overflow-hidden
          "
          >
          {/* 1. PRESET SELECTOR */}
          <div className="flex items-center h-full pr-1 sm:pr-3 relative select-none min-w-[100px] sm:min-w-[130px] md:min-w-[160px] flex-shrink-0" ref={presetRef}>
            <div className="relative">
              <button
                className="flex items-center bg-[#2533A8] hover:bg-[#1a255e] text-[#B1C6FF] font-semibold text-[10px] sm:text-[11px] h-[26px] px-[8px] sm:px-[10px] rounded border-0 focus:outline-none focus:ring-0 active:border-0 focus:border-0 hover:border-0 border-transparent focus:border-transparent active:border-transparent"
                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                onClick={() => setShowPresetDropdown((v) => !v)}
              >
                <span className="flex items-center mr-1">
                  <svg width="14" height="14" className="sm:w-[16px] sm:h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93"/>
                  </svg>
                </span>
                <span className="truncate hidden sm:inline">{selectedPreset}</span>
                <span className="truncate sm:hidden">P1</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {showPresetDropdown && (
                <div className="absolute left-0 bottom-full mb-2 w-56 bg-[#232323] border border-[#292929] rounded-2xl shadow-2xl z-50 flex flex-col py-4">
                  <div className="px-6 py-3 text-[18px] text-[#B1C6FF] font-bold flex items-center gap-2">
                    <svg width="24" height="24" fill="none" stroke="#B1C6FF" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="7" width="18" height="10" rx="2"/>
                      <rect x="7" y="11" width="2" height="2" rx="1"/>
                      <rect x="15" y="11" width="2" height="2" rx="1"/>
                    </svg>
                    <span>1</span>
                    <span className="mx-2 w-8 h-1 bg-gradient-to-r from-[#6C8CFF] to-[#9945FF] rounded-full"></span>
                    <span className="bg-[#232323] px-2 py-1 rounded text-[#B1C6FF]">0</span>
                  </div>
                  {/* ...existing dropdown code... */}
                  {presetList.map((name) => (
                    <div
                      key={name}
                      className={`py-2 px-6 text-[15px] cursor-pointer ${name === selectedPreset ? 'bg-[#1976d2] text-white font-bold' : 'hover:bg-[#222f52] text-[#cdcdcd]'}`}
                      onClick={() => {
                        dispatch(setSelectedPreset(name));
                        setShowPresetDropdown(false);
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showPresetDropdown && (
              <div className="absolute left-0 top-[110%] mt-1 w-28 sm:w-32 md:w-36 bg-[#24292f] border border-[#292929] rounded overflow-hidden shadow-md z-50">
                {presetList.map((name) => (
                  <div
                    key={name}
                    className={`py-1 px-3 text-[10px] sm:text-[11px] cursor-pointer ${name === selectedPreset ? 'bg-[#1976d2] text-white font-bold' : 'hover:bg-[#222f52] text-[#cdcdcd]'}`}
                    onClick={() => {
                      setSelectedPreset(name);
                      setShowPresetDropdown(false);
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 2. TAB BAR */}
          <nav className="flex items-end h-full ml-1 sm:ml-2 md:ml-[12px] min-w-0 overflow-x-auto scrollbar-thin flex-shrink-0">
            {/* Wallet Count/Status Badge */}
            <div className="flex items-center bg-[#181A20] border border-[#23262F] rounded-lg px-2 sm:px-3 py-1 mr-2 sm:mr-3">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#A3A9B7] mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="10" rx="2"/>
                <rect x="7" y="11" width="2" height="2" rx="1"/>
                <rect x="15" y="11" width="2" height="2" rx="1"/>
              </svg>
              <span className="text-[#B1C6FF] font-semibold mr-1 sm:mr-2 text-[10px] sm:text-[11px]">1</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" viewBox="0 0 16 16">
                <defs>
                  <linearGradient id="gradient-bar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6C8CFF"/>
                    <stop offset="100%" stopColor="#9945FF"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="7" width="12" height="2" rx="1" fill="url(#gradient-bar)"/>
              </svg>
              <span className="text-[#B1C6FF] font-semibold mr-1 sm:mr-2 text-[10px] sm:text-[11px]">0</span>
              <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 text-[#6C7A93]" />
          </div>
          
            {/* Vertical Divider */}
            <span className="h-6 border-l border-[#23262F] mx-1 sm:mx-2"></span>
            
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`flex items-center px-1 sm:px-2 md:px-3 py-2 text-[10px] sm:text-[11px] cursor-pointer transition-colors min-w-fit flex-shrink-0 ${
                  activeTab === tab.key
                    ? 'bg-[#2a2a2a] text-white font-medium rounded-t-md relative -top-[1px]'
                    : 'text-[#888] hover:text-white'
                }`}
                onClick={() => switchTab(tab.key)}
              >
                <i className={`text-[16px] ${tab.iconClass} text-[#888] mr-1`}></i>
                <span className="truncate hidden sm:inline">{tab.label}</span>
                <span className="truncate sm:hidden">{tab.label.split(' ')[0]}</span>
                {tab.alert != null && (
                  <sup className="ml-1 text-[7px] sm:text-[8px] font-semibold" style={{ color: activeTab === tab.key ? "#f14463" : "#e57373" }}>{tab.alert}</sup>
                )}
                {tab.closeable && (
                  <X
                    className="w-2 h-2 sm:w-3 sm:h-3 ml-1 sm:ml-2 cursor-pointer hover:text-red-500"
                    onClick={e => { e.stopPropagation(); handleCloseTab(tab.key); }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* 3. STATUS STRIP (HIDE ON xs screens) */}
          <div className="hidden md:flex items-center pl-2 lg:pl-4 min-w-0 flex-1 flex-shrink-0 overflow-x-auto">
            {/* Preset # badge */}
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-black rounded-full flex items-center justify-center mx-1 sm:mx-2 border-2 border-[#232323]">
              <span className="text-white font-bold text-[9px] sm:text-[11px]">1</span>
            </div>
            {/* = */}
            <span className="text-[#d5d5d8] text-[10px] sm:text-xs mr-1 sm:mr-2 font-bold">=</span>
            {/* Chevron (down) */}
            <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 text-[#cccccc] mr-3 sm:mr-6" />
            {/* Dots */}
            <div className="flex items-center space-x-[2px] sm:space-x-[3px] mr-2 sm:mr-3">
              <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-[#ffc107] rounded-full" />
              <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-[#2196f3] rounded-full" />
              <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-[#4caf50] rounded-full" />
              <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-[#f44336] rounded-full" />
            </div>
            {/* Exclamation triangle (warnings) */}
            <svg className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-[#ff9800] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.17L19.83 19H4.17L12 5.17zM11 16h2v2h-2zm0-6h2v4h-2z" />
            </svg>
            {/* Money stats */}
            <span className="text-[#ff9800] text-[10px] sm:text-xs font-semibold tracking-[-0.01em]">$118.1K</span>
            <span className="text-[#2196f3] text-[10px] sm:text-xs font-semibold ml-2 sm:ml-3 tracking-[-0.01em]">$3732</span>
            <span className="text-[#4caf50] text-[10px] sm:text-xs font-semibold ml-2 sm:ml-3 tracking-[-0.01em]">$185.99</span>
          </div>

          {/* 4. FAR RIGHT INFO BAR */}
          <div className="flex items-center ml-auto pl-1 sm:pl-2 pr-1 sm:pr-2 md:pr-4 min-w-fit flex-shrink-0">
            {/* Trending, clock, 2 times */}
            <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 text-[#888] mr-1" />
            <span className="hidden sm:inline text-[#888] text-[10px] sm:text-[11px]">975.3K</span>
            <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-[#888] ml-2 sm:ml-3 mr-1" />
            <span className="hidden sm:inline text-[#888] text-[10px] sm:text-[11px]">0.0:3</span>
            <span className="hidden sm:inline text-[#888] text-[10px] sm:text-[11px] ml-1">0.0:26</span>
            {/* Connection stable */}
            <div className="hidden lg:flex items-center ml-3 sm:ml-5">
              {/* First pill icon and value */}
              <svg className="w-3 h-3 sm:w-4 sm:h-3 text-[#888] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="8" width="16" height="8" rx="4" strokeWidth={1.5}/>
                <line x1="8" y1="12" x2="16" y2="12" strokeWidth={1.5}/>
              </svg>
              <span className="text-[#888] text-[10px] sm:text-[11px] mr-2 sm:mr-3">$75.2K</span>
              
              {/* Gas pump icon and value */}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#888] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="8" width="12" height="8" rx="1" strokeWidth={1.5}/>
                <path d="M10 8V6M10 6H8M10 6H12" strokeWidth={1.5}/>
                <path d="M12 10L14 8L16 10" strokeWidth={1.5}/>
                <line x1="14" y1="8" x2="14" y2="12" strokeWidth={1.5}/>
              </svg>
              <span className="text-[#888] text-[10px] sm:text-[11px] mr-2 sm:mr-3">0.003</span>
              
              {/* Second pill icon and value */}
              <svg className="w-3 h-3 sm:w-4 sm:h-3 text-[#888] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="8" width="16" height="8" rx="4" strokeWidth={1.5}/>
                <line x1="8" y1="12" x2="16" y2="12" strokeWidth={1.5}/>
              </svg>
              <span className="text-[#888] text-[10px] sm:text-[11px] mr-2 sm:mr-3">0.0<sub>2</sub>25</span>
              
              <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-[#4caf50] rounded-full mr-1"></div>
              <span className="text-[#4caf50] text-[9px] sm:text-[10px] leading-none whitespace-nowrap">Connection is stable</span>
              
              {/* GLOBAL region dropdown (single instance, styled as in screenshot) */}
              <div className="flex items-center ml-3 sm:ml-4 relative select-none flex-shrink-0" ref={regionRef}>
                <button
                  className="flex items-center text-[#cdcdcd] text-[13px] font-medium uppercase hover:text-white transition bg-[#232323] px-4 py-2 rounded-lg border border-[#292929] min-w-[90px] justify-between shadow"
                  style={{ letterSpacing: "2px", height: '32px' }}
                  onClick={() => setShowRegionDropdown((v) => !v)}
                >
                  <span>{selectedRegion}</span>
                  <ChevronDown className="w-4 h-4 text-[#888] ml-2" />
                </button>
                {showRegionDropdown && (
                  <div className="absolute left-0 bottom-full mb-2 w-44 bg-[#232323] border border-[#292929] rounded-xl shadow-lg z-50 flex flex-col py-2" style={{maxHeight:'400px',overflowY:'auto'}}>
                    {regionList.map(region => (
                      <div
                        key={region}
                        className={`px-6 py-3 text-[15px] cursor-pointer flex items-center ${region === selectedRegion ? 'bg-[#18181b] text-white font-bold' : 'hover:bg-[#18181b] text-[#cdcdcd]'}`}
                        onClick={() => {
                          setSelectedRegion(region);
                          setShowRegionDropdown(false);
                        }}
                      >
                        <span>{region}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
        
            {/* Locale dropdown */}
            {/* The locale dropdown block has been removed as per the edit hint. */}

            {/* Additional Icons Section */}
            <div className="flex items-center ml-1 sm:ml-2 md:ml-4 flex-shrink-0">
            {/* Rectangle icon */}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5}/>
                <line x1="7" y1="7" x2="17" y2="7" strokeWidth={1.5}/>
              </svg>
            {/* Bell icon */}
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-[#888] ml-1 sm:ml-2 md:ml-3" />
            {/* Palette icon */}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#888] ml-1 sm:ml-2 md:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" strokeWidth={1.5}/>
                <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
              </svg>
              {/* Vertical separator */}
              <span className="h-3 sm:h-4 border-l border-[#333] mx-1 sm:mx-2 md:mx-3"></span>
            {/* Discord icon */}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#888]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            {/* X icon */}
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-[#888] ml-1 sm:ml-2 md:ml-3" />
              {/* Document icon */}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#888] ml-1 sm:ml-2 md:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {/* Docs text */}
              <span className="hidden md:inline text-[#888] text-[10px] sm:text-[11px] ml-1 sm:ml-2">Docs</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}