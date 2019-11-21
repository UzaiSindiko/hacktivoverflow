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

}

module.exports = TagController