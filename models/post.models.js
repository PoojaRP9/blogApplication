const {Schema,model} = require("mongoose")

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default : Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user' 
    }
});

postSchema.index({ title: 'text', content: 'text' });

const Post = model('post',postSchema);


module.exports = Post;