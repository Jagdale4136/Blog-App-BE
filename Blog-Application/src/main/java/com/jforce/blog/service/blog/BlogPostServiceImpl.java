package com.jforce.blog.service.blog;

import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.exceptions.BadRequestException;
import com.jforce.blog.exceptions.ResourceNotFoundException;
import com.jforce.blog.factory.blog.BlogPostFactory;
import com.jforce.blog.model.BlogPost;
import com.jforce.blog.repository.BlogPostRepository;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogPostServiceImpl implements BlogPostService {
    private final BlogPostRepository blogPostRepository;
    private final BlogPostFactory blogPostFactory;


    @Override
    public BlogPostDTO addPost(BlogPostDTO dto) {
        log.info("Creating new Blog.....");
        validateRequest(dto);
        BlogPost blog = blogPostRepository.save(blogPostFactory.dtoToBlogPostEntity(dto));
        return blogPostFactory.entityToBlogPosts(blog);
    }

    private void validateRequest(BlogPostDTO dto) {
        if(ObjectUtils.isEmpty(dto)){
            throw new BadRequestException("Invalid Request.");
        }
        if(dto.getUserId() == null){
            throw new BadRequestException("UserId is required.");
        }
        if(StringUtils.isBlank(dto.getTitle())){
            throw new BadRequestException("Title is required.");
        }
        if(StringUtils.isBlank(dto.getContent())){
            throw new BadRequestException("Content is required.");
        }


    }

    @Override
    public List<BlogPostDTO> getAllBlogsPost() {
        log.info("fetching all blog posts...");
        return blogPostFactory.entityListToBlogDtoList(blogPostRepository.findAll());
    }

    @Override
    public void deleteBlogById(Integer id) {
        log.info("deleting Blog ... id : {}", id);
        blogPostRepository.deleteById(id);
    }

    @Override
    public BlogPostDTO approvePost(BlogPostDTO blogPostDTO) {
        log.info("Approving blog post ...");

        if(ObjectUtils.isEmpty(blogPostDTO)){
            throw new BadRequestException("Invalid request.");
        }

        if (blogPostDTO.getBlogId() == null) {
            throw new BadRequestException("Blog id is required.");
        }
        BlogPost blog = blogPostRepository.findById(blogPostDTO.getBlogId()).orElseThrow(() ->
                new ResourceNotFoundException("Post not found for the give id."));
        blog.setIsApproved(true);
         blogPostRepository.save(blog);
        return blogPostFactory.entityToBlogPosts(blog);
    }

    @Override
    public BlogPostDTO updateBlog(BlogPostDTO dto) {
        log.info("updating blog post .....");
        if (ObjectUtils.isEmpty(dto)) {
            throw new BadRequestException("Invalid Request.");
        }
        if (dto.getBlogId() == null) {
            throw new BadRequestException("Id is required");
        }
        validateRequest(dto);
        BlogPost blog = blogPostRepository.findById(dto.getBlogId()).orElseThrow(() ->
                new ResourceNotFoundException("Post not found for the give id."));

        BlogPost blogpost = blogPostFactory.updateBlogPost(blog, dto);
        return blogPostFactory.entityToBlogPosts(blogPostRepository.save(blogpost));

    }

    @Override
    public List<BlogPostDTO> getAllApprovedBlogsPost() {
         return blogPostFactory.entityListToBlogDtoList(blogPostRepository.findApprovedPost());
    }


}
