const dbService = require('./dbServices');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const OTP = require('otplib');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongodb');

const secret = 'FSDRETVXFERWER#%$TDGCV^$$%#';

//nodemailer setup

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aaron547456@gmail.com',
        pass: 'emos wvpo kvij fcyu',
    }
})

const User = {
    create: async (data) => {
        const db = dbService.getDb();
        const user = await db.collection('users').insertOne(data);
    },

    login: async (data) => {
        const db = dbService.getDb();
        const user = await db.collection('users').findOne({email: data.email});
        bcrypt.compare(data.password,user.password,(err,result)=>{
            if(err) return err;
            if(result){
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign({userID: response.email},jwtSecretKey);
                return {token,user};
            }
        })
    },

    getAllUsers: async () => {
        const db = dbService.getDb();
        const usres = await db.collection('users').find().toArray();
        return usres;
    },

    getUserById: async (userId) => {
        const db = dbService.getDb();
        const user = await db.collection('users').findOne({_id: new ObjectId(userId)})
        return user;
    },

    update: async (id,data) => {
        const db = dbService.getDb();
        const user = await db.collection('users').updateOne({_id: new ObjectId(id)},{$set: data})
        return user;
    },

    sendEmailOTP : async (data)=>{
        //generate and send a OTP via email
        const totp = OTP.authenticator.generate(secret);
        const mailOptions = {
            from: "Blog",
            to: data.receiver,
            subject: `OTP for Password Recovery`,
            text: `Your OTP is ${totp}`,
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return err;
            }
            return "OTP send Successfully";
        })
    },

    verifyOTP : async (data) => {
        const isValidOTP = await OTP.authenticator.check(data.otp,secret);
        if(isValidOTP){
            // console.log('success');
            return 'OTP verification successfull';
        }else{
            // console.log('fail');
            return "OTP verification fail";
        }
    },

    delete: async (id) => {
        const db = dbService.getDb();
        const user = await db.collection("users").deleteOne({_id: id});
        return user;
    }
}

module.exports = User;