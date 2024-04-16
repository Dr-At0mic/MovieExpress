package com.movieexpress.backend.controller;

import com.movieexpress.backend.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private RolesRepository rolesRepository;
////    @GetMapping("/addFunctions")
////    @Transactional
////    public Functions addData(@RequestParam String FunctionName){
////        return functionsRepository.save(Functions.builder().functionName(FunctionName).build());
////    }
////    @GetMapping("/addRoles")
////    @Transactional
////    public Roles addRoles(@RequestParam String RoleName){
////        List<Functions> functionsList = new ArrayList<>();
////        functionsList.add(functionsRepository.findByFunctionName("UPDATE_USER"));
////        functionsList.add(functionsRepository.findByFunctionName("DELETE_USER"));
////        functionsList.add(functionsRepository.findByFunctionName("BAN_USER"));
////        functionsList.add(functionsRepository.findByFunctionName("VIEW_USER_CREDENTIALS"));
////        return rolesRepository.save(Roles.builder().roleName(RoleName).functions(functionsList).build());
////    }


}
