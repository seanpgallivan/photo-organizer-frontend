import React from 'react'
import {Form, Select, Label, Button} from 'semantic-ui-react'

const Filter = ({app: {cb, state: {filters: {albums, tags, people, location}, filterOptions}}, onSetEdit}) => {

    const handleFilterChange = (e, t) => {
        let type = t ? t.name : e.target.name
        let val = t ? t.value : null
        let filter = type==='clear' ? null : {[type]: val}
        cb.filterChange(filter)
        onSetEdit(null)
    }


    return (
        <div className="sideitem">
            <div className='side-header'>Filters:</div>
            <div className={albums||tags||people||location ? 'btn-clear' : 'hidden'}>
                <Button name="clear" color="teal" onClick={handleFilterChange}>Clear All</Button>
            </div>
            <Form>
                <Form.Field inline>
                    <Select name='albums' value={albums || null} options={filterOptions.albums} onChange={handleFilterChange}/>
                    {albums && <button name='albums' className='btn-f albums buff' onClick={handleFilterChange}>X</button>}
                    <Label pointing='left' className={albums ? 'lbl-alb-act' : 'lbl-alb'}>{!albums ? 'Filter by ' : ''}Album</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='tags' value={tags || null} options={filterOptions.tags} onChange={handleFilterChange}/>
                    {tags && <button name='tags' className='btn-f tags buff' onClick={handleFilterChange}>X</button>}
                    <Label pointing='left' className={tags ? 'lbl-tag-act' : 'lbl-tag'}>{!tags ? 'Filter by ' : ''}Tag</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='people' value={people || null} options={filterOptions.people} onChange={handleFilterChange}/>
                    {people && <button name='people' className='btn-f people buff' onClick={handleFilterChange}>X</button>}
                    <Label pointing='left' className={people ? 'lbl-per-act' : 'lbl-per'}>{!people ? 'Filter by ' : ''}Person</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='location' value={location || null} options={filterOptions.locations} onChange={handleFilterChange}/>
                    {location && <button name='location' className='btn-f location buff' onClick={handleFilterChange}>X</button>}
                    <Label pointing='left' className={location ? 'lbl-loc-act' : 'lbl-loc'}>{!location ? 'Filter by ' : ''}Location</Label>
                </Form.Field>
            </Form>
        </div>
    )
}

export default Filter