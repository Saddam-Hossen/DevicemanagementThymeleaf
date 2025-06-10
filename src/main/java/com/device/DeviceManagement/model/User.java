package com.device.DeviceManagement.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

@Document(collection = "User")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String userName;
    private String userId; // corrected from UserId
    private String userPassword; // corrected from UserPassword
    private String date;
    private String presentTime;
    private String status;

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User( String userName, String userId, String userPassword, String date, String presentTime, String status) {

        this.userName = userName;
        this.userId = userId;
        this.userPassword = userPassword;
        this.date = date;
        this.presentTime = presentTime;
        this.status = status;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPresentTime() {
        return presentTime;
    }

    public void setPresentTime(String presentTime) {
        this.presentTime = presentTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Overriding toString method
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", userName='" + userName + '\'' +
                ", userId='" + userId + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", date='" + date + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    // Overriding equals method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(userName, user.userName) &&
                Objects.equals(userId, user.userId) &&
                Objects.equals(userPassword, user.userPassword) &&
                Objects.equals(date, user.date) &&
                Objects.equals(presentTime, user.presentTime) &&
                Objects.equals(status, user.status);
    }

    // Overriding hashCode method
    @Override
    public int hashCode() {
        return Objects.hash(id, userName, userId, userPassword, date, presentTime, status);
    }
}
