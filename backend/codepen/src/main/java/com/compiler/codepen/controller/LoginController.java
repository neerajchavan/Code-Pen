package com.compiler.codepen.controller;

import com.compiler.codepen.entity.Admin;
import com.compiler.codepen.entity.Student;
import com.compiler.codepen.entity.Teacher;
import com.compiler.codepen.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login/admin")
    public Admin login(@RequestBody Admin admin){
        return loginService.login(admin);
    }

    @PostMapping("/login/teacher")
    public Teacher login(@RequestBody Teacher teacher){
        return loginService.login(teacher);
    }

    @PostMapping("/login/student")
    public Student login(@RequestBody Student student){
        return loginService.login(student);
    }
}
