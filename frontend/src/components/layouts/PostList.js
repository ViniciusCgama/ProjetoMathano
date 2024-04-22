import React from 'react';
import user from '../form/Select'
function PostList({ posts }) {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <p><strong>{user.name}: </strong>{post}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
