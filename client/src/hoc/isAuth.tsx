import React from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '../redux/users-reducer';
import { RootState } from '../redux/store';


const isAuth = (Component: any) => {

    const ProtectedComponent = (props: any) => {
        const history = useHistory()
        const dispatch = useDispatch()
        const me = useSelector((state: RootState) => state.users.currentUser)

        //@ts-ignore
        useEffect(() => {
            const fn = async () => {
                let me = await dispatch(getCurrentUser())
                if (!me) history.push("/login")
            }
            fn()
        }, [me?._id]) // eslint-disable-line react-hooks/exhaustive-deps

        return (
            <Component {...props} />
        )
    }
    return ProtectedComponent
}

export default isAuth
