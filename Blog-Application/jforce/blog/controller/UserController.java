package com.jforce.blog.controller;

import com.jforce.blog.dto.*;
import com.jforce.blog.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public AppResponse<AuthResponse> signIn(@RequestBody SignInRequest signInRequest){
        try{
            AuthResponse response = userService.signIn(signInRequest);
            return AppResponse.withData(AppResponse.SUCCESS,response);
        } catch (Exception e) {
            throw e;
        }
    }

    @GetMapping("/get-user-profile")
    public AppResponse<UserProfileResponse> getUserProfileResponse(  Authentication authentication) {
        UserProfileResponse response = userService.getProfile(authentication.getName());
        return AppResponse.withData(AppResponse.SUCCESS,response);
    }


}
