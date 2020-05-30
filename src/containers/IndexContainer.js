import React, {useState} from 'react'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'
import AlbumForm from '../components/AlbumForm'
import PhotosInfo from '../components/PhotosInfo'
import PhotosForm from '../components/PhotosForm'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = ({photos, album, filters, filterOptions, onFilterChange, onCompleteIndexForm}) => {
  const [edit, setEdit] = useState(null)

  return (
    <>
      <div className="sidebox">
        <Filter 
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
        />
        {edit?.photo ? (
          <PhotosForm 
            onSetEdit={setEdit}
            onCompleteIndexForm={onCompleteIndexForm}
          />
        ) : (
          <PhotosInfo
            count={photos.length}
            onSetEdit={setEdit}
            onCompleteIndexForm={onCompleteIndexForm}
          />  
        )} 
        {edit?.album ? (
          <AlbumForm 
            album={edit?.album}
            onSetEdit={setEdit}
            onCompleteIndexForm={onCompleteIndexForm}
          />
        ) : (
          <AlbumDetails 
            album={album}
            onSetEdit={setEdit}
            onCompleteIndexForm={onCompleteIndexForm}
          />  
        )} 
      </div>
      <ThumbsContainer 
        photos={photos}
      />
    </>
  )
}

export default IndexContainer