package com.jforce.blog.service.user;

import com.jforce.blog.dto.*;

import java.util.List;

public interface UserService {

    UserDTO createNewUser(UserDTO userDTO);

    AuthResponse signIn(SignInRequest userDTO);

    UserProfileResponse getProfile(String name);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    void delteUserById(Long id);

    UserDTO updateUser(UserDTO dto);
}
