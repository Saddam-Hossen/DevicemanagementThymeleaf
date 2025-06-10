package com.device.DeviceManagement.controller.customerCare;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.AddData;
import com.device.DeviceManagement.model.RequestData;
import com.device.DeviceManagement.model.ServiceRequest;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Controller
@RequestMapping("/customerCare")
public class customerCare {
    @Autowired
    private RequestDataRepository requestDataRepository;
    @Autowired
    private BranchUserRepository branchUserRepository;
    @Autowired
    private RequestColumnRepository requestColumnRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ColumnRepository columnRepository;
    @Autowired
    private AddDataRepository addDataRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;

    @Autowired
    private  ServiceRequestRepository serviceRequestRepository;


    @Autowired
    private CategoriesService categoriesService;
    @Autowired
    private IndividualColumnsService individualColumnsService;
    @Autowired
    private UniversalColumnsService universalColumnsService;
    @Autowired
    private AddDataService addDataService;
    @Autowired
    private BranchUserService branchUserService;
    @Autowired
    private InternalUserService internalUserService;
    @Autowired
    private DesignationService designationService;
    @Autowired
    private  DropDownListService dropDownListService;
    @Autowired
    private  RequestColumnService requestColumnService;
    @Autowired
    private RequestDataService requestDataService;
    @Autowired
    private  ServiceRequestService serviceRequestService;
    @Autowired
    private UserService userService;

    @PostMapping("/approveCustomerCareRequestStatus")
    @ResponseBody
    public ResponseEntity<String> deliverRequestStatus(@RequestParam String requestId, @RequestParam String status) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();
            RequestData.CustomerCare customerCare = new RequestData.CustomerCare();
            customerCare.setCustomerCareStatus("Proposal");
            customerCare.setCooAns("Pending");

