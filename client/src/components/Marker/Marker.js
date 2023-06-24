import React, { useRef, useEffect, useState } from 'react'
import "./marker.css"

function Marker({ firstButtonRef, indicator }) {
    const markerRef = useRef()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    function setMarkerFirst() {
        markerRef.current.style.left = `${firstButtonRef.current.offsetLeft}px`
        markerRef.current.style.width = `${firstButtonRef.current.offsetWidth}px`
      }

    useEffect(() => {
        setMarkerFirst()
    }, [])

    useEffect(() => {
        if (indicator !== null) {
            markerRef.current.style.left = `${indicator.offsetLeft}px`;
            markerRef.current.style.width = `${indicator.offsetWidth}px`;
        } else {
          setMarkerFirst()
        }
    }, [indicator, windowWidth])

    useEffect(() => {
      function handleWindowResize() {
        setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    });

  return (
    <div className='marker' ref={markerRef}></div>
  )
}

export default Marker