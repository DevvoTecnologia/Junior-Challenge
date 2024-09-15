import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { Toaster } from 'sonner'
import { queryClient } from "./lib/react-query"
import { router } from "./routes"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton={true}/>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
