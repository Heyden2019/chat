import { Layout, Typography } from 'antd';
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../../types'
import Avatar from '../Avatar'

const { Header } = Layout;
const { Text } = Typography;

type PropsType = {
    user: User
}

const MessagesHeader: FC<PropsType> = ({ user }) => {
    return (
        <Header className="chat-page__messages__header">
            <NavLink to={'/users/' + user._id}>
                <Avatar image_id={user.image_id} />
                <Text>{user.fullname}</Text>
            </NavLink>
        </Header>
    )
}

export default MessagesHeader
