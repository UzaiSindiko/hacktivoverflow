const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tagSchema = new Schema({
    watcher: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    ignorer: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    tag: {
        type: String,
        required: [true, 'tag is required']
    },
    desc: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Tag', tagSchema)