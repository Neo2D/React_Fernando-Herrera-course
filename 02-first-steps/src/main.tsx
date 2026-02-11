import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirstStepsApp } from './firstStepsApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstStepsApp />
  </StrictMode>
)
