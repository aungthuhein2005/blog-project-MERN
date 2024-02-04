const data = require('../data');
const dbService = require('./dbServices');
const{ObjectId} = require('mongodb');

const Subscribe = {
    create : async(data) => {
        const db = dbService.getDb();
        const subscribe = await db.collection('authors')
                        .updateOne({_id: new ObjectId(data.authorId)},{
                            $push: {subscribed: data.userId}
                        });
        return subscribe;
    },

    getSubscribeByUserId: async(id) => {
        const db = dbService.getDb();
        const subscribe = await getSubscribedAuthors(id);
        return subscribe;
    },

    getWithUserIdAuthorId : async(data) =>{
        const db = dbService.getDb();
        const subscribe = await db.collection('authors')
                        .findOne({
                          _id: new ObjectId(data.authorId),
                          subscribed: data.userId
                        });
        return subscribe;
    },

    delete : async(id,subscribedId) => {
      console.log("userId",id,"authorid",subscribedId); 
        const db = dbService.getDb();
        const subscribe = await db.collection('users')
                        .updateOne({_id: new ObjectId(id)},{
                            $pull: {subscribed: new ObjectId(subscribedId)}
                        });
        return subscribe;
    },

}

async function getSubscribedAuthors(userId) {
    try {
      const db = dbService.getDb();
      const result = await db.collection('users').aggregate([
        {
          $match: {
            "_id": new ObjectId(userId)
          }
        },
        {
          $lookup: {
            from: "authors",
            localField: "subscribed",
            foreignField: "_id",
            as: "subscribedAuthors"
          }
        },
        {
          $unwind: "$subscribedAuthors"
        },
        {
          $project: {
            "subscribedAuthors.name": 1,
            "subscribedAuthors._id": 1,
            _id: 0,
          }
        }
      ]).toArray();
  
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  module.exports = Subscribe;