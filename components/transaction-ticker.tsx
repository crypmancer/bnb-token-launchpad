"use client"

import React from "react"
import { useEffect, useState } from "react"

interface Transaction {
  id: string
  user: string
  action: string
  token: string
  amount: string
  time: string
}

const mockTransactions: Transaction[] = [
  { id: "1", user: "0x1234...5678", action: "bought", token: "PEPE", amount: "1.2 BNB", time: "2s ago" },
  { id: "2", user: "0xabcd...ef12", action: "sold", token: "WOJAK", amount: "0.8 BNB", time: "5s ago" },
  { id: "3", user: "0x9876...5432", action: "bought", token: "CHAD", amount: "2.5 BNB", time: "8s ago" },
  { id: "4", user: "0xfedc...ba98", action: "bought", token: "DMOON", amount: "0.5 BNB", time: "12s ago" },
  { id: "5", user: "0x5555...6666", action: "sold", token: "APE", amount: "1.8 BNB", time: "15s ago" },
  { id: "6", user: "0x7777...8888", action: "bought", token: "MCAT", amount: "0.3 BNB", time: "18s ago" },
]

export function TransactionTicker() {
  const [transactions, setTransactions] = useState(mockTransactions)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const tokens = ["PEPE", "WOJAK", "CHAD", "DMOON", "APE", "MCAT"]
        const actions = ["bought", "sold"]
        const newTx: Transaction = {
          id: Date.now().toString(),
          user: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
          action: actions[Math.floor(Math.random() * actions.length)],
          token: tokens[Math.floor(Math.random() * tokens.length)],
          amount: `${(Math.random() * 5).toFixed(1)} BNB`,
          time: "just now",
        }
        return [newTx, ...prev.slice(0, 19)]
      })
    }, 4000)

    const timeInterval = setInterval(() => {
      setTransactions((prev) =>
        prev.map((tx) => {
          if (tx.time === "just now") return { ...tx, time: "1s ago" }
          const match = tx.time.match(/(\d+)s ago/)
          if (match) {
            const seconds = Number.parseInt(match[1]) + 1
            if (seconds >= 60) return { ...tx, time: `${Math.floor(seconds / 60)}m ago` }
            return { ...tx, time: `${seconds}s ago` }
          }
          return tx
        }),
      )
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <div className="bg-secondary border-b border-border overflow-hidden">
      <div className="relative flex overflow-x-hidden">
        <div className="py-2 animate-marquee whitespace-nowrap flex gap-8 px-4">
          {transactions.map((tx) => (
            <span key={tx.id} className="text-sm inline-flex items-center gap-1">
              <span className="text-muted-foreground">{tx.user}</span>{" "}
              <span
                className={tx.action === "bought" ? "text-primary font-semibold" : "text-destructive font-semibold"}
              >
                {tx.action}
              </span>{" "}
              <span className="font-bold">{tx.token}</span>{" "}
              <span className="text-muted-foreground">for {tx.amount}</span>{" "}
              <span className="text-muted-foreground text-xs">• {tx.time}</span>
            </span>
          ))}
        </div>
        <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex gap-8 px-4">
          {transactions.map((tx) => (
            <span key={`${tx.id}-duplicate`} className="text-sm inline-flex items-center gap-1">
              <span className="text-muted-foreground">{tx.user}</span>{" "}
              <span
                className={tx.action === "bought" ? "text-primary font-semibold" : "text-destructive font-semibold"}
              >
                {tx.action}
              </span>{" "}
              <span className="font-bold">{tx.token}</span>{" "}
              <span className="text-muted-foreground">for {tx.amount}</span>{" "}
              <span className="text-muted-foreground text-xs">• {tx.time}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
