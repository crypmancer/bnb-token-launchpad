"use client"

import { useMemo } from "react"
import { TokenCard } from "./token-card"
import React from "react"

const mockTokens = [
  {
    id: "1",
    name: "Pepe Classic",
    symbol: "PEPE",
    image: "/generic-sad-frog.png",
    marketCap: 1250000,
    price: 0.000045,
    priceChange24h: 15.5,
    volume24h: 450000,
    holders: 3420,
    description: "The original meme coin on BSC",
    contractAddress: "0xtoken1234...def1234",
    category: "PancakeSwap",
  },
  {
    id: "2",
    name: "Doge Moon",
    symbol: "DMOON",
    image: "/doge-moon-rocket.jpg",
    marketCap: 890000,
    price: 0.000032,
    priceChange24h: -8.2,
    volume24h: 320000,
    holders: 2150,
    description: "To the moon and beyond",
    contractAddress: "0xtoken2345...def234567",
    category: "New Listings",
  },
  {
    id: "3",
    name: "Wojak Tears",
    symbol: "WOJAK",
    image: "/wojak-crying-meme.jpg",
    marketCap: 2100000,
    price: 0.000067,
    priceChange24h: 42.3,
    volume24h: 780000,
    holders: 5680,
    description: "Feel the pain, gain the gains",
    contractAddress: "0xtoken3456...def3456789",
    category: "Top Gainers",
  },
  {
    id: "4",
    name: "Chad Finance",
    symbol: "CHAD",
    image: "/chad-gigachad-meme.jpg",
    marketCap: 560000,
    price: 0.000021,
    priceChange24h: 5.7,
    volume24h: 180000,
    holders: 1890,
    description: "Only chads allowed",
    contractAddress: "0xtoken4567...def456789012",
    category: "PancakeSwap",
  },
  {
    id: "5",
    name: "Moon Cat",
    symbol: "MCAT",
    image: "/cat-astronaut-space.jpg",
    marketCap: 340000,
    price: 0.000018,
    priceChange24h: -3.4,
    volume24h: 95000,
    holders: 1240,
    description: "Cats in space",
    contractAddress: "0xtoken5678...def567890123",
    category: "Trending",
  },
  {
    id: "6",
    name: "Ape Together",
    symbol: "APE",
    image: "/ape-together-strong.jpg",
    marketCap: 1800000,
    price: 0.000055,
    priceChange24h: 28.9,
    volume24h: 620000,
    holders: 4320,
    description: "Apes together strong",
    contractAddress: "0xtoken6789...def678901234",
    category: "Top Volume",
  },
]

interface TokenGridProps {
  activeFilter: string
  searchQuery: string
}

export function TokenGrid({ activeFilter, searchQuery }: TokenGridProps) {
  const filteredTokens = useMemo(() => {
    let tokens = mockTokens

    // Apply category filter
    if (activeFilter !== "All") {
      if (activeFilter === "Top Gainers") {
        tokens = tokens.filter((t) => t.priceChange24h > 20)
      } else if (activeFilter === "Top Volume") {
        tokens = tokens.filter((t) => t.volume24h > 500000)
      } else {
        tokens = tokens.filter((t) => t.category === activeFilter)
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      tokens = tokens.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.symbol.toLowerCase().includes(query) ||
          t.contractAddress.toLowerCase().includes(query),
      )
    }

    return tokens
  }, [activeFilter, searchQuery])

  return (
    <>
      {filteredTokens.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No tokens found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      )}
    </>
  )
}
