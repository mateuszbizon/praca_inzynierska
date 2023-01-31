import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import FormEdit from '../components/FormEdit';
import '../sass/css/home.css';
import postsService from '../services/posts-service';

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    postsService.getPosts().then(response => {
      setPosts(response);
    });
  }, [currentId]);
  return (
    <>
        <Navbar />
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} post={posts}/>
        <section className={currentId === null ? 'content' : 'shadow-active'}>
            <Posts posts={posts} setCurrentId={setCurrentId}/>
            <div className="shadow"></div>
        </section>
    </>
  )
}

export default Home