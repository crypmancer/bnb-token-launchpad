"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { TrendingUp, TrendingDown } from "lucide-react"
import React from "react"

const mockRankings = [
  {
    rank: 1,
    name: "Wojak Tears",
    symbol: "WOJAK",
    image: "/wojak-crying-meme.jpg",
    price: 0.000067,
    priceChange24h: 42.3,
    marketCap: 2100000,
    volume24h: 780000,
    holders: 5680,
  },
  {
    rank: 2,
    name: "Ape Together",
    symbol: "APE",
    image: "/ape-together-strong.jpg",
    price: 0.000055,
    priceChange24h: 28.9,
    marketCap: 1800000,
    volume24h: 620000,
    holders: 4320,
  },
  {
    rank: 3,
    name: "Pepe Classic",
    symbol: "PEPE",
    image: "/generic-sad-frog.png",
    price: 0.000045,
    priceChange24h: 15.5,
    marketCap: 1250000,
    volume24h: 450000,
    holders: 3420,
  },
  {
    rank: 4,
    name: "Doge Moon",
    symbol: "DMOON",
    image: "/doge-moon-rocket.jpg",
    price: 0.000032,
    priceChange24h: -8.2,
    marketCap: 890000,
    volume24h: 320000,
    holders: 2150,
  },
  {
    rank: 5,
    name: "Chad Finance",
    symbol: "CHAD",
    image: "/chad-gigachad-meme.jpg",
    price: 0.000021,
    priceChange24h: 5.7,
    marketCap: 560000,
    volume24h: 180000,
    holders: 1890,
  },
]

export function RankingTable() {
  const [sortBy, setSortBy] = useState<"marketCap" | "volume" | "holders">("marketCap")

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={sortBy === "marketCap" ? "default" : "outline"}
          onClick={() => setSortBy("marketCap")}
          className={sortBy === "marketCap" ? "bg-primary text-primary-foreground" : ""}
        >
          Market Cap
        </Button>
        <Button
          variant={sortBy === "volume" ? "default" : "outline"}
          onClick={() => setSortBy("volume")}
          className={sortBy === "volume" ? "bg-primary text-primary-foreground" : ""}
        >
          Volume 24h
        </Button>
        <Button
          variant={sortBy === "holders" ? "default" : "outline"}
          onClick={() => setSortBy("holders")}
          className={sortBy === "holders" ? "bg-primary text-primary-foreground" : ""}
        >
          Holders
        </Button>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold">#</th>
                <th className="p-4 font-semibold">Token</th>
                <th className="p-4 font-semibold text-right">Price</th>
                <th className="p-4 font-semibold text-right">24h %</th>
                <th className="p-4 font-semibold text-right">Market Cap</th>
                <th className="p-4 font-semibold text-right">Volume 24h</th>
                <th className="p-4 font-semibold text-right">Holders</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockRankings.map((token) => {
                const isPositive = token.priceChange24h > 0
                return (
                  <tr key={token.rank} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-semibold">{token.rank}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={token.image || "/placeholder.svg"}
                          alt={token.name}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">{token.name}</p>
                          <p className="text-sm text-muted-foreground">{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono">{token.price.toFixed(6)}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`flex items-center justify-end gap-1 font-semibold ${isPositive ? "text-primary" : "text-destructive"}`}
                      >
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(token.priceChange24h).toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold">{formatNumber(token.marketCap)}</td>
                    <td className="p-4 text-right">{formatNumber(token.volume24h)}</td>
                    <td className="p-4 text-right">{token.holders.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Trade
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
