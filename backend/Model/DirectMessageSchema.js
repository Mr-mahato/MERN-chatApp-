const {mongoose} = require('mongoose');

const {Schema , model} = mongoose;

const directMessageSchema = new Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    content:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

const directMessageModel = model('directMessage' , directMessageSchema);

module.exports = directMessageModel;