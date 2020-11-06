import React, { FC, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { User } from './../../types'
import formatDate from './../../utils/messageTimeFormater'
import Avatar from './../Avatar'
import { Col, Menu, Row, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import classNames from 'classnames'

const { Text } = Typography

type PropsType = {
    user: User,
    text: string,
    date: Date,
    isMyMsg: boolean
}

const Dialog: FC<PropsType> = React.memo(({ user, text, date, isMyMsg, ...props}) => {
    const history = useHistory()
    const lastMessageTime = useMemo(() => formatDate(date), [date])
    const partnerId = useSelector((state: RootState) => state.users.targetUser?._id)

    return (
        <Menu.Item key={partnerId}
        {...props}
            onClick={() => history.push('/chat/' + user._id)}
            className={classNames("chat-page__dialogs__item", {"chat-page__dialogs__item_active": partnerId === user._id})}
            >
            <Row align="middle" wrap={false} >
                <Col >
                    <Avatar image={user.photo_url} />
                </Col>
                <Col flex={1} style={{
                    display: "inline-flex",
                    overflow: "hidden",
                    flexDirection: "column"
                }}>
                    <Row justify="space-between" wrap={false}>
                        <Col className="text-overflow-with-ellipsis">{user.fullname}</Col>
                        <Col>{lastMessageTime}</Col>
                    </Row>
                    <Row wrap={false}>
                    {isMyMsg && <Text style={{color: "green"}}>
                        Me: &nbsp;
                        </Text>}
                        <Text className="text-overflow-with-ellipsis">
                        {text}
                        </Text>
                    </Row>
                </Col>
            </Row>
        </Menu.Item>
    )
})

export default Dialog
