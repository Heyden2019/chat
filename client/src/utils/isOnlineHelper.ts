import { differenceInMinutes } from 'date-fns'

const isOnlineHelper = (time: Date) => {
    const t = new Date(time)
    return differenceInMinutes(Date.now(), t) < 5
}

export default isOnlineHelper