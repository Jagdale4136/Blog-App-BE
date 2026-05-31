package com.jforce.blog.factory.blog;

import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.model.BlogPost;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Component
public class BlogPostFactoryImpl implements BlogPostFactory {
    @Override
    public BlogPost dtoToBlogPostEntity(BlogPostDTO dto) {
        BlogPost post = new BlogPost();
        post.setBlogId(dto.getBlogId());
        post.setTags(dto.getTags());
        post.setTitle(dto.getTitle());
        post.setUserId(dto.getUserId());
        post.setContent(dto.getContent());
        post.setIsFeatured(dto.getIsFeatured());
        post.setReadMoreLink(dto.getReadMoreLink());
        post.setIsApproved(dto.getIsApproved());
        post.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt()
                : new Timestamp(new Date().getTime()));
        post.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt()
                : new Timestamp(new Date().getTime()));

        return post;
    }

    @Override
    public BlogPostDTO entityToBlogPosts(BlogPost blogPost) {
        BlogPostDTO dto = new BlogPostDTO();
        dto.setTitle(blogPost.getTitle());
        dto.setBlogId(blogPost.getBlogId());
        dto.setUserId(blogPost.getUserId());
        dto.setTags(blogPost.getTags());
        dto.setContent(blogPost.getContent());
        dto.setIsFeatured(blogPost.getIsFeatured());
        dto.setReadMoreLink(blogPost.getReadMoreLink());
        dto.setCreatedAt(blogPost.getCreatedAt());
        dto.setIsApproved(blogPost.getIsApproved());
        dto.setUpdatedAt(blogPost.getUpdatedAt());
        return dto;
    }

    @Override
    public List<BlogPostDTO> entityListToBlogDtoList(List<BlogPost> blogPostList) {

        if (blogPostList.isEmpty())
           return List.of();

        return blogPostList.stream().map(this::entityToBlogPosts).toList();
    }

    @Override
    public BlogPost updateBlogPost(BlogPost post, BlogPostDTO dto) {
        post.setIsApproved(dto.getIsApproved());
        post.setTitle(dto.getTitle());
        post.setTags(dto.getTags());
        post.setContent(dto.getContent());
        post.setBlogId(dto.getBlogId());
        post.setIsFeatured(dto.getIsFeatured());
        post.setCreatedAt(dto.getCreatedAt());
        post.setReadMoreLink(dto.getReadMoreLink());
        post.setUpdatedAt(new Timestamp(new Date().getTime()));
        return post;
    }
}
