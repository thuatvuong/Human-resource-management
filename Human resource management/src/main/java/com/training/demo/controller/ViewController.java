package com.training.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ViewController {
    @GetMapping("")
    public String getPages(){
        return "add-certificate";
    }

    @GetMapping("/{id}")
    public String getPage(@PathVariable String id){
        return "add-certificate";
    }
}
