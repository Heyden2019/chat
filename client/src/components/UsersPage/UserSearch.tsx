import React, { FC } from 'react'
import { SearchValuesType } from './UsersPage'
import { Col, Input, Row } from 'antd';
import { Checkbox } from 'antd';

type PropsType = {
    searchValues: SearchValuesType
    setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
}

const UserSearch: FC<PropsType> = ({searchValues, setSearchValues}) => {

    const onChangeFullnameSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget
        setSearchValues(prev => ({...prev, fullname: value}))
    }

    const onChangeNewFirstCheckbox = () => {
        setSearchValues(prev => ({...prev, newFirst: !prev.newFirst}))
    }

    return (
        <Row align="middle" className="users-page__search" gutter={[16, 8]}>
            <Col>
                <Input placeholder="Search"
                    onChange={onChangeFullnameSearchInput}
                    value={searchValues.fullname}
                />
            </Col>
            <Col>
                <Checkbox onChange={onChangeNewFirstCheckbox} checked={searchValues.newFirst} style={{}}>New first</Checkbox>
            </Col>
        </Row>
    )
}

export default UserSearch
