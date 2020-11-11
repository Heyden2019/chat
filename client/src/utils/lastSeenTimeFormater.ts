import { formatDistanceToNow } from 'date-fns'

const lastSeenTimeFormatter = (time: Date) => {
    const t = new Date(time)
    return formatDistanceToNow(t, {addSuffix: true})
}

export default lastSeenTimeFormatter