package com.jforce.blog.dto.reports;

import lombok.Data;

@Data
public class PopularPostResponse {

    private Integer blogId;
    private String title;
    private String tags;
    private Integer likes;
    private Long userId;
}