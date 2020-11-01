import React, { FC, useMemo } from 'react'
import formatDate from './../../utils/messageTimeFormater'
import { User } from './../../types'
import Avatar from './../Avatar'

type PropsType = {
    user: User, 
    createdAt: Date, 
    text: string
}

const Message: FC<PropsType> = React.memo(({user, createdAt, text}) => {

    const date = useMemo(() => formatDate(createdAt), [createdAt])

    return (
        <div className="message-and-avatar">
            <Avatar image_id={user.image_id} />
            <div className="message">
                <div className="msg_header">
                    <span className="user">
                        {user.fullname}
                    </span>
                    <span className="datetime">
                        {date}
                    </span>
                </div>
                <div className="msg_body">
                    {text}
                </div>
            </div>
        </div>
    )
})

export default Message
