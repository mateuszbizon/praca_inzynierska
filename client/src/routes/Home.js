import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import FormEdit from '../components/FormEdit';
import '../sass/css/home.css';
import postsService from '../services/posts-service';

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    postsService.getPosts().then(response => {
      setPosts(response);
    });
  }, [currentId, isLiked]);
  return (
    <>
        <Navbar />
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} post={posts}/>
        <section className={currentId === null ? 'content' : 'shadow-active'}>
            <Posts posts={posts} setCurrentId={setCurrentId} isLiked={isLiked} setIsLiked={setIsLiked}/>
            <div className="shadow"></div>
        </section>
    </>
  )
}

export default Home