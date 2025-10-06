"use client"

import React from "react"

import { useState } from "react"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Upload, Rocket, Info, Wallet } from "lucide-react"
import Image from "next/image"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"

export function TokenCreationForm() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    totalSupply: "",
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const { address, isConnected } = useAccount()
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }

    setIsCreating(true)

    // Simulate token creation (in production, this would deploy a contract)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Token creation data:", formData)
    console.log("[v0] Connected wallet:", address)

    // In production, you would:
    // 1. Upload image to IPFS
    // 2. Deploy token contract with writeContract
    // 3. Wait for transaction confirmation

    alert(`Token created successfully! (Demo mode)\nWallet: ${address}`)
    setIsCreating(false)
  }

  return (
    <Card className="bg-card border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Token Image Upload */}
        <div>
          <Label htmlFor="image" className="text-base font-semibold mb-2 block">
            Token Image
          </Label>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {imagePreview ? (
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Token preview"
                  width={120}
                  height={120}
                  className="rounded-lg border-2 border-border"
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Upload a square image (recommended: 512x512px). PNG, JPG, or GIF.
              </p>
            </div>
          </div>
        </div>

        {/* Token Name */}
        <div>
          <Label htmlFor="name" className="text-base font-semibold mb-2 block">
            Token Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g., Pepe Classic"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12"
          />
        </div>

        {/* Token Symbol */}
        <div>
          <Label htmlFor="symbol" className="text-base font-semibold mb-2 block">
            Token Symbol
          </Label>
          <Input
            id="symbol"
            type="text"
            placeholder="e.g., PEPE"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
            required
            maxLength={10}
            className="h-12"
          />
          <p className="text-sm text-muted-foreground mt-1">Max 10 characters, will be uppercase</p>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-base font-semibold mb-2 block">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell the world about your token..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Total Supply */}
        <div>
          <Label htmlFor="totalSupply" className="text-base font-semibold mb-2 block">
            Total Supply
          </Label>
          <Input
            id="totalSupply"
            type="number"
            placeholder="e.g., 1000000000"
            value={formData.totalSupply}
            onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
            required
            min="1"
            className="h-12"
          />
          <p className="text-sm text-muted-foreground mt-1">Total number of tokens to mint</p>
        </div>

        {/* Info Box */}
        <Card className="bg-muted border-border p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm space-y-2">
              <p className="font-semibold">Token Creation Fee: 0.1 BNB</p>
              <p className="text-muted-foreground">
                Your token will be deployed on Binance Smart Chain. Make sure you have enough BNB in your wallet for the
                creation fee and gas costs.
              </p>
            </div>
          </div>
        </Card>

        <Button
          type="submit"
          disabled={isCreating || !isConnected}
          className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {!isConnected ? (
            <>
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet First
            </>
          ) : isCreating ? (
            <>Creating Token...</>
          ) : (
            <>
              <Rocket className="w-5 h-5 mr-2" />
              Create Token
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
