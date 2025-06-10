package com.device.DeviceManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "Category")
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;
    private String categoryName;
    private String presentTime;
    private String date;
    private String status;

    // Default constructor
    public Category() {
    }

    // Parameterized constructor
    public Category(String categoryName, String presentTime, String date, String status) {
        this.categoryName = categoryName;
        this.presentTime = presentTime;
        this.date = date;
        this.status = status;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getPresentTime() {
        return presentTime;
    }

    public void setPresentTime(String presentTime) {
        this.presentTime = presentTime;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
