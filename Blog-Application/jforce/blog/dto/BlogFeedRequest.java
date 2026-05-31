package com.jforce.blog.dto;

import lombok.Data;

@Data
public class BlogFeedRequest {
    private int page;
    private int row;
    private String sortBy;
    private  String sortDirection;
}
