package com.jforce.blog.service.user;

import com.jforce.blog.constants.UserRole;
import com.jforce.blog.dto.UserDTO;
import com.jforce.blog.exceptions.BadRequestException;
import com.jforce.blog.factory.user.UsersFactory;
import com.jforce.blog.model.User;
import com.jforce.blog.repository.UserRepository;
import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UsersFactory usersFactory;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           UsersFactory usersFactory, PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.usersFactory=usersFactory;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO createNewUser(UserDTO userDTO) {
          log.info("creating new user...");
          validateCreateNewUserRequest(userDTO);
          userDTO.setIsActive(true);
          userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
          userDTO.setUserRole(UserRole.USER);
        User user = usersFactory.dtoToUsersEntity(userDTO);
        User savedUser = userRepository.save(user);

        return usersFactory.entityToUsersDto(savedUser);
    }

    private void validateCreateNewUserRequest(UserDTO userDTO) {
        if(ObjectUtils.isEmpty(userDTO)){
          throw new BadRequestException("Invalid Request.");
        }
        if(StringUtils.isBlank(userDTO.getEmail())){
            throw new BadRequestException("Email is required.");
        }
        if(StringUtils.isBlank(userDTO.getUserName())){
            throw new BadRequestException("User name is required.");
        }
        if(StringUtils.isBlank(userDTO.getPassword())){
            throw new BadRequestException("Password is required.");
        }
        if(StringUtils.isBlank(userDTO.getFullName())){
            throw new BadRequestException("Full name is required.");
        }

    }
}
