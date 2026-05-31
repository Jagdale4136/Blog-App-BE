package com.jforce.blog.service.user;

import com.jforce.blog.constants.UserRole;
import com.jforce.blog.dto.AuthResponse;
import com.jforce.blog.dto.SignInRequest;
import com.jforce.blog.dto.UserDTO;
import com.jforce.blog.dto.UserProfileResponse;
import com.jforce.blog.exceptions.BadRequestException;
import com.jforce.blog.exceptions.ResourceNotFoundException;
import com.jforce.blog.factory.user.UsersFactory;
import com.jforce.blog.model.BlogPost;
import com.jforce.blog.model.User;
import com.jforce.blog.repository.BlogPostRepository;
import com.jforce.blog.repository.UserRepository;
import com.jforce.blog.security.JwtUtil;
import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UsersFactory usersFactory;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final BlogPostRepository blogRepository;

    public UserServiceImpl(UserRepository userRepository,
                           UsersFactory usersFactory, PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil,BlogPostRepository blogRepository) {
        this.userRepository = userRepository;
        this.usersFactory = usersFactory;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.blogRepository=blogRepository;
    }

    @Override
    public UserDTO createNewUser(UserDTO userDTO) {
        log.info("creating new user...");
        validateCreateNewUserRequest(userDTO);
        if (StringUtils.isBlank(userDTO.getPassword())) {
            throw new BadRequestException("Password is required.");
        }
        userDTO.setIsActive(true);
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userDTO.setUserRole(UserRole.USER);
        User user = usersFactory.dtoToUsersEntity(userDTO);
        User savedUser = userRepository.save(user);

        return usersFactory.entityToUsersDto(savedUser);
    }

    public AuthResponse signIn(SignInRequest request) {

        User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new BadRequestException("Account is inactive");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new BadRequestException("Invalid credentials");
        }

        UserDetails userDetails =
                new org.springframework.security.core.userdetails.User(
                        user.getUserName(),
                        user.getPassword(),
                        List.of(
                                new SimpleGrantedAuthority(
                                        "ROLE_" + user.getUserRole().name()
                                )
                        )
                );

        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token);
    }

    public UserProfileResponse getProfile(String userName) {

        User user = userRepository.findByUserName(userName)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        List<BlogPost> posts =
                blogRepository.findByUserId(user.getUserId());

        UserProfileResponse response =
                new UserProfileResponse();

        response.setUserId(user.getUserId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());

        List<UserProfileResponse.UserPostDto> postDtos =
                posts.stream()
                        .map(post -> {

                            UserProfileResponse.UserPostDto dto =
                                    new UserProfileResponse.UserPostDto();

                            dto.setBlogId(post.getBlogId());
                            dto.setTitle(post.getTitle());
                            dto.setContent(post.getContent());
                            dto.setTags(post.getTags());
                            dto.setReadMoreLink(post.getReadMoreLink());
                            dto.setCreatedAt(post.getCreatedAt());
                            dto.setUpdatedAt(post.getUpdatedAt());

                            return dto;
                        })
                        .toList();

        response.setPosts(postDtos);

        return response;
    }

    @Override
    public List<UserDTO> getAllUsers() {
       return usersFactory.entityListToUsersDtoList(userRepository.findAll());
    }

    @Override
    public UserDTO getUserById(Long id) {
        if(id == null){
            throw new BadRequestException("Id is required");
        }
        return usersFactory.entityToUsersDto(userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found for the given id.")));
    }

    @Override
    public void delteUserById(Long id) {
         if(id == null){
            throw new BadRequestException("Id is required");
        }
         userRepository.deleteById(id);
    }

    @Override
    public UserDTO updateUser(UserDTO dto) {
        validateCreateNewUserRequest(dto);
        if(dto.getUserId() == null){
            throw new BadRequestException("Id is required.");
        }
        User user = userRepository.findById(dto.getUserId()).orElseThrow(() ->
                new ResourceNotFoundException("User Not found for the given id"));
       User updatedUser = usersFactory.updateUserEntity(user, dto);
       return usersFactory.entityToUsersDto(updatedUser);

    }


    private void validateCreateNewUserRequest(UserDTO userDTO) {
        if (ObjectUtils.isEmpty(userDTO)) {
            throw new BadRequestException("Invalid Request.");
        }
        if (StringUtils.isBlank(userDTO.getEmail())) {
            throw new BadRequestException("Email is required.");
        }
        if (StringUtils.isBlank(userDTO.getUserName())) {
            throw new BadRequestException("User name is required.");
        }

        if (StringUtils.isBlank(userDTO.getFullName())) {
            throw new BadRequestException("Full name is required.");
        }

    }
}
