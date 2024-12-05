import React from 'react';
import Section from './Section';
import './MainContent.css';
import Header from './Header';

const  MainContent =() => {
  return (
    <main className="main-content">
      <Header/>  
      <Section />
      <Section />
      <Section />
    </main>
  );
}

export default MainContent;
