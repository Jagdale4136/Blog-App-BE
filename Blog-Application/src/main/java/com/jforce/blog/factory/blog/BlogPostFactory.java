package com.jforce.blog.factory.blog;

import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.model.BlogPost;

import java.util.List;

public interface BlogPostFactory {
    BlogPost dtoToBlogPostEntity(BlogPostDTO dto);

    BlogPostDTO entityToBlogPosts(BlogPost blogPost);

    List<BlogPostDTO> entityListToBlogDtoList(List<BlogPost> blogPostList);

    BlogPost updateBlogPost( BlogPost blog, BlogPostDTO dto);

}
