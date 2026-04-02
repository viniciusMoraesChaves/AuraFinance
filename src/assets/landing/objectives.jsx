import { ObjectiveCard } from '../components/objectiveCard'
import favoriteIcon from '../img/icons/favorite.svg'
import calculatorIcon from '../img/icons/calculator.svg'
import hatIcon from '../img/icons/hat.svg'

function Objectives() {
    return (
        <>
            <div className="objectives" style={{ width: "100vw", height: "100vh", background:"#f9fafb", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"10vh"}}>
                <h1 style={{color: "#101828"}}>Nossos Objetivos</h1>
                <label style={{color:"#4a5565", fontWeight:"400", marginBottom:"40px"}}>Três pilares fundamentais para sua jornada rumo à prosperidade financeira</label>
                <div className="objectivesDiv" style={{width:"95vw", height:"40vh", display: "flex", justifyContent: "space-around"}}>
                    <ObjectiveCard 
                        title="Educação Financeira" 
                        description={
                             <>
                                Aprenda a realizar melhores investimentos no <br />
                                futuro com nossos guias e ferramentas <br />
                                educacionais.
                            </>
                        }  
                        iconFile={hatIcon}
                        color='#DBEAFE'
                    />
                    <ObjectiveCard 
                        title="Simulador Personalizado" 
                        description={
                             <>
                                Simule investimentos com base na sua renda<br />
                                mensal e descubra as melhores oportunidades.
                            </>
                        } 
                        iconFile={calculatorIcon}
                        color='#dbfce7'
                    />
                    <ObjectiveCard 
                        title="Gestão de Dívidas" 
                        description={
                             <>
                                Facilite sua vida financeira com ferramentas<br />
                                para organizar e eliminar suas dívidas.
                            </>
                        }  
                        iconFile={favoriteIcon}
                        color='#fee2e2'
                    />
                </div>
            </div>
        </>
    )

}

export default Objectives