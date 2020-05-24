import React from 'react'
import {Form, Select, Label, Button} from 'semantic-ui-react'

const Filter = ({filters, filterOptions, onFilterChange}) => {

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
                    <Select name='album' value={filters.album ? filters.album : null} options={filterOptions.albums} onChange={handleFilterChange}/>
                    {filters.album ? <button name='album' className='btn alb buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={filters.album ? 'lbl-alb-act' : 'lbl-alb'}>{!filters.album ? 'Filter by ' : ''}Album</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='tag' value={filters.tag ? filters.tag : null} options={filterOptions.tags} onChange={handleFilterChange}/>
                    {filters.tag ? <button name='tag' className='btn tag buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={filters.tag ? 'lbl-tag-act' : 'lbl-tag'}>{!filters.tag ? 'Filter by ' : ''}Tag</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='person' value={filters.person ? filters.person : null} options={filterOptions.people} onChange={handleFilterChange}/>
                    {filters.person ? <button name='person' className='btn per buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={filters.person ? 'lbl-per-act' : 'lbl-per'}>{!filters.person ? 'Filter by ' : ''}Person</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='location' value={filters.location ? filters.location : null} options={filterOptions.locations} onChange={handleFilterChange}/>
                    {filters.location ? <button name='location' className='btn loc buff' onClick={handleFilterChange}>X</button> : null}
                    <Label pointing='left' className={filters.location ? 'lbl-loc-act' : 'lbl-loc'}>{!filters.location ? 'Filter by ' : ''}Location</Label>
                </Form.Field>
                <Form.Field inline>
                    <Button name="clear" color="teal" onClick={handleFilterChange}>Clear All Filters</Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default Filter