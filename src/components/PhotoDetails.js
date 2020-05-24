import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

const PhotoDetails = ({photo, onDeletePhoto, onClickFilter, history}) => {

    const showAlbums = () =>
        photo.albums.map(album => <button className='btn alb' onClick={handleFilterClick}>{album.name}</button>)
    const showTags = () =>
        photo.tags.map(tag => <button className='btn tag' onClick={handleFilterClick}>{tag}</button>)
    const showPeople = () =>
        photo.people.map(person => <button className='btn per' onClick={handleFilterClick}>{person}</button>)

    const handleFilterClick = e =>
        onClickFilter(e.target.className.slice(4), e.target.innerText, history)
    const handleDeletePhoto = () =>
        onDeletePhoto(photo, history)

    return (
        // PhotoDetails
        <div className="sideitem" >
            <h2>Photo Details:</h2>
            <h3>Description:</h3>
            <div className='photo-details'>{photo.description}</div>
            <h3>Albums:</h3>
            <div className='photo-details'>{showAlbums()}</div>
            <h3>Tags:</h3>
            <div className='photo-details'>{showTags()}</div>
            <h3>People:</h3>
            <div className='photo-details'>{showPeople()}</div>
            <h3>Location:</h3>
            <div className='photo-details'><button className='btn loc' onClick={handleFilterClick}>{photo.location}</button></div>
            <h3>Size:</h3>
            <div className='photo-details'>{photo.size}</div>
            <div className='button-box'>
                <Button color="teal" as={Link} exact to='/photos'>Back</Button>
                <Button color="red" onClick={handleDeletePhoto}>Delete Photo</Button>
            </div>
        </div>
    )
}
export default PhotoDetails