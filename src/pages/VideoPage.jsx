import React from 'react'
import { SelectVideos } from '../store/ducks/videos/selectors';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from 'react-video-js-player';
import styles from './VideoPage.module.scss';
import { videosApi } from '../api/videosApi';
import { Button, CircularProgress, TextField } from '@material-ui/core';

import { FetchAddComments, fetchSetComments } from '../store/ducks/comments/ActionCreators';
import { SelectComments, SelectCommentsStatus } from '../store/ducks/comments/selectors';
import Comment from '../components/Comment';
import { LoadingStatus } from '../store/types';


import YouTube from '@u-wave/react-youtube';




const VideoPage =  ()  => {
    const searchString =  window.location.href;
    const videoID = searchString.split('/')[5];
    const comments = useSelector(SelectComments);
    const LoadStatus= useSelector(SelectCommentsStatus);
    const [commentFieldText, setcommentFieldText] = React.useState('')
 
    const dispatch = useDispatch();


    
    const handleInputText = (e) => {
        setcommentFieldText(e.target.value);
        
    }

    const handleVisitVideo = () => {
        videosApi.PlusViews(videoID);
    }

    const handleAddComment = () => {
        const obj = {
            video: videoID,
            text: commentFieldText
        }
        dispatch(FetchAddComments(obj));
        setcommentFieldText('');

    }

    React.useEffect(() => {
        dispatch(fetchSetComments(videoID));
    
        handleVisitVideo();
    }, []);


    let item = useSelector(SelectVideos).find(item => item._id === videoID);;


        if ( !item) {
           
           item =  videosApi.showVideo(videoID);
           
        }

        console.log(item);
        
    return (
        <div>
        <div className={styles.container}>
            <div className={styles.video_container}>

            
            <div className={styles.video}>
              <div className={styles.video_player}>
                  {item.url && item.url.length > 14 ? <VideoPlayer 
               className={styles.video_js} src={item.url} width="720" height="400"/> : <YouTube
  video={item.url}
  width="720" height="400"
/>} 
               
              </div>
              <div className={styles.video_data}>
                <div className={styles.video_data_title}>
                    <div className="">
                        {item.title}
                    </div>
                    <div className="">
                      Просмотры: {item.views}
                    </div>
                </div>
                <div className={styles.video_data_likes}>
                          <div>
                     
                        </div>
                        {/* <div className={styles.video_data_likes_text}>
                        Отметки нравится:  {item.likes}
                        </div> */}
                        {/* <IconButton>
                            <FavoriteIcon style={ { color: '#3F51B5' , padding: 0, marginTop: '-5px', fontSize: '20px', marginRight: '5px'}} className="IconLike"/>
                        </IconButton> */}
                  
                 
            
                  
                </div>

                <div className="">
                    <div className={styles.disctiption_title} >Описание видео:</div>
                    <div>{ item.discription ? item.discription : 'Описание отсутствует.'}</div>
               
                </div>         
            </div>
            </div>
            <div className={styles.comments_column}>
            <div className={styles.video_comments}>
                <div className={styles.video_comments_title}>
                    <div>
                    Комментарии: 
                    </div>
                    <div className={styles.comment}>
                    <TextField onChange={handleInputText} style={ {width: '450px' , verticalAlign: 'unset', marginTop: '10px'}} value={commentFieldText} placeholder="Введите ваш комментарий"  />
                    <Button onClick={handleAddComment}  size='small' style={ {height: '33px', marginTop: '9px', marginLeft: '5px'}} variant="contained"  color='primary'>Отправить</Button>
                    </div>
                    <div className={styles.comment_Items}>
                        

                        {LoadStatus === LoadingStatus.SUCCESS ? comments.map( el => <Comment key={el._id}  _id={el._id} text={el.text} createdAt={el.createdAt} login={el.owner.username} avatar={el.owner.avatar} userID={el.owner._id}/>).reverse()
                        : <CircularProgress />
                    }
                    </div>
                    
                </div>
              </div>
            </div>
            </div>
   
            
        </div>
    </div>
        
    )
}

export default VideoPage
