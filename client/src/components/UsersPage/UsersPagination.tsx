import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getUsers } from '../../redux/users-reducer'
import { SearchValuesType } from './UsersPage'
import { Pagination } from 'antd';
import { USERS_PAGINATION_PORTION } from '../../settings'

type PropsType = {
    searchValues: SearchValuesType
    currentPage: number
    setcurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const UsersPagination: FC<PropsType> = ({searchValues, currentPage, setcurrentPage}) => {

    const dispatch = useDispatch()
    const totalUsers = useSelector((state: RootState) => state.users.totalUsers)

    const onChangePage = (page: number | string) => {
        if(typeof page === "number") {
            setcurrentPage(page)
            dispatch(getUsers({...searchValues, page}))
        }
    }

    if(!totalUsers) return null

    return (
        <Pagination
            total={totalUsers}
            showQuickJumper
            current={currentPage}
            onChange={onChangePage}
            defaultPageSize={USERS_PAGINATION_PORTION}
            className="users-page__pagination"
        />
    )
}

export default UsersPagination
