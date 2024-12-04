import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/BlogForm.css'; 

const BlogForm = ({ isEditMode }) => {
  const { blogId, categoryName, categoryId } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    shortDescription: '',
    content: '',
    featuredImageUrl: '',
    urlHandle: '',
    publishedDate: '',
    author: '',
    isVisible: true,
    categories: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      axios.get(`https://localhost:7064/api/BlogPosts/${blogId}`)
        .then(response => {
          const fetchedBlog = response.data;
          fetchedBlog.categories = fetchedBlog.categories.map(category => category.id);
          setBlog(fetchedBlog);
        })
        .catch(error => console.error('Error fetching blog details', error));
    } else {
      setBlog(prevBlog => ({
        ...prevBlog,
        categories: [categoryId]
      }));
    }
  }, [isEditMode, blogId, categoryName, categoryId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog(prevBlog => ({
      ...prevBlog,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = isEditMode 
      ? `https://localhost:7064/api/BlogPosts/${blogId}`
      : 'https://localhost:7064/api/BlogPosts';

    const requestMethod = isEditMode ? axios.put : axios.post;

    requestMethod(apiUrl, blog)
      .then(() => {
        alert(`Blog ${isEditMode ? 'updated' : 'created'} successfully!`);
        navigate(`/blogs/${encodeURIComponent(categoryName)}/${blog.categories[0]}`);
      })
      .catch(error => console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog`, error));
  };

  const handleGenerate=() => {
    
  }

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Edit Blog' : 'Create New Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <div className="form-data-generation">
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={blog.shortDescription}
              onChange={handleChange}
              required
            />
            <button onClick={handleGenerate} className="generate-short-description">Generate</button>
          </div>
          
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <div className="form-data-generation">
            <textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              required
              />
              <button onClick={handleGenerate} className="generate-content">Generate</button>
          </div>
          
        </div>

        <div className="form-group">
          <label htmlFor="featuredImageUrl">Featured Image URL</label>
          <div className="form-data-generation">
            <input
              type="text"
              id="featuredImageUrl"
              name="featuredImageUrl"
              value={blog.featuredImageUrl}
              onChange={handleChange}
            />
            <button onClick={handleGenerate} className="generate-image">Generate</button>
          </div> 
        </div>

        <div className="form-group">
          <label htmlFor="urlHandle">URL Handle</label>
          <input
            type="text"
            id="urlHandle"
            name="urlHandle"
            value={blog.urlHandle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">Published Date</label>
          <input
            type="datetime-local"
            id="publishedDate"
            name="publishedDate"
            value={blog.publishedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-visibility-check">
          <label htmlFor="isVisible">Visible</label>
          <input
            type="checkbox"
            id="isVisible"
            name="isVisible"
            checked={blog.isVisible}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="form-submit-button">{isEditMode ? 'Update Blog' : 'Create Blog'}</button>
      </form>
    </div>
  );
};

export default BlogForm;
