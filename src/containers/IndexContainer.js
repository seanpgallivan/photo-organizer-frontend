import React from 'react'
import {Redirect} from 'react-router-dom'
import Filter from '../components/Filter'
import AlbumDetails from '../components/AlbumDetails'
import AlbumForm from '../components/AlbumForm'
import ThumbsContainer from './ThumbsContainer'

const IndexContainer = ({user, photos, filters, filterOptions, edit, onClearForms, onFilterChange, onFilterClear, onAlbumFormClick, onAlbumDetailsClick}) => {
    

    return (
        <>
            {!user ? <Redirect to='/login' /> : null}
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
                        onClearForms={onClearForms}
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
        </>
    )
}

export default IndexContainer