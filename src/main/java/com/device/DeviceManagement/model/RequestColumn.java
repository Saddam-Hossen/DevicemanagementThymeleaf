package com.device.DeviceManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "RequestColumn")
public class RequestColumn  implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String columnName;
    private String dataType;
    private String requiredType;
    private String presentTime;
    private String date;
    private String status;
    private String visibleType;
    // Default constructor
    public RequestColumn() {
    }

    // Parameterized constructor
    public RequestColumn(String columnName, String dataType, String requiredType,String visibleType, String presentTime, String date, String status) {
        this.columnName = columnName;
        this.dataType = dataType;
        this.requiredType = requiredType;
        this.presentTime = presentTime;
        this.date = date;
        this.status = status;
        this.visibleType=visibleType;
    }

    public String getVisibleType() {
        return visibleType;
    }

    public void setVisibleType(String visibleType) {
        this.visibleType = visibleType;
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

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getRequiredType() {
        return requiredType;
    }

    public void setRequiredType(String requiredType) {
        this.requiredType = requiredType;
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
