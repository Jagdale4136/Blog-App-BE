package com.jforce.blog.security;

import com.jforce.blog.model.User;
import com.jforce.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository
                .findByUserName(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                user.getIsActive(),
                true,
                true,
                true,
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getUserRole().name()
                        )
                )
        );
    }
}