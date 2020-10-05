import React, { useEffect } from 'react'
import isAuth from './../../hoc/isAuth'
import ChatInput from '../ChatInput'
import Messages from '../Messages'
import DialogsList from '../DialogsList'
import MessagesHeader from '../MessagesHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getDialogs } from '../../redux/dialogs-reducer'
import { RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { getUserById, setTargetUser } from '../../redux/users-reducer'
import openSocket from 'socket.io-client'

const Chat = React.memo(() => {

    const socket = openSocket('http://localhost:5000')
    const dispatch = useDispatch()
    const params: any = useParams()
    const dialogs = useSelector((state: RootState) => state.dialogs.dialogs)
    const partner = useSelector((state: RootState) => state.users.targetUser)
    const me = useSelector((state: RootState) => state.users.currentUser)
    const isMe = me?._id === partner?._id
    useEffect(() => {
        if(params?.id) {
            dispatch(getUserById(params.id))
        }
        return () => {
            dispatch(setTargetUser(null))
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(getDialogs())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="chat_page">
            <div className="dialogs_list">
                Dialogs:
                <DialogsList dialogs={dialogs} socket={socket} />
            </div>
            {partner && !isMe ? <div className="chat_body">
                <MessagesHeader user={partner}/>
                <Messages socket={socket} partnerId={partner._id}/>
                <ChatInput />
            </div>
            : null}
        </div>
    )
})

export default isAuth(Chat)
