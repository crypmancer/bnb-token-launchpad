import { Navigation } from "../../components/navigation"
import { TransactionTicker } from "../../components/transaction-ticker"
import { TokenCreationForm } from "../../components/token-creation-form"
import React from "react"

export default function CreateTokenPage() {
  return (
    <div className="min-h-screen bg-background">
      <TransactionTicker />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-balance">Create Your Meme Token</h1>
            <p className="text-muted-foreground text-lg">Launch your token on BSC in minutes. No coding required.</p>
          </div>

          <TokenCreationForm />
        </div>
      </main>
    </div>
  )
}
