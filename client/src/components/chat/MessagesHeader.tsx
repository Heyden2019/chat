import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../../types'
import Avatar from '../Avatar'

type PropsType = {
    user: User
}

const MessagesHeader: FC<PropsType> = ({user}) => {
    return (
        <div className="partner_info">
            <NavLink to={'/users/' + user._id}> 
            <Avatar image_id={user.image_id} />
            <div className="username">
                {user.fullname}
            </div>
            </NavLink>
            
        </div>
    )
}

export default MessagesHeader
