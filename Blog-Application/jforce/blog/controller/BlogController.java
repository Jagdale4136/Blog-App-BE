package com.jforce.blog.controller;

import com.jforce.blog.dto.*;
import com.jforce.blog.projection.BlogPostProjection;
import com.jforce.blog.service.blog.BlogPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/blog")
@RestController
@RequiredArgsConstructor
public class BlogController {
    private final BlogPostService blogPostService;

    @PostMapping("/post-blog")
    public AppResponse<BlogPostDTO> createBlogPost(@RequestBody BlogPostDTO dto , Authentication authentication) {
        String username = authentication.getName();
        BlogPostDTO blog = blogPostService.addPost(dto,username);
         return AppResponse.withData(AppResponse.SUCCESS,blog);
    }

    @GetMapping("/get-all")
    public AppResponse<List<BlogPostDTO>> getAllBlogs(){
        List<BlogPostDTO> blogPosts = blogPostService.getAllBlogsPost();
        return AppResponse.withData(AppResponse.SUCCESS, blogPosts);
    }

    @GetMapping("/get-approved-posts")
    public AppResponse<List<BlogPostDTO>> getApprovedPosts(){
        List<BlogPostDTO> blogs = blogPostService.getAllApprovedBlogsPost();
        return AppResponse.withData(AppResponse.SUCCESS,blogs);
    }

    @PostMapping("/blog-feed")
    public AppResponse<PageResponse<BlogPostProjection>> getBlogFee(@RequestBody BlogFeedRequest request){
        PageResponse<BlogPostProjection> blogs = blogPostService.getBlogsFeed(request);
        return AppResponse.withData(AppResponse.SUCCESS,blogs);
    }


    @DeleteMapping("/{id}")
    public AppResponse deletePost(@PathVariable Integer id){
        blogPostService.deleteBlogById(id);
        return AppResponse.SUCCESS;
    }

    @GetMapping("/{id}")
    public AppResponse<BlogPostDTO> getPostById(@PathVariable Integer id){
        BlogPostDTO post = blogPostService.getPostById(id);
        return AppResponse.withData(AppResponse.SUCCESS,post);
    }


    @PutMapping("/update-blog-post")
    public AppResponse<BlogPostDTO> updatePost(@RequestBody BlogPostDTO blogPostDTO , Authentication authentication) {
        String username = authentication.getName();
        BlogPostDTO blogPost = blogPostService.updateBlog(blogPostDTO,username);
        return AppResponse.withData(AppResponse.SUCCESS, blogPost);
    }

}
