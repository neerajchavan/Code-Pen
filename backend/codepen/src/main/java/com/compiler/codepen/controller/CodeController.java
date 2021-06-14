package com.compiler.codepen.controller;

import com.compiler.codepen.entity.Code;
import com.compiler.codepen.service.CodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class CodeController {

    @Autowired
    private CodeService codeService;

    Logger log = LoggerFactory.getLogger(CodeController.class);


    @GetMapping("/test")
    public String[] test() {
        String arr[] = {"first", "second"};
        return arr;
    }

    @GetMapping("/get-code")
    public Code getCode(){
        return codeService.getCode();
    }

    @PostMapping("/submit-code")
    public Code submitCode(@RequestBody Code code) {
        log.info("HTML : " + code.getHtml());
        log.info("CSS : " + code.getCss());
        log.info("JS : " + code.getJs());

        return codeService.addSubmission(code);
    }
}
