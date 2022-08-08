
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <!-- 引入 Bootstrap -->
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div id="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <div class="page-header">
                <h1>
                    <small>修改书籍</small>
                </h1>
            </div>
        </div>
    </div>
</div>

<form action="${pageContext.request.contextPath}/book/updateBook" method="post">
    <input type="hidden" name="bookID" value="${Qbooks.bookID}">
    <div class="mb-3">
        <label>书籍名称</label>
        <input type="text" class="form-control"  name="bookName" value="${Qbooks.bookName}" required>
    </div>
    <div class="mb-3">
        <label>书籍数量</label>
        <input type="text" class="form-control"  name="bookConuts" value="${Qbooks.bookCounts}" required>
    </div>
    <div class="mb-3 form-check">
        <label>书籍描述</label>
        <input type="text" class="form-control"  name="detail" value="${Qbooks.detail}" required>
    </div>
    <button type="submit" class="btn btn-primary">修改 </button>
</form>

</body>
</html>
