import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getUsers } from '../../redux/users-reducer'
import Pagination from '../Pagination'
import { SearchValuesType } from './Users'

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
        <Pagination currentPage={currentPage} totalItems={totalUsers} onChangePage={onChangePage} />
    )
}

export default UsersPagination
