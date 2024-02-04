const dbService = require('../services/dbServices');
const {ObjectId} = require("mongodb");

const Comments = {
    create : async(data) => {
        const {postId,userId,description} = data;
        const db = dbService.getDb();
        let name = await getUserNameById(userId);
        const comment = await 
        db.collection('posts')
        .updateOne({_id: new ObjectId(postId)},{
            $push: {comments: {userId: userId,description: description,id: new ObjectId(),name: name}}
        })
        return comment;
    },

    getCommentById : async (id) => {
        const db = dbService.getDb();
        const comment = db.collection("comments").find({blogId: id});
        return comment;
    },

    getCommentByPost : async(postId) => {
        const db = dbService.getDb();
        const comments = db.collection('comments').find({blogId: req.params.id}).toArray();
        return comments;
    },

    update: async (id,data) => {
        const {postId, text} = data;
        console.log(id);
        const db = dbService.getDb();
        const comment = await db.collection('posts').updateOne({
            _id: new ObjectId(postId),
            'comments.id': new ObjectId(id)
        },
            {
            $set: {'comments.$.description': text}
        });
        return comment;
    },

    delete: async (commentId,postId) => {
        const db = dbService.getDb();
        const comment = await db.collection('posts')
        .updateOne({
            _id: new ObjectId(postId),
        },{
            $pull: {
                comments : {
                    id: new ObjectId(commentId)
                }
            }
        })
        return comment;
    }
}

const getUserNameById = async (id) => {
    const db = dbService.getDb();
    const result = await db.collection('users').findOne({_id: new ObjectId(id)});
    return result.name;
}

module.exports = Comments;