import React, {useState} from 'react'
import {Button, Form, Select, Icon} from 'semantic-ui-react'


const PhotoDetailsForm = ({app: {api, cb, state: {photos, albums, photo, filterOptions}}, onSetEdit, type, item}) => {
    const [field, setField] = useState(item.name || item)

    const findOptions = () => {
        let albs = photo.albums.map(alb => alb.name)
        return filterOptions.albums.filter(opt => !albs.includes(opt.text) && opt.text !== '< unassigned >')
    }



    const handleChangeForm = (e, t) => 
        setField(t?.value || e.target?.value)

    const handleCancel = () =>
        onSetEdit(null)

    // const handleConfirm = () => 
    //     (type === 'albums'
    //         ? api.data.postAlbumsPhoto(albums.find(alb => alb.name === field).id, photo.id)
    //         : api.data.patchPhoto({id: photo.id, [type]: Array.isArray(photo[type]) ? [...photo[type], field] : field})
    //     )
    //         .then(() => {
    //             cb.loadUser(null)
    //             onSetEdit(null)
    //         })

    const handleConfirm = () => {
        let updatedPhoto = {...photo, [type]: Array.isArray(photo[type]) ? [...photo[type], field] : field}
        onSetEdit(null)
        type === 'albums'
            ? api.data.postAlbumsPhoto(albums.find(alb => alb.name === field).id, photo.id)
                .then(() => cb.onSetState({
                        photos: photos.map(ph =>
                            ph.id !== photo.id
                                ? ph
                                : updatedPhoto)}))
            : api.data.patchPhoto(updatedPhoto)
                .then(() => cb.onSetState({
                    photos: photos.map(ph =>
                        ph.id !== photo.id
                            ? ph
                            : updatedPhoto)}))
    }



    return (
        <div className='detail-form'>
            <Form.Field inline>
                {type === 'albums' ? (
                    <Select 
                        value={field ? field : null} 
                        options={findOptions()} 
                        onChange={handleChangeForm}
                    />
                    ) : (
                        <input className="input-detail" value={field} onChange={handleChangeForm}/>
                    )
                }
                <Button 
                    disabled={field === (item.name || item) || field === ''}
                    icon 
                    color='teal'
                    onClick={handleConfirm}
                ><Icon name='check' /></Button>
                <Button 
                    icon 
                    color='red'
                    onClick={handleCancel}
                ><Icon name='x' /></Button>
            </Form.Field>
        </div>
    )
}

export default PhotoDetailsForm