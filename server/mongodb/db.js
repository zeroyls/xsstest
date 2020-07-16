const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/xsstest";
mongoose.connect(url);

const db = mongoose.connection;

db.once('open', function(err ){
    console.log('连接数据库成功');
})

db.on('error', function(err){
    console.log("connect database error", error)
    mongoose.disconnect()
})

db.on('close', function(err){
    console.log('database close')
    mongoose.connect(url)
})

module.exports = db