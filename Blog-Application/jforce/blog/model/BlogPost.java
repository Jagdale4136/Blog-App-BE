package com.jforce.blog.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "BlogPost")
@Data
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer blogId;

    @Column(nullable = false)
    private Long userId;

    private String title;

    private String content;

    private String tags;

    private Boolean isFeatured = false;

    private String readMoreLink;

    private Boolean isApproved = false;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;


}
