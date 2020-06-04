import React from 'react'

const Detail = ({app: {api, cb, state: {photo}}, onFilterDetail, type, item}) => {

    const handleFilter = () => 
        onFilterDetail(type, item)

    const handleRemoveDetail = e => 
        type === 'albums'
            ? api.data.deleteAlbumsPhoto(item.id, photo.id)
                .then(() => cb.loadUser(null))
            : api.data.patchPhoto({id: photo.id, [type]: photo[type].filter(el => el !== item)})
                .then(() => cb.loadUser(null))


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