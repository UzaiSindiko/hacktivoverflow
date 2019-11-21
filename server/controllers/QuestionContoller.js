const Question = require('../models/Question')
const Answer = require('../models/Answer')
const Tag = require('../models/Tag')
const ObjectId = require('mongoose').Types.ObjectId;


class QuestionController {

    static create(req, res, next){
        let { title, desc, tags } = req.body
        let userId = req.decode.id
        let tagsId = []
        let promises = []
        let tagArr = tags || []
        // if tag already exis push the id to tagId. If not, make the the new one and push the id to tagsId
        tagArr.forEach(tag => {
             if(ObjectId.isValid(tag)){
                if(new ObjectId(tag) + '' === tag) { 
                    tagsId.push(ObjectId(tag))
                } 
                else  {
                    promises.push(Tag.create({ tag }))
                }
            } 
            else {
                promises.push(Tag.create({ tag }))
            } 
        });
        return Promise.all(promises)
        .then(tags =>{
            tags.forEach(tag =>{
                tagsId.push(tag._id)
            })
            return Question.create({ userId, title, desc, tags: tagsId })
        })
        .then(question =>{
            res.status(201).json(question)
        })
        .catch(next)
    }

    static find(req, res, next){
        Question.find({}).populate('userId', 'email').populate('tags', 'tag').sort({ updatedAt: -1 })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findTop(req, res, next){
        Question.find().populate('userId', 'email').populate('tags', 'tag').sort({ views: -1 })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static tag(req, res, next){
        let id = req.params.id
        Question.find({ tags: id }).populate('userId', 'email').populate('tags', 'tag').sort({ views: -1 })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findByUser(req, res, next){
        const userId = req.decode.id
        Question.find({ userId }).populate('userId', 'email').populate('tags', 'tag').sort({ updatedAt: -1 })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findById(req ,res, next){
        const questionId = req.params.id
        Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } }, { new:true }).populate('userId', 'email').populate('tags', 'tag').sort({ updatedAt: -1 })
            .then(question =>{
                if(question){
                    res.status(200).json(question)
                } else{
                    next({
                        status: 404,
                        msg: 'question is not found'
                    })
                }
            })
            .catch(next)
    }

    static search(req, res, next) {
        const { q } = req.query       
            Question.find({
                $or: [   
                    {
                        title: {
                            $regex: `${q}`, $options: 'i'
                        }
                    },
                    {
                        desc: {
                            $regex: `${q}`, $options: 'i'
                        }
                    }
                ]
            }).populate('userId', 'email').populate('tags', 'tag').sort({ updatedAt: -1 })
                .then(questions => {
                    res.status(200).json(questions)
                })
                .catch(next)
    }

    static update(req, res, next){
        let questionId = req.params.id
        let { title, description, tags, votes } = req.body
        let tagsId = []
        let promises = []
        let tagArr = tags || []
        // if tag already exis push the id to tagId. If not, make the the new one and push the id to tagsId
        tagArr.forEach(tag => {
             if(ObjectId.isValid(tag)){
                if(new ObjectId(tag) + '' === tag) { 
                    tagsId.push(ObjectId(tag))
                } 
                else  {
                    promises.push(Tag.create({ tag }))
                }
            } 
            else {
                promises.push(Tag.create({ tag }))
            }
        });
        return Promise.all(promises)
        .then(tags =>{
            tags.forEach(tag =>{
                tagsId.push(tag._id)
            })
            // return Question.create({ userId, title, desc, tags: tagsId })
              return Question.findByIdAndUpdate(questionId, { title, description, tags: tagsId, votes }, { omitUndefined: true })
            .then(question =>[
                res.status(200).json(question)
            ])
            .catch(next)
       })
    }

    static delete(req, res, next){
        let questionId = req.params.id
        Answer.deleteMany({ questionId })
        .then(()=>{
            return Question.findByIdAndDelete(questionId)
        })
        .then(() =>[
            res.status(200).json({
                message: 'delete success'
            })
        ])
        .catch(next)
    }

    static upvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id

        Question.findById(id)
          .then(question => {
            if (question) {
              let downvotes = question.downvotes.indexOf(userId)
              let upvotes = question.upvotes.indexOf(userId)    
              if (downvotes > -1)  question.downvotes.splice(downvotes, 1)
              if (upvotes > -1)  question.upvotes.splice(upvotes, 1)
              else question.upvotes.push(userId)
              return question.save()
            }
          })
          .then((question) => {
            res.status(200).json({ 
                message: 'success upvote', question
            })
          })
          .catch(next)
      }
    
      static downvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id
    
        Question.findById(id)
          .then(question => {
            if (question) {
              let downvotes = question.downvotes.indexOf(userId)
              let upvotes = question.upvotes.indexOf(userId)

              if (upvotes > -1)  question.upvotes.splice(upvotes, 1)
              if (downvotes > -1) question.downvotes.splice(downvotes, 1)
              else question.downvotes.push(userId)  
              return question.save()
            }
          })
          .then((question) => {
            res.status(200).json({ 
                message: 'success downvote', question
            })
          })
          .catch(next)
      }

}

module.exports = QuestionController