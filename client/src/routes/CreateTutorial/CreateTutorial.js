import React, { useEffect, useState } from 'react';
import "./create-tutorial.css";
import { checkTitle, checkStage } from "../../validations/CreateTutorialValid";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTutorial } from '../../actions/tutorials';
import { CircularProgress } from "@mui/material";
import ImgSlider from '../../components/ImgSlider/ImgSlider';

function CreateTutorial() {
    const [shadowActive, setShadowActive] = useState(true)
    const [titleModalActive, setTitleModalActive] = useState(true)
    const [stageModalActive, setStageModalActive] = useState(false)
    const [title, setTitle] = useState("")
    const [stage, setStage] = useState({id: "", name: "", desc: "", selectedFile: [] })
    const [allStages, setAllStages] = useState([])
    const [errors, setErrors] = useState({})
    const [isEdited, setIsEdited] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const { isLoading } = useSelector(state => state.loaders)

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
    }

    function saveStage() {
        setErrors(checkStage(stage))
    }

    function clearStageData() {
        setStage({ ...stage, id: "", name: "", desc: "", selectedFile: [] });
    }

    function addStage() {
        if (allStages.length == 0) {
            allStages.push({ id: 1, name: stage.name, desc: stage.desc, selectedFile: stage.selectedFile })
        } else {
            const lastElement = allStages[allStages.length - 1]
            allStages.push({ id: lastElement.id + 1, name: stage.name, desc: stage.desc, selectedFile: stage.selectedFile })
        }

        setAllStages([...allStages]);
        clearStageData();
    }

    function editCurrentStage() {
        const update = allStages.map(existingStage => existingStage.id === stage.id ? stage : existingStage)
        setAllStages(update)
        clearStageData();
        saveStage()
    }

    function deleteCurrentStage() {
        setAllStages(allStages.filter(existingStage => existingStage.id != stage.id))
        clearStageData();
        saveStage();
    }

    function fillCurrentStage(name, desc, file, id) {
        setIsEdited(true);
        showStageModal();
        setStage({ ...stage, id: id, name: name, desc: desc, selectedFile: file })
    }

    function closeModals() {
        setShadowActive(false);
        setTitleModalActive(false);
        setStageModalActive(false);
        setIsEdited(false)
    }

    function finishTutorial() {
        dispatch(createTutorial({ title: title, stages: allStages, username: user.result.username }, navigate))
    }

    // function test(base64) {
    //     console.log(base64)
    //     setStage({ ...stage, selectedFile: base64 })
    // }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && title !== "") {
            closeModals()
        }

        if (Object.keys(errors).length == 0 && stage.name !== "" && stage.desc !== "" && stage.selectedFile.length > 0 && stage.id === "") {
            addStage()
            closeModals()
        }
    }, [errors])

  return (
    <section className='create-tutorial'>
        <div className={shadowActive ? 'create-tutorial__shadow' : null}></div>
        <div className={titleModalActive ? 'create-tutorial__form-container--title active' : 'create-tutorial__form-container'}>
            <h1 className='create-tutorial__heading'>Tytuł poradnika</h1>
            <div className='create-tutorial__form-box'>
                <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label htmlFor='title'>Tytuł poradnika</label>
                <p className={errors.title ? 'create-tutorial__text-error create-tutorial__show-input-error' : 'create-tutorial__text-error'}>
                    {errors.title ? errors.title : "error"}
                </p>
            </div>
            <button className='create-tutorial__submit-btn' onClick={saveTitle}>Zapisz</button>
        </div>

        <div className={stageModalActive ? 'create-tutorial__form-container active' : 'create-tutorial__form-container'}>
            <h1 className='create-tutorial__heading'>Etap poradnika</h1>
            <div className='create-tutorial__form-box'>
                <input id="name" name="name" type="text" value={stage.name} onChange={(e) => setStage({ ...stage, name: e.target.value })} required/>
                <label htmlFor='name'>Nazwa etapu</label>
                <p className={errors.name ? 'create-tutorial__text-error create-tutorial__show-input-error' : 'create-tutorial__text-error'}>
                    {errors.name ? errors.name : "error"}
                </p>
            </div>
            <div className='create-tutorial__form-box'>
                <textarea id="desc" name="desc" value={stage.desc} onChange={(e) => setStage({ ...stage, desc: e.target.value })} required></textarea>
                <label htmlFor='desc'>Opis</label>
                <p className={errors.desc ? 'create-tutorial__text-error create-tutorial__show-input-error' : 'create-tutorial__text-error'}>
                    {errors.desc ? errors.desc : "error"}
                </p>
            </div>
            <div className="create-tutorial__form-box">
                <FileBase name="selectedFile" type="image" value={stage.selectedFile} multiple={true} onDone={(base64) => setStage({ ...stage, selectedFile: base64 })} />
                <p className={errors.selectedFile ? "create-tutorial__text-error create-tutorial__show-input-error" : "create-tutorial__text-error"} >{errors.selectedFile ? errors.selectedFile : "error"}</p>
			</div>
            <div className='create-tutorial__img-box'>
                <ImgSlider imgsArray={stage.selectedFile} />
            </div>
            {!isEdited ? (
                <button className='create-tutorial__submit-btn' onClick={saveStage}>Zapisz</button>
            ) : (
                <> 
                    <button className='create-tutorial__submit-btn' onClick={editCurrentStage}>Edytuj</button>
                    <button className='create-tutorial__submit-btn create-tutorial__submit-btn--delete-btn' onClick={deleteCurrentStage}>Usuń</button>
                </>
            )}
        </div>

        <div className='create-tutorial__main-buttons'>
            <button className='create-tutorial__btn' onClick={showTitleModal}>Zmień tytuł</button>
            <button className='create-tutorial__btn' onClick={showStageModal}>Dodaj etap</button>
            <button className='create-tutorial__btn' onClick={finishTutorial}>{isLoading ? <CircularProgress /> : "Zakończ"}</button>
        </div>
        <p className='create-tutorial__title'>{title}</p>
        <div className='create-tutorial__stages'>
            {allStages.map((stage, index) => (
                <div className='create-tutorial__stage' key={index} onClick={() => fillCurrentStage(stage.name, stage.desc, stage.selectedFile, stage.id)}>
                    <p className='create-tutorial__stage-text'>
                        Etap {index + 1}
                    </p>
                    <p className='create-tutorial__stage-text'>
                        {stage.name}
                    </p>
                    <img className='create-tutorial__stage-img' src={stage.selectedFile[0].base64} />
                </div>
            ))}
        </div>
    </section>
  )
}

export default CreateTutorial