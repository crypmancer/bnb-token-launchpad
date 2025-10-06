"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Wallet, LogOut } from "lucide-react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import React from "react"

export function Navigation() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              FOUR.MEME
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm hover:text-primary transition-colors">
                Board
              </Link>
              <Link href="/create" className="text-sm hover:text-primary transition-colors">
                Create Token
              </Link>
              <Link href="/ranking" className="text-sm hover:text-primary transition-colors">
                Ranking
              </Link>
              <Link href="/advanced" className="text-sm hover:text-primary transition-colors">
                Advanced
              </Link>
              <Link href="/campaign" className="text-sm hover:text-primary transition-colors">
                Campaign
              </Link>
            </div>
          </div>

          {isConnected && address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Wallet className="w-4 h-4 mr-2" />
                  {formatAddress(address)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => disconnect()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {connectors.map((connector) => (
                  <DropdownMenuItem key={connector.id} onClick={() => connect({ connector })}>
                    {connector.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
