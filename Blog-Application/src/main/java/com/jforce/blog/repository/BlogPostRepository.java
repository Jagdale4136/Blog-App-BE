package com.jforce.blog.repository;

import com.jforce.blog.model.BlogPost;
import com.jforce.blog.projection.BlogPostProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost,Integer> {

    @Query("SELECT b from BlogPost b where b.isApproved = true")
    List<BlogPost> findApprovedPost();

    @Query("""
    SELECT
        b.blogId as blogId,
        b.title as title,
        b.content as content,
        b.readMoreLink as readMoreLink,
        b.createdAt as createdAt,
         b.isFeatured as isFeatured,
        u.fullName as authorName
    FROM BlogPost b
    JOIN User u
        ON u.userId = b.userId
    WHERE b.isApproved = true
    ORDER BY b.createdAt DESC
    """)
    Page<BlogPostProjection> findAllOrderByDate(Pageable pageable);

    @Query("""
    SELECT
        b.blogId as blogId,
        b.title as title,
        b.content as content,
        b.readMoreLink as readMoreLink,
        b.createdAt as createdAt,
        b.isFeatured as isFeatured,
        u.fullName as authorName
    FROM BlogPost b
    JOIN User u
        ON u.userId = b.userId
    WHERE b.isApproved = true
    ORDER BY u.fullName ASC
    """)
    Page<BlogPostProjection> findAllOrderByAuthor(Pageable pageable);


    List<BlogPost> findByUserId(Long userId);

}
