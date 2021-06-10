package com.compiler.codepen.controller;

import com.compiler.codepen.entity.Teacher;
import com.compiler.codepen.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/teacher")
    public List<Teacher> getTeachers(){
        return teacherService.getTeacherList();
    }

    @GetMapping("/teacher/{id}")
    public Teacher getTeacher(@PathVariable Integer id){
     return  teacherService.getTeacherById(id);
    }

    @PostMapping("/teacher")
    public Teacher addTeacher(@RequestBody Teacher teacher){
        return teacherService.addTeacher(teacher);
    }
}
