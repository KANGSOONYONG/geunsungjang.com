const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    comment: {
        type: String
    },
    number : {
        type: Number
    }
})

const Comments = mongoose.model('comments', commentSchema)

module.exports = { Comments };