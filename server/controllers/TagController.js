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
        Tag.findByIdAndUpdate(id, { $pull: { ignorer: userId } })
        .then(()=>{
            return Tag.findByIdAndUpdate(id, { $push: { watcher: userId } }, { new:true  })
        })
        .then(tag =>{
            res.status(200).json(tag)
        })
        .catch(next)
    }

    static ignore(req, res, next){
        let userId = req.decode.id
        let id = req.params.id
        Tag.findByIdAndUpdate(id, { $pull: { watcher: userId } })
        .then(()=>{
            return Tag.findByIdAndUpdate(id, { $push: { ignorer: userId } }, { new:true  })
        })
        .then(tag =>{
            res.status(200).json(tag)
        })
        .catch(next)
    }

    static netral(req, res, next){
        let userId = req.decode.id
        let id = req.params.id
        Tag.findByIdAndUpdate(id, { $pull: { watcher: userId } })
        .then(()=>{
            return Tag.findByIdAndUpdate(id, { $pull: { ignorer: userId } }, { new:true  })
        })
        .then(tag =>{
            res.status(200).json(tag)
        })
        .catch(next)
    }

    static getWatch(req, res, next){
        let userId = req.decode.id
        Tag.find({ watcher :userId})
        .then(tags =>{
            res.status(200).json(tags)
        })
        .catch(next)
    }

    static getIgnore(req, res, next){
        let userId = req.decode.id
        Tag.find({ ignorer :userId})
        .then(tags =>{
            res.status(200).json(tags)
        })
        .catch(next)
    }

}

module.exports = TagController