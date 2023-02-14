import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import "../sass/css/create.css";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../actions/posts";

function Create() {
    const [form, setForm] = useState({ message: '', selectedFile: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messageError = useRef();
    const fileError = useRef();
    const user = JSON.parse(localStorage.getItem("user"));

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function checkMessage(){
        if(form.message.length === 0){
            messageError.current.textContent = "Wartość nie może być pusta";
            messageError.current.style.visibility = "visible";
            return false;
        }

        messageError.current.style.visibility = "hidden";
        return true
    }

    function checkFile(){
        if(form.selectedFile.length === 0){
            fileError.current.textContent = "Wybierz plik!";
            fileError.current.style.visibility = "visible";
            return false;
        }

        fileError.current.style.visibility = "visible"
        return true;
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!checkMessage() || !checkFile()){
            return false
        }

        dispatch(createPost({ ...form, username: user.result.username}, navigate));
    }
	return (
		<>
			<section className='create'>
				<div className='create__form'>
                    <h1 className="create__heading">Utwórz post</h1>
                    <form>
                        <div className="create__form-box">
                            <TextField name="message" variant="outlined" label="Wiadomość" fullWidth multiline rows={4} onChange={onChange}/>
                            <p className="create__text-error" ref={messageError}>error</p>
                        </div>
                        <div className="create__form-box">
                            <FileBase name="selectedFile" type="file" multiple={false} onChange={onChange} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
                            <p className="create__text-error" ref={fileError}></p>
                        </div>
                        <div className='create__btn-box'>
                                <button
                                    type='submit'
                                    onClick={handleSubmit}
                                    className='create__submit'>
                                    Utwórz
                                </button>
                        </div>
                    </form>
				</div>
			</section>
		</>
	);
}

export default Create;
