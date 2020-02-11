import React, {Fragment} from 'react'
import IndexSidebar from './IndexSidebar'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = (props) => {
    
    return (
        <Fragment>
            <IndexSidebar 
                {...props}
            />
            <ThumbsContainer 
                photos={props.photos}
            />
        </Fragment>
    )
}

export default IndexContainer