"use server"

import { getGroceryItems } from "./groceryActions"

export async function checkForSales() {
  const items = await getGroceryItems()

  // Simulate checking for sales
  return items
    .filter(() => Math.random() < 0.3) // 30% chance of an item being on sale
    .map((item) => ({
      name: item.name,
      store: ["FreshMart", "SuperSaver", "GreenGrocer"][Math.floor(Math.random() * 3)],
      discount: Math.floor(Math.random() * 30) + 10, // 10-40% discount
    }))
}

