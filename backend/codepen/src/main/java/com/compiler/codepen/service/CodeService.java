package com.compiler.codepen.service;

import com.compiler.codepen.entity.Code;
import com.compiler.codepen.entity.Student;
import com.compiler.codepen.exception.ResourceNotFoundException;
import com.compiler.codepen.repository.CodeRepository;
import com.compiler.codepen.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CodeService {

    @Autowired
    private CodeRepository codeRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Code addSubmission(Code code){
        Student student = studentRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("Student Not Found With ID "+ 1));
        code.setStudent(student);
        Code addedCode = codeRepository.save(code);
        return  addedCode;
    }

    public Code getCode(){
        Code code = codeRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("Code Not Found With ID "+ 1));
        return code;
    }
}
