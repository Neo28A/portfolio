'use client';

import { useState } from 'react';

export function PreviousRoles() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 pl-6">
      <button 
        className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        >
          <path d="m9 18 6-6-6-6"/>
        </svg>
        Previous Roles
      </button>

      <div 
        className={`relative mt-2 space-y-4 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        {/* Timeline line with gradient - pushed inside */}
        <div className="absolute left-[-12px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/30 to-primary/5"></div>
        
        {/* Previous Role 1 */}
        <div className="relative">
          <div className="absolute left-[-14px] top-1.5 w-[5px] h-[5px] rounded-full bg-primary/20 ring-[1px] ring-background"></div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-semibold text-[11px] text-primary/90">ML Research Intern</h3>
              <span className="text-[9px] text-muted-foreground/80 px-1.5 py-0.5 rounded-full bg-secondary/20">2024</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-4 h-4 rounded-md bg-secondary/20">
                  <span className="text-[10px] font-medium text-primary/70">T</span>
                </div>
                <h4 className="text-[10px] text-muted-foreground">Compsoft Technologies</h4>
              </div>
              <span className="text-[9px] text-muted-foreground/80">Bangalore, India</span>
            </div>
          </div>
        </div>

        {/* Previous Role 2 */}
        {/* <div className="relative">
          <div className="absolute left-[-14px] top-1.5 w-[5px] h-[5px] rounded-full bg-primary/20 ring-[1px] ring-background"></div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-semibold text-[11px] text-primary/90">Research Assistant</h3>
              <span className="text-[9px] text-muted-foreground/80 px-1.5 py-0.5 rounded-full bg-secondary/20">2022</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-4 h-4 rounded-md bg-secondary/20">
                  <span className="text-[10px] font-medium text-primary/70">U</span>
                </div>
                <h4 className="text-[10px] text-muted-foreground">University Research Lab</h4>
              </div>
              <span className="text-[9px] text-muted-foreground/80">Hubballi, India</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
} 