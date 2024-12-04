import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Blogs.css";

const Blogs = () => {
  const { categoryName, categoryId } = useParams();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7064/api/BlogPosts/Categories/${categoryId}`)
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs', error));
  }, [categoryId]);

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}/${encodeURIComponent(categoryName)}`);
  };

  const handleDelete = (blogId) => {
    axios.delete(`https://localhost:7064/api/BlogPosts/${blogId}`)
      .then(() => setBlogs(blogs.filter(blog => blog.id !== blogId)))
      .catch(error => console.error('Error deleting blog', error));
  };

  const handleCreate = () => {
    navigate(`/create-blog/${encodeURIComponent(categoryName)}/${categoryId}`);
  };

  return (
    <div>
      <header className='Blog-header'>
        <h2>{categoryName}</h2>
        <button className='create-blog' onClick={handleCreate}>Create a blog</button>
      </header>
      <div className="blog-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <div className="blog-image-container">
              <img src={blog.featuredImageUrl} alt={blog.title} className="blog-image" />
              <div className='image-icons'>
                <img onClick={() => handleEdit(blog.id)} src="/Images/edit_icon.png" className='blog-image-icon' alt="Edit" />
                <img onClick={() => handleDelete(blog.id)} src="/Images/delete_icon.png" className='blog-image-icon' alt="Delete" />
              </div>
            </div>
            <div className="blog-card-content">
              <h3>{blog.title}</h3>
              <p>{blog.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
