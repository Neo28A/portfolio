"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
}

export function CollapsibleSection({ 
  title, 
  children, 
  className = "",
  defaultOpen = false 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between p-0 hover:bg-transparent group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="section-title group-hover:text-foreground transition-colors">{title}</span>
        <ChevronDown 
          size={16} 
          className={cn(
            "text-muted-foreground transition-transform duration-300", 
            isOpen ? "rotate-180" : "",
            "group-hover:text-foreground"
          )} 
        />
      </Button>
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}