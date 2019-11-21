const mongoose = require('mongoose')
const Schema = mongoose.Schema


const answerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required' ]
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    title: {
        type: String,
        required: [true, 'title is required' ]
    },
    desc: {
        type: String,
        required: [true, 'Description is required' ]
    },
    upvotes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
    downvotes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
}, { timestamps: true })

module.exports = mongoose.model('Answer', answerSchema)