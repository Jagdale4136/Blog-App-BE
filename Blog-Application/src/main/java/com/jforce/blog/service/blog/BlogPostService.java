package com.jforce.blog.service.blog;


import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.model.BlogPost;

import java.util.List;

public interface BlogPostService {
 BlogPostDTO addPost(BlogPostDTO dto);

 List<BlogPostDTO> getAllBlogsPost();

 void deleteBlogById(Integer id);

 BlogPostDTO approvePost(BlogPostDTO blogPostDTO);

 BlogPostDTO updateBlog(BlogPostDTO dto);

    List<BlogPostDTO> getAllApprovedBlogsPost();
}
