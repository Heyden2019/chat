import { useFormik } from 'formik'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { sendMessage } from '../redux/messages-reducer'

const ChatInput: FC = () => {

    const dispatch = useDispatch()
    const params = useParams<{id: string}>()

    const formik = useFormik({
        initialValues: {msg: ''},
        onSubmit: (value, {resetForm}) => {
            if (value.msg.trim()) {
                dispatch(sendMessage(params.id, value.msg.trim()))
            }
            resetForm()
        }
    })

    return (
        <div className="chat_input">
            <form onSubmit={formik.handleSubmit}>
                <input type="text" {...formik.getFieldProps('msg')} 
                        autoComplete={'off'}/>
                <button type="submit">
                    send
                </button>
            </form>
        </div>
    )
}

export default ChatInput
