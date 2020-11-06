import { Avatar } from 'antd'
import React, { FC } from 'react'
import { API_URL } from '../settings'
import defaultPhoto from './../static/images/em_avatar_default-user.png'

type PropsType = {
    image: null | string
}

const AvatarIMG: FC<PropsType> = ({image}) => {
    return (
            <Avatar src={image ||  defaultPhoto} style={{margin: 8}} />
    )
}
export default AvatarIMG
