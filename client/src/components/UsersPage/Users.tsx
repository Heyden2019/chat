import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import isAuth from './../../hoc/isAuth'
import { RootState } from './../../redux/store'
import { getUsers, resetUsersState } from './../../redux/users-reducer'
import Avatar from './../Avatar'
import Preloader from './../Preloader'
import UserSearch from './UserSearch'
import UsersPagination from './UsersPagination'

export type SearchValuesType = {
    fullname: string
    newFirst: boolean
}

const Users = () => {
 
    const dispatch = useDispatch()
    const [searchValues, setSearchValues] = useState<SearchValuesType>({
        fullname: "",
        newFirst: true
    })
    const [currentPage, setcurrentPage] = useState(1)
    const users = useSelector((state: RootState) => state.users.users)
    const me = useSelector((state: RootState) => state.users.currentUser)
    const loading = useSelector((state: RootState) => state.users.loading)

    useEffect(() => {
        setcurrentPage(1)
        dispatch(getUsers({...searchValues}))
    }, [searchValues]) // eslint-disable-line react-hooks/exhaustive-deps 

    return (  
    <>
        <UserSearch searchValues={searchValues} setSearchValues={setSearchValues} />
        {(loading === "with_pagination" && <Preloader /> )
            || (!users.length && <p>No results</p>) 
                || (<>
                    <UsersPagination searchValues={searchValues} currentPage={currentPage} setcurrentPage={setcurrentPage} />
                    {loading === "without_pagination" 
                        ? <Preloader /> 
                        : <div className="user_list">
                            {users.map(user => (
                                <div className="user" key={user._id}>
                                    <NavLink to={`/user/`+user._id} className="user__link" >
                                        <Avatar image_id={user.image_id}/>
                                        {user.fullname}
                                    </NavLink>
                                    {user._id !== me?._id 
                                        ? <NavLink to={`/chat/`+user._id}>Chat</NavLink> 
                                        : <span style={{color: "red"}}>&nbsp; It's you</span>
                                    }
                                </div>
                            ))}
                        </div>
                    }
                </>)
        }
    </>
    )
}

export default isAuth(Users)
