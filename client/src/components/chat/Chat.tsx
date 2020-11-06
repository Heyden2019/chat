import React, { useEffect } from 'react'
import isAuth from './../../hoc/isAuth'
import ChatInput from './ChatInput'
import Messages from './Messages'
import DialogsList from './DialogsList'
import MessagesHeader from './MessagesHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { getUserById, setTargetUser } from '../../redux/users-reducer'
import openSocket from 'socket.io-client'
import { BASE_URL } from '../../settings'
import { Layout } from 'antd'

const { Sider } = Layout;

const Chat = React.memo(() => {

    const socket = openSocket(BASE_URL)
    const dispatch = useDispatch()
    const params: any = useParams()
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

    if(!me) return null

    return (
        // <div className="chat_page">
        //     <div className="dialogs_list">
        //         Dialogs:
        //         <DialogsList socket={socket} />
        //     </div>
        //     {partner && !isMe ? <div className="chat_body">
        //         <MessagesHeader user={partner}/>
        //         <Messages socket={socket} partnerId={partner._id}/>
        //         <ChatInput />
        //     </div>
        //     : null}
        // </div>
         <Layout>
         <Sider theme="light"
           style={{
             overflow: 'auto',
             height: '100%',
             position: 'fixed',
             left: 0,
             width: '250px'
           }}
         >
             <DialogsList socket={socket}/>

         </Sider>
         {partner && !isMe ? <Layout className="site-layout" style={{ marginLeft: 200 }}>
           <MessagesHeader user={partner} />

           <Messages socket={socket} partnerId={partner._id} />

          <ChatInput />
         </Layout>
         : null}
       </Layout>
    )
})

export default isAuth(Chat)
