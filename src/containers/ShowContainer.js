import React from 'react'
import PhotoDetails from '../components/PhotoDetails'
import PhotoDisplay from '../components/PhotoDisplay'

const ShowContainer = ({photos, match}) => {

    const findPhoto = () => 
        photos.find(photo => photo.id === parseInt(match.params.id))
    
    return (
        <>
            {photos.length === 0 ? null : (
                <>
                    <div className="sidebox">
                        <PhotoDetails 
                            photo={findPhoto()}
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