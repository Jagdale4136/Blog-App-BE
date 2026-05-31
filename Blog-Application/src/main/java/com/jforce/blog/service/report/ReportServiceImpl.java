package com.jforce.blog.service.report;

import com.jforce.blog.dto.reports.ActiveUserResponse;
import com.jforce.blog.dto.reports.PopularPostResponse;
import com.jforce.blog.model.BlogPost;
import com.jforce.blog.repository.BlogPostRepository;
import com.jforce.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final UserRepository userRepository;
    private final BlogPostRepository blogPostRepository;

    public List<ActiveUserResponse> getMostActiveUsers() {
        return userRepository.getMostActiveUsers();
    }



    private PopularPostResponse convert(BlogPost post) {

        PopularPostResponse dto =
                new PopularPostResponse();

        dto.setBlogId(post.getBlogId());
        dto.setTitle(post.getTitle());
        dto.setTags(post.getTags());
        dto.setUserId(post.getUserId());

        return dto;
    }
}