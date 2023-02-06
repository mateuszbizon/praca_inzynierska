import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import FormEdit from '../components/FormEdit';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import '../sass/css/post-details.css';
import { getPostById, likePost, deletePost } from '../actions/posts';

function PostDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPostById(id));
      }, [currentId, dispatch]);

    function Likes({post}){
        if(post.likes.length > 0){
            return post.likes.find(like => like === user?.result?._id) ? (
                <ThumbUpIcon className='post-details__icons' />
            ) : (
                <ThumbUpOffAltIcon className='post-details__icons' />
            )
        }

        return <ThumbUpOffAltIcon className='post-details__icons' />
    }

  return (
    <>
        <Navbar />
        <FormEdit currentId={currentId} setCurrentId={setCurrentId} />
        <section className="post-details">
            <div className={currentId === null ? 'shadow' : 'shadow-active'} onClick={() => setCurrentId(null)}></div>
            {posts.map(post => (
            <div className="post-details__container">
                <div className="post-details__left-side">
                    <div className="post-details__header">
                        <div className="post-details__creator">{post.username}</div>
                        <div className="post-details__date">{moment(post.createdAt).fromNow()}</div>
                    </div>
                    <img src={post.selectedFile} alt="" className='post-details__img' />
                </div>
                <div className="post-details__right-side">
                    <div className="post-details__msg">
                        <p>{post.message}</p>
                    </div>
                    {/* <div className="post-details__tags">
                        <p>{post.tags.map((tag) => `#${tag} `)}</p>
                    </div> */}
                    <div className="post-details__comments">
                        komentarze
                    </div>
                    <div className="post-details__buttons">
                        <div className='post-details__button-box' onClick={() => dispatch(likePost(post._id))} >
                            <Likes post={post}/>
                            <p className='post-details__text'>Polub</p>
                        </div>
                        {(user.result._id === post.creator) && (
                            <div className='post-details__button-box' onClick={() => setCurrentId(post._id)} >
                            <EditIcon fontSize='medium' className='post-details__icons'/>
                            <p className='post-details__text'> Edytuj</p>
                        </div>
                        )}
                        
                    </div>
                    <div className="post-details__likes-count">Polubień: {post.likes.length}</div>
                    <div className="post-details__comment-input">
                        <input type="text" placeholder='Dodaj komentarz'/>
                    </div>
                </div>
            </div>
            ))}
        </section>
    </>
  )
}

export default PostDetails