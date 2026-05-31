package com.jforce.blog.factory.user;

import com.jforce.blog.dto.UserDTO;
import com.jforce.blog.model.User;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Component
public class UsersFactoryImpl implements UsersFactory {


    @Override
    public User dtoToUsersEntity(UserDTO dto) {
        User user = new User();
        user.setUserId(dto.getUserId());
        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setFullName(dto.getFullName());
        user.setIsActive(dto.getIsActive());
        user.setUserRole(dto.getUserRole());
        user.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt()
                : new Timestamp(new Date().getTime()));
        return user;


    }

    @Override
    public UserDTO entityToUsersDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(user.getUserName());
        userDTO.setEmail(user.getEmail());
        userDTO.setFullName(user.getFullName());
        userDTO.setUserId(user.getUserId());
        userDTO.setIsActive(user.getIsActive());
        userDTO.setUserRole(user.getUserRole());
        userDTO.setCreatedAt(user.getCreatedAt());
        return userDTO;
    }

    @Override
    public List<User> dtoListToUsersEntityList(List<UserDTO> userDTOList) {
        if (userDTOList.isEmpty()) {
            return List.of();
        }
        return userDTOList.stream().map(this::dtoToUsersEntity).toList();
    }

    @Override
    public List<UserDTO> entityListToUsersDtoList(List<User> usersList) {
        if (usersList.isEmpty())
            return List.of();

        return usersList.stream().map(this::entityToUsersDto).toList();
    }

    @Override
    public User updateUserEntity(User user, UserDTO dto) {
        user.setUserId(dto.getUserId());
        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setFullName(dto.getFullName());
        user.setIsActive(dto.getIsActive());
        user.setUserRole(dto.getUserRole());
        user.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt()
                : new Timestamp(new Date().getTime()));
        return user;
    }
}
