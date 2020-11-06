import { Input, Button, Form } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { ErrorType } from '../types'
import { login } from './../redux/users-reducer'
import ContentWrapper from './ContentWrapper'

const Login = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { setFieldError, setErrors }) => {
            const errors = await dispatch(login(values)) as any
            if (errors) {
                errors.forEach((err: ErrorType) => {
                    setFieldError(err.param, err.msg)
                })
            } else {
                history.push('/')
            }
        }
    })

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <ContentWrapper className="container-form">
            <Form
                {...layout}
                name="basic"
                onFinish={formik.handleSubmit}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    validateStatus={formik.errors.email && "error"}
                    help={formik.errors.email}
                >
                    <Input {...formik.getFieldProps('email')} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    validateStatus={formik.errors.password && "error"}
                    help={formik.errors.password}
                >
                    <Input.Password {...formik.getFieldProps('password')} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </ContentWrapper>
    )
}

export default Login
