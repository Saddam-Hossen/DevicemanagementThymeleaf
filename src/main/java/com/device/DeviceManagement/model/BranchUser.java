package com.device.DeviceManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

@Document(collection = "BranchUser")
public class BranchUser implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;

    private String branchName;
    private String userName;
    private String userId;
    private String userJoinDate;
    private String date;
    private String presentTime;
    private String status;
    private  String userDesignation;
    // Default constructor
    public BranchUser() {
    }

    // Parameterized constructor
    public BranchUser(String branchName, String userName, String userId, String userJoinDate,String userDesignation,String date, String presentTime, String status) {
        this.branchName = branchName;
        this.userName = userName;
        this.userId = userId;
        this.userJoinDate = userJoinDate;
        this.userDesignation=userDesignation;
        this.date = date;
        this.presentTime = presentTime;
        this.status = status;
    }

    public String getUserDesignation() {
        return userDesignation;
    }

    public void setUserDesignation(String userDesignation) {
        this.userDesignation = userDesignation;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserJoinDate() {
        return userJoinDate;
    }

    public void setUserJoinDate(String userJoinDate) {
        this.userJoinDate = userJoinDate;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
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
        return "BranchUser{" +
                "id='" + id + '\'' +
                ", branchName='" + branchName + '\'' +
                ", userName='" + userName + '\'' +
                ", userId='" + userId + '\'' +
                ", userPassword='" + userJoinDate + '\'' +
                ", userDesignation='" + userDesignation + '\'' +
                ", date='" + date + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", status='" + status + '\'' +
                '}';
    }


}
