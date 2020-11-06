import React, { FC, useMemo } from 'react'
import formatDate from './../../utils/messageTimeFormater'
import { User } from './../../types'
import Avatar from './../Avatar'
import { Col, Row, Space, Typography } from 'antd'

const { Text } = Typography;

type PropsType = {
    user: User, 
    createdAt: Date, 
    text: string
}

const Message: FC<PropsType> = React.memo(({user, createdAt, text}) => {

    const date = useMemo(() => formatDate(createdAt), [createdAt])

    return (
        <Row wrap={false}>
            <Col>
            <Avatar image={user.photo_url} />
            </Col>
            <Col flex={1}>
                <Row>
                    <Space direction="horizontal">
                        <Text strong>{user.fullname}</Text>
                        <Text type="secondary">{date}</Text>
                    </Space>
                </Row>
                <Row><Text className="chat-page__messages__item__text">{text}</Text></Row>
            </Col>
        </Row>
    )
})

export default Message
