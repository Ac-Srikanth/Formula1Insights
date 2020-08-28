import React from 'react'

import './ImageCard.css'


const ImageCard = ({info}) => {
    if(info.thumbnail) {
        return (
            <div className='image-card'>    
            <div 
                className='image'
                style={{
                    backgroundImage: `url(${info.thumbnail.source})`
                }}>
            </div>   
        </div>
        )
    } else {
        return (
            ''
        )
    }
  
}

export default ImageCard