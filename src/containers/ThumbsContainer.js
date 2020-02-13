import React from "react";
import Thumb from '../components/Thumb'
import { Card } from 'semantic-ui-react'

const ThumbsContainer = ({photos}) => {

     const displayThumbs = () => {
        return photos.map(photo => {
            return <Thumb photo={photo} key={photo.id}/>
        })
    }

    return (
        <div className="pane">
            <div className="paneitem">
                <Card.Group itemsPerRow={10}>
                    {displayThumbs()}
                </Card.Group>
            </div>
        </div>
    )
}

export default ThumbsContainer;