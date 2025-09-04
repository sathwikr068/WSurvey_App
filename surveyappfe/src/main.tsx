import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { AuroraBackground } from './components/ui/aurora-background.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuroraBackground>
      <AuthContextProvider>
    <RouterProvider router={router}/>
      </AuthContextProvider>
    </AuroraBackground>
  </StrictMode>,
)
