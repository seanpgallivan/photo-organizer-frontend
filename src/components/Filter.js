import React from 'react'
import {Form, Select, Label, Button} from 'semantic-ui-react'

const Filter = ({filters: {album, tag, person, location}, count, filterOptions, onFilterChange}) => {

    const handleFilterChange = (e, target) => {
        let type = target ? target.name : e.target.name
        let val = target ? target.value : null
        let filter = type==='clear' ? null : {[type]: val}
        onFilterChange(filter)
    }

    return (
        <div className="sideitem">
            <Form>
                <Form.Field inline>
                    <Select name='album' value={album ? album : null} options={filterOptions.albums} onChange={handleFilterChange}/>
                    {album ? <button name='album' className='btn-f alb buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={album ? 'lbl-alb-act' : 'lbl-alb'}>{!album ? 'Filter by ' : ''}Album</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='tag' value={tag ? tag : null} options={filterOptions.tags} onChange={handleFilterChange}/>
                    {tag ? <button name='tag' className='btn-f tag buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={tag ? 'lbl-tag-act' : 'lbl-tag'}>{!tag ? 'Filter by ' : ''}Tag</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='person' value={person ? person : null} options={filterOptions.people} onChange={handleFilterChange}/>
                    {person ? <button name='person' className='btn-f per buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={person ? 'lbl-per-act' : 'lbl-per'}>{!person ? 'Filter by ' : ''}Person</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='location' value={location ? location : null} options={filterOptions.locations} onChange={handleFilterChange}/>
                    {location ? <button name='location' className='btn-f loc buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={location ? 'lbl-loc-act' : 'lbl-loc'}>{!location ? 'Filter by ' : ''}Location</Label>
                </Form.Field>
                <div className='count-clear'>
                    <div className='counter'>{count} Photos</div>
                    <div className={album||tag||person||location ? 'btn-clear' : 'hidden'}>
                        <Button name="clear" color="teal" onClick={handleFilterChange}>Clear All</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default Filter