import React, { FC } from 'react'
import paginationCreator from '../utils/paginationCreator'
import classNames from 'classnames'

type PropsType = {
    currentPage: number
    totalItems: number
    onChangePage: (page: string | number) => void
}

const Pagination: FC<PropsType> = ({currentPage, totalItems, onChangePage}) => {

    const pages: Array<number | string> = paginationCreator(totalItems, currentPage)

    return (
        <div  className="pagination">
            {pages.map((page, i) => (
                <p className={classNames("pagination__item", {
                        "pagination__number": typeof page === 'number',
                        "pagination__ellipsis": typeof page === 'string',
                        "pagination__active": page === currentPage,
                    })} 
                    key={`${page}${i}`}
                    onClick={() => onChangePage(page)}>
                    {page}
                </p>
            ))}
        </div>
    )
}

export default Pagination
