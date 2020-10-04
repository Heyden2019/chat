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

const Chat = React.memo(() => {
    const dispatch = useDispatch()
    const params: any = useParams()
    const dialogs = useSelector((state: RootState) => state.dialogs.dialogs)
    const partner = useSelector((state: RootState) => state.users.targetUser)
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
                <DialogsList dialogs={dialogs} />
            </div>
            {partner ? <div className="chat_body">
                <MessagesHeader user={partner}/>
                <Messages />
                <ChatInput />
            </div>
            : null}
        </div>
    )
})

export default isAuth(Chat)
