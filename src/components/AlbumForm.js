import React, {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'

const AlbumForm = ({app: {api, cb, state: {user}}, onSetEdit, edit: {album}}) => {
  const [fields, setFields] = useState({
    name: album.name || '', 
    description: album.description || ''
  })
  const {name, description} = fields



  // Event Handlers:
  const handleFormChange = e => 
    setFields({...fields, [e.target.name]: e.target.value})

  const handleSetEdit = () =>
    onSetEdit(null)

  const handleClick = () => 
    (album.id 
      ? api.data.patchAlbum({...fields, id: album.id})
      : api.data.postAlbum({...fields, user_id: user.id})
    )
      .then(() => {
        cb.filterChange({albums: fields.name})
        cb.loadUser()
        onSetEdit(null)
      }).catch(console.log)



  return (
    <div className="sideitem">
      <h2>{album.id ? "Edit" : "Create New"} Album:</h2>
      <div className='lbl-deet'>Name:</div>
      <div className='details'>
        <Input name="name" value={name} onChange={handleFormChange} />
      </div>
      <div className='lbl-deet'>Description:</div>
      <div className='details'>
        <Input name="description" value={description} onChange={handleFormChange} />
      </div>
      <div className='button-box'>
        <Button disabled={!name || !description} color="teal" onClick={handleClick}>Confirm</Button>
        <Button color="black" onClick={handleSetEdit}>Cancel</Button>
      </div>
    </div>
  )
}

export default AlbumForm