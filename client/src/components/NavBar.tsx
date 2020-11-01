import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../redux/store'
import { logout } from '../redux/users-reducer'
import Avatar from './Avatar'

const NavBar = () => {
    const me = useSelector((state: RootState) => state.users.currentUser)
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <nav>
            {!me && 
            <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
            </>}
            {me && 
            <>
                <NavLink to={"/user/" + me._id} 
                        className="navbar_avatar">
                    <Avatar image_id={me.image_id} />
                    {me.fullname}
                </NavLink>
                <NavLink to="/chat">Chat</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/login" onClick={onLogout}>Logout</NavLink>
            </>}
        </nav>
    )
}

export default NavBar
