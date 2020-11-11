import User from './../models/User';
import { myReq } from './../types';

const lastSeenUpdMiddleware = (req: myReq, res: any, next: any) => {
    if(req.session.userId) {
        User.findByIdAndUpdate(req.session.userId, {last_seen: new Date()}, (err, user) => {
            if(err) console.log('err', err)
        })
    }
    next()
}

export default lastSeenUpdMiddleware


