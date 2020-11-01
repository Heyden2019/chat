import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDialogs, resetDialogsState, updateDialogs } from './../../redux/dialogs-reducer'
import { RootState } from './../../redux/store'
import Dialog from './Dialog'
import { User } from './../../types'
import Preloader from '../Preloader'

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

    if(isLoading) return <Preloader />
    if(!dialogs.length) return <p>No dialogs </p>

    return (<>
            {[...dialogs].map(dialog => (
                <Dialog user={dialog.users.find(user => user._id !== myId) as User} 
                        text={dialog.lastMessage?.text || 'NO TEXT'}
                        //@ts-ignore
                        isMyMsg={dialog.lastMessage?.user === myId}
                        date={dialog.lastMessage?.createdAt}
                        key={dialog._id}
                />
            ))}
            </>
    )
})

export default DialogsList
