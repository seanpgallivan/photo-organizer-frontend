import React, {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'

const AlbumForm = ({album, onSetEdit, onCompleteIndexForm}) => {
    const [fields, setFields] = useState({
        name: album.name || '', 
        description: album.description || ''
    })
    const {name, description} = fields

    const handleFormChange = (_e, t) => 
        setFields({...fields, [t.name]: t.value})

    const handleClick = (_e, t) => {
        if (t.name === 'confirm' && album.id && name && description)
            onCompleteIndexForm({...album, ...fields}, 'edit album')
        if (t.name === 'confirm' && !album.id && name && description)
            onCompleteIndexForm(fields, 'new album')
        if (t.name === 'cancel' || t.name === 'confirm') 
            onSetEdit(null)
    }

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
                <Button name="confirm" disabled={!name || !description} color="teal" onClick={handleClick}>Confirm</Button>
                <Button name="cancel" color="black" onClick={handleClick}>Cancel</Button>
            </div>
        </div>
    )
}

export default AlbumForm