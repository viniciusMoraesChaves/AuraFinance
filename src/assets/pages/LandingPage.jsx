import Hero from '../landing/Hero'
import HowItWorks from '../landing/HowItWorks';
import Statistics from '../landing/Statistics'
import Footer from '../landing/footer';
import Objectives from '../landing/objectives'

function LandingPage() {
  return (
    <div>
      <Hero />
      <Objectives />
      <Statistics />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default LandingPage;