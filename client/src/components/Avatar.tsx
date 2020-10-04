import React, { FC } from 'react'
import defaultPhoto from './../static/images/em_avatar_default-user.png'

type PropsType = {
    image_id: string
}

const Avatar: FC<PropsType> = ({image_id}) => {
    return (
        <div className="avatar">
            <img src={image_id ? `http://localhost:5000/images/${image_id}` : defaultPhoto} alt='avatar'/>
        </div>
    )
}

export default Avatar
