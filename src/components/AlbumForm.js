import React, {Component} from 'react'
import {Form, Label, Input, Button} from 'semantic-ui-react'

class AlbumForm extends Component {
    state = {
        name: this.props.album.name || "",
        description: this.props.album.description || ""
    }

    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick = e => {
        this.props.onAlbumFormClick({...this.props.album, ...this.state}, e.target.name)
        
        // this.props.onAlbumButtonClick(this.props.album, e.target.name)
        // let {name, description} = this.state
        // if (e.target.name === "confirm" && (!name || !description)) break
        // this.props.onAlbumButtonClick({id: this.props.album.id}, e.target.name, this.state)
        // this.setState({name: "", description: ""})
    }
        
    render() {
        let {album} = this.props
        let {name, description} = this.state
        return (
            <div className="sideitem">
                <Form>
                    <h2>{album.id ? "Edit" : "New"} Album:</h2>
                    <Form.Field inline>
                        <Label>Album Name</Label>
                        <Input 
                            name="name" 
                            value={name} 
                            onChange={this.handleFormChange}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <Label>Album Description</Label>
                        <Input 
                            name="description" 
                            value={description} 
                            onChange={this.handleFormChange}
                        />
                    </Form.Field>
                </Form>
                <Form.Field>
                    <Button name="confirm" color="blue" onClick={this.handleClick}>Confirm</Button>
                    <Button name="cancel" color="black" onClick={this.handleClick}>Cancel</Button>
                </Form.Field>
            </div>
        )
    }
}

export default AlbumForm