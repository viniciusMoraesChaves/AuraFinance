import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import LandingPage from './assets/pages/LandingPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LandingPage></LandingPage>
  </StrictMode>,
)
