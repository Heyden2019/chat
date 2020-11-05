import { Layout, Menu, Row } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../redux/store'
import { logout } from '../redux/users-reducer'
import Avatar from './Avatar'

const { Header } = Layout;
const { SubMenu } = Menu;

const NavBar = () => {
    const me = useSelector((state: RootState) => state.users.currentUser)
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (

        <Header style={{ width: '100%' }}>
            <Menu theme="dark" mode="horizontal" >
                {!me &&
                    <>
                        <Menu.Item key="register">
                            <NavLink to="/register">Register</NavLink>
                        </Menu.Item>
                        <Menu.Item key="login">
                            <NavLink to="/login">Login</NavLink>
                        </Menu.Item>
                    </>}
                {me &&
                    <>
                        <Menu.Item key="user" >
                            <NavLink to={"/user/" + me._id}
                                className="navbar_avatar">
                                <Avatar image_id={me.image_id} />
                                {me.fullname}
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="chat">
                            <NavLink to="/chat">Chat</NavLink>
                        </Menu.Item>
                        <Menu.Item key="users">
                            <NavLink to="/users">Users</NavLink>
                        </Menu.Item>
                        <Menu.Item key="logout">
                            <NavLink to="/login" onClick={onLogout}>Logout</NavLink>
                        </Menu.Item>
                    </>}
            </Menu>
        </Header>

    )
}

export default NavBar;