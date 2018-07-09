import React from 'react';

const VideoDetails = ({title,description}) => {
   return (
    <div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
   )
}

export default VideoDetails;