import React from 'react'
import {Button} from 'semantic-ui-react'

const AlbumDetails = ({album, onSetEdit, onCompleteIndexForm}) => {

  const handleClick = (_e, t) => {
    if (t.name === 'new') onSetEdit({album: {}})
    if (t.name === 'edit') onSetEdit({album: album})
    if (t.name === 'delete') onCompleteIndexForm(album, 'delete album')
  }
        
  return (
    <div className="sideitem">
      <h2>Album Details:</h2>
      { album ? (<>
        <div className='lbl-deet'>Name:</div>
        <div className='details'>{album.name}</div>
        <div className='lbl-deet'>Description:</div>
        <div className='details'>{album.description}</div>
      </>) : null }
      <div className='button-box'>
        { album ? (
          <div className='side-box'>
            <Button name="edit" color="teal" onClick={handleClick}>Edit</Button>
            <Button name="delete" color="red" onClick={handleClick}>Delete</Button>
          </div>
        ) : (
          <div className='side-box'>No Album Selected...</div>
        )}
        <Button name="new" color="teal" onClick={handleClick}>Create a New Album</Button>
      </div>
    </div>
  )
}

export default AlbumDetails