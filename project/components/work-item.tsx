"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "./ui/badge"

interface WorkItemProps {
  title: string
  href: string
  description?: string
  year?: string
}

export function WorkItem({ title, href, description, year }: WorkItemProps) {
  return (
    <Link href={href} className="work-item group">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="work-item-title">{title}</span>
          {year && (
            <Badge variant="outline" className="text-xs font-normal">
              {year}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
        <ArrowRight size={16} className="work-item-arrow" />
      </div>
    </Link>
  )
}