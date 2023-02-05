import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormEdit from '../components/FormEdit';
import Posts from '../components/Posts';
import '../sass/css/profiles.css';
import { getPostsByUsername } from '../actions/posts';
import { useDispatch } from 'react-redux';

function Profiles() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
      dispatch(getPostsByUsername(username));
    }, [currentId, dispatch]);

  return (
    <>
        <Navbar />
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} />
        <section className="profiles">
            <Posts setCurrentId={setCurrentId}/>
        </section>
    </>
  )
}

export default Profiles