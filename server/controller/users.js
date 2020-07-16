const UserModel = require('../models/users.js');
const dtime = require('time-formater');

class User{
    login(req, res, next){
        const {user_name, password} = req.body;
        if(!user_name){
            res.send({
                error_message: '用户名不能为空'
            })
            
        }else if(!password){
            res.send({
                error_message: '密码不能为空'
            })
        }

        UserModel.findOne({user_name}, function(err, doc){
            if(doc){
                if(doc.password != password){
                    res.send({
                        error_message: '密码不对'
                    })
                }else{
                    res.cookie('user_name', user_name, {maxAge: 60000 * 60});
                    res.cookie('password', password, {maxAge: 60000 * 60});
                    res.send({
                        error_message: '登录成功',
                        error_code: 1
                    })
                }
            }else{//注册
                const user = {
                    user_name, 
                    password,
                    create_time: dtime().format('YYYY-MM-DD'),
                }
                UserModel.create(user, function(err, doc, len){
                    if(err){
                        res.send({
                            error_message: err
                        })
                    }else{
                        res.cookie('user_name', user_name, {maxAge: 60000 * 60});
                        res.cookie('password', password, {maxAge: 60000 * 60});
                        res.send({
                            error_message: '注册成功',
                            error_code: 1
                        })
                    }
                })
            }
        });
    }

    checkLoginStatus(req, res, next){
        if(!req.cookies){
            res.send({
                error_message: "请先登录"
            })
        }else{
            const {user_name, password} = req.cookies;
            UserModel.findOne({user_name}, function(err, doc){
                if(doc){
                    if(doc.password != password){
                        res.send({
                            error_message: '登录态密码不正确'
                        })
                    }else{
                        next();
                    }
                }else{
                    res.send({
                        error_message: '登录态用户不存在'
                    })
                }
            })
        }
    }
}

module.exports = new User();