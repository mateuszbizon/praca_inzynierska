import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../actions/posts';
import '../sass/css/edit.css';
import TextField from "@mui/material/TextField";
import FileBase from 'react-file-base64';
import CloseIcon from '@mui/icons-material/Close';

function FormEdit({ currentId, setCurrentId }) {
    const [form, setForm] = useState({ message: '', selectedFile: '' });
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);
    const messageError = useRef();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (posts) setForm(posts);
    }, [posts]);

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function closeForm(){
        setCurrentId(null);
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

    function handleSubmit(e){
        e.preventDefault();

        if(!checkMessage()){
            return false
        }

        dispatch(updatePost(currentId, { ...form, username: user.result.username}));
        closeForm();
    }
  return (
    <>
        <div className={currentId === null ? 'edit' : 'edit active'}>
            <div className="edit__form">
                <CloseIcon fontSize='large' className='edit__close' onClick={closeForm}/>
                <h1 className="edit__heading">Edytuj post</h1>
                <form>
                    <div className="edit__form-box">
                        <TextField name="message" variant="outlined" label="Wiadomość" fullWidth multiline rows={4} value={form.message} onChange={onChange}/>
                        <p className="edit__text-error" ref={messageError}>error</p>
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