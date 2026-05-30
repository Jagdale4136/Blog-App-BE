package com.jforce.blog.controller;

import com.jforce.blog.dto.AppResponse;
import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.service.blog.BlogPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/blog")
@RestController
@RequiredArgsConstructor
public class BlogController {
    private final BlogPostService blogPostService;

    @PostMapping("/post-blog")
    public AppResponse<BlogPostDTO> createBlogPost(@RequestBody BlogPostDTO dto){
        BlogPostDTO blog = blogPostService.addPost(dto);
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

}
