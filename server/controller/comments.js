const CommentsModel = require('../models/comments.js');
const dtime = require('time-formater')


class Comments{
    add(req, res, next){
        const comment = {
            user_name: req.cookies.user_name,
            create_time: dtime().format('YYYY-MM-DD'),
            content: req.body.content
        }
        CommentsModel.create(comment, function(err, doc, len){
            if(!err){
                res.send({
                    error_code: 1,
                    error_message: "评论成功"
                })
            }else{
                res.send({
                    error_message: err
                })
            }
        });
    }

    delete(req, res, next){
        const id = req.query.comment_id;
        if(!id){
            res.send({
                error_message: "评论id不正确"
            })
        }
        CommentsModel.remove({id}, function(err){
            if(!err){
                res.send({
                    error_code: 1,
                    error_message: "删除评论成功"
                })
            }else{
                res.send({
                    error_message: err
                })
            }
        })
    }

    list(req, res, next){
        CommentsModel.find({}, '-_id', function(err, docs){
            if(!err){
                res.send({
                    error_code: 1,
                    error_message: "查找成功",
                    docs
                })
            }else{
                res.send({
                    error_message: err
                })
            }
        })
    }

    search(req, res, next){
        const queryString = req.query.search_str;
        if(!queryString){
            res.send({
                error_message: "查询字符串不能为空",
            })
        }
        var query = {};
        query['content'] = new RegExp(queryString)
        CommentsModel.find(query, '-_id', function(err, docs){
            if(!err){
                res.send({
                    error_code: 1,
                    error_message: "查找成功",
                    queryString,
                    docs
                })
            }else{
                res.send({
                    error_message: err
                })
            }
        })
    }

}

module.exports = new Comments()