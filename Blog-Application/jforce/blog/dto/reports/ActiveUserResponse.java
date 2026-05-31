package com.jforce.blog.dto.reports;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActiveUserResponse {

    private Long userId;
    private String fullName;
    private String email;
    private Long totalPosts;
}