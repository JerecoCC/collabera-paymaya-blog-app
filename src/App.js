import React, { useEffect, useState } from 'react';
import './styles/App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/post")
      .then(res => res.json())
      .then(res => setPosts(res));
  }, []);

  return (
    <div className="App">
      {posts.map((item, index) => {
        return (
          <div
            key={index}
            className="post"
          >
            <b className="title">{item.title}</b>
            <div className>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
