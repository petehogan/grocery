"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { findStores } from "../actions/storeActions"

export default function StoreLocator() {
  const [location, setLocation] = useState("")
  const [stores, setStores] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await findStores(location)
      setStores(result)
    } catch (error) {
      console.error("Error finding stores:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Find Local Grocery Stores</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Finding Stores..." : "Find Stores"}
          </Button>
        </form>
        {stores.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Nearby Stores:</h3>
            <ul className="list-disc pl-5">
              {stores.map((store, index) => (
                <li key={index}>{store}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

