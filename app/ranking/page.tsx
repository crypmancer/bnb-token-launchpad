import { Navigation } from "../../components/navigation"
import { TransactionTicker } from "../../components/transaction-ticker"
import { RankingTable } from "../../components/ranking-table"
import React from "react"

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TransactionTicker />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Token Rankings</h1>
          <p className="text-muted-foreground text-lg">Top performing meme tokens on BSC</p>
        </div>

        <RankingTable />
      </main>
    </div>
  )
}
