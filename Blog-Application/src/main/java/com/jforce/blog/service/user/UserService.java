package com.jforce.blog.service.user;

import com.jforce.blog.dto.AuthResponse;
import com.jforce.blog.dto.UserDTO;

public interface UserService {

    UserDTO createNewUser(UserDTO userDTO);

    AuthResponse signIn(UserDTO userDTO);
}
