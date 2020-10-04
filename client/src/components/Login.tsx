import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { ErrorType } from '../types'
import { login } from './../redux/users-reducer'

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
               <div className="field">
               <label htmlFor="email">Email:</label><br/>
                <input 
                    type="email" 
                    placeholder="Email" 
                    id="email" 
                    className={formik.errors.email ? "error" : ""}
                    {...formik.getFieldProps('email')}/>
                    {formik.errors.email && <p className="error">{formik.errors.email}</p>}
               </div>
                   
                <div className="field">
                <label htmlFor="password">Password:</label><br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    className={formik.errors.password ? "error" : ""}
                    {...formik.getFieldProps('password')}/>
                     {formik.errors.password && <p className="error">{formik.errors.password}</p>}
                     
                </div>

                    <button type="submit" disabled={formik.isSubmitting} className="btn">
                        Login
                    </button>
            </form>
        </div>
    )
}

export default Login
