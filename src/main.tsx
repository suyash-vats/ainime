import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Analytics } from "@vercel/analytics/react"
const queryClient = new QueryClient({defaultOptions: {
  queries: {
    refetchOnWindowFocus: false,
  },
}})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Analytics/>
      <App />
    </QueryClientProvider>
   </BrowserRouter>
  </StrictMode>,
)
