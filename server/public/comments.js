window.onload = function(){
    listComments(addCommentsToView);
    document.getElementById("submitComment").addEventListener("click", function(){
        var content = document.getElementById("content").value ;
        addCommentToServer(content, function(){
            listComments(addCommentsToView);
        })
    })
}

function addCommentToServer(content, callback){
    var url = "http://localhost:8081/comments/add";
    var data ={
        content: content
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response){
        return response.json();
    }).catch(function(error) {
        alert(error)
        console.error('Error:', error)
    }).then(function(response){
        if(response && response.error_code == 1){
            alert("添加成功")
            callback();
        }else{
            if(response && response.error_code == 0){
                location.href = "login.html"
            }
            alert(response.error_message)
        }
    });
}

function listComments(callback){
    //向server 获取comments
    var url = "http://localhost:8081/comments/list";

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(function(response){
        return response.json();
    }).catch(function(error) {
        alert(error)
        console.error('Error:', error)
    }).then(function(response){
        if(response && response.error_code == 1){
            callback(response.docs);
        }else{
            if(response && response.error_code == 0){
                location.href = "login.html"
            }
            alert(response.error_message)
        }
    });
}

function addCommentsToView(comments){
    var commentContainer = document.getElementById("commentContainer");
    commentContainer.innerHTML = "";
    for(var i = 0; i < comments.length; i++){
        var tempDiv = document.createElement("div");
        var username = document.createElement("a");
        username.setAttribute("class", "user-name");
        username.innerHTML = comments[i].user_name + ":";
        var content = document.createElement("p");
        content.setAttribute("class", "content")
        content.innerHTML = comments[i].content;
        tempDiv.appendChild(username);
        tempDiv.appendChild(content);

        var createtime = document.createElement("span");
        createtime.setAttribute("class", "create-time")
        createtime.innerHTML = comments[i].create_time;

        commentContainer.appendChild(tempDiv);
        commentContainer.appendChild(createtime);
    }
}