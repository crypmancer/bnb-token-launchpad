"use client"

import Image from "next/image"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { TrendingUp, TrendingDown, Users } from "lucide-react"
import React from "react"

interface TokenCardProps {
  token: {
    id: string
    name: string
    symbol: string
    image: string
    marketCap: number
    price: number
    priceChange24h: number
    volume24h: number
    holders: number
    description: string
    contractAddress: string
  }
}

export function TokenCard({ token }: TokenCardProps) {
  const isPositive = token.priceChange24h > 0

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Image
            src={token.image || "/placeholder.svg"}
            alt={token.name}
            width={56}
            height={56}
            className="rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">{token.name}</h3>
            <p className="text-sm text-muted-foreground">{token.symbol}</p>
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-primary" : "text-destructive"}`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(token.priceChange24h).toFixed(1)}%
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{token.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-semibold">{formatNumber(token.marketCap)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Volume 24h</p>
            <p className="font-semibold">{formatNumber(token.volume24h)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold font-mono">{token.price.toFixed(6)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Holders</p>
            <p className="font-semibold flex items-center gap-1">
              <Users className="w-3 h-3" />
              {token.holders.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Buy</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Chart
          </Button>
        </div>
      </div>
    </Card>
  )
}
