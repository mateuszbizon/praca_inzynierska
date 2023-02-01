import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import FormEdit from '../components/FormEdit';
import '../sass/css/home.css';
import { getPosts } from '../actions/posts';

function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
        <Navbar />
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} />
        <section className='content'>
            <Posts setCurrentId={setCurrentId}/>
            <div className={currentId === null ? 'shadow' : 'shadow-active'} onClick={() => setCurrentId(null)}></div>
        </section>
    </>
  )
}

export default Home