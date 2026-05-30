package com.jforce.blog.repository;

import com.jforce.blog.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost,Integer> {

    @Query("SELECT b from BlogPost b where b.isApproved = true")
    List<BlogPost> findApprovedPost();

}
