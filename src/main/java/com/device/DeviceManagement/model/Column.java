package com.device.DeviceManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "Column")
public class Column implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String columnName;
    private String presentTime;
    private String date;
    private String status;
    private String columnType;
    private String dataType;
    private String requiredType;
    private String categoryName;

    // Default constructor
    public Column() {}

    // Parameterized constructor
    public Column(String columnName, String presentTime, String date, String status, String columnType, String categoryName,String requiredType,String dataType) {

        this.columnName = columnName;
        this.presentTime = presentTime;
        this.date = date;
        this.status = status;
        this.columnType = columnType;
        this.categoryName = categoryName;
        this.dataType=dataType;
        this.requiredType=requiredType;
    }

    public String getRequiredType() {
        return requiredType;
    }

    public void setRequiredType(String requiredType) {
        this.requiredType = requiredType;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
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

    public String getColumnType() {
        return columnType;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    @Override
    public String toString() {
        return "Column{" +
                "id='" + id + '\'' +
                ", columnName='" + columnName + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", date='" + date + '\'' +
                ", status='" + status + '\'' +
                ", columnType='" + columnType + '\'' +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
