package com.jforce.blog.service.blog;


import com.jforce.blog.dto.BlogFeedRequest;
import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.dto.PageResponse;
import com.jforce.blog.dto.admin.AdminPostResponse;
import com.jforce.blog.model.BlogPost;
import com.jforce.blog.projection.BlogPostProjection;

import java.util.List;

public interface BlogPostService {
    BlogPostDTO addPost(BlogPostDTO dto, String username);

    List<BlogPostDTO> getAllBlogsPost();

    void deleteBlogById(Integer id);

    BlogPostDTO approvePost(BlogPostDTO blogPostDTO);

    BlogPostDTO updateBlog(BlogPostDTO dto);

    List<BlogPostDTO> getAllApprovedBlogsPost();

    PageResponse<BlogPostProjection> getBlogsFeed(BlogFeedRequest request);

    BlogPostDTO getPostById(Integer id);


    void featurePost(Integer id);

    List<AdminPostResponse> getAllPosts();

    BlogPostDTO updateBlog(BlogPostDTO dto, String username);
}
