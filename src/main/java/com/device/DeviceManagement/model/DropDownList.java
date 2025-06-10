package com.device.DeviceManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Document(collection = "DropDownList")
public class DropDownList implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String categoryName;
    private String dropDownListName;
    private List<String> allData;
    private String presentTime;
    private String date;
    private String status;

    // Default constructor
    public DropDownList() {
    }

    public DropDownList(String categoryName, String dropDownListName, List<String> allData, String presentTime, String date, String status) {
        this.categoryName = categoryName;
        this.dropDownListName = dropDownListName;
        this.allData = allData;
        this.presentTime = presentTime;
        this.date = date;
        this.status = status;
    }

    public String getDropDownListName() {
        return dropDownListName;
    }

    public void setDropDownListName(String dropDownListName) {
        this.dropDownListName = dropDownListName;
    }

    public List<String> getAllData() {
        return allData;
    }

    public void setAllData(List<String> allData) {
        this.allData = allData;
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
