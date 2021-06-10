package com.compiler.codepen.service;

import com.compiler.codepen.entity.Teacher;
import com.compiler.codepen.exception.ResourceNotFoundException;
import com.compiler.codepen.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

  @Autowired
  private TeacherRepository teacherRepository;

  public List<Teacher> getTeacherList(){
      return teacherRepository.findAll();
  }

  public Teacher getTeacherById(Integer id){
      Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Teacher Not Found With ID : "+id));
      return teacher;
  }

  public Teacher addTeacher(Teacher teacher){
      Teacher addedTeacher = teacherRepository.save(teacher);
      return  addedTeacher;
  }

}
