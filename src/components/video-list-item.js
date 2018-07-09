import React from 'react';

const VideoListItem = ({movie}) => {
    const Image_base_URL =" https://image.tmdb.org/t/p/w500/";
    console.log(movie);
    return (
        <li className="list-group-item">
            <div className="media">
                <div className="media-left">
                    <img 
                        className="media-object img-rounded"
                        height='100px' 
                        width='100px' 
                        src={`${Image_base_URL}${movie.poster_path}`}/>
                </div>
                <div className="media-body">
                    <h5 className="itemListTitle">{movie.title}</h5> 
                </div>
            </div>
        </li>
    )
}

export default VideoListItem;