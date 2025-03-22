"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "./ui/badge"

interface WorkItemProps {
  title: string
  href: string
  description: string
  year?: string
}

export function WorkItem({ title, href, description, year }: WorkItemProps) {
  return (
    <Link 
      href={href}
      className="group block p-3 rounded-lg hover:bg-secondary/30 transition-all duration-300 transform hover:scale-[1.02] origin-center"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {year && (
              <Badge variant="outline" className="text-xs font-normal">
                {year}
              </Badge>
            )}
          </div>
          <p className="text-[14px] leading-7 text-muted-foreground tracking-[-0.3px]">
            {description}
          </p>
        </div>
        <ArrowUpRight 
          size={16} 
          className="text-muted-foreground/50 group-hover:text-primary transition-all duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" 
        />
      </div>
    </Link>
  )
}