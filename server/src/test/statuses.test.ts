process.env.NODE_ENV = 'test'
process.env.PORT = "3006"

import app from "../index"
import chai from "chai"
import chaiHttp from "chai-http"
import Status from "../models/Status"
import User from "../models/User"

//@ts-ignore
let should = chai.should()

chai.use(chaiHttp)
const agent = chai.request.agent(app)

describe('Statuses', () => {
    //@ts-ignore
    after(async () => {
        await User.deleteMany({})
        await Status.deleteMany({})
    })
    //@ts-ignore
    before(done => {
        console.log("clearing db")
        Status.deleteMany({}, err => {
            done()
        })
    })

    const status = {
        title: "firstName",
        desc: "lastName"
    }
    const newTitle = "qwerty"
    const newDesc = "Some new description"
    const user = {
        firstName: "firstName",
        lastName: "lastName",
        email: "qwerty@mail.com",
        password: "123qwe123"
    }
    let statusId: any

    describe('POST /api/statuses', () => {

        it("it should return error (no permissions)", (done) => {
            agent.post('/api/statuses')
                .send(status)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })

        it("it should create the user", (done) => {
            agent
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property('firstName')
                    res.body.should.have.property('lastName')
                    res.body.should.have.property('email')
                    res.body.should.not.have.property('password')
                    done()
                })
        })

        it("it should create the status", (done) => {
            agent.post('/api/statuses')
                .send(status)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.desc.should.be.eql(status.desc)
                    res.body.title.should.be.eql(status.title)
                    statusId = res.body._id
                    done()
                })
        })

        it("it should return status(400) (newTitle is empty)", (done) => {
            agent.post('/api/statuses')
            .send({title: "", desc: status.desc})
            .end((err, res) => {
                res.should.have.status(400)
                res.body.errors[0].msg.should.be.eql("Required")
                done()
            })
        })
    })

    describe('GET /api/statuses/:id', () => {
        it("it should return status by id", (done) => {
            agent.get('/api/statuses/' + statusId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.title.should.be.eql(status.title)
                res.body.desc.should.be.eql(status.desc)
                done()
            })
        })
        it("it should return status 404", (done) => {
            agent.get('/api/statuses/12345678901234567890abck')
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
        })
    })

    describe('GET /api/statuses', () => {
        it("it should return statuses", (done) => {
            agent.get('/api/statuses')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.length.should.be.eql(1)
                res.body[0].title.should.be.eql(status.title)
                res.body[0].desc.should.be.eql(status.desc)
                done()
            })
        })
    })

    describe('PUT /api/statuses/:id', () => {
        it("it should return status and update it by id", (done) => {
            agent.put('/api/statuses/' + statusId)
            .send({title: newTitle, desc: newDesc})
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
        it("it should return status by id", (done) => {
            agent.get('/api/statuses/' + statusId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.title.should.be.eql(newTitle)
                res.body.desc.should.be.eql(newDesc)
                done()
            })
        })
        it("it should return status 404", (done) => {
            agent.put('/api/statuses/12345678901234567890abck')
            .send({title: newTitle, desc: newDesc})
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
        })
        it("it should return status 400 (Title invalid)", (done) => {
            agent.put('/api/statuses/' + statusId)
            .send({title: "", desc: newDesc})
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
        })
        it("it should return status with updated title", (done) => {
            agent.put('/api/statuses/' + statusId)
            .send({title: newTitle})
            .end((err, res) => {
                res.should.have.status(200)
                res.body.title.should.be.eql(newTitle)
                done()
            })
        })
    })

    describe('DELETE /api/statuses/:id', () => {
        it("it should return status and update it by id", (done) => {
            agent.delete('/api/statuses/' + statusId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.be.eql("Deleted successful")
                done()
            })
        })
        it("it should return status by id", (done) => {
            agent.get('/api/statuses/' + statusId)
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
        })
        it("it should return status 404", (done) => {
            agent.delete('/api/statuses/12345678901234567890abck')
            .send({title: newTitle, desc: newDesc})
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
        })
    
    })

})