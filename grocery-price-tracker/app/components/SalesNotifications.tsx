"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { checkForSales } from "../actions/salesActions.ts"

interface SaleItem {
  name: string
  store: string
  discount: number
}

export default function SalesNotifications() {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([])

  useEffect(() => {
    const checkSales = async () => {
      const sales = await checkForSales()
      setSaleItems(sales)
    }

    checkSales()
    const interval = setInterval(checkSales, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {saleItems.length > 0 ? (
          <ul className="space-y-2">
            {saleItems.map((item, index) => (
              <li key={index} className="bg-green-100 p-2 rounded">
                <span className="font-semibold">{item.name}</span> is on sale at {item.store}! Save {item.discount}%
                off.
              </li>
            ))}
          </ul>
        ) : (
          <p>No current sales for your items.</p>
        )}
      </CardContent>
    </Card>
  )
}

