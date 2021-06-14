package com.compiler.codepen.service;

import com.compiler.codepen.entity.Admin;
import com.compiler.codepen.entity.Student;
import com.compiler.codepen.entity.Teacher;
import com.compiler.codepen.exception.ResourceNotFoundException;
import com.compiler.codepen.repository.AdminRepository;
import com.compiler.codepen.repository.StudentRepository;
import com.compiler.codepen.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Admin login(Admin admin){
        Admin loggedInAdmin = adminRepository.findAdminByEmailAndAndPassword(admin.getEmail(), admin.getPassword()).
                        orElseThrow(() -> new ResourceNotFoundException("Invalid Username / Password"));

        return loggedInAdmin;
    }

    public Teacher login(Teacher teacher){
        Teacher loggedInTeacher = teacherRepository.findTeacherByEmailAndAndPassword(teacher.getEmail(), teacher.getPassword()).
                orElseThrow(() -> new ResourceNotFoundException("Invalid Username / Password"));

        return loggedInTeacher;
    }

    public Student login(Student student){
        Student loggedInStudent = studentRepository.findStudentByEmailAndAndPassword(student.getEmail(), student.getPassword()).
                orElseThrow(() -> new ResourceNotFoundException("Invalid Username / Password"));

        return loggedInStudent;
    }
}
