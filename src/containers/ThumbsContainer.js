import React from "react";
import Thumb from '../components/Thumb'

const ThumbsContainer = ({thumbs}) => {

     const displayThumbs = () => {
        console.log(thumbs)
        return thumbs.map(thumb => {
            return <Thumb thumb={thumb.filename} key={thumb.id}/>
        })
     }

     return (
        <div>
         {displayThumbs()}
        </div>
     )
}

export default ThumbsContainer;