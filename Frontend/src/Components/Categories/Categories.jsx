import { useNavigate } from 'react-router-dom';
import styles from './Categories.module.css';

const categories = [
  { name: 'Programming & Tech', image: 'src/assets/freelancer-page1/prog1.png' },
  { name: 'Graphics & Design', image: 'src/assets/freelancer-page1/graphic-design.png' },
  { name: 'Video Editing & Animation', image: 'src/assets/freelancer-page1/video-editing.png' },
  { name: 'Writing', image: 'src/assets/freelancer-page1/writing.png' },
];

const Categories = () => {

  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/project/all`);
    }
  return (
    <section className={styles.categories}>
      <h2>
        Choose Your <span>Category</span>
      </h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <div
            className={styles.category}
            key={index}
            onClick={() => handleCategoryClick()}
          >
            <img src={category.image} alt={category.name} />
            <div className={styles.overlay}>
              <h3>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
