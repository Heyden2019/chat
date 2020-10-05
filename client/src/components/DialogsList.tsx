import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDialogs } from '../redux/dialogs-reducer'
import { RootState } from '../redux/store'
import Dialog from './Dialog'
import { Dialog as DialogType, User } from '../types'

type PropsType = {
    dialogs: DialogType[]
    socket: any
}

const DialogsList: FC<PropsType> = React.memo(({dialogs, socket}) => {
    const dispatch = useDispatch()
    const myId = useSelector((state: RootState) => state.users.currentUser?._id)

    useEffect(() => {
        socket.on('SERVER:DIALOG_WAS_UPDATED', (dialog: any) => {
             dispatch(updateDialogs(dialog)) 
            })
        return () => {
            socket.off('SERVER:DIALOG_WAS_UPDATED')
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
