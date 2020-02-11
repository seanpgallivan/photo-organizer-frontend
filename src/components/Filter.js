import React from 'react'
import {Select} from 'semantic-ui-react'
import { objectPattern } from '@babel/types'

const Filter = ({photos, onFilterChange}) => {

    let albumOptions = [], tagOptions = [], peopleOptions = []
    photos.forEach(photo => {
        photo.albums.forEach(album => albumOptions.includes(album.name) ? null : albumOptions.push(album.name))
        photo.tags.forEach(tag => tagOptions.includes(tag) ? null : tagOptions.push(tag))
        photo.people.forEach(person => peopleOptions.includes(person) ? null : peopleOptions.push(person))
    })
    albumOptions = [{key: 0, value: 0, text: "Select an Album"}].concat(albumOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
    tagOptions = [{key: 0, value: 0, text: "Select a Tag"}].concat(tagOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
    peopleOptions = [{key: 0, value: 0, text: "Select a Person"}].concat(peopleOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
    
    const handleChange = (_e, data) => {
        onFilterChange(data.name, data.value)
    }

    return (
        <div className="sideitem">
            <Select name='filterAlbum' placeholder='Select an Album' options={albumOptions} onChange={handleChange}/>
            <Select name='filterTag' placeholder='Select a Tag' options={tagOptions} onChange={handleChange}/>
            <Select name='filterPerson' placeholder='Select a Person' options={peopleOptions} onChange={handleChange}/>
        </div>
    )
}

export default Filter