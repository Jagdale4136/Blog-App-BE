package com.jforce.blog.controller;

import com.jforce.blog.dto.AppResponse;
import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.service.blog.BlogPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final BlogPostService blogPostService;

    @DeleteMapping("/{id}")
    public AppResponse<Void>  deletePost(@PathVariable Integer id){
        blogPostService.deleteBlogById(id);
        return AppResponse.SUCCESS;
    }

    @PutMapping("/approve-post")
    public AppResponse<BlogPostDTO> approvePost(@RequestBody BlogPostDTO blogPostDTO){

        BlogPostDTO blogPost = blogPostService.approvePost(blogPostDTO);
        return AppResponse.withData(AppResponse.SUCCESS,blogPost);
    }

    @PutMapping("/update-blog-post")
    public AppResponse<BlogPostDTO> updatePost(@RequestBody BlogPostDTO blogPostDTO){
        BlogPostDTO blogPost = blogPostService.updateBlog(blogPostDTO);
        return AppResponse.withData(AppResponse.SUCCESS, blogPost);
    }

    @DeleteMapping("/delete-blog/{id}")
    public AppResponse deleteBlog(@PathVariable Integer id){
        blogPostService.deleteBlogById(id);
        return AppResponse.SUCCESS;
    }

}
