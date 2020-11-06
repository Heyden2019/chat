import { useFormik } from 'formik'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { sendMessage } from './../../redux/messages-reducer'
import { Button, Col, Input, Row } from 'antd';

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
            <form onSubmit={formik.handleSubmit}>
                <Row align="middle">
                <Col flex={1}>
                    <Input 
                    placeholder="Message"
                    allowClear
                    size="large"
                    {...formik.getFieldProps('msg')}
                    autoComplete='off'
                    />
                </Col>
                <Col>
                <Button type="primary" onClick={formik.submitForm}>
                    Send
                </Button></Col>
                </Row>
            </form>        
    )
}

export default ChatInput
