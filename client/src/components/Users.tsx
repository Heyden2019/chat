import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import isAuth from './../hoc/isAuth'
import { RootState } from './../redux/store'
import { getUsers } from './../redux/users-reducer'
import Avatar from './Avatar'

const Users = () => {
 
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users.users)
    const me = useSelector((state: RootState) => state.users.currentUser)

    useEffect(() => {
        dispatch(getUsers())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (  
     
        <div className="user_list">
            {users.map(user => (
                <div className="user" key={user._id}>
                    <Avatar image_id={user.image_id}/>
                    {user.firstName} {user.lastName}
                    <NavLink to={`/user/`+user._id}>Profile</NavLink>
                    {user._id !== me?._id ? <NavLink to={`/chat/`+user._id}>Chat</NavLink> : null}
                </div>
            ))}
        </div>
    )
}

export default isAuth(Users)
