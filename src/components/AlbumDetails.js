import React from 'react'
import {Form, Button} from 'semantic-ui-react'

const AlbumDetails = ({album, onAlbumDetailsClick}) => {

    const handleClick = (_e, target) => {
        onAlbumDetailsClick(album, target.name)
    }
        
    return (
        <div className="sideitem">
            <h2>Album Details:</h2>
            { album ? (
                <>
                    <p>Name: {album.name}</p>
                    <p>Description: {album.description}</p>
                    <Form.Field>
                        <Button name="edit" color="teal" onClick={handleClick}>Edit</Button>
                        <Button name="delete" color="red" onClick={handleClick}>Delete</Button>
                    </Form.Field>
                </>
            ) : (
                <>
                    <p>No Album Selected...</p>
                </>
            )}
            <Form.Field>
                <Button name="new" color="teal" onClick={handleClick}>Create a New Album</Button>
            </Form.Field>
        </div>
    )
}

export default AlbumDetails