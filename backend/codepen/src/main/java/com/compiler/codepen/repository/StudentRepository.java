package com.compiler.codepen.repository;

import com.compiler.codepen.entity.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {
    List<Student> findAll();
    Optional<Student> findById(Integer id);
    Optional<Student> findStudentByEmailAndAndPassword(String email, String password);
}
