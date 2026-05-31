package com.jforce.blog.repository;

import com.jforce.blog.dto.reports.ActiveUserResponse;
import com.jforce.blog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    @Query("""
            SELECT new com.jforce.blog.dto.reports.ActiveUserResponse(
                u.userId,
                u.fullName,
                u.email,
                COUNT(b.blogId)
            )
            FROM User u
            LEFT JOIN BlogPost b
                ON u.userId = b.userId
            GROUP BY u.userId,u.fullName,u.email
            ORDER BY COUNT(b.blogId) DESC
            """)
    List<ActiveUserResponse> getMostActiveUsers();
}
