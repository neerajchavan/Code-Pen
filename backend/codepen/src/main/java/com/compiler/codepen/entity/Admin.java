package com.compiler.codepen.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Admin {
    @Id
    @GeneratedValue
    @Column(name = "admin_id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String phoneNo;

    @OneToMany
    private List<Teacher> teacher;
}
