import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { ErrorType } from '../types'
import { register } from './../redux/users-reducer'

const Register = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const errors = await dispatch(register(values)) as any
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

                <div className="field">
                    <label htmlFor="firstName">First name:</label><br />
                    <input
                        type="text"
                        placeholder="First name"
                        id="firstName"
                        className={formik.errors.firstName ? "error" : ""}
                        {...formik.getFieldProps('firstName')} />
                    {formik.errors.firstName && <p className="error">{formik.errors.firstName}</p>}
                </div>

                <div className="field">
                    <label htmlFor="lastName">Last name:</label><br />
                    <input
                        type="text"
                        placeholder="Last name"
                        id="lastName"
                        className={formik.errors.lastName ? "error" : ""}
                        {...formik.getFieldProps('lastName')} />
                    {formik.errors.lastName && <p className="error">{formik.errors.lastName}</p>}
                </div>

                <div className="field">
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className={formik.errors.email ? "error" : ""}
                        {...formik.getFieldProps('email')} />
                    {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                </div>

                <div className="field">
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className={formik.errors.password ? "error" : ""}
                        {...formik.getFieldProps('password')} />
                    {formik.errors.password && <p className="error">{formik.errors.password}</p>}

                </div>

                <button type="submit" disabled={formik.isSubmitting} className="btn">
                    Register
                    </button>
            </form>
        </div>
    )
}

export default Register
