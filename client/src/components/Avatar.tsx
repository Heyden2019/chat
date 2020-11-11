import { Avatar } from 'antd'
import React, { FC } from 'react'
import defaultPhoto from './../static/images/em_avatar_default-user.png'

type PropsType = {
    image: null | string
    isOnline?: boolean
}

const AvatarIMG: FC<PropsType> = ({image, isOnline = false}) => {
    return (
        <div className="avatar">
            <Avatar src={image ||  defaultPhoto} style={{margin: 8}} />
            {isOnline && <div className="online-icon"></div>}
        </div>
    )
}
export default AvatarIMG
