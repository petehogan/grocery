"use server"

export async function findStores(location: string): Promise<string[]> {
  try {
    const response = await fetch("http://localhost:8000/find-stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch stores")
    }

    const data = await response.json()
    return data.stores
  } catch (error) {
    console.error("Error finding stores:", error)
    return []
  }
}

