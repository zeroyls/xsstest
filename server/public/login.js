window.onload = function(){
    var url = "http://localhost:8081/user/login";
    document.getElementById("submmit").addEventListener("click", function(){
        var user_name = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var data = {
            user_name: user_name,
            password: password
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
            alert("登录失败")
            console.error('Error:', error)
        }).then(function(response){
            if(response && response.error_code == 1){
                location.href = "./comments.html"
            }else{
                alert("登录失败")
            }
        });
    })
}