import React from 'react';
import CategoryCard from './CategoryCard';
import './CategoryGrid.css';

const categories = [
  {
    name: 'Science Fiction',
    image: 'path/to/science-fiction-image.jpg',
  },
  {
    name: 'Fantasy',
    image: 'path/to/fantasy-image.jpg',
  },
  // Add more categories if needed
];

function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          category={category.name}
          backgroundImage={category.image}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;
