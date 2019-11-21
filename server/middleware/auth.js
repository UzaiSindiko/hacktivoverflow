const { verify } = require('../helpers/jwt')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
    authentication(req, res, next) {
        try {
            req.decode = verify(req.headers.token)
            next()
        } catch (err) {
            next({
                status: 400,
                msg: 'please login first'
            })
        }
    },

    authorizationQuestion(req, res, next){
        const userId = req.decode.id
        const { id } = req.params
        Question.findById(id)
            .then(question =>{
                if(question){
                    if(question.userId + '' !== userId){
                        next({
                            status: 403,
                            msg: 'Unauthorized'
                        })
                    } else {
                        next()
                    }
                } else {
                    next({
                        status: 404,
                        msg: 'question is not found'
                    })
                }
            })
    },

    authorizationAnswer(req, res, next) {
        let userId = req.decode.id
        let id = req.params.id
        Answer.findOne({userId, _id: id})
            .then(answer =>{
                if(answer){
                    next()
                } else {
                    next({
                        status: 403,
                        msg: 'Unauthorized'
                    })
                }
            })
    }
}
