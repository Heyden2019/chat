import { Col, Row, Space } from 'antd'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { User } from '../../types'
import Avatar from '../Avatar'

type PropsType = {
    users: User[]
}

const Users: FC<PropsType> = ({users}) => {
    
    const me = useSelector((state: RootState) => state.users.currentUser)

    return (  
        <div className="users-page__users">
            {users.map(user => (
                <Row className="users-page__users__user" key={user._id} align={"middle"}>
                    <Col>
                        <NavLink to={`/user/` + user._id}>
                            <Space align="center">
                                <Avatar image={user.photo_url} />
                                {user.fullname}
                            </Space>
                        </NavLink>
                    </Col>
                    <Col>
                        {user._id !== me?._id
                            ? <NavLink to={`/chat/` + user._id}>&nbsp;  Chat</NavLink>
                            : <span style={{ color: "red" }}>&nbsp; It's you</span>
                        }
                    </Col>
                </Row>
            ))}
        </div>
    )
}

export default Users
