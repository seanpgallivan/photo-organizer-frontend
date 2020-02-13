import React, {Component} from 'react'
import {Form, Label, Input, Button} from 'semantic-ui-react'

class AlbumForm extends Component {
    state = {
        name: "",
        description: ""
    }

    handleFormChange = e => {
        // this.setState({[e.target.name]: e.target.value})
    }

    handleClick = e => {
        // this.props.onAlbumButtonClick(this.props.album, e.target.name)
    }
    
    handleFormClick = e => {
        // let {name, description} = this.state
        // if (e.target.name === "confirm" && (!name || !description)) break
        // this.props.onAlbumButtonClick({id: this.props.album.id}, e.target.name, this.state)
        // this.setState({name: "", description: ""})
    }
        
    render() {
        let {show, edit} = this.props
        let {name, description} = this.state
        return (
            <div className="sideitem">
                <h2>Album Details:</h2>
                {edit ? (
                    <>
                        <Form>
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
                            <Button name="confirm" color="blue" onClick={this.handleFormClick}>Confirm</Button>
                            <Button name="cancel" color="black" onClick={this.handleFormClick}>Cancel</Button>
                        </Form.Field>
                    </>
                ) : show ? (
                    <>
                        <p>Name: {show.name}</p>
                        <p>Description: {show.description}</p>
                        <Form.Field>
                            <Button name="edit" color="blue" onClick={this.handleClick}>Edit</Button>
                            <Button name="delete" color="red" onClick={this.handleClick}>Delete</Button>
                        </Form.Field>
                    </>
                ) : (
                    <>
                        <p>No Album Selected...</p>
                        <Form.Field>
                            <Button name="new" color="blue" onClick={this.handleClick}>Create a New Album</Button>
                        </Form.Field>
                    </>
                )}
            </div>
        )
    }
}

export default AlbumForm