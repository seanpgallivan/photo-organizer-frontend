import React from 'react'
import {Menu, Image} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const Header = ({user, onLogout}) => {

    const handleClick = () =>
        onLogout()

    return (
        <Menu inverted size="massive" className={user ? "loggedin" : null}>
            <Menu.Item className="nopad"><Image src='/Photo organizer.png' /></Menu.Item>
            <Menu.Item as={NavLink} exact to='/'>Home</Menu.Item>
            {user ? (
                <>
                    <Menu.Item as={NavLink} exact to='/photos/'>Photos</Menu.Item>
                    <Menu.Item position="right">Welcome, {user.fullname}!</Menu.Item>
                    <Menu.Item onClick={handleClick}>Logout</Menu.Item>
                </>
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