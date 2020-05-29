import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button, Icon, Select, Form} from 'semantic-ui-react'

const PhotoDetails = ({photo, albumOptions, onClickDetail}) => {
    const [edit, setEdit] = useState(null)
    const [field, setField] = useState('')

    const findOptions = () => {
        let albs = photo.albums.map(alb => alb.name)
        return albumOptions.filter(opt => !albs.includes(opt.text))
    }

    const showAlbums = () =>
        photo.albums.map((album,i) => 
            <div key={'alb-d'+i} className='btn-join'>
                <button
                    key={'alb-l-'+i}
                    className='btn-l alb'
                    data-act='filter'
                    data-type='album'
                    data-val={album.name}
                    onClick={handleClickDetail}
                >{album.name}</button>
                <button 
                    key={'alb-r-'+i} 
                    className='btn-r alb' 
                    data-act='remove' 
                    data-type='albums' 
                    data-val={album.name} 
                    onClick={handleClickDetail}
                >x</button>
            </div>
        ).concat(
            <button 
                key='alb-a' 
                className={edit === 'album' || photo.albums.length === albumOptions.length ? 'hidden' : 'btn-f mod'} 
                data-type='album'
                onClick={handleOpenForm}
            >+</button>)

    const showTags = () =>
        photo.tags.map((tag,i) => 
            <div key={'tag-d'+i} className='btn-join'>
                <button 
                    key={'tag-l-'+i} 
                    className='btn-l tag' 
                    data-act='filter' 
                    data-type='tag' 
                    data-val={tag} 
                    onClick={handleClickDetail}
                >{tag}</button>
                <button 
                    key={'tag-r-'+i} 
                    className='btn-r tag' 
                    data-act='remove' 
                    data-type='tags' 
                    data-val={tag} 
                    onClick={handleClickDetail}
                >x</button>
            </div>
        ).concat(
            <button 
                key='tag-a' 
                className={edit === 'tag' ? 'hidden' : 'btn-f mod'} 
                data-type='tag'
                onClick={handleOpenForm}
            >+</button>)

    const showPeople = () =>
        photo.people.map((person,i) => 
            <div key={'per-d'+i} className='btn-join'>
                <button 
                    key={'per-l-'+i} 
                    className='btn-l per' 
                    data-act='filter' 
                    data-type='person' 
                    data-val={person} 
                    onClick={handleClickDetail}
                >{person}</button>
                <button 
                    key={'per-r-'+i} 
                    className='btn-r per' 
                    data-act='remove' 
                    data-type='people' 
                    data-val={person} 
                    onClick={handleClickDetail}
                >x</button>
            </div>
            ).concat(
            <button 
                key='per-a' 
                className={edit === 'person' ? 'hidden' : 'btn-f mod'} 
                data-type='person'
                onClick={handleOpenForm}
            >+</button>)


    const handleClickDetail = (e, t) => {
        let {act, type, val} = t || e.target.dataset
        if (val || act === 'delete') {
            onClickDetail(photo, act, type, val)
            setEdit(null)
        }
    }

    const handleOpenForm = e => {
        let {type, val} = e.target.dataset
        setField(val || '')
        setEdit(edit === type ? null : type)
    }

    const handleChangeForm = (e, t) => 
        setField(t?.value || e.target?.value)


    return (
        <div className='sideitem' >
            <h2>Photo Details:</h2>
            <div className='lbl-deet'>Description:</div>
            <div className={edit === 'description' ? 'hidden' : 'details'}>{photo.description} 
                <button 
                    key='desc-e' 
                    className='btn-f mod'
                    data-type='description'
                    data-val={photo.description}
                    onClick={handleOpenForm}
                >...</button>
            </div>
            <div className={edit === 'description' ? 'detail-form' : 'hidden'}>
                <input value={field} onChange={handleChangeForm}/>
                <Button 
                    icon 
                    color='teal'
                    act='edit'
                    type='description'
                    val={field}
                    onClick={handleClickDetail}
                ><Icon name='check' />
                </Button>
                <Button 
                    icon 
                    color='red'
                    type='description'
                    onClick={handleOpenForm}
                ><Icon name='x' /></Button>
            </div>
            <div className='lbl-deet'>Location:</div>
            <div className={edit === 'location' ? 'hidden' : 'details'}>
                    <button 
                        key='loc-m-0' 
                        className='btn-f loc' 
                        data-act='filter' 
                        data-type='location' 
                        data-val={photo.location} 
                        onClick={handleClickDetail}
                    >{photo.location}</button>
                    <button 
                        key='loc-e' 
                        className='btn-f mod'
                        data-type='location'
                        data-val={photo.location}
                        onClick={handleOpenForm}
                        >...</button>
            </div>
            <div className={edit === 'location' ? 'detail-form' : 'hidden'}>
                <input value={field} onChange={handleChangeForm}/>
                <Button 
                    icon 
                    color='teal'
                    act='edit'
                    type='location'
                    val={field}
                    onClick={handleClickDetail}
                ><Icon name='check' />
                </Button>
                <Button 
                    icon 
                    color='red'
                    type='location'
                    onClick={handleOpenForm}
                ><Icon name='x' /></Button>
            </div>
            <div className='lbl-deet'>Albums:</div>
            <div className='details'>{showAlbums()}</div>
            <div className={edit === 'album' ? 'detail-form' : 'hidden'}>
                <Form.Field inline>
                    <Select name='album' value={field ? field : null} options={findOptions()} onChange={handleChangeForm}/>
                    <Button 
                        icon 
                        color='teal'
                        act='add'
                        type='albums'
                        val={field}    
                        onClick={handleClickDetail}
                    ><Icon name='check' />
                    </Button>
                    <Button 
                        icon 
                        color='red'
                        type='album'
                        onClick={handleOpenForm}
                    ><Icon name='x' /></Button>
                </Form.Field>

            </div>
            <div className='lbl-deet'>Tags:</div>
            <div className='details'>{showTags()}</div>
            <div className={edit === 'tag' ? 'detail-form' : 'hidden'}>
                <input value={field} onChange={handleChangeForm}/>
                <Button 
                    icon 
                    color='teal'
                    act='add'
                    type='tags'
                    val={field}
                    onClick={handleClickDetail}
                ><Icon name='check' />
                </Button>
                <Button 
                    icon 
                    color='red'
                    type='tag'
                    onClick={handleOpenForm}
                ><Icon name='x' /></Button>
            </div>
            <div className='lbl-deet'>People:</div>
            <div className='details'>{showPeople()}</div>
            <div className={edit === 'person' ? 'detail-form' : 'hidden'}>
                <input value={field} onChange={handleChangeForm}/>
                <Button 
                    icon 
                    color='teal'
                    act='add'
                    type='people'
                    val={field}
                    onClick={handleClickDetail}
                ><Icon name='check' />
                </Button>
                <Button 
                    icon 
                    color='red'
                    type='person'
                    onClick={handleOpenForm}
                ><Icon name='x' /></Button>
            </div>
            <div className='button-box'>
                <Button 
                    color='teal' 
                    as={Link} 
                    to='/photos'
                >Back</Button>
                <Button 
                    color='red' 
                    act='delete' 
                    onClick={handleClickDetail}
                >Delete Photo</Button>
            </div>
        </div>
    )
}
export default PhotoDetails