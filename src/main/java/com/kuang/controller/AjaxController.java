package com.kuang.controller;


import org.springframework.web.bind.annotation.*;



@RestController
public class AjaxController {
    @RequestMapping(value = "/ajaxForCheckInfo",produces = {"text/html;charset=utf8"})

    public String a3(String name,String password){
        String msg="";
        if (name!=null){
            if ("admin".equals(name)){
//                session.setAttribute("username",name);
                msg="ok";
            }else if (name.equals("")){
                msg="用户名不能为空";
            }else {
                msg="用户名有误";
            }
        }
        if (password!=null){
            if ("123456".equals(password)){
//              session.setAttribute("userpwd",password);
                msg="ok";
            }else {
                msg="密码错误";
            }
        }
        return msg;
    }


}
