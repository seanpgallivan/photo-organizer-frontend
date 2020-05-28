import React from 'react'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'
import AlbumForm from '../components/AlbumForm'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = ({photos, album, filters, filterOptions, edit, onClearForms, onFilterChange, onAlbumFormClick, onAlbumDetailsClick}) => {
  return (
    <>
      <div className="sidebox">
        <Filter 
          filters={filters}
          count={photos.length}
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
        />
        {edit.album ? (
          <AlbumForm 
            album={edit.album}
            onClearForms={onClearForms}
            onAlbumFormClick={onAlbumFormClick}
          />
        ) : (
          <AlbumDetails 
            album={album}
            onAlbumDetailsClick={onAlbumDetailsClick}
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