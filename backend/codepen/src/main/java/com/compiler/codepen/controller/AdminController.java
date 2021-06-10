package com.compiler.codepen.controller;

import com.compiler.codepen.entity.Admin;
import com.compiler.codepen.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin/{id}")
    public Admin getAdminDetails(@PathVariable Integer id){
        return adminService.getAdmin(id);
    }

}
