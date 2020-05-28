import React from 'react'
import {useParams} from 'react-router-dom'
import PhotoDetails from '../components/PhotoDetails'
import PhotoDisplay from '../components/PhotoDisplay'

const ShowContainer = ({photos, albumOptions, onClickDetail}) => {
  let {id} = useParams()

  const findPhoto = () =>
    photos.find(photo => photo.id === parseInt(id))
  
  return (
    photos.length === 0 ? null : (
      <>
        <div className="sidebox">
          <PhotoDetails 
            photo={findPhoto()}
            albumOptions={albumOptions}
            onClickDetail={onClickDetail}
          />
        </div>
        <PhotoDisplay
          photo={findPhoto()}
        />
      </>
    )
  )
}

export default ShowContainer