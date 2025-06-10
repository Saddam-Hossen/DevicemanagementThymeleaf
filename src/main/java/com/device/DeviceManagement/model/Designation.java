package com.device.DeviceManagement.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "Designation")
public class Designation implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;

    private String designationName;
    private String presentTime;
    private String date;

    private String status;

    public Designation(String designationName, String presentTime, String date, String status) {
        this.designationName = designationName;
        this.presentTime = presentTime;
        this.date = date;
        this.status = status;
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

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Designation{" +
                "id='" + id + '\'' +
                ", designationName='" + designationName + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", date='" + date + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
