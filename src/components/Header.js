import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const Header = ({activeItem, onMenuSelect}) => {

    const handleItemClick = (_e, { name }) => {
        onMenuSelect(name)
    }

    return (
        <Menu>
            <Menu.Item><Image src='Photo organizer.png' /></Menu.Item>
            <Menu.Item as={NavLink} exact to='/'>Home</Menu.Item>
            <Menu.Item as={NavLink} exact to='/photos/'>Photos</Menu.Item>
            <Menu.Item position="right" as={NavLink} exact to='/signup/'>Sign up</Menu.Item>
            <Menu.Item as={NavLink} exact to='/login'>Login</Menu.Item>
        </Menu>
    )
}

export default Header