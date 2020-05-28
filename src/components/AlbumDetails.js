import React from 'react'
import {Button} from 'semantic-ui-react'

const AlbumDetails = ({album, onAlbumDetailsClick}) => {

    const handleClick = (_e, target) => {
        onAlbumDetailsClick(album, target.name)
    }
        
    return (
        <div className="sideitem">
            <h2>Album Details:</h2>
            { album ? (
                <>
                    <div className='lbl-deet'>Name:</div>
                    <div className='details'>{album.name}</div>
                    <div className='lbl-deet'>Description:</div>
                    <div className='details'>{album.description}</div>
                    <div className='button-box'>
                        <Button name="edit" color="teal" onClick={handleClick}>Edit</Button>
                        <Button name="delete" color="red" onClick={handleClick}>Delete</Button>
                    </div>
                </>
            ) : (
                <>
                    <p>No Album Selected...</p>
                </>
            )}
            <div className='button-box'>
                <Button name="new" color="teal" onClick={handleClick}>Create a New Album</Button>
            </div>
        </div>
    )
}

export default AlbumDetails