import React, {useState} from 'react'
import {Button, Input} from 'semantic-ui-react'

const PhotosForm = ({onSetEdit, onCompleteIndexForm}) => {
  const [fields, setFields] = useState({
    filename: '', 
    description: '', 
    location: ''
  })
  const {filename, description, location} = fields

  const handleClick = (_e, t) => {
    if (t.name === 'confirm') 
      onCompleteIndexForm(fields, 'new photo')
    if (t.name === 'cancel') 
      onSetEdit(null)
  }
    
  const handleFormChange = (_e, t) => 
    setFields({...fields, [t.name]: t.value})

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
          <Button name="confirm" disabled={!filename || !description || !location} color="teal" onClick={handleClick}>Confirm</Button>
          <Button name="cancel" color="black" onClick={handleClick}>Cancel</Button>
      </div>
    </div>
  )
}

export default PhotosForm