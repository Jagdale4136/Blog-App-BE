package com.jforce.blog.controller;

import com.jforce.blog.dto.AppResponse;
import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.dto.UserDTO;
import com.jforce.blog.dto.admin.AdminPostResponse;
import com.jforce.blog.dto.reports.ActiveUserResponse;
import com.jforce.blog.service.blog.BlogPostService;
import com.jforce.blog.service.report.ReportService;
import com.jforce.blog.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final BlogPostService blogPostService;
    private final UserService userService;
    private final ReportService reportService;

    @DeleteMapping("/{id}")
    public AppResponse deletePost(@PathVariable Integer id) {
        blogPostService.deleteBlogById(id);
        return AppResponse.SUCCESS;
    }

    @DeleteMapping("/user/{id}")
    public AppResponse deleteUser(@PathVariable Long id){
        userService.delteUserById(id);
        return AppResponse.SUCCESS;
    }

    @PutMapping("/approve-post")
    public AppResponse<BlogPostDTO> approvePost(@RequestBody BlogPostDTO blogPostDTO) {

        BlogPostDTO blogPost = blogPostService.approvePost(blogPostDTO);
        return AppResponse.withData(AppResponse.SUCCESS, blogPost);
    }

    @PutMapping("/update-blog-post")
    public AppResponse<BlogPostDTO> updatePost(@RequestBody BlogPostDTO blogPostDTO) {
        try {
            BlogPostDTO blogPost = blogPostService.updateBlog(blogPostDTO);
            return AppResponse.withData(AppResponse.SUCCESS, blogPost);
        } catch (Exception e) {
            log.error("Error occured ...", e);
            throw e;
        }
    }

    @DeleteMapping("/delete-blog/{id}")
    public AppResponse deleteBlog(@PathVariable Integer id) {
        blogPostService.deleteBlogById(id);
        return AppResponse.SUCCESS;
    }

    @GetMapping("/get-post-by-id/{id}")
    public AppResponse<BlogPostDTO> getPostById(@PathVariable Integer id) {
        BlogPostDTO post = blogPostService.getPostById(id);
        return AppResponse.withData(AppResponse.SUCCESS, post);
    }

    @GetMapping("/get-all-users")
    public AppResponse<List<UserDTO>> getAllUser() {
        List<UserDTO> users = userService.getAllUsers();
        return AppResponse.withData(AppResponse.SUCCESS, users);
    }

    @GetMapping("/active-users")
    public AppResponse<List<ActiveUserResponse>> getMostActiveUsers() {
        return AppResponse.withData(AppResponse.SUCCESS, reportService.getMostActiveUsers());
    }

    @PutMapping("/feature/{id}")
    public AppResponse featurePost(@PathVariable Integer id) {
        blogPostService.featurePost(id);
        return AppResponse.SUCCESS;
    }

    @PutMapping("/update-user")
    public AppResponse<UserDTO> updateUser(@RequestBody UserDTO dto){
        try {
            UserDTO user = userService.updateUser(dto);
            return AppResponse.withData(AppResponse.SUCCESS,user);
        }catch (Exception e){
            log.error("Error occurred ...", e);
            throw e;
        }

    }

    @GetMapping("/get-user-by-id/{id}")
    public AppResponse<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return AppResponse.withData(AppResponse.SUCCESS, user);
    }

    @GetMapping("/get-all-posts")
    public AppResponse<List<AdminPostResponse>> getAllPost() {
        List<AdminPostResponse> posts = blogPostService.getAllPosts();
        return AppResponse.withData(AppResponse.SUCCESS, posts);
    }


}
