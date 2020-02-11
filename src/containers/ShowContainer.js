import React from 'react'
import PhotoDetails from '../components/PhotoDetails'
import PhotoDisplay from '../components/PhotoDisplay'

const ShowContainer = ({ photos, onPhotoClick }) => {

    // Iterate/ map over all the photos here

    // Send the map method to both <PhotoDetails /> && <PhotoDisplay /> ???

    renderPhotos = () => {
        return photos.map(photo => {
            return (
                <div>
                    <PhotoDetails key={photo.id} photo={photo} onPhotoClick={onPhotoClick}/> 
                    <PhotoDisplay key={photo.id} photo={photo} onPhotoClick={onPhotoClick}/>
                </div>
            )
        })
    }

    return (
        // {call method for iterating here()}
        {renderPhotos()}
        // ShowContainer
    )
}

export default ShowContainer

////////////////////////////////////////////////////////////////////

// Example map method from Stock lab below for reference only

// renderStocks = () => {
//     return this.props.stocks.map(stock => {
//       return <Stock key={stock.name} stock={stock} onClickStock={this.props.onClickStock}/>
//     })
//   }