import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

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
            <Button color="teal" as={Link} exact to='/photos'>Back</Button>
        </div>
    )
}
export default PhotoDetails