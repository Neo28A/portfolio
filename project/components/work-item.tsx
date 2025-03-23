"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "./ui/badge"

interface WorkItemProps {
  title: string
  href: string
  description: string
  year?: string
  target?: string
}

export function WorkItem({ title, href, description, year, target }: WorkItemProps) {
  return (
    <Link 
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="group block p-3 rounded-lg hover:bg-secondary/30 transition-all duration-300 transform hover:scale-[1.02] origin-center"
    >
      <div className="flex items-start gap-2">
        <div className="space-y-1 w-full">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 relative">
              <h3 className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <ArrowUpRight 
                size={16} 
                className="text-muted-foreground/50 group-hover:text-primary transition-all duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 absolute -right-5 top-0.5" 
              />
            </div>
            {year && (
              <Badge variant="outline" className="text-xs font-normal ml-6">
                {year}
              </Badge>
            )}
          </div>
          <p className="text-[14px] leading-7 text-muted-foreground tracking-[-0.3px]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}