            requestData.setCustomerCare(customerCare);

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }

    @PostMapping("/setDeliveryMode")
    @ResponseBody
    public ResponseEntity<String> setDeliveryMode(@RequestParam String requestId, @RequestParam String status) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();


            // Update the inventory with the new deviceIds
            RequestData.CustomerCare customerCare = new RequestData.CustomerCare();
            customerCare.setDeliveryMode("Delivered");
            customerCare.setDeliveryTime(getCurrentLocalDateTime());
            requestData.setCustomerCare(customerCare);
            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }

    @PostMapping("/setServiceRequestAccept")
    @ResponseBody
    public ResponseEntity<String> setServiceRequestAccept(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {

        // Logging for debugging
        System.out.println("Service ID: " + serviceId);
        System.out.println("Status: " + status);
        System.out.println("Department Name: " + departmentName);
        System.out.println("Department User Name: " + departmentUserName);
        System.out.println("Department User ID: " + departmentUserId);

        // Find the ServiceRequest document by serviceId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setCustomerCareServiceRequestStatus(status);
            requestData.setCustomerCareReceiverInfoFromDepartment(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setCustomerCareServiceRequestAcceptedTime(getCurrentLocalDateTime());

            String deviceId=requestData.getDeviceId();
            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
            deviceRequestData.setUserName(departmentName);
            List<AddData.DeviceUser> list=deviceRequestData.getDeviceUsers();
            list.forEach(e->{
                System.out.println(e.toString());
                if(e.getStatus().equals("1")){
                    // update EndingDate
                    e.setEndingDate(getCurrentDateTime());
                    e.setStatus("0");
                }

            });
            // add new device user
            list.add(new AddData.DeviceUser(departmentName,departmentUserName,departmentUserId,getCurrentDateTime(),"1"));

            addDataRepository.save(deviceRequestData);
            // Save the updated document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
            addDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with serviceId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }

    @PostMapping("/setServiceRequestFromCustomerCareToService")
    @ResponseBody
    public ResponseEntity<String> setServiceRequestFromCustomerCareToService(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {

        // Find the RequestData document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setCustomerCareSendDeviceToServiceStatus(status);
            requestData.setCustomerCareSenderInfoToService(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setCustomerCareSendDeviceToServiceTime(getCurrentLocalDateTime());

            String deviceId=requestData.getDeviceId();
            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");

            List<AddData.DeviceUser> list=deviceRequestData.getDeviceUsers();
            list.forEach(e->{
                System.out.println(e.toString());
                if(e.getStatus().equals("1")){
                    // update EndingDate
                    e.setEndingDate(getCurrentDateTime());
                    e.setStatus("0");
                }

            });
            // add new device user
            list.add(new AddData.DeviceUser(departmentName,departmentUserName,departmentUserId,getCurrentDateTime(),"1"));

            addDataRepository.save(deviceRequestData);

            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
            addDataService.update();

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/setReceiveDeviceFromService")
    @ResponseBody
    public ResponseEntity<String> setReceiveDeviceFromService(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {

        // Find the RequestData document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();

            requestData.setCustomerCareReceiveDeviceFromServiceStatus(status);
            requestData.setCustomerCareManInfoOfReceivingDeviceFromService(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setCustomerCareReceiveDeviceFromServiceTime(getCurrentLocalDateTime());

            String deviceId = requestData.getDeviceId();
            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
            if (deviceRequestData != null) {
                deviceRequestData.setUserName(departmentName);
                List<AddData.DeviceUser> list = deviceRequestData.getDeviceUsers();
                list.forEach(e -> {
                    if (e.getStatus().equals("1")) {
                        e.setEndingDate(getCurrentDateTime());
                        e.setStatus("0");
                    }
                });
                // Add new device user
                list.add(new AddData.DeviceUser(departmentName, departmentUserName, departmentUserId, getCurrentDateTime(), "1"));
                addDataRepository.save(deviceRequestData); // Explicit save
            }

           /* // Update accessories data
            Set<String> needAccessories = requestData.getAddAccessories();
            for (String accessoryId : needAccessories) {
                AddData deviceRequestDataInternal = addDataRepository.findByIdAndStatus(accessoryId, "1");
                if (deviceRequestDataInternal != null) {
                    deviceRequestDataInternal.setUserName(departmentName);
                    List<AddData.DeviceUser> list1 = deviceRequestDataInternal.getDeviceUsers();
                    list1.forEach(f -> {
                        if (f.getStatus().equals("1")) {
                            f.setEndingDate(getCurrentDateTime());
                            f.setStatus("0");
                        }
                    });
                    // Add new device user
                    list1.add(new AddData.DeviceUser(departmentName, departmentUserName, departmentUserId, getCurrentDateTime(), "1"));
                    addDataRepository.save(deviceRequestDataInternal); // Explicit save
                }
            }*/

            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
            addDataService.update();

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/setDeliveryDeviceToDepartment")
    @ResponseBody
    public ResponseEntity<String> setDeliveryDeviceToDepartment(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {

        // Find the RequestData document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();

            requestData.setCustomerCareToDepartmentStatus(status);
            requestData.setCustomerCareManInfoForDeliveryToDepartment(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setCustomerCareToDepartmentTime(getCurrentLocalDateTime());

            String deviceId = requestData.getDeviceId();
            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
            if (deviceRequestData != null) {
                deviceRequestData.setUserName(departmentName);
                List<AddData.DeviceUser> list = deviceRequestData.getDeviceUsers();
                list.forEach(e -> {
                    if (e.getStatus().equals("1")) {
                        e.setEndingDate(getCurrentDateTime());
                        e.setStatus("0");
                    }
                });
                // Add new device user
                list.add(new AddData.DeviceUser(departmentName, departmentUserName, departmentUserId, getCurrentDateTime(), "1"));
                addDataRepository.save(deviceRequestData); // Explicit save
            }

            // Update accessories data
            Set<String> needAccessories = requestData.getAddAccessories();
            for (String accessoryId : needAccessories) {
                AddData deviceRequestDataInternal = addDataRepository.findByIdAndStatus(accessoryId, "1");
                if (deviceRequestDataInternal != null) {
                    deviceRequestDataInternal.setUserName(departmentName);
                    List<AddData.DeviceUser> list1 = deviceRequestDataInternal.getDeviceUsers();
                    list1.forEach(f -> {
                        if (f.getStatus().equals("1")) {
                            f.setEndingDate(getCurrentDateTime());
                            f.setStatus("0");
                        }
                    });
                    // Add new device user
                    list1.add(new AddData.DeviceUser(departmentName, departmentUserName, departmentUserId, getCurrentDateTime(), "1"));
                    addDataRepository.save(deviceRequestDataInternal); // Explicit save
                }
            }

            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
            addDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/acceptDeliveryDeviceCustomerCareFromInventory")
    @ResponseBody
    public ResponseEntity<String> acceptDeliveryDeviceCustomerCareFromInventory(@RequestBody Map<String, Object> payload) {

        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");
        List<String> deviceIds = (List<String>) payload.get("deviceId");
        String deviceId=deviceIds.getFirst();
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");

        System.out.println("Received requestId: " + requestId);

        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("Generated presentDateTime: " + presentDateTime);

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            requestData.getInventory().setInventoryToCustomerCareDeviceReceivingManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getInventory().setInventoryToCustomerCareDeviceSendingStatus("Accepted");
            requestData.getInventory().setInventoryToCustomerCareDeviceReceivingTime(getCurrentLocalDateTime());
            requestData.setInventory(requestData.getInventory());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
            deviceRequestData.setBookingStatus("Booked");
            deviceRequestData.setUserName(departmentName);
            List<AddData.DeviceUser> list=deviceRequestData.getDeviceUsers();
            list.forEach(e->{
                System.out.println(e.toString());
                if(e.getStatus().equals("1")){
                    // update EndingDate
                    e.setEndingDate(getCurrentDateTime());
                    e.setStatus("0");
                }

            });
            // add new device user
            list.add(new AddData.DeviceUser(departmentName,departmentUserName,departmentUserId,getCurrentDateTime(),"1"));

            addDataRepository.save(deviceRequestData);



        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }
        requestDataService.update();
        addDataService.update();

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    @PostMapping("/sendDeliveryDeviceCustomerCareToDepartment")
    @ResponseBody
    public ResponseEntity<String> sendDeliveryDeviceCustomerCareToDepartment(@RequestBody Map<String, Object> payload) {

        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");
        List<String> deviceIds = (List<String>) payload.get("deviceId");
        String deviceId=deviceIds.getFirst();
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");

        System.out.println("Received requestId: " + requestId);

        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("Generated presentDateTime: " + presentDateTime);

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();
// Ensure CustomerCare is initialized
            if (requestData.getCustomerCare() == null) {
                requestData.setCustomerCare(new RequestData.CustomerCare());
            }
            requestData.getCustomerCare().setCustomerCareToDepartmentDeviceSendingManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getCustomerCare().setCustomerCareToDepartmentDeviceSendingStatus("Pending");
            requestData.getCustomerCare().setCustomerCareToDepartmentDeviceSendingTime(getCurrentLocalDateTime());
            requestData.setCustomerCare(requestData.getCustomerCare());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
           requestDataService.update();


        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    public String  generateNewVisibleIdForServiceRequest(){
        String prefix = getLastTwoDigitsOfYear().concat(getCurrentMonthAsTwoCharacterInteger());

        // Count devices by status
        int deleteServiceRequest = serviceRequestRepository
                .findByStatus( "2")
                .size();
        int activeServiceRequest = serviceRequestRepository
                .findByStatus( "1")
                .size();


        // Calculate total count
        int totalDevices = deleteServiceRequest + activeServiceRequest+1;

        // Format the new ID to ensure it's 4 digits
        String formattedId = String.format("%03d", totalDevices);

        // Generate the new ID
        return prefix + formattedId;
    }
    public String generateNewVisibleIdForOldDevice() {
        String prefix = "1";

        // Count devices by status
        int deleteDevicesCount = addDataRepository
                .findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus("Old", "2")
                .size();
        int activeDevicesCount = addDataRepository
                .findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus("Old", "1")
                .size();

        // Calculate total count and increment by 1
        int totalDevices = deleteDevicesCount + activeDevicesCount + 1;

        // Format the new ID to ensure it's 4 digits
        String formattedId = String.format("%06d", totalDevices);

        // Generate the new ID
        return prefix + formattedId;
    }



    public String  generateNewVisibleIdForNewDevice(){
        String prefix = getLastTwoDigitsOfYear().concat(getCurrentMonthAsTwoCharacterInteger());

        // Count devices by status
        int deleteDevicesCountForService = addDataRepository
                .findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus("Service", "2")
                .size();
        int activeDevicesCountForService = addDataRepository
                .findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus("Service", "1")
                .size();
        // Count devices by status
        int deleteDevicesCountForNew = addDataRepository
                .findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus("New", "2")
                .size();
        int activeDevicesCountForNew = addDataRepository
                .findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus("New", "1")
                .size();

        // Calculate total count
        int totalDevices = deleteDevicesCountForService + activeDevicesCountForService+deleteDevicesCountForNew + activeDevicesCountForNew+1;

        // Format the new ID to ensure it's 4 digits
        String formattedId = String.format("%04d", totalDevices);

        // Generate the new ID
        return prefix + formattedId;
    }
    public static String getLastTwoDigitsOfYear() {
        // Get the current year
        int currentYear = Year.now().getValue();

        // Extract the last two digits and format them as a two-character string
        return String.format("%02d", currentYear % 100);
    }
    public static String getCurrentMonthAsTwoCharacterInteger() {
        // Get the current date
        LocalDate currentDate = LocalDate.now();

        // Format the month to always have 2 digits
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM");
        return currentDate.format(formatter);
    }
    public  String getCurrentLocalDateTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
    public  String getCurrentDate() {
        LocalDate today = LocalDate.now();
        return today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
    public String getCurrentDateTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
    }

}
