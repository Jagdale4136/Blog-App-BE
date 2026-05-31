package com.jforce.blog.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class UserProfileResponse {

    private Long userId;
    private String fullName;
    private String email;

    private List<UserPostDto> posts;

    @Data
    public static class UserPostDto {

        private Integer blogId;
        private String title;
        private String content;
        private String tags;
        private String readMoreLink;
        private Timestamp createdAt;
        private Timestamp updatedAt;
    }
}
