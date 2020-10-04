import {format} from 'date-fns'
import {isToday} from 'date-fns'
import {isThisYear} from 'date-fns'

export default (dt: Date) => {
    const date = new Date(dt)
    if(isToday(date)) {
        return format(date, 'HH:mm')
    } else {
        if(isThisYear(date)) {
            return format(date, 'HH:mm dd.MM')
        } else {
            return format(date, 'HH:mm dd.MM.yy')
        }
    }
}