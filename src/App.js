import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login.js"
import Register from "./Components/Register";
import Categories from './Components/Categories';
import Blogs from './Components/Blogs';
import BlogForm from './Components/BlogForm.js';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/blogs/:categoryName/:categoryId" element={<Blogs />} />
        <Route path="/create-blog/:categoryName/:categoryId" element={<BlogForm isEditMode={false} />} />
        <Route path="/edit-blog/:blogId/:categoryName" element={<BlogForm isEditMode={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
