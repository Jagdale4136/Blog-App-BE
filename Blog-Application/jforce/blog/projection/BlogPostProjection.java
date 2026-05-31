package com.jforce.blog.projection;

import java.sql.Timestamp;

public interface BlogPostProjection {

    Integer getBlogId();

    String getTitle();

    String getContent();

    String getReadMoreLink();

    String getTags();

    Boolean getIsFeatured();

    Timestamp getCreatedAt();

    String getAuthorName();
}