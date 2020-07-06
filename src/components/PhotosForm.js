import React, {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'

const PhotosForm = ({app: {api, cb, state: {user, photos}}, onSetEdit}) => {
  const [fields, setFields] = useState({
    filename: '', 
    description: '', 
    location: ''
  })
  const {filename, description, location} = fields


  // Event Handlers:
  const handleFormChange = e => {
    let {name, value} = e.target
    setFields({...fields, [name]: value})
  }

  const handleSetEdit = () =>
    onSetEdit(null)

  const handleClick = () => {
    let newPhoto = {...fields, tags: [], people: [], albums: [], user_id: user.id}
    api.data.postPhoto(newPhoto)
      .then(data => {
        cb.buildFilterOptions(photos.concat(data), null, `/photo/${data.id}`)
        onSetEdit(null)
      }).catch(console.log)
    }


  return (
    <div className="sideitem">
      <h2>Add New Photo:</h2>
      <div className='lbl-deet'>Photo URL:</div>
      <div className='details'>
          <Input name="filename" value={filename} onChange={handleFormChange} />
      </div>
      <div className='lbl-deet'>Description:</div>
      <div className='details'>
          <Input name="description" value={description} onChange={handleFormChange} />
      </div>
      <div className='lbl-deet'>Location:</div>
      <div className='details'>
          <Input name="location" value={location} onChange={handleFormChange} />
      </div>
      <div className='button-box'>
          <Button disabled={!filename || !description || !location} color="teal" onClick={handleClick}>Confirm</Button>
          <Button color="black" onClick={handleSetEdit}>Cancel</Button>
      </div>
    </div>
  )
}

export default PhotosForm