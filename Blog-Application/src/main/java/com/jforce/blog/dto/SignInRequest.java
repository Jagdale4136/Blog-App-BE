package com.jforce.blog.dto;

import lombok.Data;

@Data
public class SignInRequest {
    private String userName;
    private String password;
}
