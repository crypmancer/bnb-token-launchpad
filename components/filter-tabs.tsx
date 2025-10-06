"use client"

import React from "react"
import { Button } from "./ui/button"

const filters = ["All", "PancakeSwap", "New Listings", "Trending", "Top Gainers", "Top Volume"]

interface FilterTabsProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export function FilterTabs({ activeFilter, setActiveFilter }: FilterTabsProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(filter)}
          className={activeFilter === filter ? "bg-primary text-primary-foreground" : ""}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}
