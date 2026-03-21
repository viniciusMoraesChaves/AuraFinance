import { useRef } from 'react'
import './Hero.css'
import Navbar from '../components/navbar'
import InteractiveModel from '../components/interactiveModel'

function Hero() {
  const navRef = useRef(null)

  return (
    <>
      <Navbar ref={navRef} />
      <div className="app">
        <div className="left-section">
          <h1>Transforme seu <br />Futuro Financeiro</h1>
          <label>A AuraFinance é sua parceira completa para alcançar a liberdade<br></br> financeira. Aprenda, simule e conquiste seus objetivos com <br></br>inteligência e segurança.</label>
          <div className="buttonOrganizer">
              <button id="startButton">Começar Agora</button>
              <button id="simulateButton">Simular Investimento</button>
          </div>
        </div>
        <div className="right-section">
          <InteractiveModel />
        </div>
      </div>
    </>
  )
}

export default Hero