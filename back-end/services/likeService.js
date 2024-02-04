const dbService = require('../services/dbServices');
const {ObjectId} = require("mongodb");

const Likes = {
    create : async(data) => {
        const {postId,userId} = data;
        const db = await dbService.getDb();
        const like = await db.collection('posts')
        .updateOne({_id: new ObjectId(postId)},{
            $push : {likes: userId}
        })
        return like;
    },

    count: async(id) => {
        const db = await dbService.getDb();
        const like = await db.collection('likes').find({blogId: id}).count();
    },

    getLikebyPostUser: async (data) =>{
        const {userId,postId} = data;
        const db = await dbService.getDb();
        const likes = await db.collection("posts").findOne({_id: new ObjectId(postId)},{ projection: { likes: 1, _id: 0 } });
        return likes;
    },


    delete: async (data) => {
        const {postId,userId} = data;
        const db = await dbService.getDb();
        const like = await  db.collection('posts')
        .updateOne({_id: new ObjectId(postId)},{
            $pull : {likes: userId}
        });
        return like;
    }
}

module.exports = Likes;