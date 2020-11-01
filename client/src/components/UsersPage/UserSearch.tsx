import React, { FC } from 'react'
import { SearchValuesType } from './Users'

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
        <div className="user-searcher">
            <input type="text"
                className="search-input search-icon"
                onChange={onChangeFullnameSearchInput}
                value={searchValues.fullname} />
            <div className="user-searcher__new-first">
                <input type="checkbox"
                    name="newFirst"
                    id="newFirst"
                    onChange={onChangeNewFirstCheckbox}
                    checked={searchValues.newFirst} />
                <label htmlFor="newFirst">&nbsp; New first</label>
            </div>
        </div>
    )
}

export default UserSearch
