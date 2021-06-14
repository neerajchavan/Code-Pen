package com.compiler.codepen.service;

import com.compiler.codepen.entity.Student;
import com.compiler.codepen.exception.ResourceNotFoundException;
import com.compiler.codepen.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getStudentList() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Integer id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student Not Found With ID : "+id));
        return student;
    }

    public Student addStudent(Student student){
        Student addedStudent = studentRepository.save(student);
        return  addedStudent;
    }
}
