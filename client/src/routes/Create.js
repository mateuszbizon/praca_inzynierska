import React, {useState, useRef} from "react";
import TextField from "@mui/material/TextField";
import "../sass/css/create.css";
import Navbar from "../components/Navbar";
import FileBase from 'react-file-base64';
import postsService from "../services/posts-service";

function Create() {
    const [form, setForm] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const titleError = useRef();
    const messageError = useRef();
    const tagsError = useRef();

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function checkTitle(){
        if(form.title.length === 0){
            titleError.current.textContent = "Wartość nie może być pusta";
            titleError.current.style.visibility = "visible";
            return false;
        }

        titleError.current.style.visibility = "hidden";
        return true;
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

        if(!checkTitle() || !checkMessage() || !checkTags()){
            return false
        }

        console.log('created');
        postsService.createPost(form);
    }
	return (
		<>
			<Navbar />
			<section className='create'>
				<div className='create__form'>
                    <h1 className="create__heading">Utwórz post</h1>
                    <form>
                        <TextField name="creator" variant="outlined" label="Creator" fullWidth onChange={onChange} />
                        <div className="create__form-box">
                            <TextField name="title" variant="outlined" label="Tytuł" fullWidth  onChange={onChange}/>
                            <p className="create__text-error" ref={titleError}>error</p>
                        </div>
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
