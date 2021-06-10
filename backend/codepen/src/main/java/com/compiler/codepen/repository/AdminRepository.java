package com.compiler.codepen.repository;

import com.compiler.codepen.entity.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Integer> {
     Optional<Admin> getAdminById(Integer id);
}
