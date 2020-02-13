import React from 'react'
const PhotoDetails = ({ photo }) => {
    return (
        // PhotoDetails
        <div className="sideitem" >
            <h2>Photo Details:</h2>
            <p>Description: {photo.description}</p>
            <p>Tags: {photo.tags}</p>
            <p>People: {photo.people}</p>
            <p>Location: {photo.location}</p>
            <p>Size: {photo.size}</p>
        </div>
    )
}
export default PhotoDetails