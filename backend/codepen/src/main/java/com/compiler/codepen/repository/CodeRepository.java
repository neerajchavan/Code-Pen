package com.compiler.codepen.repository;

import com.compiler.codepen.entity.Code;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodeRepository extends CrudRepository<Code, Integer> {

    Optional<Code> findById(Integer id);
}
