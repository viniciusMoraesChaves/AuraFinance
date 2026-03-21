import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Objectives from './assets/landing/objectives'
import './assets/landing/Hero.css'
import Hero from './assets/landing/Hero'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero />
    <Objectives />
  </StrictMode>,
)
