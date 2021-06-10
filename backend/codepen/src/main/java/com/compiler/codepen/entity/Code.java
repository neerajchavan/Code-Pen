package com.compiler.codepen.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Code {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "html_code")
    private String html;

    @Column(name = "css_code")
    private String css;

    @Column(name = "js_code")
    private String js;

}
