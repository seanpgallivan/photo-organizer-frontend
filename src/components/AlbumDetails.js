import React from 'react'
import {Button} from 'semantic-ui-react'

const AlbumDetails = ({app: {api, cb, state: {albums, album}}, onSetEdit}) => {

  const handleSetEdit = e => 
    onSetEdit({album: (e.target.name==='new' ? {} : album)})

  const onDeleteAlbum = () => 
    api.data.deleteAlbum(album.id)
      .then(() => {
        cb.filterChange({albums: null})
        cb.buildFilterOptions(null, albums.filter(al => al.id !== album.id))})
      .catch(console.log)



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
            <Button color="teal" onClick={handleSetEdit}>Edit</Button>
            <Button color="red" onClick={onDeleteAlbum}>Delete</Button>
          </div>
        ) : (
          <div className='side-box'>No Album Selected...</div>
        )}
        <Button name="new" color="teal" onClick={handleSetEdit}>Create a New Album</Button>
      </div>
    </div>
  )
}

export default AlbumDetails