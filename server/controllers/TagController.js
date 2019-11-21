const Tag = require('../models/Tag')

class TagController {

    static create(req, res, next){
        const { tag, desc } = req.body
        Tag.create({ tag, desc })
            .then(tag =>{
                res.status(200).json(tag)
            })
            .catch(next)
    }

    static find(req, res, next){
        Tag.find({ desc: { $exists: true } })
        .then(tags =>{
            res.status(200).json(tags)
        })
        .catch(next)
    }

    static findAll(req, res, next){
        Tag.find({}).sort({ createdAt: 1 })
        .then(tags =>{
            res.status(200).json(tags)
        })
        .catch(next)
    }

    static findById(req, res, next){
        let id = req.params.id
        Tag.findById(id)
        .then(tag =>{
            res.status(200).json(tag)
        })
        .catch(next)
    }

    static watch(req, res, next){
        let userId = req.decode.id
        let id = req.params.id
        Tag.findByIdAndUpdate(id, { $push: { userId } }, { new:true  })
        .then(tag =>{
            res.status(200).json(tag)
        })
        .catch(next)
    }

    static unwatch(req, res, next){
        let userId = req.decode.id
        let id = req.params.id
        Tag.findByIdAndUpdate(id, { $pull: { userId } }, { new: true })
        .then(tag =>{
            res.status(200).json(tag)
        })
        .catch(next)
    }

}

module.exports = TagController