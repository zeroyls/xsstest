const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./router/index.js');

const db = require('./mongodb/db.js')

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(router);

app.listen(8081, function(){
    console.log('成功监听端口8081')
})