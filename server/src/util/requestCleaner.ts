import { myReq } from './../types';
export default (req: myReq, _, next) => {
    delete req.body._id
    delete req.body.createdAt
    delete req.body.updatedAt
    next()
}