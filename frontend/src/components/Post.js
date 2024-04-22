function Post({ content, author }) {
    return (
      <div className="posts">
        <p>{content}</p>
        <p>Autor: {author}</p>
      </div>
    );
  }
  
  export default Post;