import React from 'react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import '../sass/css/home.css';

function Home() {
  return (
    <>
        <Navbar />
        <section className='content'>
            <Posts />
        </section>
    </>
  )
}

export default Home