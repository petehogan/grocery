import StoreLocator from "./components/StoreLocator"
import GroceryList from "./components/GroceryList"
import SalesNotifications from "./components/SalesNotifications"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grocery Price Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <StoreLocator />
          <SalesNotifications />
        </div>
        <GroceryList />
      </div>
    </div>
  )
}

