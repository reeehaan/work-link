import Section from './Section';
import './MainContent.css';
import Header from './Header';
import Footer from './Footer';

const  MainContent =() => {
  return (
    <main className="main-content">
      <Header/>  
      <Section />
      <Footer/>
    </main>
  );
}

export default MainContent;
