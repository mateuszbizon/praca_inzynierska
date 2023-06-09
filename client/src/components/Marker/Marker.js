import React, { useRef, useEffect } from 'react'
import "./marker.css"

function Marker({ firstButtonRef, indicator }) {
    const markerRef = useRef()

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
        }
    }, [indicator])

  return (
    <div className='marker' ref={markerRef}></div>
  )
}

export default Marker