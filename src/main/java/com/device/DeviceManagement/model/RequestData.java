package com.device.DeviceManagement.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Document(collection = "RequestData")
public class RequestData implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;

    private String departmentName;

    private String date;

    private String requestMode;

    private String presentTime;
    private  String visibleRequestId;
    private String cooAcceptedTime;
    private String cooDeviceRequestAcceptedManInfo;


    private Map<String, String> allData;

    private String status;

    private String deviceReceivedStatus;
    private String deviceReceivedTime;
    private String rejectCause;

    private Inventory inventory;
    private Purchase purchase;
    private  CustomerCare customerCare;


    // Default constructor
    public RequestData() {}
    public RequestData(RequestData other, String customId){
        this.id=customId;
        this.departmentName = other.departmentName;
        this.date = other.date;
        this.presentTime = other.presentTime;
        this.allData = other.allData;
        this.status = other.status;
        this.requestMode=other.requestMode;
        this.rejectCause=other.rejectCause;

        this.visibleRequestId=other.visibleRequestId;
        this.cooAcceptedTime=other.cooAcceptedTime;
        this.cooDeviceRequestAcceptedManInfo=other.cooDeviceRequestAcceptedManInfo;
        this.deviceReceivedStatus=other.deviceReceivedStatus;
        this.deviceReceivedTime=other.deviceReceivedTime;
        this.inventory=other.inventory;
        this.purchase=other.purchase;
        this.customerCare=other.customerCare;

    }

    public  RequestData(String requestId, RequestData other,String departmentName,String presentTime, String date,  Map<String, String> allData, String status,String requestMode,String rejectCause){
         this.id=requestId;
        this.departmentName = departmentName;
        this.date = date;
        this.presentTime = presentTime;
        this.allData = allData;
        this.status = status;
        this.requestMode=requestMode;
        this.rejectCause=rejectCause;

        this.visibleRequestId=other.visibleRequestId;
        this.cooAcceptedTime=other.cooAcceptedTime;
        this.cooDeviceRequestAcceptedManInfo=other.cooDeviceRequestAcceptedManInfo;
        this.deviceReceivedStatus=other.deviceReceivedStatus;
        this.deviceReceivedTime=other.deviceReceivedTime;
        this.inventory=other.inventory;
        this.purchase=other.purchase;
        this.customerCare=other.customerCare;


    }

    // Parameterized constructor
    public RequestData( String departmentName,String presentTime, String date,  Map<String, String> allData, String status,String requestMode,String rejectCause) {
        this.departmentName = departmentName;
        this.date = date;
        this.presentTime = presentTime;
        this.allData = allData;
        this.status = status;
        this.requestMode=requestMode;
        this.rejectCause=rejectCause;
    }

    public String getVisibleRequestId() {
        return visibleRequestId;
    }

    public void setVisibleRequestId(String visibleRequestId) {
        this.visibleRequestId = visibleRequestId;
    }

    public String getCooDeviceRequestAcceptedManInfo() {
        return cooDeviceRequestAcceptedManInfo;
    }

    public void setCooDeviceRequestAcceptedManInfo(String cooDeviceRequestAcceptedManInfo) {
        this.cooDeviceRequestAcceptedManInfo = cooDeviceRequestAcceptedManInfo;
    }

    public String getDeviceReceivedTime() {
        return deviceReceivedTime;
    }

    public void setDeviceReceivedTime(String deviceReceivedTime) {
        this.deviceReceivedTime = deviceReceivedTime;
    }

    public String getDeviceReceivedStatus() {
        return deviceReceivedStatus;
    }

    public void setDeviceReceivedStatus(String deviceReceivedStatus) {
        this.deviceReceivedStatus = deviceReceivedStatus;
    }

    public String getCooAcceptedTime() {
        return cooAcceptedTime;
    }

    public void setCooAcceptedTime(String cooAcceptedTime) {
        this.cooAcceptedTime = cooAcceptedTime;
    }

    public CustomerCare getCustomerCare() {
        return customerCare;
    }

    public void setCustomerCare(CustomerCare customerCare) {
        this.customerCare = customerCare;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public String getRejectCause() {
        return rejectCause;
    }

    public void setRejectCause(String rejectCause) {
        this.rejectCause = rejectCause;
    }

    public String getRequestMode() {
        return requestMode;
    }

    public void setRequestMode(String requestMode) {
        this.requestMode = requestMode;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
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
                ", departmentName='" + departmentName + '\'' +
                ", date='" + date + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", allData=" + allData +
                ", status='" + status + '\'' +
                '}';
    }
    @Setter
    @Getter
    public static class Inventory implements Serializable{
        private static final long serialVersionUID = 1L;
        @Id
        private String id;

        private String inventoryStatus;
        private String inventoryPurchaseRequestProviderManInfo;
        private String inventoryToPurchaseRequestStatus;
        private String inventoryToPurchaseRequestTime;

        private String inventoryToAlternativeDeviceRequestProviderManInfo;
        private String inventoryToAlternativeDeviceRequestStatus;
        private String inventoryToAlternativeDeviceRequestTime;

        private String inventoryToPurchaseRequestAcceptingManInfo;
        private String inventoryToPurchaseRequestAcceptingTime;
        private String inventoryToPurchaseRequestAcceptingAns;

        private String inventoryToAlternativeDeviceRequestAcceptingManInfo;
        private String inventoryToAlternativeDeviceRequestAcceptingTime;
        private String inventoryToAlternativeDeviceRequestAcceptingAns;

        private String cooAns;
        private String cooDeliveryAns;
        private String cooDeliveryRejectCauseAns;
        private String checkAvailability;
        private String deliveryMode;

        private String cooAcceptedTime;
        private String cooAcceptedDeliveryTime;
        private String deliveryTime;
        private String RequestTime;

        private String presentDateTime;
        private List<String> deviceIds;
        private String acceptedId;
        private String rejectedCause;

        private String inventoryToCustomerCareDeviceSendingTime;
        private String inventoryToCustomerCareDeviceSendingManInfo;
        private String inventoryToCustomerCareDeviceSendingStatus;

        private String inventoryToCustomerCareDeviceReceivingTime;
        private String inventoryToCustomerCareDeviceReceivingManInfo;


        public Inventory() {}

        public Inventory(String inventoryStatus, String presentDateTime, List<String> deviceIds) {
            this.inventoryStatus = inventoryStatus;
            this.presentDateTime = presentDateTime;
            this.deviceIds = deviceIds;
        }

        public String getInventoryToCustomerCareDeviceReceivingTime() {
            return inventoryToCustomerCareDeviceReceivingTime;
        }

        public void setInventoryToCustomerCareDeviceReceivingTime(String inventoryToCustomerCareDeviceReceivingTime) {
            this.inventoryToCustomerCareDeviceReceivingTime = inventoryToCustomerCareDeviceReceivingTime;
        }

        public String getInventoryToCustomerCareDeviceReceivingManInfo() {
            return inventoryToCustomerCareDeviceReceivingManInfo;
        }

        public void setInventoryToCustomerCareDeviceReceivingManInfo(String inventoryToCustomerCareDeviceReceivingManInfo) {
            this.inventoryToCustomerCareDeviceReceivingManInfo = inventoryToCustomerCareDeviceReceivingManInfo;
        }

        public String getInventoryToCustomerCareDeviceSendingTime() {
            return inventoryToCustomerCareDeviceSendingTime;
        }

        public void setInventoryToCustomerCareDeviceSendingTime(String inventoryToCustomerCareDeviceSendingTime) {
            this.inventoryToCustomerCareDeviceSendingTime = inventoryToCustomerCareDeviceSendingTime;
        }

        public String getInventoryToCustomerCareDeviceSendingManInfo() {
            return inventoryToCustomerCareDeviceSendingManInfo;
        }

        public void setInventoryToCustomerCareDeviceSendingManInfo(String inventoryToCustomerCareDeviceSendingManInfo) {
            this.inventoryToCustomerCareDeviceSendingManInfo = inventoryToCustomerCareDeviceSendingManInfo;
        }

        public String getInventoryToCustomerCareDeviceSendingStatus() {
            return inventoryToCustomerCareDeviceSendingStatus;
        }

        public void setInventoryToCustomerCareDeviceSendingStatus(String inventoryToCustomerCareDeviceSendingStatus) {
            this.inventoryToCustomerCareDeviceSendingStatus = inventoryToCustomerCareDeviceSendingStatus;
        }

        public String getInventoryToPurchaseRequestStatus() {
            return inventoryToPurchaseRequestStatus;
        }

        public void setInventoryToPurchaseRequestStatus(String inventoryToPurchaseRequestStatus) {
            this.inventoryToPurchaseRequestStatus = inventoryToPurchaseRequestStatus;
        }

        public String getInventoryToPurchaseRequestTime() {
            return inventoryToPurchaseRequestTime;
        }

        public void setInventoryToPurchaseRequestTime(String inventoryToPurchaseRequestTime) {
            this.inventoryToPurchaseRequestTime = inventoryToPurchaseRequestTime;
        }

        public String getInventoryToAlternativeDeviceRequestProviderManInfo() {
            return inventoryToAlternativeDeviceRequestProviderManInfo;
        }

        public void setInventoryToAlternativeDeviceRequestProviderManInfo(String inventoryToAlternativeDeviceRequestProviderManInfo) {
            this.inventoryToAlternativeDeviceRequestProviderManInfo = inventoryToAlternativeDeviceRequestProviderManInfo;
        }

        public String getInventoryToAlternativeDeviceRequestStatus() {
            return inventoryToAlternativeDeviceRequestStatus;
        }

        public void setInventoryToAlternativeDeviceRequestStatus(String inventoryToAlternativeDeviceRequestStatus) {
            this.inventoryToAlternativeDeviceRequestStatus = inventoryToAlternativeDeviceRequestStatus;
        }

        public String getInventoryToAlternativeDeviceRequestTime() {
            return inventoryToAlternativeDeviceRequestTime;
        }

        public void setInventoryToAlternativeDeviceRequestTime(String inventoryToAlternativeDeviceRequestTime) {
            this.inventoryToAlternativeDeviceRequestTime = inventoryToAlternativeDeviceRequestTime;
        }

        public String getInventoryToPurchaseRequestAcceptingManInfo() {
            return inventoryToPurchaseRequestAcceptingManInfo;
        }

        public void setInventoryToPurchaseRequestAcceptingManInfo(String inventoryToPurchaseRequestAcceptingManInfo) {
            this.inventoryToPurchaseRequestAcceptingManInfo = inventoryToPurchaseRequestAcceptingManInfo;
        }

        public String getInventoryToPurchaseRequestAcceptingTime() {
            return inventoryToPurchaseRequestAcceptingTime;
        }

        public void setInventoryToPurchaseRequestAcceptingTime(String inventoryToPurchaseRequestAcceptingTime) {
            this.inventoryToPurchaseRequestAcceptingTime = inventoryToPurchaseRequestAcceptingTime;
        }

        public String getInventoryToPurchaseRequestAcceptingAns() {
            return inventoryToPurchaseRequestAcceptingAns;
        }

        public void setInventoryToPurchaseRequestAcceptingAns(String inventoryToPurchaseRequestAcceptingAns) {
            this.inventoryToPurchaseRequestAcceptingAns = inventoryToPurchaseRequestAcceptingAns;
        }

        public String getInventoryToAlternativeDeviceRequestAcceptingManInfo() {
            return inventoryToAlternativeDeviceRequestAcceptingManInfo;
        }

        public void setInventoryToAlternativeDeviceRequestAcceptingManInfo(String inventoryToAlternativeDeviceRequestAcceptingManInfo) {
            this.inventoryToAlternativeDeviceRequestAcceptingManInfo = inventoryToAlternativeDeviceRequestAcceptingManInfo;
        }

        public String getInventoryToAlternativeDeviceRequestAcceptingTime() {
            return inventoryToAlternativeDeviceRequestAcceptingTime;
        }

        public void setInventoryToAlternativeDeviceRequestAcceptingTime(String inventoryToAlternativeDeviceRequestAcceptingTime) {
            this.inventoryToAlternativeDeviceRequestAcceptingTime = inventoryToAlternativeDeviceRequestAcceptingTime;
        }

        public String getInventoryToAlternativeDeviceRequestAcceptingAns() {
            return inventoryToAlternativeDeviceRequestAcceptingAns;
        }

        public void setInventoryToAlternativeDeviceRequestAcceptingAns(String inventoryToAlternativeDeviceRequestAcceptingAns) {
            this.inventoryToAlternativeDeviceRequestAcceptingAns = inventoryToAlternativeDeviceRequestAcceptingAns;
        }

        public String getInventoryPurchaseRequestProviderManInfo() {
            return inventoryPurchaseRequestProviderManInfo;
        }

        public void setInventoryPurchaseRequestProviderManInfo(String inventoryPurchaseRequestProviderManInfo) {
            this.inventoryPurchaseRequestProviderManInfo = inventoryPurchaseRequestProviderManInfo;
        }

        public String getInventoryStatus() {
            return inventoryStatus;
        }

        public void setInventoryStatus(String inventoryStatus) {
            this.inventoryStatus = inventoryStatus;
        }

        public String getPresentDateTime() {
            return presentDateTime;
        }

        public void setPresentDateTime(String presentDateTime) {
            this.presentDateTime = presentDateTime;
        }

        public List<String> getDeviceIds() {
            return deviceIds;
        }

        public void setDeviceIds(List<String> deviceIds) {
            this.deviceIds = deviceIds;
        }

        public String getCooAcceptedDeliveryTime() {
            return cooAcceptedDeliveryTime;
        }

        public void setCooAcceptedDeliveryTime(String cooAcceptedDeliveryTime) {
            this.cooAcceptedDeliveryTime = cooAcceptedDeliveryTime;
        }

        public String getCooAcceptedTime() {
            return cooAcceptedTime;
        }

        public void setCooAcceptedTime(String cooAcceptedTime) {
            this.cooAcceptedTime = cooAcceptedTime;
        }

        public String getDeliveryTime() {
            return deliveryTime;
        }

        public void setDeliveryTime(String deliveryTime) {
            this.deliveryTime = deliveryTime;
        }

        public String getRequestTime() {
            return RequestTime;
        }

        public void setRequestTime(String requestTime) {
            RequestTime = requestTime;
        }

        public String getCheckAvailability() {
            return checkAvailability;
        }

        public void setCheckAvailability(String checkAvailability) {
            this.checkAvailability = checkAvailability;
        }

        public String getCooDeliveryRejectCauseAns() {
            return cooDeliveryRejectCauseAns;
        }

        public void setCooDeliveryRejectCauseAns(String cooDeliveryRejectCauseAns) {
            this.cooDeliveryRejectCauseAns = cooDeliveryRejectCauseAns;
        }

        public String getCooDeliveryAns() {
            return cooDeliveryAns;
        }

        public void setCooDeliveryAns(String cooDeliveryAns) {
            this.cooDeliveryAns = cooDeliveryAns;
        }

        public String getDeliveryMode() {
            return deliveryMode;
        }

        public void setDeliveryMode(String deliveryMode) {
            this.deliveryMode = deliveryMode;
        }

        public String getCooAns() {
            return cooAns;
        }

        public void setCooAns(String cooAns) {
            this.cooAns = cooAns;
        }

        public String getAcceptedId() {
            return acceptedId;
        }

        public void setAcceptedId(String acceptedId) {
            this.acceptedId = acceptedId;
        }

        public String getRejectedCause() {
            return rejectedCause;
        }

        public void setRejectedCause(String rejectedCause) {
            this.rejectedCause = rejectedCause;
        }
    }

    @Setter
    @Getter
    public static class Purchase implements Serializable{
        private static final long serialVersionUID = 1L;
        @Id
        private String id;

        private String purchaseStatus;
        private String cooAns;
        private String cooPurchaseAcceptedAns;
        private String purchaseRequestProviderManInfo;

        private String cooAcceptedTime;
        private String cooPurchaseAcceptedTime;
        private String deliveryTime;
        private String RequestTime;

        private String deliveryMode;
        private String cooComment;
        private String presentDateTime;
        private List<String> links;
        private List<String> acceptedLinks;
        private String rejectedCause;
        private String purchaseRejectedCause;
        private String details;
        private String budget;
        private String cooPurchaseAcceptManInfo;

        private Map<String, String> deviceData;

        private  String purchasePaymentToCooRequestManInfo;
        private  String purchasePaymentToCooRequestTime;
        private  String purchasePaymentToCooRequestStatus;
        private  String purchasePaymentExportCount;

        private String purchasePaymentToCooAcceptManInfo;
        private  String purchasePaymentToCooAcceptingTime;
        private String deviceBuyingStatus;
        private  String buyingDeviceId;

        private String purchaseDeviceSenderToInventoryManInfo;
        private String purchaseDeviceSenderToInventoryStatus;
        private String purchaseDeviceSenderToInventoryTime;
        private String purchaseDeviceSenderToInventoryDeviceId;

        private String purchaseDeviceReceiverToInventoryManInfo;
        private String purchaseDeviceReceiverToInventoryTime;

        private String purchaseDeviceExportStatus;
        private  String purchaseDeviceExportManInfo;
        private  String purchaseDeviceExportTime;

        public Purchase() {}

        public Purchase(String purchaseStatus, String presentDateTime, List<String> links,String details,String budget) {
            this.purchaseStatus = purchaseStatus;
            this.presentDateTime = presentDateTime;
            this.links = links;
            this.details=details;
            this.budget=budget;
        }

        public String getPurchaseDeviceExportStatus() {
            return purchaseDeviceExportStatus;
        }

        public void setPurchaseDeviceExportStatus(String purchaseDeviceExportStatus) {
            this.purchaseDeviceExportStatus = purchaseDeviceExportStatus;
        }

        public String getPurchaseDeviceExportManInfo() {
            return purchaseDeviceExportManInfo;
        }

        public void setPurchaseDeviceExportManInfo(String purchaseDeviceExportManInfo) {
            this.purchaseDeviceExportManInfo = purchaseDeviceExportManInfo;
        }

        public String getPurchaseDeviceExportTime() {
            return purchaseDeviceExportTime;
        }

        public void setPurchaseDeviceExportTime(String purchaseDeviceExportTime) {
            this.purchaseDeviceExportTime = purchaseDeviceExportTime;
        }

        public String getPurchaseDeviceReceiverToInventoryManInfo() {
            return purchaseDeviceReceiverToInventoryManInfo;
        }

        public void setPurchaseDeviceReceiverToInventoryManInfo(String purchaseDeviceReceiverToInventoryManInfo) {
            this.purchaseDeviceReceiverToInventoryManInfo = purchaseDeviceReceiverToInventoryManInfo;
        }

        public String getPurchaseDeviceReceiverToInventoryTime() {
            return purchaseDeviceReceiverToInventoryTime;
        }

        public void setPurchaseDeviceReceiverToInventoryTime(String purchaseDeviceReceiverToInventoryTime) {
            this.purchaseDeviceReceiverToInventoryTime = purchaseDeviceReceiverToInventoryTime;
        }

        public String getPurchaseDeviceSenderToInventoryManInfo() {
            return purchaseDeviceSenderToInventoryManInfo;
        }

        public void setPurchaseDeviceSenderToInventoryManInfo(String purchaseDeviceSenderToInventoryManInfo) {
            this.purchaseDeviceSenderToInventoryManInfo = purchaseDeviceSenderToInventoryManInfo;
        }

        public String getPurchaseDeviceSenderToInventoryStatus() {
            return purchaseDeviceSenderToInventoryStatus;
        }

        public void setPurchaseDeviceSenderToInventoryStatus(String purchaseDeviceSenderToInventoryStatus) {
            this.purchaseDeviceSenderToInventoryStatus = purchaseDeviceSenderToInventoryStatus;
        }

        public String getPurchaseDeviceSenderToInventoryTime() {
            return purchaseDeviceSenderToInventoryTime;
        }

        public void setPurchaseDeviceSenderToInventoryTime(String purchaseDeviceSenderToInventoryTime) {
            this.purchaseDeviceSenderToInventoryTime = purchaseDeviceSenderToInventoryTime;
        }

        public String getPurchaseDeviceSenderToInventoryDeviceId() {
            return purchaseDeviceSenderToInventoryDeviceId;
        }

        public void setPurchaseDeviceSenderToInventoryDeviceId(String purchaseDeviceSenderToInventoryDeviceId) {
            this.purchaseDeviceSenderToInventoryDeviceId = purchaseDeviceSenderToInventoryDeviceId;
        }

        public String getDeviceBuyingStatus() {
            return deviceBuyingStatus;
        }

        public void setDeviceBuyingStatus(String deviceBuyingStatus) {
            this.deviceBuyingStatus = deviceBuyingStatus;
        }

        public String getBuyingDeviceId() {
            return buyingDeviceId;
        }

        public void setBuyingDeviceId(String buyingDeviceId) {
            this.buyingDeviceId = buyingDeviceId;
        }

        public List<String> getLinks() {
            return links;
        }

        public void setLinks(List<String> links) {
            this.links = links;
        }

        public String getPurchasePaymentToCooRequestManInfo() {
            return purchasePaymentToCooRequestManInfo;
        }

        public void setPurchasePaymentToCooRequestManInfo(String purchasePaymentToCooRequestManInfo) {
            this.purchasePaymentToCooRequestManInfo = purchasePaymentToCooRequestManInfo;
        }

        public String getPurchasePaymentToCooRequestTime() {
            return purchasePaymentToCooRequestTime;
        }

        public void setPurchasePaymentToCooRequestTime(String purchasePaymentToCooRequestTime) {
            this.purchasePaymentToCooRequestTime = purchasePaymentToCooRequestTime;
        }

        public String getPurchasePaymentToCooRequestStatus() {
            return purchasePaymentToCooRequestStatus;
        }

        public void setPurchasePaymentToCooRequestStatus(String purchasePaymentToCooRequestStatus) {
            this.purchasePaymentToCooRequestStatus = purchasePaymentToCooRequestStatus;
        }

        public String getPurchasePaymentExportCount() {
            return purchasePaymentExportCount;
        }

        public void setPurchasePaymentExportCount(String purchasePaymentExportCount) {
            this.purchasePaymentExportCount = purchasePaymentExportCount;
        }

        public String getPurchasePaymentToCooAcceptManInfo() {
            return purchasePaymentToCooAcceptManInfo;
        }

        public void setPurchasePaymentToCooAcceptManInfo(String purchasePaymentToCooAcceptManInfo) {
            this.purchasePaymentToCooAcceptManInfo = purchasePaymentToCooAcceptManInfo;
        }

        public String getPurchasePaymentToCooAcceptingTime() {
            return purchasePaymentToCooAcceptingTime;
        }

        public void setPurchasePaymentToCooAcceptingTime(String purchasePaymentToCooAcceptingTime) {
            this.purchasePaymentToCooAcceptingTime = purchasePaymentToCooAcceptingTime;
        }

        public String getDetails() {
            return details;
        }

        public void setDetails(String details) {
            this.details = details;
        }

        public String getBudget() {
            return budget;
        }

        public void setBudget(String budget) {
            this.budget = budget;
        }

        public String getCooPurchaseAcceptManInfo() {
            return cooPurchaseAcceptManInfo;
        }

        public void setCooPurchaseAcceptManInfo(String cooPurchaseAcceptManInfo) {
            this.cooPurchaseAcceptManInfo = cooPurchaseAcceptManInfo;
        }

        public String getPurchaseRequestProviderManInfo() {
            return purchaseRequestProviderManInfo;
        }

        public void setPurchaseRequestProviderManInfo(String purchaseRequestProviderManInfo) {
            this.purchaseRequestProviderManInfo = purchaseRequestProviderManInfo;
        }

        public String getPurchaseRejectedCause() {
            return purchaseRejectedCause;
        }

        public void setPurchaseRejectedCause(String purchaseRejectedCause) {
            this.purchaseRejectedCause = purchaseRejectedCause;
        }

        public String getCooPurchaseAcceptedTime() {
            return cooPurchaseAcceptedTime;
        }

        public void setCooPurchaseAcceptedTime(String cooPurchaseAcceptedTime) {
            this.cooPurchaseAcceptedTime = cooPurchaseAcceptedTime;
        }

        public String getCooPurchaseAcceptedAns() {
            return cooPurchaseAcceptedAns;
        }

        public void setCooPurchaseAcceptedAns(String cooPurchaseAcceptedAns) {
            this.cooPurchaseAcceptedAns = cooPurchaseAcceptedAns;
        }

        public Map<String, String> getDeviceData() {
            return deviceData;
        }

        public void setDeviceData(Map<String, String> deviceData) {
            this.deviceData = deviceData;
        }

        public String getCooAcceptedTime() {
            return cooAcceptedTime;
        }

        public void setCooAcceptedTime(String cooAcceptedTime) {
            this.cooAcceptedTime = cooAcceptedTime;
        }

        public String getDeliveryTime() {
            return deliveryTime;
        }

        public void setDeliveryTime(String deliveryTime) {
            this.deliveryTime = deliveryTime;
        }

        public String getRequestTime() {
            return RequestTime;
        }

        public void setRequestTime(String requestTime) {
            RequestTime = requestTime;
        }

        public String getDeliveryMode() {
            return deliveryMode;
        }

        public void setDeliveryMode(String deliveryMode) {
            this.deliveryMode = deliveryMode;
        }

        public String getPurchaseStatus() {
            return purchaseStatus;
        }

        public void setPurchaseStatus(String purchaseStatus) {
            this.purchaseStatus = purchaseStatus;
        }

        public String getCooComment() {
            return cooComment;
        }

        public void setCooComment(String cooComment) {
            this.cooComment = cooComment;
        }

        public String getCooAns() {
            return cooAns;
        }

        public void setCooAns(String cooAns) {
            this.cooAns = cooAns;
        }

        public List<String> getAcceptedLinks() {
            return acceptedLinks;
        }

        public void setAcceptedLinks(List<String> acceptedLinks) {
            this.acceptedLinks = acceptedLinks;
        }

        public String getRejectedCause() {
            return rejectedCause;
        }

        public void setRejectedCause(String rejectedCause) {
            this.rejectedCause = rejectedCause;
        }
    }

    @Setter
    @Getter
    public static class CustomerCare implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;

        private String cooAcceptedTime;
        private String deliveryTime;
        private String RequestTime;

        private String cooAns;
        private String customerCareStatus;
        private String deliveryMode;
        private String presentDateTime;
        private String cooComment;

        private String rejectedCause;
        private String customerCareToDepartmentDeviceSendingTime;
        private String customerCareToDepartmentDeviceSendingManInfo;
        private String customerCareToDepartmentDeviceSendingStatus;

        private  String departmentDeviceReceiverManInfo;
        private  String departmentDeviceReceiverTime;


        public CustomerCare() {
        }

        public String getDepartmentDeviceReceiverManInfo() {
            return departmentDeviceReceiverManInfo;
        }

        public void setDepartmentDeviceReceiverManInfo(String departmentDeviceReceiverManInfo) {
            this.departmentDeviceReceiverManInfo = departmentDeviceReceiverManInfo;
        }

        public String getDepartmentDeviceReceiverTime() {
            return departmentDeviceReceiverTime;
        }

        public void setDepartmentDeviceReceiverTime(String departmentDeviceReceiverTime) {
            this.departmentDeviceReceiverTime = departmentDeviceReceiverTime;
        }

        public CustomerCare(String customerCareStatus, String deliveryMode, String presentDateTime) {
            this.customerCareStatus = customerCareStatus;
            this.deliveryMode = deliveryMode;
            this.presentDateTime = presentDateTime;
        }

        public String getCustomerCareToDepartmentDeviceSendingTime() {
            return customerCareToDepartmentDeviceSendingTime;
        }

        public void setCustomerCareToDepartmentDeviceSendingTime(String customerCareToDepartmentDeviceSendingTime) {
            this.customerCareToDepartmentDeviceSendingTime = customerCareToDepartmentDeviceSendingTime;
        }

        public String getCustomerCareToDepartmentDeviceSendingManInfo() {
            return customerCareToDepartmentDeviceSendingManInfo;
        }

        public void setCustomerCareToDepartmentDeviceSendingManInfo(String customerCareToDepartmentDeviceSendingManInfo) {
            this.customerCareToDepartmentDeviceSendingManInfo = customerCareToDepartmentDeviceSendingManInfo;
        }

        public String getCustomerCareToDepartmentDeviceSendingStatus() {
            return customerCareToDepartmentDeviceSendingStatus;
        }

        public void setCustomerCareToDepartmentDeviceSendingStatus(String customerCareToDepartmentDeviceSendingStatus) {
            this.customerCareToDepartmentDeviceSendingStatus = customerCareToDepartmentDeviceSendingStatus;
        }

        public String getCooAcceptedTime() {
            return cooAcceptedTime;
        }

        public void setCooAcceptedTime(String cooAcceptedTime) {
            this.cooAcceptedTime = cooAcceptedTime;
        }

        public String getDeliveryTime() {
            return deliveryTime;
        }

        public void setDeliveryTime(String deliveryTime) {
            this.deliveryTime = deliveryTime;
        }

        public String getRequestTime() {
            return RequestTime;
        }

        public void setRequestTime(String requestTime) {
            RequestTime = requestTime;
        }

        public String getCustomerCareStatus() {
            return customerCareStatus;
        }

        public void setCustomerCareStatus(String customerCareStatus) {
            this.customerCareStatus = customerCareStatus;
        }

        public String getCooAns() {
            return cooAns;
        }

        public void setCooAns(String cooAns) {
            this.cooAns = cooAns;
        }

        public String getDeliveryMode() {
            return deliveryMode;
        }

        public void setDeliveryMode(String deliveryMode) {
            this.deliveryMode = deliveryMode;
        }

        public String getCooComment() {
            return cooComment;
        }

        public void setCooComment(String cooComment) {
            this.cooComment = cooComment;
        }

        public String getPresentDateTime() {
            return presentDateTime;
        }

        public void setPresentDateTime(String presentDateTime) {
            this.presentDateTime = presentDateTime;
        }

        public String getRejectedCause() {
            return rejectedCause;
        }

        public void setRejectedCause(String rejectedCause) {
            this.rejectedCause = rejectedCause;
        }
    }

}
