import React, { useState } from 'react';

function PostForm({ onPost }) {
    const [content, setContent] = useState('');
  
    const handlePost = () => {
      if (content.trim() !== '') {
        onPost(content);
        setContent('');
      }
    };
  
    return (
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite sua postagem"
        />
        <button onClick={handlePost}>Postar</button>
      </div>
    );
  }
  
  export default PostForm;