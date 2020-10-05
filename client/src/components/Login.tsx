import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { ErrorType } from '../types'
import { login } from './../redux/users-reducer'
import CustomFormikField from './CustomFormikField'

const Login = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const errors = await dispatch(login(values)) as any
            if (errors) {
                errors.forEach((err: ErrorType) => {
                    formik.setFieldError(err.param, err.msg)
                }) 
            } else {
                history.push('/')
            }
        }
    })

    return (
        <div className="container form">
            <form onSubmit={formik.handleSubmit}>

                <CustomFormikField 
                    formik={formik}
                    name="email"
                    placeholder='Email'
                    type='email'

                />

                <CustomFormikField 
                    formik={formik}
                    name="password"
                    placeholder='Password'
                    type='password'

                />

                <button type="submit" disabled={formik.isSubmitting} className="btn">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
