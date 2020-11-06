import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from '../redux/store'
import { getCurrentUser, getUserById, setTargetUser } from '../redux/users-reducer'
import isAuth from './../hoc/isAuth'
import { User } from './../types'
import defaultPhoto from './../static/images/em_avatar_default-user.png'
import { NavLink } from 'react-router-dom'
import { API_URL } from '../settings'
import { Button, Col, Image, Row, Space, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ContentWrapper from './ContentWrapper'

const { Text } = Typography

type PropsType = {
    me: null | User
}

const Profile: FC<PropsType> = () => {

    const [isLoading, setIsLoading] = useState(true)
    const me = useSelector((state: RootState) => state.users.currentUser)
    const dispatch = useDispatch()
    const params: any = useParams()
    const targetUser = useSelector((state: RootState) => state.users.targetUser)
    const isMe = me?._id === params.id

    useEffect(() => {

        const fn = async () => {
            setIsLoading(true)
            if (params?.id) {
                await dispatch(getUserById(params.id))
            }
            setIsLoading(false)
        }
        fn()

        return () => { dispatch(setTargetUser(null)) }
    }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

    const changePhoto = (info: any) => {
        if (info.file.status === 'done') {
            dispatch(getCurrentUser())
            dispatch(getUserById(params.id))
            message.success(`Photo uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.response.message}`);
        }
    }

    if (!targetUser && !isLoading) return <h3>404: USER NOT FOUND</h3>

    return (
        <ContentWrapper className="profile-page">
            <Row>
                <Col>
                    <Image src={targetUser?.photo_url || defaultPhoto} />
                </Col>
                <Col>
                <Space direction="vertical" size={16} >
                    <Row>
                        <Space size={2} align="baseline">
                            <Text strong style={{fontSize: 20}}>{targetUser?.fullname}</Text> 
                            {isMe ? <Text type="secondary">(It's you)</Text> : null}
                        </Space>
                    </Row>
                    <Row>
                        {isMe ?
                            <Upload
                                multiple={false}
                                name="Image"
                                action={API_URL + "/images"}
                                withCredentials={true}
                                onChange={changePhoto}
                                showUploadList={false}>
                                <Button icon={<UploadOutlined />}>Upload new photo</Button>
                            </Upload>
                            : <NavLink to={'/chat/' + targetUser?._id}><Button type="primary">Start chat</Button></NavLink>}
                    </Row>
                    </Space>
                </Col>
            </Row>
        </ContentWrapper>
    )
}

export default isAuth(Profile)
