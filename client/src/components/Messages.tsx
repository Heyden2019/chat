import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, addMessage } from '../redux/messages-reducer'
import { RootState } from '../redux/store'
import Message from './Message'

type PropsType = {
    socket: any
    partnerId: string
}

const Messages: FC<PropsType> = React.memo(({socket, partnerId}) => {

    const dispatch = useDispatch()
    const messages = useSelector((state: RootState) => state.messages.messages)
    const msgBlock = useRef(null)

    useEffect(() => {
        socket.on('SERVER:NEW_MESSAGE_IN_DIALOG_WITH' + partnerId, (msg: any) => {
             dispatch(addMessage(msg)) 
            })
        return () => {
            socket.off('SERVER:NEW_MESSAGE_IN_DIALOG_WITH' + partnerId)
        }
    }, [partnerId]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        //@ts-ignore
        msgBlock?.current.scrollTo(0, msgBlock.current.scrollHeight)
    }, [messages])

    useEffect(() => {
        dispatch(getMessages(partnerId))
    }, [partnerId]) // eslint-disable-line react-hooks/exhaustive-deps
    
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
