import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormEdit from '../components/FormEdit';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from '@mui/material';
import '../sass/css/post-details.css';
import { getPostById, commentPost } from '../actions/posts';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

function PostDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentId, setCurrentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const { posts } = useSelector((state) => state.posts);
    const { isLoading } = useSelector(state => state.loaders)
    const [comment, setComment] = useState({ commentCreator: user.result.username, value: ""});

    useEffect(() => {
        dispatch(getPostById(id));
      }, [currentId, dispatch]);

    function handleComment(){
        dispatch(commentPost(comment, id))
        setComment({ ...comment, value: "" })
    }

    if (!posts && !isLoading) return 'Nie ma takiego postu';

  return (
    <>
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} />
        <section className="post-details">
            <div className={currentId === null ? 'post-details__shadow' : 'post-details__shadow-active'} onClick={() => setCurrentId(null)}></div>
            {isLoading ? <CircularProgress /> : (
                    <div className="post-details__container">
                        <div className="post-details__left-side">
                            <div className="post-details__header">
                                <strong className="post-details__link" onClick={() => navigate(`/profile/${posts.username}`)}>{posts.username}</strong>
                                <div className="post-details__date">{moment(posts.createdAt).fromNow()}</div>
                            </div>
                            <img src={posts.selectedFile} alt="" className='post-details__img' />
                        </div>
                        <div className="post-details__right-side">
                            <div className="post-details__msg">
                                <p>{posts.message}</p>
                            </div>
                            <div className="post-details__comments">
                                <Comments post={posts} />
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
                                <textarea value={comment.value} onChange={e => setComment({ ...comment, value: e.target.value })} placeholder='Dodaj komentarz'></textarea>
                                <button className='post-details__add-comment' onClick={handleComment} disabled={!comment.value}>opublikuj</button>
                            </div>
                        </div>
                    </div>
            )}
        </section>
    </>
  )
}

export default PostDetails