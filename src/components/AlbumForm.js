import React, {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'

const AlbumForm = ({album, onSetEdit, onCompleteIndexForm}) => {
    const [fields, setFields] = useState({
        name: album.name || '', 
        description: album.description || ''
    })

    const handleFormChange = (_e, t) => 
        setFields({...fields, [t.name]: t.value})

    const handleClick = (_e, t) => {
        if (t.name === 'confirm' && album.id) onCompleteIndexForm({...album, ...fields}, 'edit album')
        if (t.name === 'confirm' && !album.id) onCompleteIndexForm(fields, 'new album')        
        if (t.name === 'cancel' || t.name === 'confirm') onSetEdit(null)
    }

    return (
        <div className="sideitem">
            <h2>{album.id ? "Edit" : "Create New"} Album:</h2>
            <div className='lbl-deet'>Name:</div>
            <div className='details'>
                <Input name="name" value={fields.name} onChange={handleFormChange} />
            </div>
            <div className='lbl-deet'>Description:</div>
            <div className='details'>
                <Input name="description" value={fields.description} onChange={handleFormChange} />
            </div>
            <div className='button-box'>
                <Button name="confirm" color="teal" onClick={handleClick}>Confirm</Button>
                <Button name="cancel" color="black" onClick={handleClick}>Cancel</Button>
            </div>
        </div>
    )
}

export default AlbumForm