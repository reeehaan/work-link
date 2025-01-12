import Section from './Section';
import './MainContent.css';
import Header from './Header';
import Footer from './Footer';
import SectionTwo from './SectionTwo';

const  MainContent =() => {
  return (
    <main className="main-content">
      <Header/>  
      <Section />
      <SectionTwo/>
      <Footer/>
    </main>
  );
}

export default MainContent;
