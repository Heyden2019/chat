import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { socket } from '../App'
import { getMessages, addMessage } from '../redux/messages-reducer'
import { RootState } from '../redux/store'
import Message from './Message'

const Messages = React.memo(() => {

    const params = useParams<{id: string}>()
    const dispatch = useDispatch()
    const messages = useSelector((state: RootState) => state.messages.messages)
    const msgBlock = useRef(null)

    useEffect(() => {
        socket.on('SERVER:NEW_MESSAGE_IN_DIALOG_WITH' + params.id, (msg: any) => {
             dispatch(addMessage(msg)) 
            })
        return () => {
            socket.off('SERVER:NEW_MESSAGE_IN_DIALOG_WITH' + params.id)
        }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        //@ts-ignore
        msgBlock?.current.scrollTo(0, msgBlock.current.scrollHeight)
    }, [messages])

    useEffect(() => {
        dispatch(getMessages(params.id))
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div className="messages" ref={msgBlock}>
        {messages.map(msg => (
            <Message createdAt={msg.createdAt}
                    text={msg.text} 
                    user={msg.user} 
                    key={msg._id} 
                    />
        ))}
    </div>
    )
})

export default Messages
