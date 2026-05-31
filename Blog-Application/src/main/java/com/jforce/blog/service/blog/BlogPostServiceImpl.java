package com.jforce.blog.service.blog;

import com.jforce.blog.dto.BlogFeedRequest;
import com.jforce.blog.dto.BlogPostDTO;
import com.jforce.blog.dto.PageResponse;
import com.jforce.blog.dto.admin.AdminPostResponse;
import com.jforce.blog.exceptions.BadRequestException;
import com.jforce.blog.exceptions.ResourceNotFoundException;
import com.jforce.blog.factory.blog.BlogPostFactory;
import com.jforce.blog.model.BlogPost;
import com.jforce.blog.model.User;
import com.jforce.blog.projection.BlogPostProjection;
import com.jforce.blog.repository.BlogPostRepository;
import com.jforce.blog.repository.UserRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogPostServiceImpl implements BlogPostService {
    private final BlogPostRepository blogPostRepository;
    private final BlogPostFactory blogPostFactory;
    private final UserRepository userRepository;


    @Override
    public BlogPostDTO addPost(BlogPostDTO dto, String username) {
        log.info("Creating new Blog.....");
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        dto.setUserId(user.getUserId());

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
    @Transactional
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
        blog.setIsApproved(blogPostDTO.getIsApproved());
         blogPostRepository.save(blog);
        return blogPostFactory.entityToBlogPosts(blog);
    }

    @Override
    @Transactional
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

    @Override
    @Transactional
    public PageResponse<BlogPostProjection> getBlogsFeed(BlogFeedRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getRow());
        Page<BlogPostProjection> blogs;

        if ("author".equalsIgnoreCase(request.getSortBy())) {
            blogs = blogPostRepository.findAllOrderByAuthor(pageable);
        } else {
            blogs = blogPostRepository.findAllOrderByDate(pageable);
        }

        return PageResponse.<BlogPostProjection>builder()
                .content(blogs.getContent())
                .pageNumber(blogs.getNumber())
                .pageSize(blogs.getSize())
                .totalElements(blogs.getTotalElements())
                .totalPages(blogs.getTotalPages())
                .first(blogs.isFirst())
                .last(blogs.isLast())
                .build();
    }

    @Override
    public BlogPostDTO getPostById(Integer id) {
        if(id== null){
            throw new BadRequestException("Invalid request.");
        }

        BlogPost blog = blogPostRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Post not found for the give id."));
        return blogPostFactory.entityToBlogPosts(blog);

    }


    @Override
    public void featurePost(Integer id) {
        BlogPost blog = blogPostRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Post not found for the give id."));
        if(!blog.getIsApproved()){
            throw new BadRequestException("Post is not approved.");
        }
        blog.setIsFeatured(true);
        blogPostRepository.save(blog);
    }

    public List<AdminPostResponse> getAllPosts() {

        List<BlogPost> posts = blogPostRepository.findAll();

        return posts.stream()
                .map(post -> {

                    User user = userRepository
                            .findById(post.getUserId())
                            .orElse(null);

                    AdminPostResponse response =
                            new AdminPostResponse();

                    response.setBlogId(post.getBlogId());
                    response.setTitle(post.getTitle());
                    response.setAuthorName(user != null ? user.getFullName() : "Unknown");
                    response.setCreatedAt(post.getCreatedAt());
                    response.setIsApproved(post.getIsApproved());
                    response.setIsFeatured(post.getIsFeatured());

                    return response;
                })
                .toList();
    }

    @Override
    public BlogPostDTO updateBlog(BlogPostDTO dto, String username) {
        User user = userRepository.findByUserName(username).orElseThrow(() ->
                new ResourceNotFoundException("User Not found."));
        dto.setUserId(user.getUserId());
        return updateBlog(dto);
    }


}
