import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from '../redux/store'
import { getCurrentUser, getUserById, setTargetUser } from '../redux/users-reducer'
import isAuth from './../hoc/isAuth'
import { User } from './../types'
import defaultPhoto from './../static/images/em_avatar_default-user.png'
import { NavLink } from 'react-router-dom'
import {instance} from './../api/api'
import classNames from 'classnames'


type PropsType ={
    me: null | User
}

const Profile: FC<PropsType> = () => {

    const [isLoading, setIsLoading] = useState(true)
    const me = useSelector((state: RootState) => state.users.currentUser)
    const dispatch = useDispatch()
    const params: any = useParams()
    const targetUser = useSelector((state: RootState) => state.users.targetUser)
    const isMe = me?._id === params.id

    const [answer, setAnswer] = useState<any>(null)

    useEffect(() => {

        const fn = async () => {
            setIsLoading(true)
            if(params?.id) {
                await dispatch(getUserById(params.id))
            }
            setIsLoading(false)
        }
        fn()

        return () => { dispatch(setTargetUser(null)) }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    //@ts-ignore
    const changePhoto = ({target: {files}}) => {
        if(!files) {
            return;
        }
        const data = new FormData();
        data.append( 'Image', files[0] )
        instance.post('images', data).then(res => {
            setAnswer({
                type: 'success',
                msg: 'Success'
            })
            dispatch(getCurrentUser())
            dispatch(getUserById(params.id))
        }).catch(err => {
            setAnswer({
                type: 'error',
                msg: err.response.data.message
            })
        })
    }

    if(!targetUser && !isLoading) return <h3>404: USER NOT FOUND</h3>

    return (
        <div className="profile-header">
            <div className="photo">
                <img src={targetUser?.image_id ? `http://localhost:3000/api/images/${targetUser.image_id}` : defaultPhoto} alt="userPhoto" />
            </div>
            <div className="info">
                <p>{isMe ? <b>You: </b> : null}  {targetUser?.firstName} {targetUser?.lastName}</p>
                <p>*beautifully designed other important information*</p>
                {isMe ? null : <NavLink to={'/chat/' + targetUser?._id}>Start chat</NavLink>}
                {isMe ? <>
                    <div className="new_photo_form">Upload photo:<br />
                        <input type="file" name="image" onChange={changePhoto} />
                    </div>
                    {answer 
                        ? <p className={classNames({
                            'success_upload': answer.type === 'success',
                            'error_upload': answer.type === 'error'
                        })}>
                            {answer.msg}
                            </p>
                        : null
                    }
                </>
                    : null}
            </div>
        </div>
    )
}

export default isAuth(Profile)
