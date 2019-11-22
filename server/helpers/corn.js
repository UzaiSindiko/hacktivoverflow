const nodemailer = require('nodemailer')
require('dotenv').config()
const cron = require('node-cron');
const User = require('../models/User')
const Question = require('../models/Question')
const mongoose = require('mongoose')
const URI =  process.env.URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log(`success connect ot mongodb ${URI}`);
})
.catch(()=>{
    console.log(`fail connect to mongodb ${URI}`);
})

// At 09:00 on every 7th day-of-month
// 0 9 */7 * *
cron.schedule('0 9 */7 * *', () => {
let userEmail = []
User.find({})
    .then((users)=>{
        users.forEach(user =>{
            userEmail.push(user.email)
        })
        return Question.find({}).sort({ upvotes: 'desc' }).limit(5)
    })
    .then(questions =>{
        
        let transaporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER_NAME,
                pass: process.env.GMAIL_USER_PASSWORD
            }
        })
        
        let mailOptions = {
            form: 'bagaimana.bisnis@gmail.com',
            to: 'uzai@sindiko.com',
            subject: 'Top Question For you',
            text: `
                HAAIII....!!!!! THIS IS TOP QUESTION OF THE WEEK

                1. ${questions[0].title} link : http://overflow.uzai.site/${questions[0]._id}/qna
                2. ${questions[1].title} link : http://overflow.uzai.site/${questions[1]._id}/qna
                3. ${questions[2].title} link : http://overflow.uzai.site/${questions[2]._id}/qna
                4. ${questions[3].title} link : http://overflow.uzai.site/${questions[3]._id}/qna
                5. ${questions[4].title} link : http://overflow.uzai.site/${questions[4]._id}/qna
            
                ====== overflow ==== 
                ENJOY YOUR DAY..!!
            `
        }
        
        transaporter.sendMail(mailOptions, function(err, data){
            if(err){
                console.log(err);
            } else{
                console.log(`Email Send...!!!`);
            }
        })
    })

    }, {
    scheduled: true,
    timezone: "Asia/Jakarta"
});


