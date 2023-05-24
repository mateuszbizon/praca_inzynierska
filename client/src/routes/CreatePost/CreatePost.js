import React, { useState, useEffect } from "react";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../actions/posts";
import { CircularProgress } from "@mui/material";
import createValid from "../../validations/CreateValid";
import "./create-post.css";

function CreatePost() {
    const [form, setForm] = useState({ message: '', selectedFile: '' });
    const [errors, seterrors] = useState({})
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.loaders)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    function onChange(e){
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e){
        e.preventDefault();

        seterrors(createValid(form))
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && form.message !== "" && form.selectedFile !== "") {
            dispatch(createPost({ ...form, username: user.result.username}, navigate));
        }
    }, [errors])

	return (
		<>
			<section className='create-post'>
				<div className='create-post__container'>
					<h1 className="create-post__heading">Utwórz post</h1>
					<form>
						<div className="create-post__form-box">
							<textarea id='message' name='message' onChange={onChange} required></textarea>
							<label htmlFor="message">Wiadomość</label>
							<p className={errors.message ? "create-post__text-error create-post__show-input-error" : "create-post__text-error"} >{errors.message ? errors.message : "error"}</p>
						</div>
						<div className="create-post__form-box">
							<FileBase name="selectedFile" type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} />
							<p className={errors.selectedFile ? "create-post__text-error create-post__show-input-error" : "create-post__text-error"} >{errors.selectedFile ? errors.selectedFile : "error"}</p>
						</div>
						<div className='create-post__btn-box'>
							<button
								type='submit'
								onClick={handleSubmit}
								className='create-post__submit'>
								Utwórz {isLoading && <CircularProgress size="25px" style={{color: "#fff"}} />}
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}

export default CreatePost;
