import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import FormEdit from '../components/FormEdit';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from '@mui/material';
import '../sass/css/post-details.css';
import { getPostById } from '../actions/posts';
import Likes from '../components/Likes';

function PostDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const { posts, isLoading } = useSelector((state) => state.posts);
    const hasLikedPost = posts?.likes?.find((like) => like === user?.result?._id);
    

    useEffect(() => {
        dispatch(getPostById(id));
      }, [currentId, dispatch]);

    if (!posts && !isLoading) return 'Nie ma takiego postu';

  return (
    <>
        <Navbar />
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} />
        <section className="post-details">
            <div className={currentId === null ? 'post-details__shadow' : 'post-details__shadow-active'} onClick={() => setCurrentId(null)}></div>
            {isLoading ? <CircularProgress /> : (
                    <div className="post-details__container">
                        <div className="post-details__left-side">
                            <div className="post-details__header">
                                <a href={`/profile/${posts.username}`}><div className="post-details__creator">{posts.username}</div></a>
                                <div className="post-details__date">{moment(posts.createdAt).fromNow()}</div>
                            </div>
                            <img src={posts.selectedFile} alt="" className='post-details__img' />
                        </div>
                        <div className="post-details__right-side">
                            <div className="post-details__msg">
                                <p>{posts.message}</p>
                            </div>
                            <div className="post-details__comments">
                                komentarze
                            </div>
                            <div className="post-details__buttons">
                                <div className='post-details__button-box'>
                                    <Likes posts={posts} />
                                </div>
                                {(user.result._id === posts.creator) && (
                                    <div className='post-details__button-box' onClick={() => setCurrentId(posts._id)} >
                                    <EditIcon fontSize='medium' className='post-details__icons'/>
                                    <p className='post-details__text'> Edytuj</p>
                                </div>
                                )}  
                            </div>
                            <div className="post-details__comment-input">
                                <textarea placeholder='Dodaj komentarz'></textarea>
                            </div>
                        </div>
                    </div>
            )}
        </section>
    </>
  )
}

export default PostDetails