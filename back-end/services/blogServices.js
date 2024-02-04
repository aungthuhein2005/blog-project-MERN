const dbService = require('./dbServices');
const {ObjectId} = require('mongodb');
const Blogs = { //api test done 
    create : async(data) => {
        const db = dbService.getDb();
        const blog = await db.collection('posts').insertOne(data);
        return blog;
    },

    search : async (search) => {
        let resultBlog = [];
        const db = dbService.getDb();
        const blog = await db.collection('posts').find({title: { $regex: new RegExp(search, 'i') } }).toArray();
        return blog;
    },

    getBlogById : async (id) => {
        const db = dbService.getDb();
        const blog = await db.collection("posts").findOne({_id: new ObjectId(id)});
        return blog;
    },

    getLatestBlogs : async (count) => {
        const db = dbService.getDb();
        const blog = await db.collection("posts").find()
        .sort({date: -1})
        .limit(parseInt(count))
        .toArray();
        return blog;
    },

    getPopularBlogs: async () => {
        const db = dbService.getDb();
        const blog = await db.collection("posts").aggregate([
            {
              $addFields: {
                likes: { $size: { $ifNull: ["$likes", []] } },
                comments: { $size: { $ifNull: ["$comments", []] } }
              }
            },
            {
              $sort: { likes: -1 }
            },
            {
              $limit: 6
            }
          ]).toArray();
                    
          
        return blog;
    },

    getAllBlogs : async () => {
        const db = dbService.getDb();
        const blog = await db.collection("posts").find();
        const blogArray = await blog.toArray();
        return blogArray;
    },

    getRelatedBlogs : async (category) =>{
        const db = dbService.getDb();
        const blog = await db.collection("posts").find({category: category})
        .limit(8)
        .toArray();
        return blog;
    },

    getBlogByCategory: async(category) => {
        const db = dbService.getDb();
        const blog = await db.collection("posts").find({category : category}).toArray();
        return blog;
    },

    getCategories : async() => {
        const db = dbService.getDb();
        const categories = await db.collection("category").find().toArray();
        return categories;
    },

    update: async (id,data) => {
        const db = dbService.getDb();
        const blog = await db.collection('posts').updateOne({_id: new ObjectId(id)},{$set: data});
        return blog;
    },

    delete: async (id) => {
        const db = dbService.getDb();
        const blog = await db.collection('posts').deleteOne({_id: new ObjectId(id)});
        return blog;
    }

 
}

module.exports = Blogs;