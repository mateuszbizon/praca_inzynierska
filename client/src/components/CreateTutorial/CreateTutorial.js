import React, { useState, useEffect } from "react";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import createTutorialValid from "../../validations/CreateTutorialValid";
import './create-tutorial.css';

function CreateTutorial() {
  const [form, setForm] = useState({ title: "", description: '', selectedFile: '' });
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.loaders)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e){
        e.preventDefault();

        setErrors(createTutorialValid(form))
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && form.title !== "" && form.selectedFile !== "" && form.description !== "") {
            console.log('wyslano')
        }
    }, [errors])

  return (
    <div className='create-tutorial'>
        <h1 className="create-tutorial__heading">Utwórz poradnik</h1>
        <form>
            <div className="create-tutorial__form-box">
                <input id="title" name="title" type="text" onChange={onChange} required/>
                <label htmlFor="title">Tytuł</label>
                <p className={errors.title ? "create-tutorial__text-error create-tutorial__show-input-error" : "create-tutorial__text-error"}>{errors.title ? errors.title : "error"}</p>
            </div>
            <div className="create-tutorial__form-box">
                <textarea id='description' name='description' onChange={onChange} required></textarea>
                <label htmlFor="description">Opis</label>
                <p className={errors.description ? "create-tutorial__text-error create-tutorial__show-input-error" : "create-tutorial__text-error"} >{errors.description ? errors.description : "error"}</p>
            </div>
            <div className="create-tutorial__form-box">
                <FileBase name="selectedFile" type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
                <p className={errors.selectedFile ? "create-tutorial__text-error create-tutorial__show-input-error" : "create-tutorial__text-error"} >{errors.selectedFile ? errors.selectedFile : "error"}</p>
            </div>
            <div className='create-tutorial__btn-box'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='create-tutorial__submit'>
                    Utwórz {isLoading && <CircularProgress size="25px" style={{color: "#fff"}} />}
                </button>
            </div>
        </form>
    </div>
  )
}

export default CreateTutorial