package com.compiler.codepen.repository;

import com.compiler.codepen.entity.Teacher;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends CrudRepository<Teacher, Integer> {
    List<Teacher> findAll();
    Optional<Teacher> findById(Integer id);
}
