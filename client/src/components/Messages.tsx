import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, addMessage, getMoreMessages } from '../redux/messages-reducer'
import { RootState } from '../redux/store'
import Message from './Message'

type PropsType = {
    socket: any
    partnerId: string
}

const Messages: FC<PropsType> = React.memo(({socket, partnerId}) => {

    const dispatch = useDispatch()
    const messages = useSelector((state: RootState) => state.messages.messages)
    const hasMore = useSelector((state: RootState) => state.messages.hasMore)
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
    }, [messages[messages.length - 1]])

    useEffect(() => {
        dispatch(getMessages(partnerId))
    }, [partnerId]) // eslint-disable-line react-hooks/exhaustive-deps

    const getMore = () => {
        dispatch(getMoreMessages(partnerId, messages[0].createdAt))
    }
    
    return (
        <div className="messages" ref={msgBlock}>
            {hasMore && <button onClick={getMore}>get more</button>}
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
