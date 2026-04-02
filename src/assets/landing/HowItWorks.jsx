import landingImg from '../img/LandingPageImg.jpg';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Cadastre sua Renda",
      description: "Informe sua renda mensal e objetivos financeiros."
    },
    {
      number: 2,
      title: "Receba Recomendações",
      description: "Nosso sistema analisa e sugere as melhores opções de investimento."
    },
    {
      number: 3,
      title: "Acompanhe seu Progresso",
      description: "Monitore seus investimentos e conquiste sua liberdade financeira."
    }
  ];

  return (
    <section className="how-section" style={{padding: '80px 40px', background: '#fff'}}>
      <div className="how-container" style={{display: 'flex', alignItems: 'center', gap: '60px', maxWidth: '1200px', margin: 'auto'}}>

        <div className="how-image">
          <img src={landingImg} alt="Investimentos" style={{width: '100%',  maxWidth: '500px',  borderRadius: '20px',  objectFit: 'cover'}}/>
        </div>

        <div className="how-content" style={{flex: 1}}>
          <h2 style={{fontSize: '36px', marginBottom: '30px', color: '#0f172a'}}>Como Funciona?</h2>

          {steps.map((step) => (
            <div key={step.number} className="step" style={{display: 'flex', alignItems: 'flex-start', marginBottom: '25px', gap: '16px'}}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: '#3b3b98', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                {step.number}
              </div>

              <div className="step-text" style={{margin: '0', fontSize: '18px'}}>
                <h4 style={{margin: 0, fontSize: '18px'}}>{step.title}</h4>
                <p style={{ margin: '4px 0 0', color: '#555' }}>{step.description}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;