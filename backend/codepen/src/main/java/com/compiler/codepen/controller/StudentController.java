package com.compiler.codepen.controller;

import com.compiler.codepen.entity.Student;
import com.compiler.codepen.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/student")
    public List<Student> getStudents(){
        return studentService.getStudentList();
    }

    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable Integer id){
        return  studentService.getStudentById(id);
    }

    @PostMapping("/student")
    public Student addStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }
}

