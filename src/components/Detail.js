import React from 'react'

const Detail = ({app: {api, cb, state: {photos, photo}}, onFilterDetail, type, item}) => {

    const handleFilter = () => 
        onFilterDetail(type, item)

    const handleRemoveDetail = () => {
        let updatedPhotos = photos.map(ph =>
            ph.id !== photo.id
                ? ph
                : {...photo, [type]: photo[type].filter(it => it !== item)})
        type === 'albums'
            ? api.data.deleteAlbumsPhoto(item.id, photo.id)
                .then(() => cb.buildFilterOptions(updatedPhotos))
            : api.data.patchPhoto({id: photo.id, [type]: photo[type].filter(el => el !== item)})
                .then(() => cb.buildFilterOptions(updatedPhotos))
    }


    return (
        <div className='btn-join'>
            <button
                className={'btn-l ' + type}
                onClick={handleFilter}
            >{item.name || item}</button>
            <button 
                className={'btn-r ' + type} 
                onClick={handleRemoveDetail}
            >x</button>
        </div>
    )
}
export default Detail