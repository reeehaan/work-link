import Section from './Section';
import './MainContent.css';
import Header from './Header';
import Footer from './Footer';
import SectionTwo from './SectionTwo';
import SectionThree from './sectionThree';

const  MainContent =() => {
  return (
    <main className="main-content">
      <Header/>  
      <Section />
      <SectionTwo/>
      <SectionThree/>
      <Footer/>
    </main>
  );
}

export default MainContent;
