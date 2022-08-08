package com.kuang.controller;

import com.kuang.pojo.Books;
import com.kuang.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/book")
public class BookController {

    @Autowired
    @Qualifier("BookServiceImpl")
    private BookService bookService;

    @RequestMapping("/allBook")
    public String list(Model model) {
        List<Books> list = bookService.queryAllBook();
        model.addAttribute("list", list);
        return "allBook";
    }
    @RequestMapping("/toAddBook")
    public String toAddPaper(){

        return "addBook";
    }
    @RequestMapping("/addBook")
    public String addBook(Books books){
        System.out.println("addbooks"+books);
        bookService.addBook(books);
        return "redirect:/book/allBook";
    }

    @RequestMapping("/toUpdate")
    public String toUpdatePaper(int id,Model model){
        Books books = bookService.queryBookById(id);
        model.addAttribute("Qbooks",books);
        return "updateBook";
    }
    @RequestMapping("/updateBook")
    public String updateBook(Books books){
        System.out.println("update"+books);
        bookService.updateBook(books);
        return "redirect:/book/allBook";
    }

    @RequestMapping("/delete/{bookID}")
    public String delBook(@PathVariable("bookID") int id){
         bookService.deleteBookById(id);
        return "redirect:/book/allBook";
    }

    @RequestMapping("/queryBook")
    public String queryBook(String queryBookName,Model model){

        return "";
    }

    @RequestMapping("/loggin")
    public String loggin(){
        return "loggin";
    }

    @RequestMapping("/check")
    public String check(HttpSession session, @RequestParam("account")String account, @RequestParam("userpassword")int userpassword){
        if (account.equals("admin")&&userpassword==123456){
            session.setAttribute("userNameInfo",account);
            session.setAttribute("userPasswordInfo",userpassword);
            return "redirect:/book/allBook";
        }else {
            System.out.println("error");
        }
       return "loggin";
    }

    @RequestMapping("/exit")
    public String exit(HttpSession session){

        session.removeAttribute("userNameInfo");
       session.removeAttribute("userPasswordInfo");
           return "loggin";

    }

}