package com.compiler.codepen.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Teacher {

    @Id
    @GeneratedValue
    @Column(name="teacher_id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String phoneNo;

    @Column(name = "department_id")
    private int departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @OneToMany
    private List<Assignment> assignment;
}
