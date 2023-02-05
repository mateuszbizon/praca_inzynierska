import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  return (
    <>
        <Navbar />
        <section className='home'>
        </section>
    </>
  )
}

export default Home