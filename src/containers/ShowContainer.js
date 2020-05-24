import React from 'react'
import {Redirect} from 'react-router-dom'
import PhotoDetails from '../components/PhotoDetails'
import PhotoDisplay from '../components/PhotoDisplay'

const ShowContainer = ({user, photos, match, onDeletePhoto, onClickFilter, history}) => {

    const findPhoto = () => 
        photos.find(photo => photo.id === parseInt(match.params.id))
    
    return (
        <>
            {/* {!user ? <Redirect to='/login' /> : null} */}
            {photos.length === 0 ? null : (
                <>
                    <div className="sidebox">
                        <PhotoDetails 
                            photo={findPhoto()}
                            onDeletePhoto={onDeletePhoto}
                            onClickFilter={onClickFilter}
                            history={history}
                        />
                    </div>
                    <PhotoDisplay
                        photo={findPhoto()}
                    />
                </>
            )}
        </>
    )
}

export default ShowContainer