import { Button, Layout, Row, Spin } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Preloader from '../Preloader'
import { getMessages, addMessage, getMoreMessages, resetMessagesState } from './../../redux/messages-reducer'
import { RootState } from './../../redux/store'
import Message from './Message'

const { Header, Content, Footer, Sider } = Layout;


type PropsType = {
    socket: any
    partnerId: string
}

const Messages: FC<PropsType> = React.memo(({socket, partnerId}) => {

    const dispatch = useDispatch()
    const messages = useSelector((state: RootState) => state.messages.messages)
    const hasMore = useSelector((state: RootState) => state.messages.hasMore)
    const isLoading = useSelector((state: RootState) => state.messages.isLoading)
    const msgBlock = useRef<HTMLDivElement>(null)
    const [messagesScrollHeight, setMessagesScrollHeight] = useState(0)

    useEffect(() => {
        socket.on('SERVER:NEW_MESSAGE_IN_DIALOG_WITH' + partnerId, (msg: any) => {
             dispatch(addMessage(msg))
             //@ts-ignore
        msgBlock?.current.scrollTo(0, msgBlock.current.scrollHeight)
            })
        return () => {
            socket.off('SERVER:NEW_MESSAGE_IN_DIALOG_WITH' + partnerId)
        }
    }, [partnerId]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        //@ts-ignore
        msgBlock?.current.scrollTo(0, msgBlock.current.scrollHeight - messagesScrollHeight)
    }, [messages[0]])

    useEffect(() => {
        dispatch(getMessages(partnerId))
        return () => {
            dispatch(resetMessagesState())
        }
    }, [partnerId]) // eslint-disable-line react-hooks/exhaustive-deps

    const getMore = () => {
        setMessagesScrollHeight(msgBlock.current?.scrollHeight || 0)
        dispatch(getMoreMessages(partnerId, messages[0].createdAt))
    }

    return (
        <Content style={{overflow: "scroll"}}>
            <div className="chat-page__messages" ref={msgBlock}>
            {(isLoading && <Row justify="center" style={{margin: 10}}><Spin /></Row>)
                ||
                (hasMore && <Row justify="center" style={{margin: 10}}><Button type="dashed" onClick={getMore}>get more</Button></Row>)}
            {messages.map(msg => (
                <Message createdAt={msg.createdAt}
                        text={msg.text} 
                        user={msg.user} 
                        key={msg._id} 
                        />
            ))}
            </div>
      </Content>
    )
})

export default Messages
