"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { addGroceryItem, updateItemPrice } from "../actions/groceryActions"

interface GroceryItem {
  id: number
  name: string
  price: number
}

export default function GroceryList() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (newItem.trim()) {
      try {
        const addedItem = await addGroceryItem(newItem)
        setItems([...items, addedItem])
        setNewItem("")
      } catch (error) {
        setError("Failed to add item. Please try again.")
      }
    }
  }

  const handleUpdatePrice = async (id: number, newPrice: number) => {
    setError(null)
    try {
      const updatedItem = await updateItemPrice(id, newPrice)
      setItems(items.map((item) => (item.id === id ? updatedItem : item)))
    } catch (error) {
      setError("Failed to update price. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grocery List</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddItem} className="space-y-4 mb-4">
          <Input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new item" />
          <Button type="submit">Add Item</Button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <span>{item.name}</span>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleUpdatePrice(item.id, Number.parseFloat(e.target.value))}
                  className="w-24"
                  step="0.01"
                />
                <span>$</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

