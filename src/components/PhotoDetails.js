import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import Detail from './Detail'
import PhotoDetailsForm from './PhotoDetailsForm'

const PhotoDetails = ({app, app: {api, cb, state: {photo, albums}}}) => {
    const [edit, setEdit] = useState(null)


    
    // Helper Functions:
    const showDetails = type => 
    photo[type].map((item,i) => 
        <Detail 
            app={app} 
            onFilterDetail={filterDetail}
            type={type} 
            item={item} 
            key={type + i} 
        />
        ).concat(
            <button 
                key={type + '-a'} 
                className={edit === type || (type === 'albums' && photo.albums.length === albums.length) ? 'hidden' : 'btn-f mod'} 
                name={type}
                onClick={handleOpenForm}
            >+</button>
        )

    const filterDetail = (type, item) =>
        cb.onSetState({
            filters: {
                albums: null, tags: null, people: null, location: null,
                [type]: item.name || item
            },
            redirect: '/photos'})
    


    // Event Handlers:
    const handleOpenForm = e => {
        setEdit(edit === e.target.name ? null : e.target.name)
    }

    const handleFilterDetail = () =>
        filterDetail('location', photo.location)

    const handleDelete = () => {
        cb.onSetState({redirect: '/photos'})
        api.data.deletePhoto(photo.id)
            .then(() => cb.loadUser(null))
    }



    return (
        <div className='sideitem' >
            <h2>Photo Details:</h2>
            <div className='lbl-deet'>Description:</div>
            {edit === 'description' ? (
                <PhotoDetailsForm app={app} onSetEdit={setEdit} type='description' item={photo.description} />
            ) : (
                <div className={'details'}>{photo.description} 
                    <button 
                        className='btn-f mod'
                        name='description'
                        onClick={handleOpenForm}
                    >...</button>
                </div>
            )}
            <div className='lbl-deet'>Location:</div>
            {edit === 'location' ? (
                <PhotoDetailsForm app={app} onSetEdit={setEdit} type='location' item={photo.location} />
            ) : (
                <div className='details'>
                    <button 
                        className='btn-f location' 
                        onClick={handleFilterDetail}
                    >{photo.location}</button>
                    <button 
                        className='btn-f mod'
                        name='location'
                        onClick={handleOpenForm}
                    >...</button>
                </div>
            )}
            <div className='lbl-deet'>Albums:</div>
            <div className='details'>{showDetails('albums')}</div>
            {edit === 'albums' && <PhotoDetailsForm app={app} onSetEdit={setEdit} type='albums' item='' />}
            <div className='lbl-deet'>Tags:</div>
            <div className='details'>{showDetails('tags')}</div>
            {edit === 'tags' && <PhotoDetailsForm app={app} onSetEdit={setEdit} type='tags' item='' />}
            <div className='lbl-deet'>People:</div>
            <div className='details'>{showDetails('people')}</div>
            {edit === 'people' && <PhotoDetailsForm app={app} onSetEdit={setEdit} type='people' item='' />}
            <div className='button-box'>
                <Button 
                    disabled={!!edit}
                    color='teal' 
                    as={Link} 
                    to='/photos'
                >Back</Button>
                <Button 
                    disabled={!!edit}
                    color='red' 
                    onClick={handleDelete}
                >Delete Photo</Button>
            </div>
        </div>
    )
}
export default PhotoDetails