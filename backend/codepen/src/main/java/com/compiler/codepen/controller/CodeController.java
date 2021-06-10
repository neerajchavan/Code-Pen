package com.compiler.codepen.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
public class CodeController {

    Logger log = LoggerFactory.getLogger(CodeController.class);


    @GetMapping("/test")
    public String[] test(){
        String arr[] = {"first","second"};
        return arr;
    }

    @PostMapping("/getsrc")
    public List<String> getSrc(@RequestBody List<String> string){
        log.info("HTML : "+string.get(0));
        log.info("CSS : "+string.get(1));
        log.info("JS : "+string.get(2));
        return string;
    }
}
