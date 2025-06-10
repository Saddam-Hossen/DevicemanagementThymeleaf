package com.device.DeviceManagement.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Document(collection = "ServiceRequest")
public class ServiceRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;


    private String departmentName;

    private String categoryName;

    private String date;
    private String status;

    private String presentTime;


    private  String visibleServiceId;
    private String customerCareServiceRequestAcceptedTime;

    private String customerCareServiceRequestStatus;
    private String serviceCenterServiceRequestAcceptedTime;

    private String serviceCenterServiceRequestStatus;
    private String cooAcceptOfServiceRequest;
    private String cooAcceptOfServiceRequestTime;
    private String proposalReceivingDateTime;
    private String userComment;
    private  String deviceId;
    private  String customerCareSendDeviceToServiceStatus;
    private  String customerCareSendDeviceToServiceTime;
    private  String serviceCenterRequestToInventoryForAccessoriesStatus;
    private  String serviceCenterRequestToInventoryForAccessoriesTime;
    private String customerCareReceiverInfoFromDepartment;
    private String customerCareSenderInfoToService;
    private String serviceCenterReceiverInfoFromCustomerCare;
    private String problemEditor;
    private String serviceReportGenerator;
    private String serviceAccessoriesSolutionProvider;

    private String cooManInfoOfAccessoriesSolutionAccept;

    private String  serviceReportStatus;
    private String  serviceReportTime;
    private List<Solution> serviceReportFormData;
    private Set<String> addAccessories;
    private Set<String> extractsNewComponents;
    private Set<String> extractsOldComponents;
    private Set<String> listedComponents;

    private String  cooServiceReportAcceptStatus;
    private String  cooServiceReportAcceptTime;
    private String  cooServiceReportComment;

    private String serviceCenterManInfoForDeliveryToCustomerCare;
    private String serviceCenterToCustomerCareStatus;
    private String serviceCenterToCustomerCareTime;

    private String customerCareReceiveDeviceFromServiceStatus;
    private String customerCareReceiveDeviceFromServiceTime;
    private  String  customerCareManInfoOfReceivingDeviceFromService;

    private String customerCareManInfoForDeliveryToDepartment;
    private String customerCareToDepartmentStatus;
    private String customerCareToDepartmentTime;

    private String departmentReceiveDeviceFromCustomerCareStatus;
    private String departmentReceiveDeviceFromCustomerCareTime;
    private  String  departmentManInfoOfReceivingDeviceFromCustomerCare;

    private String distributeDeviceToUserStatus;
    private String distributeDeviceToUserTime;
    private String distributeDeviceToUserManInfo;



    private List<problems> allProblem;





    // Default constructor
    public ServiceRequest() {}

    public ServiceRequest(String visibleServiceId,String categoryName,String departmentName, String date, String presentTime, String userComment, String deviceId, List<problems> allProblem,List<Solution> allProblem1,String status, String proposalReceivingDateTime) {
        this.visibleServiceId=visibleServiceId;
        this.categoryName=categoryName;
        this.departmentName = departmentName;
        this.date = date;
        this.presentTime = presentTime;
        this.userComment = userComment;
        this.deviceId = deviceId;
        this.allProblem = allProblem;
        this.status=status;
        this.proposalReceivingDateTime=proposalReceivingDateTime;
        this.serviceReportFormData=allProblem1;
    }

    public String getVisibleServiceId() {
        return visibleServiceId;
    }

    public void setVisibleServiceId(String visibleServiceId) {
        this.visibleServiceId = visibleServiceId;
    }

    public String getDistributeDeviceToUserStatus() {
        return distributeDeviceToUserStatus;
    }

    public void setDistributeDeviceToUserStatus(String distributeDeviceToUserStatus) {
        this.distributeDeviceToUserStatus = distributeDeviceToUserStatus;
    }

    public String getDistributeDeviceToUserTime() {
        return distributeDeviceToUserTime;
    }

    public void setDistributeDeviceToUserTime(String distributeDeviceToUserTime) {
        this.distributeDeviceToUserTime = distributeDeviceToUserTime;
    }

    public String getDistributeDeviceToUserManInfo() {
        return distributeDeviceToUserManInfo;
    }

    public void setDistributeDeviceToUserManInfo(String distributeDeviceToUserManInfo) {
        this.distributeDeviceToUserManInfo = distributeDeviceToUserManInfo;
    }

    public String getDepartmentReceiveDeviceFromCustomerCareStatus() {
        return departmentReceiveDeviceFromCustomerCareStatus;
    }

    public void setDepartmentReceiveDeviceFromCustomerCareStatus(String departmentReceiveDeviceFromCustomerCareStatus) {
        this.departmentReceiveDeviceFromCustomerCareStatus = departmentReceiveDeviceFromCustomerCareStatus;
    }

    public String getDepartmentReceiveDeviceFromCustomerCareTime() {
        return departmentReceiveDeviceFromCustomerCareTime;
    }

    public void setDepartmentReceiveDeviceFromCustomerCareTime(String departmentReceiveDeviceFromCustomerCareTime) {
        this.departmentReceiveDeviceFromCustomerCareTime = departmentReceiveDeviceFromCustomerCareTime;
    }

    public String getDepartmentManInfoOfReceivingDeviceFromCustomerCare() {
        return departmentManInfoOfReceivingDeviceFromCustomerCare;
    }

    public void setDepartmentManInfoOfReceivingDeviceFromCustomerCare(String departmentManInfoOfReceivingDeviceFromCustomerCare) {
        this.departmentManInfoOfReceivingDeviceFromCustomerCare = departmentManInfoOfReceivingDeviceFromCustomerCare;
    }

    public String getCustomerCareManInfoForDeliveryToDepartment() {
        return customerCareManInfoForDeliveryToDepartment;
    }

    public void setCustomerCareManInfoForDeliveryToDepartment(String customerCareManInfoForDeliveryToDepartment) {
        this.customerCareManInfoForDeliveryToDepartment = customerCareManInfoForDeliveryToDepartment;
    }

    public String getCustomerCareToDepartmentStatus() {
        return customerCareToDepartmentStatus;
    }

    public void setCustomerCareToDepartmentStatus(String customerCareToDepartmentStatus) {
        this.customerCareToDepartmentStatus = customerCareToDepartmentStatus;
    }

    public String getCustomerCareToDepartmentTime() {
        return customerCareToDepartmentTime;
    }

    public void setCustomerCareToDepartmentTime(String customerCareToDepartmentTime) {
        this.customerCareToDepartmentTime = customerCareToDepartmentTime;
    }

    public String getCustomerCareReceiveDeviceFromServiceStatus() {
        return customerCareReceiveDeviceFromServiceStatus;
    }

    public void setCustomerCareReceiveDeviceFromServiceStatus(String customerCareReceiveDeviceFromServiceStatus) {
        this.customerCareReceiveDeviceFromServiceStatus = customerCareReceiveDeviceFromServiceStatus;
    }

    public String getCustomerCareReceiveDeviceFromServiceTime() {
        return customerCareReceiveDeviceFromServiceTime;
    }

    public void setCustomerCareReceiveDeviceFromServiceTime(String customerCareReceiveDeviceFromServiceTime) {
        this.customerCareReceiveDeviceFromServiceTime = customerCareReceiveDeviceFromServiceTime;
    }

    public String getCustomerCareManInfoOfReceivingDeviceFromService() {
        return customerCareManInfoOfReceivingDeviceFromService;
    }

    public void setCustomerCareManInfoOfReceivingDeviceFromService(String customerCareManInfoOfReceivingDeviceFromService) {
        this.customerCareManInfoOfReceivingDeviceFromService = customerCareManInfoOfReceivingDeviceFromService;
    }

    public String getServiceCenterManInfoForDeliveryToCustomerCare() {
        return serviceCenterManInfoForDeliveryToCustomerCare;
    }

    public void setServiceCenterManInfoForDeliveryToCustomerCare(String serviceCenterManInfoForDeliveryToCustomerCare) {
        this.serviceCenterManInfoForDeliveryToCustomerCare = serviceCenterManInfoForDeliveryToCustomerCare;
    }

    public String getServiceCenterToCustomerCareStatus() {
        return serviceCenterToCustomerCareStatus;
    }

    public void setServiceCenterToCustomerCareStatus(String serviceCenterToCustomerCareStatus) {
        this.serviceCenterToCustomerCareStatus = serviceCenterToCustomerCareStatus;
    }

    public String getServiceCenterToCustomerCareTime() {
        return serviceCenterToCustomerCareTime;
    }

    public void setServiceCenterToCustomerCareTime(String serviceCenterToCustomerCareTime) {
        this.serviceCenterToCustomerCareTime = serviceCenterToCustomerCareTime;
    }

    public String getCooServiceReportComment() {
        return cooServiceReportComment;
    }

    public void setCooServiceReportComment(String cooServiceReportComment) {
        this.cooServiceReportComment = cooServiceReportComment;
    }

    public String getCooServiceReportAcceptStatus() {
        return cooServiceReportAcceptStatus;
    }

    public void setCooServiceReportAcceptStatus(String cooServiceReportAcceptStatus) {
        this.cooServiceReportAcceptStatus = cooServiceReportAcceptStatus;
    }

    public String getCooServiceReportAcceptTime() {
        return cooServiceReportAcceptTime;
    }

    public void setCooServiceReportAcceptTime(String cooServiceReportAcceptTime) {
        this.cooServiceReportAcceptTime = cooServiceReportAcceptTime;
    }

    public String getServiceReportTime() {
        return serviceReportTime;
    }

    public void setServiceReportTime(String serviceReportTime) {
        this.serviceReportTime = serviceReportTime;
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

    public List<Solution> getServiceReportFormData() {
        return serviceReportFormData;
    }

    public void setServiceReportFormData(List<Solution> serviceReportFormData) {
        this.serviceReportFormData = serviceReportFormData;
    }

    public String getServiceReportStatus() {
        return serviceReportStatus;
    }

    public void setServiceReportStatus(String serviceReportStatus) {
        this.serviceReportStatus = serviceReportStatus;
    }



    public String getCooManInfoOfAccessoriesSolutionAccept() {
        return cooManInfoOfAccessoriesSolutionAccept;
    }

    public void setCooManInfoOfAccessoriesSolutionAccept(String cooManInfoOfAccessoriesSolutionAccept) {
        this.cooManInfoOfAccessoriesSolutionAccept = cooManInfoOfAccessoriesSolutionAccept;
    }

    public String getProblemEditor() {
        return problemEditor;
    }

    public void setProblemEditor(String problemEditor) {
        this.problemEditor = problemEditor;
    }

    public String getServiceReportGenerator() {
        return serviceReportGenerator;
    }

    public void setServiceReportGenerator(String serviceReportGenerator) {
        this.serviceReportGenerator = serviceReportGenerator;
    }

    public String getServiceAccessoriesSolutionProvider() {
        return serviceAccessoriesSolutionProvider;
    }

    public void setServiceAccessoriesSolutionProvider(String serviceAccessoriesSolutionProvider) {
        this.serviceAccessoriesSolutionProvider = serviceAccessoriesSolutionProvider;
    }

    public String getServiceCenterReceiverInfoFromCustomerCare() {
        return serviceCenterReceiverInfoFromCustomerCare;
    }

    public void setServiceCenterReceiverInfoFromCustomerCare(String serviceCenterReceiverInfoFromCustomerCare) {
        this.serviceCenterReceiverInfoFromCustomerCare = serviceCenterReceiverInfoFromCustomerCare;
    }

    public String getCustomerCareSenderInfoToService() {
        return customerCareSenderInfoToService;
    }

    public void setCustomerCareSenderInfoToService(String customerCareSenderInfoToService) {
        this.customerCareSenderInfoToService = customerCareSenderInfoToService;
    }

    public String getCustomerCareReceiverInfoFromDepartment() {
        return customerCareReceiverInfoFromDepartment;
    }

    public void setCustomerCareReceiverInfoFromDepartment(String customerCareReceiverInfoFromDepartment) {
        this.customerCareReceiverInfoFromDepartment = customerCareReceiverInfoFromDepartment;
    }

    public String getServiceCenterRequestToInventoryForAccessoriesStatus() {
        return serviceCenterRequestToInventoryForAccessoriesStatus;
    }

    public void setServiceCenterRequestToInventoryForAccessoriesStatus(String serviceCenterRequestToInventoryForAccessoriesStatus) {
        this.serviceCenterRequestToInventoryForAccessoriesStatus = serviceCenterRequestToInventoryForAccessoriesStatus;
    }

    public String getServiceCenterRequestToInventoryForAccessoriesTime() {
        return serviceCenterRequestToInventoryForAccessoriesTime;
    }

    public void setServiceCenterRequestToInventoryForAccessoriesTime(String serviceCenterRequestToInventoryForAccessoriesTime) {
        this.serviceCenterRequestToInventoryForAccessoriesTime = serviceCenterRequestToInventoryForAccessoriesTime;
    }

    public String getCustomerCareSendDeviceToServiceStatus() {
        return customerCareSendDeviceToServiceStatus;
    }

    public void setCustomerCareSendDeviceToServiceStatus(String customerCareSendDeviceToServiceStatus) {
        this.customerCareSendDeviceToServiceStatus = customerCareSendDeviceToServiceStatus;
    }

    public String getCustomerCareSendDeviceToServiceTime() {
        return customerCareSendDeviceToServiceTime;
    }

    public void setCustomerCareSendDeviceToServiceTime(String customerCareSendDeviceToServiceTime) {
        this.customerCareSendDeviceToServiceTime = customerCareSendDeviceToServiceTime;
    }

    public String getProposalReceivingDateTime() {
        return proposalReceivingDateTime;
    }

    public void setProposalReceivingDateTime(String proposalReceivingDateTime) {
        this.proposalReceivingDateTime = proposalReceivingDateTime;
    }

    public String getCooAcceptOfServiceRequest() {
        return cooAcceptOfServiceRequest;
    }

    public void setCooAcceptOfServiceRequest(String cooAcceptOfServiceRequest) {
        this.cooAcceptOfServiceRequest = cooAcceptOfServiceRequest;
    }

    public String getCooAcceptOfServiceRequestTime() {
        return cooAcceptOfServiceRequestTime;
    }

    public void setCooAcceptOfServiceRequestTime(String cooAcceptOfServiceRequestTime) {
        this.cooAcceptOfServiceRequestTime = cooAcceptOfServiceRequestTime;
    }

    public String getServiceCenterServiceRequestAcceptedTime() {
        return serviceCenterServiceRequestAcceptedTime;
    }

    public void setServiceCenterServiceRequestAcceptedTime(String serviceCenterServiceRequestAcceptedTime) {
        this.serviceCenterServiceRequestAcceptedTime = serviceCenterServiceRequestAcceptedTime;
    }

    public String getServiceCenterServiceRequestStatus() {
        return serviceCenterServiceRequestStatus;
    }

    public void setServiceCenterServiceRequestStatus(String serviceCenterServiceRequestStatus) {
        this.serviceCenterServiceRequestStatus = serviceCenterServiceRequestStatus;
    }

    public String getCustomerCareServiceRequestStatus() {
        return customerCareServiceRequestStatus;
    }

    public void setCustomerCareServiceRequestStatus(String customerCareServiceRequestStatus) {
        this.customerCareServiceRequestStatus = customerCareServiceRequestStatus;
    }

    public String getCustomerCareServiceRequestAcceptedTime() {
        return customerCareServiceRequestAcceptedTime;
    }

    public void setCustomerCareServiceRequestAcceptedTime(String customerCareServiceRequestAcceptedTime) {
        this.customerCareServiceRequestAcceptedTime = customerCareServiceRequestAcceptedTime;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public List<problems> getAllProblem() {
        return allProblem;
    }

    public void setAllProblem(List<problems> allProblem) {
        this.allProblem = allProblem;
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public String toString() {
        return "AddData{" +
                "id='" + id + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", date='" + date + '\'' +
                ", presentTime='" + presentTime + '\'' +
                ", allData=" + allProblem +
                '}';
    }



    @Setter
    @Getter
    public static class problems implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;
        private String name;
        private String status;

        private String time;
        private   List<ProposalSolutionItem> proposalSolution;

        public problems(){

        }


        public problems(String name, String status) {
            this.name = name;
            this.status = status;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public List<ProposalSolutionItem> getProposalSolution() {
            return proposalSolution;
        }

        public void setProposalSolution(List<ProposalSolutionItem> proposalSolution) {
            this.proposalSolution = proposalSolution;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
        @Setter
        @Getter
        public static class ProposalSolutionItem implements Serializable {
            private static final long serialVersionUID = 1L;
            private String name;
            private String value;
            private String category;
            private String price;
            private String action;
            private String comment;
            private String purchaseStatus;
            private String deliveryDate;
            private String  deviceManageType;
            private String inventoryToServiceCenterDeviceStatus;
            private String inventoryToServiceCenterDeviceTime;
            private String inventoryToServiceCenterDeviceReceiveTime;
            private String inventoryToServiceCenterDeviceId;
            private String inventoryManInfoSendingDeviceToServiceCenter;
            private  String serviceCenterManInfoReceivingDeviceOfInventory;

            private String purchaseManInfoOfPriceSetter;
            private String purchaseManInfoOfPriceSettingTime;
            private String purchaseManInfoOfPriceStatus;

            private String inventoryManInfoOfForPurchaseRequest;
            private String inventoryForPurchaseRequestTime;
            private String inventoryForPurchaseRequestStatus;

            private String cooManInfoOfPriceAcceptanceCommentSetter;
            private String cooManInfoOfPriceAcceptanceCommentSettingTime;
            private String cooManInfoOfPriceAcceptanceCommentStatus;

            private String serviceCenterManInfoToInventoryAccessoriesRequest;
            private String serviceCenterToInventoryAccessoriesRequestTime;
            private String serviceCenterToInventoryAccessoriesRequestStatus;


            private String purchaseProposalToCooManInfo;
            private String purchaseProposalToCooAns;
            private String purchaseProposalToCooComment;
            private String purchaseProposalToCooBudget;
            private List<String> purchaseProposalToCooLinks;
            private List<String> purchaseProposalToCooAcceptedLinks;
            private String purchaseProposalToCooRejectedCause;
            private String purchaseProposalToCooDetails;
            private String purchaseProposalToCooProposalStatus;
            private String purchaseProposalToCooTime;
            private String purchaseProposalToCooAcceptedTime;
            private String purchaseProposalCooAcceptedManInfo;
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
            // Default constructor
            public ProposalSolutionItem() {
                this.price = "0";
                this.action = " ";
                this.comment = " ";
            }

            public String getDeviceManageType() {
                return deviceManageType;
            }

            public void setDeviceManageType(String deviceManageType) {
                this.deviceManageType = deviceManageType;
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

            public String getPurchaseProposalCooAcceptedManInfo() {
                return purchaseProposalCooAcceptedManInfo;
            }

            public void setPurchaseProposalCooAcceptedManInfo(String purchaseProposalCooAcceptedManInfo) {
                this.purchaseProposalCooAcceptedManInfo = purchaseProposalCooAcceptedManInfo;
            }

            public String getPurchaseProposalToCooAcceptedTime() {
                return purchaseProposalToCooAcceptedTime;
            }

            public void setPurchaseProposalToCooAcceptedTime(String purchaseProposalToCooAcceptedTime) {
                this.purchaseProposalToCooAcceptedTime = purchaseProposalToCooAcceptedTime;
            }

            public String getPurchaseProposalToCooComment() {
                return purchaseProposalToCooComment;
            }

            public void setPurchaseProposalToCooComment(String purchaseProposalToCooComment) {
                this.purchaseProposalToCooComment = purchaseProposalToCooComment;
            }

            public String getPurchaseProposalToCooTime() {
                return purchaseProposalToCooTime;
            }

            public void setPurchaseProposalToCooTime(String purchaseProposalToCooTime) {
                this.purchaseProposalToCooTime = purchaseProposalToCooTime;
            }

            public String getPurchaseProposalToCooProposalStatus() {
                return purchaseProposalToCooProposalStatus;
            }

            public void setPurchaseProposalToCooProposalStatus(String purchaseProposalToCooProposalStatus) {
                this.purchaseProposalToCooProposalStatus = purchaseProposalToCooProposalStatus;
            }

            public String getPurchaseProposalToCooManInfo() {
                return purchaseProposalToCooManInfo;
            }

            public void setPurchaseProposalToCooManInfo(String purchaseProposalToCooManInfo) {
                this.purchaseProposalToCooManInfo = purchaseProposalToCooManInfo;
            }

            public String getPurchaseProposalToCooAns() {
                return purchaseProposalToCooAns;
            }

            public void setPurchaseProposalToCooAns(String purchaseProposalToCooAns) {
                this.purchaseProposalToCooAns = purchaseProposalToCooAns;
            }

            public String getPurchaseProposalToCooBudget() {
                return purchaseProposalToCooBudget;
            }

            public void setPurchaseProposalToCooBudget(String purchaseProposalToCooBudget) {
                this.purchaseProposalToCooBudget = purchaseProposalToCooBudget;
            }

            public List<String> getPurchaseProposalToCooLinks() {
                return purchaseProposalToCooLinks;
            }

            public void setPurchaseProposalToCooLinks(List<String> purchaseProposalToCooLinks) {
                this.purchaseProposalToCooLinks = purchaseProposalToCooLinks;
            }

            public List<String> getPurchaseProposalToCooAcceptedLinks() {
                return purchaseProposalToCooAcceptedLinks;
            }

            public void setPurchaseProposalToCooAcceptedLinks(List<String> purchaseProposalToCooAcceptedLinks) {
                this.purchaseProposalToCooAcceptedLinks = purchaseProposalToCooAcceptedLinks;
            }

            public String getPurchaseProposalToCooRejectedCause() {
                return purchaseProposalToCooRejectedCause;
            }

            public void setPurchaseProposalToCooRejectedCause(String purchaseProposalToCooRejectedCause) {
                this.purchaseProposalToCooRejectedCause = purchaseProposalToCooRejectedCause;
            }

            public String getPurchaseProposalToCooDetails() {
                return purchaseProposalToCooDetails;
            }

            public void setPurchaseProposalToCooDetails(String purchaseProposalToCooDetails) {
                this.purchaseProposalToCooDetails = purchaseProposalToCooDetails;
            }

            public String getInventoryManInfoOfForPurchaseRequest() {
                return inventoryManInfoOfForPurchaseRequest;
            }

            public void setInventoryManInfoOfForPurchaseRequest(String inventoryManInfoOfForPurchaseRequest) {
                this.inventoryManInfoOfForPurchaseRequest = inventoryManInfoOfForPurchaseRequest;
            }

            public String getInventoryForPurchaseRequestTime() {
                return inventoryForPurchaseRequestTime;
            }

            public void setInventoryForPurchaseRequestTime(String inventoryForPurchaseRequestTime) {
                this.inventoryForPurchaseRequestTime = inventoryForPurchaseRequestTime;
            }

            public String getInventoryForPurchaseRequestStatus() {
                return inventoryForPurchaseRequestStatus;
            }

            public void setInventoryForPurchaseRequestStatus(String inventoryForPurchaseRequestStatus) {
                this.inventoryForPurchaseRequestStatus = inventoryForPurchaseRequestStatus;
            }

            public String getServiceCenterManInfoToInventoryAccessoriesRequest() {
                return serviceCenterManInfoToInventoryAccessoriesRequest;
            }

            public void setServiceCenterManInfoToInventoryAccessoriesRequest(String serviceCenterManInfoToInventoryAccessoriesRequest) {
                this.serviceCenterManInfoToInventoryAccessoriesRequest = serviceCenterManInfoToInventoryAccessoriesRequest;
            }

            public String getServiceCenterToInventoryAccessoriesRequestTime() {
                return serviceCenterToInventoryAccessoriesRequestTime;
            }

            public void setServiceCenterToInventoryAccessoriesRequestTime(String serviceCenterToInventoryAccessoriesRequestTime) {
                this.serviceCenterToInventoryAccessoriesRequestTime = serviceCenterToInventoryAccessoriesRequestTime;
            }

            public String getServiceCenterToInventoryAccessoriesRequestStatus() {
                return serviceCenterToInventoryAccessoriesRequestStatus;
            }

            public void setServiceCenterToInventoryAccessoriesRequestStatus(String serviceCenterToInventoryAccessoriesRequestStatus) {
                this.serviceCenterToInventoryAccessoriesRequestStatus = serviceCenterToInventoryAccessoriesRequestStatus;
            }

            public String getCooManInfoOfPriceAcceptanceCommentSetter() {
                return cooManInfoOfPriceAcceptanceCommentSetter;
            }

            public void setCooManInfoOfPriceAcceptanceCommentSetter(String cooManInfoOfPriceAcceptanceCommentSetter) {
                this.cooManInfoOfPriceAcceptanceCommentSetter = cooManInfoOfPriceAcceptanceCommentSetter;
            }

            public String getCooManInfoOfPriceAcceptanceCommentSettingTime() {
                return cooManInfoOfPriceAcceptanceCommentSettingTime;
            }

            public void setCooManInfoOfPriceAcceptanceCommentSettingTime(String cooManInfoOfPriceAcceptanceCommentSettingTime) {
                this.cooManInfoOfPriceAcceptanceCommentSettingTime = cooManInfoOfPriceAcceptanceCommentSettingTime;
            }

            public String getCooManInfoOfPriceAcceptanceCommentStatus() {
                return cooManInfoOfPriceAcceptanceCommentStatus;
            }

            public void setCooManInfoOfPriceAcceptanceCommentStatus(String cooManInfoOfPriceAcceptanceCommentStatus) {
                this.cooManInfoOfPriceAcceptanceCommentStatus = cooManInfoOfPriceAcceptanceCommentStatus;
            }

            public String getPurchaseManInfoOfPriceSetter() {
                return purchaseManInfoOfPriceSetter;
            }

            public void setPurchaseManInfoOfPriceSetter(String purchaseManInfoOfPriceSetter) {
                this.purchaseManInfoOfPriceSetter = purchaseManInfoOfPriceSetter;
            }

            public String getPurchaseManInfoOfPriceSettingTime() {
                return purchaseManInfoOfPriceSettingTime;
            }

            public void setPurchaseManInfoOfPriceSettingTime(String purchaseManInfoOfPriceSettingTime) {
                this.purchaseManInfoOfPriceSettingTime = purchaseManInfoOfPriceSettingTime;
            }

            public String getPurchaseManInfoOfPriceStatus() {
                return purchaseManInfoOfPriceStatus;
            }

            public void setPurchaseManInfoOfPriceStatus(String purchaseManInfoOfPriceStatus) {
                this.purchaseManInfoOfPriceStatus = purchaseManInfoOfPriceStatus;
            }

            public String getInventoryManInfoSendingDeviceToServiceCenter() {
                return inventoryManInfoSendingDeviceToServiceCenter;
            }

            public void setInventoryManInfoSendingDeviceToServiceCenter(String inventoryManInfoSendingDeviceToServiceCenter) {
                this.inventoryManInfoSendingDeviceToServiceCenter = inventoryManInfoSendingDeviceToServiceCenter;
            }

            public String getServiceCenterManInfoReceivingDeviceOfInventory() {
                return serviceCenterManInfoReceivingDeviceOfInventory;
            }

            public void setServiceCenterManInfoReceivingDeviceOfInventory(String serviceCenterManInfoReceivingDeviceOfInventory) {
                this.serviceCenterManInfoReceivingDeviceOfInventory = serviceCenterManInfoReceivingDeviceOfInventory;
            }

            // Parameterized constructor
            public ProposalSolutionItem(String name, String value, String price, String action, String comment) {
                this.name = name;
                this.value = value;
                this.price = price != null ? price : "0";
                this.action = action != null ? action : " ";
                this.comment = comment != null ? comment : " ";
            }

            public String getInventoryToServiceCenterDeviceReceiveTime() {
                return inventoryToServiceCenterDeviceReceiveTime;
            }

            public void setInventoryToServiceCenterDeviceReceiveTime(String inventoryToServiceCenterDeviceReceiveTime) {
                this.inventoryToServiceCenterDeviceReceiveTime = inventoryToServiceCenterDeviceReceiveTime;
            }

            public String getInventoryToServiceCenterDeviceId() {
                return inventoryToServiceCenterDeviceId;
            }

            public void setInventoryToServiceCenterDeviceId(String inventoryToServiceCenterDeviceId) {
                this.inventoryToServiceCenterDeviceId = inventoryToServiceCenterDeviceId;
            }

            public String getInventoryToServiceCenterDeviceStatus() {
                return inventoryToServiceCenterDeviceStatus;
            }

            public void setInventoryToServiceCenterDeviceStatus(String inventoryToServiceCenterDeviceStatus) {
                this.inventoryToServiceCenterDeviceStatus = inventoryToServiceCenterDeviceStatus;
            }

            public String getInventoryToServiceCenterDeviceTime() {
                return inventoryToServiceCenterDeviceTime;
            }

            public void setInventoryToServiceCenterDeviceTime(String inventoryToServiceCenterDeviceTime) {
                this.inventoryToServiceCenterDeviceTime = inventoryToServiceCenterDeviceTime;
            }

            public String getDeliveryDate() {
                return deliveryDate;
            }

            public void setDeliveryDate(String deliveryDate) {
                this.deliveryDate = deliveryDate;
            }

            public String getCategory() {
                return category;
            }

            public void setCategory(String category) {
                this.category = category;
            }

            public String getPurchaseStatus() {
                return purchaseStatus;
            }

            public void setPurchaseStatus(String purchaseStatus) {
                this.purchaseStatus = purchaseStatus;
            }

            // Getters and Setters
            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getValue() {
                return value;
            }

            public void setValue(String value) {
                this.value = value;
            }

            public String getPrice() {
                return price;
            }

            public void setPrice(String price) {
                this.price = price != null ? price : "0";
            }

            public String getAction() {
                return action;
            }

            public void setAction(String action) {
                this.action = action != null ? action : " ";
            }

            public String getComment() {
                return comment;
            }

            public void setComment(String comment) {
                this.comment = comment != null ? comment : " ";
            }

            @Override
            public String toString() {
                return "ProposalSolutionItem{" +
                        "name='" + name + '\'' +
                        ", value='" + value + '\'' +
                        ", price='" + price + '\'' +
                        ", action='" + action + '\'' +
                        ", comment='" + comment + '\'' +
                        '}';
            }
        }

    }
    @Setter
    @Getter
    public static class Solution implements Serializable {
        private static final long serialVersionUID = 1L;
        @Id
        private String id;
        private String name;
        private String status;

        private String time;
        private   List<ProposalSolutionItem> proposalSolution;

        public Solution(){

        }


        public Solution(String name, String status) {
            this.name = name;
            this.status = status;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public List<ProposalSolutionItem> getProposalSolution() {
            return proposalSolution;
        }

        public void setProposalSolution(List<ProposalSolutionItem> proposalSolution) {
            this.proposalSolution = proposalSolution;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
        @Setter
        @Getter
        public static class ProposalSolutionItem implements Serializable {
            private static final long serialVersionUID = 1L;
            private String name;
            private String value;
            private String category;
            private String price;
            private String action;
            private String comment;
            private String purchaseStatus;
            private String deliveryDate;
            private String inventoryToServiceCenterDeviceStatus;
            private String inventoryToServiceCenterDeviceTime;
            private String inventoryToServiceCenterDeviceReceiveTime;
            private String inventoryToServiceCenterDeviceId;
            private String inventoryManInfoSendingDeviceToServiceCenter;
            private  String serviceCenterManInfoReceivingDeviceOfInventory;
            // Default constructor
            public ProposalSolutionItem() {
                this.price = "0";
                this.action = " ";
                this.comment = " ";
            }

            public String getInventoryManInfoSendingDeviceToServiceCenter() {
                return inventoryManInfoSendingDeviceToServiceCenter;
            }

            public void setInventoryManInfoSendingDeviceToServiceCenter(String inventoryManInfoSendingDeviceToServiceCenter) {
                this.inventoryManInfoSendingDeviceToServiceCenter = inventoryManInfoSendingDeviceToServiceCenter;
            }

            public String getServiceCenterManInfoReceivingDeviceOfInventory() {
                return serviceCenterManInfoReceivingDeviceOfInventory;
            }

            public void setServiceCenterManInfoReceivingDeviceOfInventory(String serviceCenterManInfoReceivingDeviceOfInventory) {
                this.serviceCenterManInfoReceivingDeviceOfInventory = serviceCenterManInfoReceivingDeviceOfInventory;
            }

            // Parameterized constructor
            public ProposalSolutionItem(String name, String value, String price, String action, String comment) {
                this.name = name;
                this.value = value;
                this.price = price != null ? price : "0";
                this.action = action != null ? action : " ";
                this.comment = comment != null ? comment : " ";
            }

            public String getInventoryToServiceCenterDeviceReceiveTime() {
                return inventoryToServiceCenterDeviceReceiveTime;
            }

            public void setInventoryToServiceCenterDeviceReceiveTime(String inventoryToServiceCenterDeviceReceiveTime) {
                this.inventoryToServiceCenterDeviceReceiveTime = inventoryToServiceCenterDeviceReceiveTime;
            }

            public String getInventoryToServiceCenterDeviceId() {
                return inventoryToServiceCenterDeviceId;
            }

            public void setInventoryToServiceCenterDeviceId(String inventoryToServiceCenterDeviceId) {
                this.inventoryToServiceCenterDeviceId = inventoryToServiceCenterDeviceId;
            }

            public String getInventoryToServiceCenterDeviceStatus() {
                return inventoryToServiceCenterDeviceStatus;
            }

            public void setInventoryToServiceCenterDeviceStatus(String inventoryToServiceCenterDeviceStatus) {
                this.inventoryToServiceCenterDeviceStatus = inventoryToServiceCenterDeviceStatus;
            }

            public String getInventoryToServiceCenterDeviceTime() {
                return inventoryToServiceCenterDeviceTime;
            }

            public void setInventoryToServiceCenterDeviceTime(String inventoryToServiceCenterDeviceTime) {
                this.inventoryToServiceCenterDeviceTime = inventoryToServiceCenterDeviceTime;
            }

            public String getDeliveryDate() {
                return deliveryDate;
            }

            public void setDeliveryDate(String deliveryDate) {
                this.deliveryDate = deliveryDate;
            }

            public String getCategory() {
                return category;
            }

            public void setCategory(String category) {
                this.category = category;
            }

            public String getPurchaseStatus() {
                return purchaseStatus;
            }

            public void setPurchaseStatus(String purchaseStatus) {
                this.purchaseStatus = purchaseStatus;
            }

            // Getters and Setters
            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getValue() {
                return value;
            }

            public void setValue(String value) {
                this.value = value;
            }

            public String getPrice() {
                return price;
            }

            public void setPrice(String price) {
                this.price = price != null ? price : "0";
            }

            public String getAction() {
                return action;
            }

            public void setAction(String action) {
                this.action = action != null ? action : " ";
            }

            public String getComment() {
                return comment;
            }

            public void setComment(String comment) {
                this.comment = comment != null ? comment : " ";
            }

            @Override
            public String toString() {
                return "ProposalSolutionItem{" +
                        "name='" + name + '\'' +
                        ", value='" + value + '\'' +
                        ", price='" + price + '\'' +
                        ", action='" + action + '\'' +
                        ", comment='" + comment + '\'' +
                        '}';
            }
        }

    }


}
