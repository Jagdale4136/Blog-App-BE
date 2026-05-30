package com.jforce.blog.dto;

import com.jforce.blog.constants.UserRole;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserDTO {

    private Integer userId;

    private String userName;

    private String password;

    private String email;

    private String fullName;

    private UserRole userRole;

    private Boolean isActive;

    private Timestamp createdAt;
}
