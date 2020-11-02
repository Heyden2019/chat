const getUsersUrlParser = (query) => {
    const searchText = query.fullname && query.fullname.replace(/[^a-zа-яё\s]/gi, '')
    const page = +(query.page as string) || 1
    const newFirst = query.newFirst === 'true'
    return {searchText, newFirst, page}
}

export default getUsersUrlParser


