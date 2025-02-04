"use server"

const groceryItems: { id: number; name: string; price: number }[] = []
let nextId = 1

export async function addGroceryItem(name: string) {
  const newItem = { id: nextId++, name, price: 0 }
  groceryItems.push(newItem)
  return newItem
}

export async function updateItemPrice(id: number, price: number) {
  const item = groceryItems.find((item) => item.id === id)
  if (item) {
    item.price = price
    return item
  }
  throw new Error("Item not found")
}

export async function getGroceryItems() {
  return groceryItems
}

