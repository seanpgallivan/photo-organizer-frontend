import React from "react";

const ThumbsContainer = props => {
     const { thumbs } = props

     const displayThumbs = (thumbs) => {
         return thumbs.map(thumb => {
             return <Thumb thumb={thumbs.filename} key={thumbs.id}/>
         }
         )
     }
     return (
        <div>
         {displayThumbs()}
        </div>
     )
}

export default ThumbsContainer;