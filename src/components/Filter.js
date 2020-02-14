import React from 'react'
import {Form, Select, Label, Button} from 'semantic-ui-react'

const Filter = ({filters, filterOptions, onFilterChange}) => {

    const handleFilterChange = (_e, target) =>{
        let filter = target.name === "clear" ? null : {[target.name]: target.value}
        onFilterChange(filter)
    }

    return (
        <div className="sideitem">
            <Form>
                <Form.Field inline>
                    <Select name='album' value={filters.album ? filters.album.name : null} options={filterOptions.albums} onChange={handleFilterChange}/>
                    <Label pointing='left'>Filter by Album</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='tag' value={filters.tag ? filters.tag : null} options={filterOptions.tags} onChange={handleFilterChange}/>
                    <Label pointing='left'>Filter by Tag</Label>
                </Form.Field>
                <Form.Field inline>
                    <Select name='person' value={filters.person ? filters.person : null} options={filterOptions.people} onChange={handleFilterChange}/>
                    <Label pointing='left'>Filter by Person</Label>
                </Form.Field>
                <Form.Field inline>
                    <Button name="clear" color="teal" onClick={handleFilterChange}>Clear All Filters</Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default Filter