import React, { FC } from 'react'
import { API_URL } from '../settings'
import defaultPhoto from './../static/images/em_avatar_default-user.png'

type PropsType = {
    image_id: string
}

const Avatar: FC<PropsType> = ({image_id}) => {
    return (
        <div className="avatar">
            <img src={image_id ? `${API_URL}/images/${image_id}` : defaultPhoto} alt='avatar'/>
        </div>
    )
}
export default Avatar
