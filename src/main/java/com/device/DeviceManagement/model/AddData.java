package com.device.DeviceManagement.model;


import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Document(collection = "AddData")
public class AddData implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;


    private String userName;


    private String categoryName;

    private String date;

    private String presentTime;

    private Map<String, String> allData;

    private String status;

    private  String visibleId;
    private  String orderedDeviceStatus;
    private UnOrderedDevice unOrderedDevice;

    private List<DeviceUser> deviceUsers;
    private String deviceTypeServicingOrRequestingOrOldAsInputting;// Service,Old,New

    private String deviceTypePrimaryOrSecondary;
    private String deviceTypeSecondaryInOrOut;

    private Set<String> addAccessories;
    private Set<String> extractsNewComponents;
    private Set<String> extractsOldComponents;
    private Set<String> listedComponents;
    private Set<String> listedChild;
    private List<ChildDevices> childDevices;
    private List<ParentDevices> parentDevices;
    private  String bookingStatus;

    public AddData(AddData other, String customID) {
        this.id = customID;
        this.userName = other.userName;
        this.categoryName = other.categoryName;
        this.date = other.date;
        this.presentTime = other.presentTime;
        this.allData = (other.allData);
        this.status = other.status;

        this.visibleId=other.visibleId;
        this.deviceUsers = (other.deviceUsers);
        this.deviceTypeServicingOrRequestingOrOldAsInputting=other.deviceTypeServicingOrRequestingOrOldAsInputting;
        this.deviceTypePrimaryOrSecondary=other.deviceTypePrimaryOrSecondary;
        this.deviceTypeSecondaryInOrOut=other.deviceTypeSecondaryInOrOut;
        this.addAccessories = (other.addAccessories);
        this.extractsNewComponents = (other.extractsNewComponents);
        this.extractsOldComponents = (other.extractsOldComponents);
        this.listedComponents = (other.listedComponents);
        this.listedChild =other.listedChild;
        this.childDevices = other.childDevices;
        this.parentDevices = other.parentDevices;
        this.bookingStatus= other.bookingStatus;
    }

    // Default constructor
    public AddData() {}

    // Parameterized constructor
    public AddData(String userName ,String categoryName,  String presentTime,String date, Map<String, String> allData, String status) {
        this.userName = userName;
        this.categoryName = categoryName;
        this.date = date;
        this.presentTime = presentTime;
        this.allData = allData;
        this.status = status;
    }
    // Parameterized constructor
    public AddData(String id,AddData other,String userName ,String categoryName,  String presentTime,String date, Map<String, String> allData, String status) {
        this.id=id;
        this.userName = userName;
        this.categoryName = categoryName;
        this.date = date;
        this.presentTime = presentTime;
        this.allData = allData;
        this.status = status;

        this.visibleId=other.visibleId;
        this.orderedDeviceStatus=other.orderedDeviceStatus;
        this.deviceTypeServicingOrRequestingOrOldAsInputting=other.deviceTypeServicingOrRequestingOrOldAsInputting;
        this.deviceTypePrimaryOrSecondary=other.deviceTypePrimaryOrSecondary;
        this.deviceTypeSecondaryInOrOut=other.deviceTypeSecondaryInOrOut;
        this.deviceUsers = (other.deviceUsers);
        this.addAccessories = (other.addAccessories);
        this.extractsNewComponents = (other.extractsNewComponents);
        this.extractsOldComponents = (other.extractsOldComponents);
        this.listedComponents = (other.listedComponents);
        this.listedChild =other.listedChild;
        this.childDevices = other.childDevices;
        this.parentDevices = other.parentDevices;
        this.bookingStatus= other.bookingStatus;
    }

    public UnOrderedDevice getUnOrderedDevice() {
        return unOrderedDevice;
    }

    public void setUnOrderedDevice(UnOrderedDevice unOrderedDevice) {
        this.unOrderedDevice = unOrderedDevice;
    }

    public String getOrderedDeviceStatus() {
        return orderedDeviceStatus;
    }

    public void setOrderedDeviceStatus(String orderedDeviceStatus) {
        this.orderedDeviceStatus = orderedDeviceStatus;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getVisibleId() {
        return visibleId;
    }

    public void setVisibleId(String visibleId) {
        this.visibleId = visibleId;
    }

    public List<ParentDevices> getParentDevices() {
        return parentDevices;
    }

    public void setParentDevices(List<ParentDevices> parentDevices) {
        this.parentDevices = parentDevices;
    }

    public List<ChildDevices> getChildDevices() {
        return childDevices;
    }

    public void setChildDevices(List<ChildDevices> childDevices) {
        this.childDevices = childDevices;
    }

    public String getDeviceTypeServicingOrRequestingOrOldAsInputting() {
        return deviceTypeServicingOrRequestingOrOldAsInputting;
    }

    public void setDeviceTypeServicingOrRequestingOrOldAsInputting(String deviceTypeServicingOrRequestingOrOldAsInputting) {
        this.deviceTypeServicingOrRequestingOrOldAsInputting = deviceTypeServicingOrRequestingOrOldAsInputting;
    }

    public String getDeviceTypePrimaryOrSecondary() {
        return deviceTypePrimaryOrSecondary;
    }

    public void setDeviceTypePrimaryOrSecondary(String deviceTypePrimaryOrSecondary) {
        this.deviceTypePrimaryOrSecondary = deviceTypePrimaryOrSecondary;
    }

    public String getDeviceTypeSecondaryInOrOut() {
        return deviceTypeSecondaryInOrOut;
    }

    public void setDeviceTypeSecondaryInOrOut(String deviceTypeSecondaryInOrOut) {
        this.deviceTypeSecondaryInOrOut = deviceTypeSecondaryInOrOut;
    }

    public Set<String> getListedChild() {
        return listedChild;
    }

    public void setListedChild(Set<String> listedChild) {
        this.listedChild = listedChild;
    }

    public Set<String> getAddAccessories() {
        return addAccessories;
    }

    public void setAddAccessories(Set<String> addAccessories) {
        this.addAccessories = addAccessories;
    }

    public Set<String> getExtractsNewComponents() {
        return extractsNewComponents;
    }

    public void setExtractsNewComponents(Set<String> extractsNewComponents) {
        this.extractsNewComponents = extractsNewComponents;
    }

    public Set<String> getExtractsOldComponents() {
        return extractsOldComponents;
    }

    public void setExtractsOldComponents(Set<String> extractsOldComponents) {
        this.extractsOldComponents = extractsOldComponents;
    }

    public Set<String> getListedComponents() {
        return listedComponents;
    }

    public void setListedComponents(Set<String> listedComponents) {
        this.listedComponents = listedComponents;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<DeviceUser> getDeviceUsers() {
        return deviceUsers;
    }

    public void setDeviceUsers(List<DeviceUser> deviceUsers) {
        this.deviceUsers = deviceUsers;
    }



    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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

    public Map<String, String> getAllData() {
        return allData;
    }

    public void setAllData(Map<String, String> allData) {
        this.allData = allData;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "AddData{" +
                "id='" + id + '\'' +
                ", userName='" + userName + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", date='" + date + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", allData=" + allData +
                ", status='" + status + '\'' +
                '}';
    }
    @Setter
    @Getter
    public static class UnOrderedDevice implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;
        private String COOUnOrderedDeviceAcceptingTime;
        private String COOUnOrderedDeviceAcceptedStatus;
        private String COOUnOrderedDeviceAcceptingManName;
        private String PurchaseUnOrderedDeviceExportedTime;
        private String PurchaseUnOrderedDeviceExportedManName;
        private String PurchaseUnOrderedDeviceExportedStatus;
        private String PurchaseUnOrderedDeviceSendPurchaseToInventoryTime;
        private String PurchaseUnOrderedDeviceSendPurchaseToInventoryManName;
        private String PurchaseUnOrderedDeviceSendPurchaseToInventoryStatus;
        private String InventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime;
        private String InventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName;
        private String extraDeviceExportingTime;
        private String extraDeviceExportingManName;
        private String extraDeviceExportingStatus;
        private String unWantedSendDeviceToInventoryStatus;
        private String unWantedSendDeviceToInventoryTime;
        private String unWantedSendDeviceToInventoryManInfo;
        private String unWantedReceiveDeviceInventoryManInfo;
        private String UnWantedReceiveDeviceInventoryTime;

        public UnOrderedDevice() {
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getCOOUnOrderedDeviceAcceptingTime() {
            return COOUnOrderedDeviceAcceptingTime;
        }

        public void setCOOUnOrderedDeviceAcceptingTime(String COOUnOrderedDeviceAcceptingTime) {
            this.COOUnOrderedDeviceAcceptingTime = COOUnOrderedDeviceAcceptingTime;
        }

        public String getCOOUnOrderedDeviceAcceptedStatus() {
            return COOUnOrderedDeviceAcceptedStatus;
        }

        public void setCOOUnOrderedDeviceAcceptedStatus(String COOUnOrderedDeviceAcceptedStatus) {
            this.COOUnOrderedDeviceAcceptedStatus = COOUnOrderedDeviceAcceptedStatus;
        }

        public String getCOOUnOrderedDeviceAcceptingManName() {
            return COOUnOrderedDeviceAcceptingManName;
        }

        public void setCOOUnOrderedDeviceAcceptingManName(String COOUnOrderedDeviceAcceptingManName) {
            this.COOUnOrderedDeviceAcceptingManName = COOUnOrderedDeviceAcceptingManName;
        }

        public String getPurchaseUnOrderedDeviceExportedTime() {
            return PurchaseUnOrderedDeviceExportedTime;
        }

        public void setPurchaseUnOrderedDeviceExportedTime(String purchaseUnOrderedDeviceExportedTime) {
            PurchaseUnOrderedDeviceExportedTime = purchaseUnOrderedDeviceExportedTime;
        }

        public String getPurchaseUnOrderedDeviceExportedManName() {
            return PurchaseUnOrderedDeviceExportedManName;
        }

        public void setPurchaseUnOrderedDeviceExportedManName(String purchaseUnOrderedDeviceExportedManName) {
            PurchaseUnOrderedDeviceExportedManName = purchaseUnOrderedDeviceExportedManName;
        }

        public String getPurchaseUnOrderedDeviceExportedStatus() {
            return PurchaseUnOrderedDeviceExportedStatus;
        }

        public void setPurchaseUnOrderedDeviceExportedStatus(String purchaseUnOrderedDeviceExportedStatus) {
            PurchaseUnOrderedDeviceExportedStatus = purchaseUnOrderedDeviceExportedStatus;
        }

        public String getPurchaseUnOrderedDeviceSendPurchaseToInventoryTime() {
            return PurchaseUnOrderedDeviceSendPurchaseToInventoryTime;
        }

        public void setPurchaseUnOrderedDeviceSendPurchaseToInventoryTime(String purchaseUnOrderedDeviceSendPurchaseToInventoryTime) {
            PurchaseUnOrderedDeviceSendPurchaseToInventoryTime = purchaseUnOrderedDeviceSendPurchaseToInventoryTime;
        }

        public String getPurchaseUnOrderedDeviceSendPurchaseToInventoryManName() {
            return PurchaseUnOrderedDeviceSendPurchaseToInventoryManName;
        }

        public void setPurchaseUnOrderedDeviceSendPurchaseToInventoryManName(String purchaseUnOrderedDeviceSendPurchaseToInventoryManName) {
            PurchaseUnOrderedDeviceSendPurchaseToInventoryManName = purchaseUnOrderedDeviceSendPurchaseToInventoryManName;
        }

        public String getPurchaseUnOrderedDeviceSendPurchaseToInventoryStatus() {
            return PurchaseUnOrderedDeviceSendPurchaseToInventoryStatus;
        }

        public void setPurchaseUnOrderedDeviceSendPurchaseToInventoryStatus(String purchaseUnOrderedDeviceSendPurchaseToInventoryStatus) {
            PurchaseUnOrderedDeviceSendPurchaseToInventoryStatus = purchaseUnOrderedDeviceSendPurchaseToInventoryStatus;
        }

        public String getInventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime() {
            return InventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime;
        }

        public void setInventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime(String inventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime) {
            InventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime = inventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime;
        }

        public String getInventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName() {
            return InventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName;
        }

        public void setInventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName(String inventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName) {
            InventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName = inventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName;
        }

        public String getExtraDeviceExportingTime() {
            return extraDeviceExportingTime;
        }

        public void setExtraDeviceExportingTime(String extraDeviceExportingTime) {
            this.extraDeviceExportingTime = extraDeviceExportingTime;
        }

        public String getExtraDeviceExportingManName() {
            return extraDeviceExportingManName;
        }

        public void setExtraDeviceExportingManName(String extraDeviceExportingManName) {
            this.extraDeviceExportingManName = extraDeviceExportingManName;
        }

        public String getExtraDeviceExportingStatus() {
            return extraDeviceExportingStatus;
        }

        public void setExtraDeviceExportingStatus(String extraDeviceExportingStatus) {
            this.extraDeviceExportingStatus = extraDeviceExportingStatus;
        }

        public String getUnWantedSendDeviceToInventoryStatus() {
            return unWantedSendDeviceToInventoryStatus;
        }

        public void setUnWantedSendDeviceToInventoryStatus(String unWantedSendDeviceToInventoryStatus) {
            this.unWantedSendDeviceToInventoryStatus = unWantedSendDeviceToInventoryStatus;
        }

        public String getUnWantedSendDeviceToInventoryTime() {
            return unWantedSendDeviceToInventoryTime;
        }

        public void setUnWantedSendDeviceToInventoryTime(String unWantedSendDeviceToInventoryTime) {
            this.unWantedSendDeviceToInventoryTime = unWantedSendDeviceToInventoryTime;
        }

        public String getUnWantedSendDeviceToInventoryManInfo() {
            return unWantedSendDeviceToInventoryManInfo;
        }

        public void setUnWantedSendDeviceToInventoryManInfo(String unWantedSendDeviceToInventoryManInfo) {
            this.unWantedSendDeviceToInventoryManInfo = unWantedSendDeviceToInventoryManInfo;
        }

        public String getUnWantedReceiveDeviceInventoryManInfo() {
            return unWantedReceiveDeviceInventoryManInfo;
        }

        public void setUnWantedReceiveDeviceInventoryManInfo(String unWantedReceiveDeviceInventoryManInfo) {
            this.unWantedReceiveDeviceInventoryManInfo = unWantedReceiveDeviceInventoryManInfo;
        }

        public String getUnWantedReceiveDeviceInventoryTime() {
            return UnWantedReceiveDeviceInventoryTime;
        }

        public void setUnWantedReceiveDeviceInventoryTime(String unWantedReceiveDeviceInventoryTime) {
            UnWantedReceiveDeviceInventoryTime = unWantedReceiveDeviceInventoryTime;
        }

        @Override
        public String toString() {
            return "UnOrderedDevice{" +
                    "id='" + id + '\'' +
                    ", COOUnOrderedDeviceAcceptingTime='" + COOUnOrderedDeviceAcceptingTime + '\'' +
                    ", COOUnOrderedDeviceAcceptedStatus='" + COOUnOrderedDeviceAcceptedStatus + '\'' +
                    ", COOUnOrderedDeviceAcceptingManName='" + COOUnOrderedDeviceAcceptingManName + '\'' +
                    ", PurchaseUnOrderedDeviceExportedTime='" + PurchaseUnOrderedDeviceExportedTime + '\'' +
                    ", PurchaseUnOrderedDeviceExportedManName='" + PurchaseUnOrderedDeviceExportedManName + '\'' +
                    ", PurchaseUnOrderedDeviceExportedStatus='" + PurchaseUnOrderedDeviceExportedStatus + '\'' +
                    ", PurchaseUnOrderedDeviceSendPurchaseToInventoryTime='" + PurchaseUnOrderedDeviceSendPurchaseToInventoryTime + '\'' +
                    ", PurchaseUnOrderedDeviceSendPurchaseToInventoryManName='" + PurchaseUnOrderedDeviceSendPurchaseToInventoryManName + '\'' +
                    ", PurchaseUnOrderedDeviceSendPurchaseToInventoryStatus='" + PurchaseUnOrderedDeviceSendPurchaseToInventoryStatus + '\'' +
                    ", InventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime='" + InventoryUnOrderedDeviceReceivedPurchaseFromInventoryTime + '\'' +
                    ", InventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName='" + InventoryUnOrderedDeviceReceivedPurchaseFromInventoryManName + '\'' +
                    ", extraDeviceExportingTime='" + extraDeviceExportingTime + '\'' +
                    ", extraDeviceExportingManName='" + extraDeviceExportingManName + '\'' +
                    ", extraDeviceExportingStatus='" + extraDeviceExportingStatus + '\'' +
                    ", unWantedSendDeviceToInventoryStatus='" + unWantedSendDeviceToInventoryStatus + '\'' +
                    ", unWantedSendDeviceToInventoryTime='" + unWantedSendDeviceToInventoryTime + '\'' +
                    ", unWantedSendDeviceToInventoryManInfo='" + unWantedSendDeviceToInventoryManInfo + '\'' +
                    ", unWantedReceiveDeviceInventoryManInfo='" + unWantedReceiveDeviceInventoryManInfo + '\'' +
                    ", UnWantedReceiveDeviceInventoryTime='" + UnWantedReceiveDeviceInventoryTime + '\'' +
                    '}';
        }
    }

    @Setter
    @Getter
    public static class ParentDevices implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;
        private String source;
        private String sourceType;
        private List<UsingTimeOfParentDevice> usingTimeOfParentDevices;

        public ParentDevices(String source, String sourceType) {
            this.source = source;
            this.sourceType = sourceType;
        }

        public String getSource() {
            return source;
        }

        public String getSourceType() {
            return sourceType;
        }

        public void setSource(String source) {
            this.source = source;
        }

        public void setSourceType(String sourceType) {
            this.sourceType = sourceType;
        }

        public List<UsingTimeOfParentDevice> getUsingTimeOfParentDevices() {
            return usingTimeOfParentDevices;
        }

        public void setUsingTimeOfParentDevices(List<UsingTimeOfParentDevice> usingTimeOfParentDevices) {
            this.usingTimeOfParentDevices = usingTimeOfParentDevices;
        }

        @Setter
        @Getter
        public static class UsingTimeOfParentDevice implements Serializable {
            private static final long serialVersionUID = 1L;
            private String startingDate;
            private String EndingDate;
            private String status;

            public UsingTimeOfParentDevice(String startingDate,  String status) {
                this.startingDate = startingDate;
                this.status = status;
            }

            public String getStartingDate() {
                return startingDate;
            }

            public void setStartingDate(String startingDate) {
                this.startingDate = startingDate;
            }

            public String getEndingDate() {
                return EndingDate;
            }

            public void setEndingDate(String endingDate) {
                EndingDate = endingDate;
            }

            public String getStatus() {
                return status;
            }

            public void setStatus(String status) {
                this.status = status;
            }
        }

    }
    @Setter
    @Getter
    public static class ChildDevices implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;
        private String deviceId;
        private List<UsingTimeOfChildDevice> usingTimeOfChildDevices;

        public ChildDevices(String deviceId) {
            this.deviceId = deviceId;
        }

        public String getDeviceId() {
            return deviceId;
        }

        public void setDeviceId(String deviceId) {
            this.deviceId = deviceId;
        }

        public List<UsingTimeOfChildDevice> getUsingTimeOfChildDevices() {
            return usingTimeOfChildDevices;
        }

        public void setUsingTimeOfChildDevices(List<UsingTimeOfChildDevice> usingTimeOfChildDevices) {
            this.usingTimeOfChildDevices = usingTimeOfChildDevices;
        }

        @Setter
        @Getter
        public static class UsingTimeOfChildDevice implements Serializable {
            private static final long serialVersionUID = 1L;
            private String startingDate;
            private String EndingDate;
            private String status;

            public UsingTimeOfChildDevice(String startingDate,  String status) {
                this.startingDate = startingDate;
                this.status = status;
            }

            public String getStartingDate() {
                return startingDate;
            }

            public void setStartingDate(String startingDate) {
                this.startingDate = startingDate;
            }

            public String getEndingDate() {
                return EndingDate;
            }

            public void setEndingDate(String endingDate) {
                EndingDate = endingDate;
            }

            public String getStatus() {
                return status;
            }

            public void setStatus(String status) {
                this.status = status;
            }
        }

    }

    @Setter
    @Getter
    public static class DeviceUser implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;
        private String departmentName;
        private String userName;
        private String userId;
        private String startingDate;
        private String EndingDate;
        private String status;

        public DeviceUser(String departmentName, String userName, String userId, String startingDate,  String status) {
            this.departmentName = departmentName;
            this.userName = userName;
            this.userId = userId;
            this.startingDate = startingDate;
            this.status = status;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getDepartmentName() {
            return departmentName;
        }

        public void setDepartmentName(String departmentName) {
            this.departmentName = departmentName;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getStartingDate() {
            return startingDate;
        }

        public void setStartingDate(String startingDate) {
            this.startingDate = startingDate;
        }

        public String getEndingDate() {
            return EndingDate;
        }

        public void setEndingDate(String endingDate) {
            EndingDate = endingDate;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        @Override
        public String toString() {
            return "DeviceUser{" +
                    "id='" + id + '\'' +
                    ", departmentName='" + departmentName + '\'' +
                    ", userName='" + userName + '\'' +
                    ", userId='" + userId + '\'' +
                    ", startingDate='" + startingDate + '\'' +
                    ", EndingDate='" + EndingDate + '\'' +
                    ", status='" + status + '\'' +
                    '}';
        }
    }



}
