package com.jforce.blog.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BlogPostDTO {
    private Integer blogId;

    private Integer userId;

    private String title;

    private String content;

    private String tags;

    private String readMoreLink;

    private Boolean isApproved;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
