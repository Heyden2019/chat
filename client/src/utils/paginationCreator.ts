import { USERS_PAGINATION_PORTION } from "./../settings"

const paginationCreator = (totalItems: number, currentPage: number) => {
    let pages = [] as  Array<number | string>
    const totalPages = Math.ceil(totalItems / USERS_PAGINATION_PORTION)
    for(let i = currentPage - 2; i <= currentPage + 2; i++) {
        if(i > 0 && i <= totalPages) {
            pages.push(i)
        }
    }

    if(pages[0] === 2) {
        pages = [1, ...pages]
    } else if (pages[0] > 2) {
        pages = [1, "...", ...pages]
    }

    if(pages[pages.length - 1] === totalPages - 1) {
        pages = [...pages, totalPages]
    } else if (pages[pages.length - 1] < totalPages - 1) {
        pages = [...pages, "...", totalPages]
    }

    return pages
}

export default paginationCreator