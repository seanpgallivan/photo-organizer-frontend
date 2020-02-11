import React, {Fragment} from 'react'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = ({photos}) => {
    
    return (
        <Fragment>
            <Filter />
            <AlbumDetails />
            <ThumbsContainer thumbs={photos}/>
        </Fragment>
    )
}

export default IndexContainer