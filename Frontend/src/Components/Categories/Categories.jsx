import React from 'react';
import './Categories.css';

const categories = [
  { name: 'Programming & Tech', image: 'src/assets/freelancer-page1/prog1.png' },
  { name: 'Graphics & Design', image: 'src/assets/freelancer-page1/graphic-design.png' },
  { name: 'Video Editing & Animation', image: 'src/assets/freelancer-page1/video-editing.png' },
  { name: 'Writing', image: 'src/assets/freelancer-page1/writing.png' },
];



const Categories = () => {
  return (
    <section className="categories">
      <h2>Choose Different <span>Category</span></h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category" key={index} onClick={() => alert(`${category.name} clicked!`)}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
