package com.jforce.blog.dto.admin;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AdminPostResponse {

    private Integer blogId;
    private String title;
    private String authorName;
    private Timestamp createdAt;
    private Boolean isApproved;
    private Boolean isFeatured;
}