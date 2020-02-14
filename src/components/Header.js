import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const Header = ({user, onLogout}) => {

    const handleClick = () =>
        onLogout()

    return (
        <Menu inverted>
            <Menu.Item><Image src='/Photo organizer.png' /></Menu.Item>
            <Menu.Item as={NavLink} exact to='/'>Home</Menu.Item>
            <Menu.Item as={NavLink} exact to='/photos/'>Photos</Menu.Item>
            {user ? (
                <Menu.Item position="right" onClick={handleClick}>Logout</Menu.Item>
            ) : (
                <>
                    <Menu.Item position="right" as={NavLink} exact to='/login'>Login</Menu.Item>
                    <Menu.Item as={NavLink} exact to='/signup/'>Sign up</Menu.Item>
                </>
            )}
        </Menu>
    )
}

export default Header