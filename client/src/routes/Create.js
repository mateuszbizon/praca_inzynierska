import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import "../sass/css/create.css";
import Navbar from "../components/Navbar";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../actions/posts";

function Create() {
    const [form, setForm] = useState({ message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const titleError = useRef();
    const messageError = useRef();
    const tagsError = useRef();
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

    function checkTags(){
        if(form.tags.length === 0){
            tagsError.current.textContent = "Wartość nie może być pusta";
            tagsError.current.style.visibility = "visible";
            return false;
        }

        tagsError.current.style.visibility = "hidden";
        return true
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!checkMessage() || !checkTags()){
            return false
        }

        dispatch(createPost({ ...form, username: user.result.username}, navigate));
    }
	return (
		<>
			<Navbar />
			<section className='create'>
				<div className='create__form'>
                    <h1 className="create__heading">Utwórz post</h1>
                    <form>
                        <div className="create__form-box">
                            <TextField name="message" variant="outlined" label="Wiadomość" fullWidth multiline rows={4} onChange={onChange}/>
                            <p className="create__text-error" ref={messageError}>error</p>
                        </div>
                        <div className="create__form-box">
                            <TextField name="tags" variant="outlined" label="Tagi" fullWidth onChange={onChange}/>
                            <p className="create__text-error" ref={tagsError}>error</p>
                        </div>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
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
