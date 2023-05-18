import React from 'react';

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
        <section className='home'>
        </section>
    </>
  )
}

export default Home