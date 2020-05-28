import React, {Component} from 'react'
import {Input, Button} from 'semantic-ui-react'

class AlbumForm extends Component {
    state = {
        name: this.props.album.name || "",
        description: this.props.album.description || ""
    }

    componentWillUnmount() {
        this.props.onClearForms()
    }

    handleFormChange = e => 
        this.setState({[e.target.name]: e.target.value})

    handleClick = e => 
        this.props.onAlbumFormClick({...this.props.album, ...this.state}, e.target.name)

    render() {
        let {album} = this.props
        let {name, description} = this.state
        return (
            <div className="sideitem">
                <h2>{album.id ? "Edit" : "New"} Album:</h2>
                <div className='lbl-deet'>Name:</div>
                <div className='details'>
                    <Input name="name" value={name} onChange={this.handleFormChange} />
                </div>
                <div className='lbl-deet'>Description:</div>
                <div className='details'>
                    <Input name="description" value={description} onChange={this.handleFormChange} />
                </div>
                <div className='button-box'>
                    <Button name="confirm" color="teal" onClick={this.handleClick}>Confirm</Button>
                    <Button name="cancel" color="black" onClick={this.handleClick}>Cancel</Button>
                </div>
            </div>
        )
    }
}

export default AlbumForm