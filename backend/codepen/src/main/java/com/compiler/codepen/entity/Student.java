package com.compiler.codepen.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Student {

    @Id
    @GeneratedValue
    @Column(name = "student_id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String password;
    private String phoneNo;

    @Column(name = "department_id")
    private int departmentId;

    @Column(name = "department_name")
    private String departmentName;

}
