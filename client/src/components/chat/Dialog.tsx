import React, { FC, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { User } from './../../types'
import formatDate from './../../utils/messageTimeFormater'
import classNames from 'classnames'
import Avatar from './../Avatar'

type PropsType = {
    user: User, 
    text: string, 
    date: Date,
    isMyMsg: boolean
}

const Dialog: FC<PropsType> = React.memo(({user, text, date, isMyMsg}) => {
    const history = useHistory()
    const params: any = useParams()
    const lastMessageTime = useMemo(() => formatDate(date), [date])

    const changeCurrentDialog = (id: string) => {
        history.push('/chat/' + id)
    }

    return (
        <div className={classNames("dialog_item", {current_dialog: params.id === user._id})}
            onClick={() => changeCurrentDialog(user._id)}>
            <Avatar image_id={user.image_id} />
            <div className="message">
                <div className="msg_header">
                    <span className="user">
                        {user.fullname}
                    </span>
                    <span className="datetime">
                        {lastMessageTime}
                    </span>
                </div>
                <div className="msg_body">
                {isMyMsg ? <b>Me: </b> : null}{text}
                </div>
            </div>
        </div>
    )
})

export default Dialog
