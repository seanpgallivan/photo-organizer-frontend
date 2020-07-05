import React from 'react'

const PhotoDisplay = ({app: {state: {photo}}}) => (
    <div className="pane">
        <div className="paneitem" style={photo ? {backgroundImage: `url(${photo.filename})`} : null}></div>
    </div>
)

export default PhotoDisplay