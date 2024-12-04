import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Categories.css"

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7064/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories', error));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/blogs/${encodeURIComponent(category.name)}/${category.id}`);
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <div className="categories-list">
        {categories.map(category => (
          <div key={category.id} onClick={() => handleCategoryClick(category)} className="category-card">
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
