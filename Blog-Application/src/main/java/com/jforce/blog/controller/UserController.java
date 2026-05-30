package com.jforce.blog.controller;

import com.jforce.blog.dto.AppResponse;
import com.jforce.blog.dto.AuthResponse;
import com.jforce.blog.dto.UserDTO;
import com.jforce.blog.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/create-account")
    public AppResponse<UserDTO> userSignUp(@RequestBody UserDTO userDTO){
        try{
            UserDTO user = userService.createNewUser(userDTO);
            return AppResponse.withData(AppResponse.SUCCESS,user);
        } catch (Exception e) {
            log.error("Error creating users account ...");
            throw e;
        }
    }

    @PostMapping("/log-in")
    public AppResponse<AuthResponse> signIn(@RequestBody UserDTO userDTO){
        try{
            AuthResponse response = userService.signIn(userDTO);
            return AppResponse.withData(AppResponse.SUCCESS,response);
        } catch (Exception e) {
            throw e;
        }
    }



}
