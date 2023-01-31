import React, {useState, useRef, useEffect} from 'react';
import '../sass/css/edit.css';
import TextField from "@mui/material/TextField";
import FileBase from 'react-file-base64';
import CloseIcon from '@mui/icons-material/Close';
import postsService from '../services/posts-service';

function FormEdit({currentId, setCurrentId, post}) {
    const [form, setForm] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const titleError = useRef();
    const messageError = useRef();
    const tagsError = useRef();

    const editPost = post.find((message) => message._id === currentId);

    useEffect(() => {
        if (editPost) setForm(editPost);
    }, [editPost]);

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function closeForm(){
        setCurrentId(null);
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

        postsService.updatePost(currentId, form).then(response => {
            setCurrentId(null);
        });
    }
  return (
    <>
        <div className={currentId === null ? 'edit' : 'edit active'}>
            <div className="edit__form">
                <CloseIcon fontSize='large' className='edit__close' onClick={closeForm}/>
                <h1 className="edit__heading">Edytuj post</h1>
                <form>
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={form.creator} onChange={onChange} />
                    <div className="edit__form-box">
                        <TextField name="title" variant="outlined" label="Tytuł" fullWidth value={form.title}  onChange={onChange}/>
                        <p className="edit__text-error" ref={titleError}>error</p>
                    </div>
                    <div className="edit__form-box">
                        <TextField name="message" variant="outlined" label="Wiadomość" fullWidth multiline rows={4} value={form.message} onChange={onChange}/>
                        <p className="edit__text-error" ref={messageError}>error</p>
                    </div>
                    <div className="edit__form-box">
                        <TextField name="tags" variant="outlined" label="Tagi" fullWidth value={form.tags} onChange={onChange}/>
                        <p className="edit__text-error" ref={tagsError}>error</p>
                    </div>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
                    <div className='edit__btn-box'>
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className='edit__submit'>
                                Edytuj
                            </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default FormEdit