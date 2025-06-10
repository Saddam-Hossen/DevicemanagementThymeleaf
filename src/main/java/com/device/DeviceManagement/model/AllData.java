package com.device.DeviceManagement.model;
import java.io.Serializable;
import java.util.List;
public class AllData  implements Serializable {
    private static final long serialVersionUID = 1L;
    private List<Category> categories;
    private List<Column> universalColumns;
    private List<Column> individualColumns;
    private List<AddData> allAddData;
    private List<User> allUser;
    private List<RequestColumn>  requestColumns;
    private List<ServiceRequest> serviceRequests;
    private List<RequestData>  requestData;
    private  List<DropDownList> dropDownLists;
    private List<Designation> designations;
    private List<BranchUser> userAccountData;
    private List<InternalUser> internalUsers;

    public List<BranchUser> getUserAccountData() {
        return userAccountData;
    }

    public void setUserAccountData(List<BranchUser> userAccountData) {
        this.userAccountData = userAccountData;
    }

    public List<Designation> getDesignations() {
        return designations;
    }

    public void setDesignations(List<Designation> designations) {
        this.designations = designations;
    }

    public List<DropDownList> getDropDownLists() {
        return dropDownLists;
    }

    public void setDropDownLists(List<DropDownList> dropDownLists) {
        this.dropDownLists = dropDownLists;
    }

    public List<ServiceRequest> getServiceRequests() {
        return serviceRequests;
    }

    public void setServiceRequests(List<ServiceRequest> serviceRequests) {
        this.serviceRequests = serviceRequests;
    }

    public List<RequestData> getRequestData() {
        return requestData;
    }

    public void setRequestData(List<RequestData> requestData) {
        this.requestData = requestData;
    }

    public List<RequestColumn> getRequestColumns() {
        return requestColumns;
    }

    public void setRequestColumns(List<RequestColumn> requestColumns) {
        this.requestColumns = requestColumns;
    }

    // Getters and setters
    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Column> getUniversalColumns() {
        return universalColumns;
    }

    public void setUniversalColumns(List<Column> universalColumns) {
        this.universalColumns = universalColumns;
    }

    public List<Column> getIndividualColumns() {
        return individualColumns;
    }

    public void setIndividualColumns(List<Column> individualColumns) {
        this.individualColumns = individualColumns;
    }

    public List<AddData> getAllAddData() {
        return allAddData;
    }

    public void setAllAddData(List<AddData> allAddData) {
        this.allAddData = allAddData;
    }

    public List<User> getAllUser() {
        return allUser;
    }

    public void setAllUser(List<User> allUser) {
        this.allUser = allUser;
    }

    public List<InternalUser> getInternalUsers() {
        return internalUsers;
    }

    public void setInternalUsers(List<InternalUser> internalUsers) {
        this.internalUsers = internalUsers;
    }
}
