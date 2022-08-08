
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
    <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
    <script>
        function a1(){
            $.post({
                url:"${pageContext.request.contextPath}/ajaxForCheckInfo",
                data:{"name":$("#name").val()},
                success:(function(data){
                    console.log(data)
                    if (data.toString()==="ok"){
                        $("#userInfo").css("color","green")

                    }else {
                        $("#userInfo").css("color","red")
                    }
                         $("#userInfo").html(data)
                })
            })
        }
        function a2(){
            $.post({
                url:"${pageContext.request.contextPath}/ajaxForCheckInfo",
                data:{"password":$("#password").val()},
                success:(function(data){
                    console.log(data)
                    if (data.toString()==="ok"){
                        $("#userpwd").css("color","green")

                    }else {
                        $("#userpwd").css("color","red")
                    }
                         $("#userpwd").html(data)
                })
            })
        }
    </script>
</head>
<body>
<form action="${pageContext.request.contextPath}/book/check">
    <p>
        账号： <input type="text" id="name"  name="account" onblur="a1()"><span id="userInfo"></span>
    </p>
    <p>
        密码： <input type="password" id="password" name="userpassword" onblur="a2()"><span id="userpwd"></span>
    </p>
    <button type="submit" id="btn-sbt" >提交</button>
</form>




</body>
</html>
