import React, {Fragment} from 'react'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'
import AlbumForm from '../components/AlbumForm'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = ({photos, filters, filterOptions, edit, onFilterChange, onFilterClear, onAlbumFormClick, onAlbumDetailsClick}) => {
    

    return (
        <Fragment>
            <div className="sidebox">
                <Filter 
                    filters={filters}
                    filterOptions={filterOptions}
                    onFilterChange={onFilterChange}
                    onFilterClear={onFilterClear}
                />
                {edit.album ? (
                    <AlbumForm 
                        album={edit.album}
                        onAlbumFormClick={onAlbumFormClick}
                    />
                ) : (
                    <AlbumDetails 
                        album={filters.album}
                        onAlbumDetailsClick={onAlbumDetailsClick}
                    />  
                )}
                
            </div>
            <ThumbsContainer 
                photos={photos}
            />
        </Fragment>
    )
}

export default IndexContainer