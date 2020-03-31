package com.ijrobotics.ijschoolmanagergateway.service.dto;

import java.io.Serializable;

public class UserCredDto implements Serializable {
    private UserDTO userDTO;
    private String password;

    public UserCredDto() {
        super();
    }

    public UserCredDto(UserDTO userDTO, String password) {
        this.userDTO = userDTO;
        this.password = password;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserCredDto{" +
            "userDTO=" + userDTO +
            ", password='" + password + '\'' +
            '}';
    }
}
