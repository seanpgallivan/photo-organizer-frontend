import React from 'react'

const PhotoDisplay = ({photo}) => {
    
    return (
        <>
            <div className="pane">
                <div className="paneitem" style={{backgroundImage: `url(${photo.filename})`}}>                    
                </div>
            </div>
        </>
    )
}

export default PhotoDisplay