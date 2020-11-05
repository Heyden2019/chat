import { Avatar } from 'antd'
import React, { FC } from 'react'
import { API_URL } from '../settings'
import defaultPhoto from './../static/images/em_avatar_default-user.png'

type PropsType = {
    image_id: string
}

const AvatarIMG: FC<PropsType> = ({image_id}) => {
    return (
            <Avatar src={image_id ? `${API_URL}/images/${image_id}` : defaultPhoto} style={{margin: 8}} />
    )
}
export default AvatarIMG
