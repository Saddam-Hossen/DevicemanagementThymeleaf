package com.device.DeviceManagement.model;

import java.util.List;

// Define DTO for the incoming request
public  class PurchaseRequestDTO {
    private String departmentName;
    private String departmentUserName;
    private String departmentUserId;
    private List<ServiceDTO> services;
    private List<String> requests;

    public List<String> getRequests() {
        return requests;
    }

    public void setRequests(List<String> requests) {
        this.requests = requests;
    }

    // Getters and setters
    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentUserName() {
        return departmentUserName;
    }

    public void setDepartmentUserName(String departmentUserName) {
        this.departmentUserName = departmentUserName;
    }

    public String getDepartmentUserId() {
        return departmentUserId;
    }

    public void setDepartmentUserId(String departmentUserId) {
        this.departmentUserId = departmentUserId;
    }

    public List<ServiceDTO> getServices() {
        return services;
    }

    public void setServices(List<ServiceDTO> services) {
        this.services = services;
    }
}