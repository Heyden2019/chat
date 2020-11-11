import { Col, Layout, Row, Typography } from 'antd';
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../../types'
import isOnlineHelper from '../../utils/isOnlineHelper';
import lastSeenTimeFormatter from '../../utils/lastSeenTimeFormater';
import Avatar from '../Avatar'

const { Header } = Layout;
const { Text } = Typography;

type PropsType = {
    user: User
}

const MessagesHeader: FC<PropsType> = ({ user }) => {
    return (
        <Header className="chat-page__messages__header">
            <Row gutter={1} align="middle">
                <Col>
                    <NavLink to={'/users/' + user._id}>
                        <Avatar image={user.photo_url} isOnline={isOnlineHelper(user.last_seen)} />
                    </NavLink>
                </Col>
                <Col>
                    <Row style={{lineHeight: "normal"}}>
                        <Text>{user.fullname}</Text>
                    </Row>
                    <Row style={{lineHeight: "normal"}}>
                        <Text>last seen {lastSeenTimeFormatter(user.last_seen)}</Text>
                    </Row>
                </Col>
            </Row>

           
        </Header>
    )
}

export default MessagesHeader
