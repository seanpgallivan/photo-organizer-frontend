import React, {useState} from 'react'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'
import AlbumForm from '../components/AlbumForm'
import PhotosInfo from '../components/PhotosInfo'
import PhotosForm from '../components/PhotosForm'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = ({app}) => {
  const [edit, setEdit] = useState(null)
  app.state.album = app.state.albums.find(album => album.name === app.state.filters.albums)

  const filterSort = () => {
    let {photos, filters} = app.state
    if (filters.location) photos = photos.filter(photo => photo.location===filters.location)
    if (filters.tags) photos = photos.filter(photo => 
      filters.tags === '< unassigned >' ? photo.tags.length < 1 : photo.tags.includes(filters.tags))
    if (filters.people) photos = photos.filter(photo => 
      filters.people === '< unassigned >' ? photo.people.length < 1 : photo.people.includes(filters.people))
    if (filters.albums) photos = photos.filter(photo => 
      filters.albums === '< unassigned >' ? photo.albums.length < 1 : photo.albums.map(al => al.name).includes(filters.albums))
    return photos
  }
  app.state.photos = filterSort()


  
  return (
    <>
      <div className="sidebox">
        <Filter app={app} onSetEdit={setEdit} />
        {edit?.photo ? (
          <PhotosForm app={app} onSetEdit={setEdit} />
        ) : (
          <PhotosInfo app={app} onSetEdit={setEdit} />  
        )} 
        {edit?.album ? (
          <AlbumForm app={app} onSetEdit={setEdit} edit={edit} />
        ) : (
          <AlbumDetails app={app} onSetEdit={setEdit} />  
        )} 
      </div>
      <ThumbsContainer app={app} />
    </>
  )
}

export default IndexContainer