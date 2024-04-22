import React, { useState } from 'react';
import PostForm from '../layouts/PostForm';
import PostList from '../layouts/PostList';
import './Home.module.css'

function Posts() {
  const [posts, setPosts] = useState([]);

  const handlePost = (content) => {
    setPosts([...posts, content]);
  };

  return (
    <div>
      {/* Renderize o componente Navbar */}
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <PostForm onPost={handlePost} />
            <hr />
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
