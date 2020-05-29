import React, {useState} from 'react'
import {Button, Input} from 'semantic-ui-react'

const PhotosForm = ({onSetEdit, onCompleteIndexForm}) => {
  const [fields, setFields] = useState({
    filename: '', 
    description: '', 
    location: ''
  })

  const handleClick = (_e, t) => {
    if (t.name === 'confirm') onCompleteIndexForm(fields, 'new photo')
    if (t.name === 'cancel' || t.name === 'confirm') onSetEdit(null)
  }
    
  const handleFormChange = (_e, t) => 
    setFields({...fields, [t.name]: t.value})

  return (
    <div className="sideitem">
      <h2>Add New Photo:</h2>
      <div className='lbl-deet'>Photo URL:</div>
      <div className='details'>
          <Input name="filename" value={fields.url} onChange={handleFormChange} />
      </div>
      <div className='lbl-deet'>Description:</div>
      <div className='details'>
          <Input name="description" value={fields.desc} onChange={handleFormChange} />
      </div>
      <div className='lbl-deet'>Location:</div>
      <div className='details'>
          <Input name="location" value={fields.loc} onChange={handleFormChange} />
      </div>
      <div className='button-box'>
          <Button name="confirm" color="teal" onClick={handleClick}>Confirm</Button>
          <Button name="cancel" color="black" onClick={handleClick}>Cancel</Button>
      </div>
    </div>
  )
}

export default PhotosForm