import React, { useState, useEffect, useRef } from 'react'
import "./create-edit-tutorial.css"
import { checkTitle, checkStage, checkTutorial } from "../../validations/CreateTutorialValid";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ImgSlider from '../../components/ImgSlider/ImgSlider';

function CreateEditTutorial({ isEditing, dispatchFunc }) {
    const [shadowActive, setShadowActive] = useState(false)
    const [titleModalActive, setTitleModalActive] = useState(false)
    const [stageModalActive, setStageModalActive] = useState(false)
    const [title, setTitle] = useState("")
    const [allStages, setAllStages] = useState([])
    const [stage, setStage] = useState({ index: "", name: "", desc: "", selectedFile: [] })
    const [errors, setErrors] = useState({})
    const [isEdited, setIsEdited] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const { tutorial, isLoading } = useSelector(state => state.tutorials)
    const dragItem = useRef();
    const dragOverItem = useRef();

    function handleSort() {
        const draggedItemContent = allStages.splice(dragItem.current, 1)[0];

        allStages.splice(dragOverItem.current, 0, draggedItemContent);

        setAllStages([...allStages]);
    }
    
    function showTitleModal() {
        setShadowActive(true);
        setTitleModalActive(true);
    }

    function saveTitle() {
        setErrors(checkTitle(title))
    }

    function showStageModal() {
        setShadowActive(true);
        setStageModalActive(true);
        clearStageData()
    }

    function saveStage() {
        setErrors(checkStage(stage))
    }

    function clearStageData() {
        setStage({ ...stage, index: "", name: "", desc: "", selectedFile: [] });
    }

    function addStage() {
        allStages.push({ name: stage.name, desc: stage.desc, selectedFile: stage.selectedFile })

        setAllStages([...allStages]);
        clearStageData();
    }

    function editCurrentStage() {
        const updatedStages = allStages.map((existingStage, index) => index === stage.index ? stage : existingStage)
        setAllStages(updatedStages)
        saveStage()
    }

    function deleteCurrentStage() {
        setAllStages(allStages.filter((existingStage, index) => index != stage.index))
        closeModals();
    }

    function fillCurrentStage(name, desc, file, index) {
        setIsEdited(true);
        showStageModal();
        setStage({ ...stage, index: index, name: name, desc: desc, selectedFile: file })
    }

    function closeModals() {
        setShadowActive(false);
        setTitleModalActive(false);
        setStageModalActive(false);
        setIsEdited(false)
    }

    function finishTutorial() {
        if (checkTutorial(title, allStages)) {
            if (isEditing) {
                dispatch(dispatchFunc({ title: title, stages: allStages }, navigate, tutorial._id))

                return;
            }
            
            dispatch(dispatchFunc({ title: title, stages: allStages, username: user.result.username }, navigate, tutorial._id))
        }
    }

    function handleShadowClick() {
        closeModals()
        clearStageData()
        setErrors({})
    }

    useEffect(() => {
        if (Object.keys(tutorial).length > 0 && isEditing) {
            setTitle(tutorial.title)
            setAllStages(tutorial.stages)
        }
    }, [tutorial])

    useEffect(() => {
        if (Object.keys(errors).length == 0 && title !== "") {
            closeModals() //adding or changing title
        }

        if (Object.keys(errors).length == 0 && stage.name !== "" && stage.desc !== "" && stage.selectedFile.length > 0 && stage.index === "") {
            addStage()
            closeModals() // adding new stage
        }

        if (Object.keys(errors).length == 0 && stage.name !== "" && stage.desc !== "" && stage.selectedFile.length > 0 && stage.index !== "") {
            closeModals() // editing stage 
        }
    }, [errors])

  return (
    <section className='create-edit-tutorial'>
        <div className={shadowActive ? 'create-edit-tutorial__shadow' : null} onClick={handleShadowClick}></div>
        <div className={titleModalActive ? 'create-edit-tutorial__form-container--title active' : 'create-edit-tutorial__form-container'}>
            <h1 className='create-edit-tutorial__heading'>Tytuł poradnika</h1>
            <div className='create-edit-tutorial__form-box'>
                <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label htmlFor='title'>Tytuł poradnika</label>
                <p className={errors.title ? 'create-edit-tutorial__text-error create-edit-tutorial__show-input-error' : 'create-edit-tutorial__text-error'}>
                    {errors.title ? errors.title : "error"}
                </p>
            </div>
            <button className='create-edit-tutorial__submit-btn' onClick={saveTitle}>Zapisz</button>
        </div>

        <div className={stageModalActive ? 'create-edit-tutorial__form-container active' : 'create-edit-tutorial__form-container'}>
            <h1 className='create-edit-tutorial__heading'>Etap poradnika</h1>
            <div className='create-edit-tutorial__form-box'>
                <input id="name" name="name" type="text" value={stage.name} onChange={(e) => setStage({ ...stage, name: e.target.value })} required/>
                <label htmlFor='name'>Nazwa etapu</label>
                <p className={errors.name ? 'create-edit-tutorial__text-error create-edit-tutorial__show-input-error' : 'create-edit-tutorial__text-error'}>
                    {errors.name ? errors.name : "error"}
                </p>
            </div>
            <div className='create-edit-tutorial__form-box'>
                <textarea id="desc" name="desc" value={stage.desc} onChange={(e) => setStage({ ...stage, desc: e.target.value })} required></textarea>
                <label htmlFor='desc'>Opis</label>
                <p className={errors.desc ? 'create-edit-tutorial__text-error create-edit-tutorial__show-input-error' : 'create-edit-tutorial__text-error'}>
                    {errors.desc ? errors.desc : "error"}
                </p>
            </div>
            <div className="create-edit-tutorial__form-box">
                <FileBase name="selectedFile" type="image" value={stage.selectedFile} multiple={true} onDone={(base64) => setStage({ ...stage, selectedFile: base64 })} />
                <p className={errors.selectedFile ? "create-edit-tutorial__text-error create-edit-tutorial__show-input-error" : "create-edit-tutorial__text-error"} >{errors.selectedFile ? errors.selectedFile : "error"}</p>
			</div>
            <div className='create-edit-tutorial__img-box'>
                <ImgSlider imgsArray={stage.selectedFile} />
            </div>
            {!isEdited ? (
                <button className='create-edit-tutorial__submit-btn' onClick={saveStage}>Zapisz</button>
            ) : (
                <> 
                    <button className='create-edit-tutorial__submit-btn' onClick={editCurrentStage}>Edytuj</button>
                    <button className='create-edit-tutorial__submit-btn create-edit-tutorial__submit-btn--delete-btn' onClick={deleteCurrentStage}>Usuń</button>
                </>
            )}
        </div>

        <div className='create-edit-tutorial__main-buttons'>
            <button className='create-edit-tutorial__btn' onClick={showTitleModal}>Dodaj/Zmień tytuł</button>
            <button className='create-edit-tutorial__btn' onClick={showStageModal}>Dodaj etap</button>
            <button className='create-edit-tutorial__btn' onClick={finishTutorial} disabled={isLoading}>Zakończ {isLoading && <CircularProgress size='20px' style={{ color: "#fff" }} />}</button>
        </div>
        <p className='create-edit-tutorial__title'>{title}</p>
        <div className='create-edit-tutorial__stages'>
            {allStages?.map((stage, index) => (
                <div 
                    className='create-edit-tutorial__stage' 
                    key={index} onClick={() => fillCurrentStage(stage.name, stage.desc, stage.selectedFile, index)}
                    draggable
                    onDragStart={(e) => dragItem.current = index}
                    onDragEnter={(e) => dragOverItem.current = index}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p className='create-edit-tutorial__stage-text'>
                        Etap nr {index + 1}
                    </p>
                    <p className='create-edit-tutorial__stage-text'>
                        {stage.name}
                    </p>
                    <img className='create-edit-tutorial__stage-img' src={stage.selectedFile[0].base64} />
                </div>
            ))}
        </div>
    </section>
  )
}

export default CreateEditTutorial