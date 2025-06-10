package com.device.DeviceManagement.controller.departmentUser;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

import com.device.DeviceManagement.repository.InternalUserRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/departmentUser")
public class departmentUser {
    @Autowired
    private  RequestDataRepository requestDataRepository;
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;
    @Autowired
    private  AddDataRepository addDataRepository;
    @Autowired
    private BranchUserRepository branchUserRepository;

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

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }



    @PostMapping("/addUser")
    @ResponseBody
    public ResponseEntity<String> addUser(@RequestParam String departmentUserName,@RequestParam String userName, @RequestParam String userId, @RequestParam String userJoinDate,@RequestParam String userDesignation, Model model) {

        System.out.println(departmentUserName+" "+userName+" "+userId+" "+userJoinDate);
        if(! authenticate(departmentUserName,userId))
        {
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


            // Save the Category object
            branchUserRepository.save(new BranchUser(departmentUserName,userName,userId,userJoinDate,userDesignation,currentDate,formattedDateTime,"1"));
            branchUserService.update();
            // move to return "user/Home";
            return ResponseEntity.ok("Successfully added user");
        }else{
            return ResponseEntity.ok("Sorry, Already user added");
        }


    }
    @PostMapping("/deleteUser")
    @ResponseBody
    public ResponseEntity<String> deleteRequestColumn(@RequestParam String userId) {
        BranchUser request = branchUserRepository.findByIdAndStatus(userId,"1");
        try {
            if (request != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                request.setStatus("2");
                branchUserRepository.save(request); // Save the updated category

                 branchUserService.update();
                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting request column");
        }
    }

    @PostMapping("/editUser")
    @ResponseBody
    public ResponseEntity<String> editUser(
            @RequestParam String userId,
            @RequestParam String branchName,
            @RequestParam String newUserName,
            @RequestParam String newUserId,
            @RequestParam String newUserJoinDate,
            @RequestParam String newUserDesignation) {
        try {
            BranchUser request = branchUserRepository.findByIdAndStatus(userId, "1");

            if (request != null) {
                if (!authenticate(branchName, userId)) {
                    request.setStatus("0");
                    branchUserRepository.save(request);

                    // Get the current localDate time and date
                    LocalDateTime now = LocalDateTime.now();
                    String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                    // Save the new user data
                    BranchUser newUser = new BranchUser(branchName, newUserName, newUserId, newUserJoinDate, newUserDesignation, currentDate, formattedDateTime, "1");
                    branchUserRepository.save(newUser);
                    branchUserService.update();
                    return ResponseEntity.ok("Successfully updated user");
                } else {
                    return ResponseEntity.ok("Sorry, Already user exist");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating user");
        }
    }

    @PostMapping("/addRequestInformation")
    @ResponseBody
    public ResponseEntity<String> saveTableData(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }
        System.out.println("Received data: " + allParams);


        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");


        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        RequestData data=new RequestData(departmentName,formattedDateTime,currentDate,allParams,"1","Pending",null);
        RequestData.Inventory abc= new RequestData.Inventory();
        abc.setInventoryStatus("Pending");
        data.setInventory(abc);
        // add request id
        data.setVisibleRequestId(generateNewVisibleIdForRequest());
        requestDataRepository.save(data);
        requestDataService.update();


        try {


            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }
    }
    @PostMapping("/deleteRequest")
    @ResponseBody
    public ResponseEntity<String> deleteRequest(@RequestParam String requestId) {
        RequestData data = requestDataRepository.findByIdAndStatus(requestId,"1");
        try {
            if (data != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                data.setStatus("2");
                requestDataRepository.save(data); // Save the updated category

                 requestDataService.update();
                return ResponseEntity.ok("Requested data deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }

    @PostMapping("/editRequestInformation")
    @ResponseBody
    public ResponseEntity<String> editRequestInformation(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        String requestId = allParams.get("requestId");
        allParams.remove("requestId");

        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");

        RequestData data = requestDataRepository.findByIdAndStatus(requestId,"1");
        try {
            if (data != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                data.setStatus("2");
                requestDataRepository.save(data); // Save the updated category

                // add again
                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                // Clone the object with the custom ID
                RequestData clonedData = new RequestData(data,requestId+"_child_"+formattedDateTime);
                requestDataRepository.save(clonedData);
                // delete old
                requestDataRepository.delete(data);

                // generate new
                requestDataRepository.save(new RequestData(requestId,data,departmentName,formattedDateTime,currentDate,allParams,"1",clonedData.getRequestMode(),null));

                requestDataService.update();
               // requestDataRepository.save(data1);

                return ResponseEntity.ok("Request data Updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }



    }
    @PostMapping("/addDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> addDeviceInformation(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }
        System.out.println("Received data: " + allParams);

        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");
        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");

        String startingDate = allParams.get("startingDate");
        allParams.remove("startingDate");

        String userName = allParams.get("userName");
        allParams.remove("userName");

        String userId = allParams.get("userId");
        allParams.remove("userId");

        String deviceType = allParams.get("deviceType");
        allParams.remove("deviceType");

      //  System.out.println(allParams);

        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        AddData adddata=new AddData(departmentName,categoryName,formattedDateTime,currentDate,allParams,"1");
        adddata.setVisibleId(generateNewVisibleIdForOldDevice());

        adddata.setDeviceTypeServicingOrRequestingOrOldAsInputting("Old");
        adddata.setDeviceTypePrimaryOrSecondary(deviceType);
       if(deviceType.equals("Secondary")){
           adddata.setDeviceTypeSecondaryInOrOut("Out");
       }
        AddData.DeviceUser user=new AddData.DeviceUser(departmentName,userName,userId,startingDate,"1");
         List<AddData.DeviceUser> list=new ArrayList<>();
         list.add(user);
       adddata.setDeviceUsers(list);

        addDataRepository.save(adddata);
        addDataService.update();

        try {


            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }
    }
    @PostMapping("/editDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> editTableData(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        String deviceId = allParams.get("deviceId");
        allParams.remove("deviceId");

        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");

        AddData device = addDataRepository.findByIdAndStatus(deviceId,"1");

        //
        try {
            if (device != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                device.setStatus("0");
                addDataRepository.save(device); // Save the updated category

                // add again
                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                String departmentName = allParams.get("departmentName");
                allParams.remove("departmentName");

                // Clone the object with the custom ID
                 AddData clonedData = new AddData(device,deviceId+"_child_"+formattedDateTime);
                 addDataRepository.save(clonedData);
                 // delete old
                 addDataRepository.delete(device);

                 // generate new
                 addDataRepository.save(new AddData(deviceId,device,departmentName,categoryName,formattedDateTime,currentDate,allParams,"1"));
                 addDataService.update();

                return ResponseEntity.ok("Device Data Updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }



    }
    @PostMapping("/addDeviceInformationOfService")
    @ResponseBody
    public ResponseEntity<String> addDeviceInformationOfService(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }
       // create a java method who will return current month as integer text with 2 length  getCurrentMonthAsTwoCharacterInteger()
       // create a java method who will return last value . example 24 will return from current year. getLastTwoDigitsOfYear
        String prefix=getLastTwoDigitsOfYear().concat(getCurrentMonthAsTwoCharacterInteger());
        System.out.println(prefix);
        String deviceId = allParams.get("deviceId");
        allParams.remove("deviceId");

        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");

        String comment = allParams.get("comment");
        allParams.remove("comment");

        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");

        List<ServiceRequest.problems> listData=new ArrayList<>();
        List<ServiceRequest.Solution> listDataSolution=new ArrayList<>();
        // Approach 2: Using keySet() and get() method

        for (String key : allParams.keySet()) {
            ServiceRequest.problems data=new ServiceRequest.problems(allParams.get(key),"Pending");
            // System.out.println("Key: " + key + ", Value: " + allParams.get(key));
            listData.add(data);

            ServiceRequest.Solution data1=new ServiceRequest.Solution(allParams.get(key),"Pending");
            // System.out.println("Key: " + key + ", Value: " + allParams.get(key));
            listDataSolution.add(data1);
        }
        // add again
        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        serviceRequestRepository.save(new ServiceRequest(generateNewVisibleIdForServiceRequest(),categoryName,departmentName,currentDate,formattedDateTime,comment,deviceId,listData,listDataSolution,"1",adjustDate(currentDate,7)));
        serviceRequestService.update();
        try {

            return ResponseEntity.ok("Data11 saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }



    }
    @PostMapping("/deleteDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> deleteDeviceInformation(@RequestParam String deviceId) {
        AddData device = addDataRepository.findByIdAndStatus(deviceId,"1");
        try {
            if (device != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                device.setStatus("2");
                addDataRepository.save(device); // Save the updated category
                addDataService.update();

                return ResponseEntity.ok("Device deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }

    @PostMapping("/updateDeviceReceivedStatus")
    @ResponseBody
    public ResponseEntity<String> updateDeviceReceivedStatus(@RequestParam String requestId, @RequestParam String status) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.setDeviceReceivedStatus(status);
            requestData.setDeviceReceivedTime(getCurrentLocalDateTime());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }

    @PostMapping("/setReceiveDeviceFromCustomerCare")
    @ResponseBody
    public ResponseEntity<String> setReceiveDeviceFromCustomerCare(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {



        // Find the RequestData document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();

            requestData.setDepartmentReceiveDeviceFromCustomerCareStatus(status);
            requestData.setDepartmentManInfoOfReceivingDeviceFromCustomerCare(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setDepartmentReceiveDeviceFromCustomerCareTime(getCurrentLocalDateTime());

            // Update device data
            String deviceId = requestData.getDeviceId();
            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
            deviceRequestData.setUserName(departmentUserName);
            if (deviceRequestData != null) {

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



            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
            addDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }

    @PostMapping("/distributeDevice")
    public ResponseEntity<String> distributeDevice(@RequestBody Map<String, String> requestData1) {
        try {
            String serviceId = requestData1.get("serviceId");
            String departmentName = requestData1.get("departmentName");
            String departmentUserName = requestData1.get("departmentUserName");
            String departmentUserId = requestData1.get("departmentUserId");
            String startingDate = requestData1.get("startingDate");
            String userName = requestData1.get("userName");

            BranchUser  internalUser=branchUserRepository.findByBranchNameAndUserNameAndStatus(departmentUserName,userName,"1");
           String userId="";
            if(internalUser !=null){
               userId=internalUser.getUserId();
            }

            Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");
            if (optionalRequestData.isPresent()) {
                ServiceRequest requestData = optionalRequestData.get();
               requestData.setDistributeDeviceToUserStatus("Distributed");
               requestData.setDistributeDeviceToUserManInfo(departmentName + "_" + departmentUserName + "_" + departmentUserId);
                requestData.setDistributeDeviceToUserTime(getCurrentLocalDateTime());


                String deviceId = requestData.getDeviceId();
                AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
                if (deviceRequestData != null) {
                    deviceRequestData.setUserName(departmentUserName);
                    List<AddData.DeviceUser> list = deviceRequestData.getDeviceUsers();
                    list.forEach(e -> {
                        if (e.getStatus().equals("1")) {
                            e.setEndingDate(startingDate);
                            e.setStatus("0");
                        }
                    });
                    // Add new device user
                    list.add(new AddData.DeviceUser(departmentUserName, userName, userId, startingDate, "1"));
                    addDataRepository.save(deviceRequestData); // Explicit save
                }


                // Save the updated RequestData document
                serviceRequestRepository.save(requestData);
                serviceRequestService.update();
                addDataService.update();
            }

            // Perform business logic here

            return ResponseEntity.ok("Device information saved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while saving device information.");
        }
    }

    @PostMapping("/acceptDeliveryDeviceCustomerCareToDepartment")
    @ResponseBody
    public ResponseEntity<String> acceptDeliveryDeviceCustomerCareToDepartment(@RequestBody Map<String, Object> payload) {

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
            requestData.getCustomerCare().setDepartmentDeviceReceiverManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getCustomerCare().setCustomerCareToDepartmentDeviceSendingStatus("Accepted");
            requestData.getCustomerCare().setDepartmentDeviceReceiverTime(getCurrentLocalDateTime());
            requestData.setCustomerCare(requestData.getCustomerCare());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);

            AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");
            deviceRequestData.setBookingStatus("Booked");
            deviceRequestData.setUserName(departmentUserName);
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
            requestDataService.update();
            addDataService.update();

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
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
    public    String generateNewVisibleIdForRequest(){
        String prefix = "R"+getLastTwoDigitsOfYear().concat(getCurrentMonthAsTwoCharacterInteger());

        // Count devices by status
        int deleteRequest = requestDataRepository
                .findByStatus("2")
                .size();
        int activeRequest = requestDataRepository
                .findByStatus("1")
                .size();


        // Calculate total count
        int totalDevices = deleteRequest + activeRequest+1;

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
    public static String adjustDate(String dateStr, int daysToAdd) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate date = LocalDate.parse(dateStr, formatter);
            LocalDate newDate = date.plusDays(daysToAdd);

            return newDate.format(formatter);
        } catch (DateTimeParseException e) {
            System.out.println("Invalid date format. Please use yyyy-MM-dd.");
            return null;
        }
    }
    public boolean authenticate(String branchName, String userId) {
        return branchUserRepository.existsByBranchNameAndUserIdAndStatus(branchName, userId, "1");
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