import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTutorialById } from '../../actions/tutorials'
import "./tutorial-details.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ImgSlider from '../../components/ImgSlider/ImgSlider';

function TutorialDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { tutorial } = useSelector(state => state.tutorials)
    console.log(tutorial)

    useEffect(() => {
        dispatch(getTutorialById(id))
    }, [])

  return (
    <>
      <header className='tutorial-details__header'>
        <h2 className='tutorial-details__header-heading'>{tutorial.title}</h2>
        <ol className='tutorial-details__list'>
          {tutorial.stages?.map((stage, index) => (
            <li className='tutorial-details__list-item' key={index}><a className='tutorial-details__list-link' href={`#${stage.name}`}>{stage.name}</a></li>
          ))}
        </ol>
        <a className='tutorial-details__bounce-icon bounce-top'><FontAwesomeIcon icon={faChevronDown} /></a>
      </header>

      <main>
        {tutorial.stages?.map((stage, index) => (
          <section key={index} id={stage.name} className='tutorial-details__section'>
            <div className='tutorial-details__stage-box'>
              <h2 className='tutorial-details__stage-name'>{index + 1}. {stage.name}</h2>
              <p className='tutorial-details__stage-desc'>{stage.desc}</p>
            </div>
            <div className='tutorial-details__img'>
              <div className='tutorial-details__img-box'>
                <ImgSlider imgsArray={stage.selectedFile} />
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  )
}

export default TutorialDetails