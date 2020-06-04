import React from 'react'
import {useParams} from 'react-router-dom'
import PhotoDetails from '../components/PhotoDetails'
import PhotoDisplay from '../components/PhotoDisplay'

const ShowContainer = ({app, app: {state: {photos}}}) => {
  let {id} = useParams()
  app.state.photo = photos.find(photo => photo.id === parseInt(id))
  
  return (
    photos.length !== 0 && (
      <>
        <div className="sidebox">
          <PhotoDetails app={app} />
        </div>
        <PhotoDisplay app={app} />
      </>
    )
  )
}

export default ShowContainer