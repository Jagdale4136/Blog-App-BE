package com.jforce.blog.factory.user;

import com.jforce.blog.dto.UserDTO;
import com.jforce.blog.model.User;

import java.util.List;

public interface UsersFactory {

    User dtoToUsersEntity(UserDTO dto);

    UserDTO entityToUsersDto(User user);

    List<User> dtoListToUsersEntityList(List<UserDTO> userDTOList);

    List<UserDTO> entityListToUsersDtoList(List<User> usersList);

    User updateUserEntity(User user, UserDTO dto);
}
