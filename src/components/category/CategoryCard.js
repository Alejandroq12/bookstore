import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

function CategoryCard({ category, backgroundImage }) {
  return (
    <Link to={`/category/${category}`} className="category-card" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="category-card-content">
        <h3>{category}</h3>
      </div>
    </Link>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default CategoryCard;
