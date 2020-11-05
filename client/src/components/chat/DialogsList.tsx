import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDialogs, resetDialogsState, updateDialogs } from './../../redux/dialogs-reducer'
import { RootState } from './../../redux/store'
import Dialog from './Dialog'
import { User } from './../../types'
import Preloader from '../Preloader'
import { Menu, Row, Spin, Typography } from 'antd'
import { blue } from '@ant-design/colors'

const {Text} = Typography

type PropsType = {
    socket: any
}

const DialogsList: FC<PropsType> = React.memo(({socket}) => {
    const dispatch = useDispatch()
    const myId = useSelector((state: RootState) => state.users.currentUser?._id)
    const isLoading = useSelector((state: RootState) => state.dialogs.isLoading)
    const dialogs = useSelector((state: RootState) => state.dialogs.dialogs)
    
    useEffect(() => {
        dispatch(getDialogs())
        socket.on('SERVER:DIALOG_WAS_UPDATED', (dialog: any) => {
            dispatch(updateDialogs(dialog)) 
        })
        return () => {
            socket.off('SERVER:DIALOG_WAS_UPDATED')
            dispatch(resetDialogsState())
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(isLoading) return <Row justify="center" style={{marginTop: 10}}><Spin /></Row>
    if(!dialogs.length) return <Row justify="center" style={{marginTop: 10}}><Text>No dialogs</Text></Row>

    return (
        <Menu mode="vertical" selectedKeys={[]}>
            {[...dialogs].map(dialog => (
                <Dialog user={dialog.users.find(user => user._id !== myId) as User} 
                        text={dialog.lastMessage?.text || 'NO TEXT'}
                        //@ts-ignore
                        isMyMsg={dialog.lastMessage?.user === myId}
                        date={dialog.lastMessage?.createdAt}
                        key={dialog._id}
                />
            ))}
        </Menu>
    )
})

export default DialogsList
