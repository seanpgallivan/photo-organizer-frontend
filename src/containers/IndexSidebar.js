import React from 'react'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'

const IndexSidebar = (props) => {
    
    return (
        <div className="sidebox">
            <Filter 
                {...props}
            />
            <AlbumDetails 
                
            />
        </div>
    )
}

export default IndexSidebar