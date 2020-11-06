import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isAuth from '../../hoc/isAuth'
import { RootState } from '../../redux/store'
import { getUsers } from '../../redux/users-reducer'
import UserSearch from './UserSearch'
import UsersPagination from './UsersPagination'
import { Row, Spin } from 'antd';
import Users from './Users'
import ContentWrapper from '../ContentWrapper'

export type SearchValuesType = {
    fullname: string
    newFirst: boolean
}

const UsersPage = () => {
 
    const dispatch = useDispatch()
    const [searchValues, setSearchValues] = useState<SearchValuesType>({
        fullname: "",
        newFirst: true
    })
    const [currentPage, setcurrentPage] = useState(1)
    const users = useSelector((state: RootState) => state.users.users)
    const loading = useSelector((state: RootState) => state.users.loading)

    useEffect(() => {
        setcurrentPage(1)
        dispatch(getUsers({...searchValues}))
    }, [searchValues]) // eslint-disable-line react-hooks/exhaustive-deps 

    return (
        <ContentWrapper className="users-page">
            <UserSearch searchValues={searchValues} setSearchValues={setSearchValues} />
            {(loading === "with_pagination" && <Row justify="center"><Spin /></Row>)
                || (!users.length && <p>No results</p>)
                || (<>
                    <UsersPagination searchValues={searchValues} currentPage={currentPage} setcurrentPage={setcurrentPage} />
                    {loading === "without_pagination"
                        ? <Row justify="center"><Spin /></Row>
                        : <Users users={users} />
                    }
                </>)
            }
        </ContentWrapper>
    )
}

export default isAuth(UsersPage)
