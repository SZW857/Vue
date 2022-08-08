package com.kuang.Interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class lanJieQi implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session=request.getSession();
        if (request.getRequestURI().contains("loggin")){
            System.out.println("===============处理前==================");

            return true;
        }
        if (request.getRequestURI().contains("check")){
            System.out.println("===============处理中check0==================");
            return  true;
        }
        if (request.getRequestURI().contains("exit")){
            System.out.println("===============处理中check1==================");
            System.out.println("account"+session.getAttribute("userNameInfo"));
            System.out.println("userpassword"+session.getAttribute("userPasswordInfo"));
            return  true;
        }

        if (session.getAttribute("userNameInfo")!=null&&session.getAttribute("userPasswordInfo")!=null){
            System.out.println("===============处理中check2==================");
            System.out.println("account1"+session.getAttribute("userNameInfo"));
            System.out.println("userpassword1"+session.getAttribute("userPasswordInfo"));
            return true;
        }
            request.getRequestDispatcher("/WEB-INF/jsp/loggin.jsp").forward(request,response);
            System.out.println("===============处理后==================");

           return false;
    }

}
