package com.compiler.codepen.service;

import com.compiler.codepen.entity.Admin;
import com.compiler.codepen.exception.ResourceNotFoundException;
import com.compiler.codepen.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin getAdmin(Integer id){
        Admin admin = adminRepository.getAdminById(id).orElseThrow(() -> new ResourceNotFoundException("Admin Not Found"));
        return admin;
    }
}
