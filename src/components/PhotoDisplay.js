import React from 'react'

const PhotoDisplay = ({photo}) => {
    
    return (
        <>
            <div className="pane">
                <div className="paneitem" style={{backgroundImage: `url(${photo.filename})`}}>
                    {/* <img 
                        src={photo.filename} 
                        alt={photo.description} 
                    /> */}
                    
                </div>
            </div>
        </>
    )
}

export default PhotoDisplay