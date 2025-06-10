package com.device.DeviceManagement.controller.inventory;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/inventory")
public class Inventory {
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
    private  ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;


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

    @PostMapping("/addListRequest")
    public ResponseEntity<String> processSelectedRows(@RequestBody Map<String, Object> payload) {
        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");
        List<String> deviceIds = (List<String>) payload.get("deviceIds");
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");


        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();
            RequestData requestData1 = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            RequestData.Inventory inventory = new RequestData.Inventory("Proposal", presentDateTime, deviceIds);
            inventory.setCooAns("Pending");
            inventory.setRequestTime(getCurrentLocalDateTime());
            requestData.setInventory(inventory);


            // Save the updated RequestData document
            requestDataRepository.save(requestData);

           requestDataService.update();

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }

    @PostMapping("/deliverRequestStatus")
    @ResponseBody
    public ResponseEntity<String> deliverRequestStatus(@RequestParam String requestId, @RequestParam String status) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getInventory().setDeliveryMode("Delivered");
            if(requestData.getInventory().getInventoryStatus().equals("Proposal Accepted")||requestData.getInventory().getInventoryStatus().equals("Purchased")){
                // nothing happaned
            }
            else{
                requestData.getInventory().setInventoryStatus(status);
            }
            requestData.getInventory().setDeliveryTime(getCurrentLocalDateTime());
            requestData.setInventory(requestData.getInventory());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/purchaseRequestStatus")
    @ResponseBody
    public ResponseEntity<String> purchaseRequestStatus(@RequestParam String requestId,
                                                        @RequestParam String departmentName,
                                                        @RequestParam String departmentUserName,
                                                        @RequestParam String departmentUserId,
                                                        @RequestParam String status) {
        RequestData data = requestDataRepository.findByIdAndStatus(requestId,"1");
        try {
            if (data != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                RequestData.Inventory db=new RequestData.Inventory();
                db.setInventoryPurchaseRequestProviderManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                db.setInventoryStatus(status);
                db.setInventoryToPurchaseRequestStatus("Pending");
                db.setInventoryToPurchaseRequestTime(getCurrentLocalDateTime());
                data.setInventory(db);
                requestDataRepository.save(data); // Save the updated category


                requestDataService.update();
                return ResponseEntity.ok("Request data Updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }



    }

    @PostMapping("/checkProductAvailability")
    @ResponseBody
    public ResponseEntity<String> checkProductAvailability(@RequestParam String requestId, @RequestParam String status) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getInventory().setCheckAvailability(status);

            requestData.setInventory(requestData.getInventory());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/addProblemSolutionOfServicePrice")
    @ResponseBody
    public ResponseEntity<String> addProblemSolutionOfServicePrice(@RequestBody Map<String, List<Map<String, String>>> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        System.out.println("Received data: " + allParams);

        // Process each form's data
        for (Map.Entry<String, List<Map<String, String>>> entry : allParams.entrySet()) {
            String formIdWithProposal = entry.getKey(); // This is formId + "_" + proposalId
            List<Map<String, String>> formData = entry.getValue(); // Serialized form data

            // Split formIdWithProposal into formId and proposalId
            String[] parts = formIdWithProposal.split("_", 2);
            String problemName = parts[0];
            String serviceId = parts[1];



            Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");
            if (optionalRequestData.isPresent()) {
                ServiceRequest requestData1 = optionalRequestData.get();
                requestData1.getAllProblem().forEach(problem -> {
                    if(problemName.equals(problem.getName())){
                       System.out.println(problemName+" "+problem.getName());
                        // Iterate through each key-value pair in formData
                        for (Map<String, String> field : formData) {


                            String fieldName = field.get("name");
                            String fieldValue = field.get("value");

                            System.out.println("  Field Name: " + fieldName);
                            System.out.println("  Field Value: " + fieldValue);

                            // Find and update the existing solution's price by name
                            problem.getProposalSolution().forEach(proposalSolutionItem -> {
                                if (proposalSolutionItem.getValue().equals(fieldName)) {
                                    proposalSolutionItem.setPurchaseStatus("Ordered");
                                    // System.out.println("Updated price for solution with name: " + name + " to " + price);
                                }
                            });
                        }

                    }

                });
                // Persist changes if needed
                serviceRequestRepository.save(requestData1);
                serviceRequestService.update();
            }

            // Here, you can handle each form data based on formId and proposalId
        }



        return ResponseEntity.ok("Data saved successfully");
    }
    // Endpoint to handle the update of the delivery date
    @PostMapping("/updateDeliveryDate")
    public ResponseEntity<String> updateDeliveryDate(
            @RequestParam String serviceId,
            @RequestParam String problemName,
            @RequestParam String solutionName,
            @RequestParam String date) {


        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.getAllProblem().forEach(problem -> {
                if(problem.getName().equals(problemName)){
                    problem.getProposalSolution().forEach(proposalSolutionItem -> {
                        if (proposalSolutionItem.getName().equals(solutionName)) {
                            proposalSolutionItem.setDeliveryDate(date);

                        }
                    });
                }

            });
            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }


        // Example of updating the data (this is just a placeholder for actual business logic)
        // Update delivery date in the database or perform other necessary actions

        // Return a success message
        return ResponseEntity.ok("Delivery date updated successfully.");
    }
    // Endpoint to handle the update of the delivery date
    @PostMapping("/updateDeliveryStatusAndDeliveryDevice")
    public ResponseEntity<String> updateDeliveryStatusAndDeliveryDevice(
            @RequestParam("serviceId") String serviceId,
            @RequestParam("problemName") String problemName,
            @RequestParam("solutionName") String solutionName,
            @RequestParam("deviceId") String deviceId,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId

    ) {


        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.getAllProblem().forEach(problem -> {
                if(problem.getName().equals(problemName)){
                    problem.getProposalSolution().forEach(proposalSolutionItem -> {
                        if (proposalSolutionItem.getName().equals(solutionName)) {
                            proposalSolutionItem.setInventoryToServiceCenterDeviceId(deviceId);
                            proposalSolutionItem.setInventoryToServiceCenterDeviceStatus("Pending");
                            proposalSolutionItem.setInventoryManInfoSendingDeviceToServiceCenter(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                            proposalSolutionItem.setInventoryToServiceCenterDeviceTime(getCurrentLocalDateTime());
                        }
                    });
                }

            });
            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }


        // Example of updating the data (this is just a placeholder for actual business logic)
        // Update delivery date in the database or perform other necessary actions

        // Return a success message
        return ResponseEntity.ok("Delivery date updated successfully.");
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
    // Endpoint to handle the incoming request
    @PostMapping("/addPurchaseList")
    @ResponseBody
    public ResponseEntity<String> addPurchaseList(@RequestBody PurchaseRequestDTO purchaseRequest) {
        try {
            // Extract department information
            System.out.println("Department Name: " + purchaseRequest.getDepartmentName());
            System.out.println("Department User Name: " + purchaseRequest.getDepartmentUserName());
            System.out.println("Department User ID: " + purchaseRequest.getDepartmentUserId());

            // Extract and process services
            List<ServiceDTO> services = purchaseRequest.getServices();
            if (services != null) {
                services.forEach(service -> {
                    System.out.println("Service ID: " + service.getServiceId());
                    System.out.println("Problem Name: " + service.getProblemName());
                    System.out.println("Solution Name: " + service.getSolutionName());
                    Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(service.getServiceId(), "1");

                    if (optionalRequestData.isPresent()) {
                        ServiceRequest requestData = optionalRequestData.get();

                        // Iterate through each problem in the service request
                        requestData.getAllProblem().forEach(problem -> {
                            System.out.println("Processing problem: " + problem.getName());
                            if (problem.getName().equals(service.getProblemName())) {
                                // Find and update the existing solution's price by name
                                problem.getProposalSolution().forEach(proposalSolutionItem -> {
                                    if (proposalSolutionItem.getName().equals( service.getSolutionName())) {
                                        proposalSolutionItem.setInventoryManInfoOfForPurchaseRequest( purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());
                                        proposalSolutionItem.setInventoryForPurchaseRequestStatus("yes");
                                        proposalSolutionItem.setInventoryForPurchaseRequestTime(getCurrentLocalDateTime());
                                        proposalSolutionItem.setDeviceManageType("Purchased");

                                    }
                                });


                                System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                            }

                        });
                        // Persist changes
                        serviceRequestRepository.save(requestData);
                        serviceRequestService.update();
                    }
                });
            }

            // Perform necessary logic (e.g., saving to a database)

            return ResponseEntity.ok("Purchase list added successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }
    @PostMapping("/addAlternativeDeviceList")
    public ResponseEntity<String> addAlternativeDeviceList(@RequestBody Map<String, Object> payload) {
        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");
        List<String> deviceIds = (List<String>) payload.get("deviceIds");
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");



        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
           // RequestData.Inventory inventory = new RequestData.Inventory("Proposal", presentDateTime, deviceIds);
            requestData.getInventory().setInventoryToAlternativeDeviceRequestStatus("Pending");
            requestData.getInventory().setInventoryToAlternativeDeviceRequestTime(getCurrentLocalDateTime());
            requestData.getInventory().setInventoryToAlternativeDeviceRequestProviderManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getInventory().setInventoryStatus("Alternative Proposal");
            requestData.getInventory().setDeviceIds(deviceIds);
            requestData.setInventory(requestData.getInventory());


            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();



        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    @PostMapping("/sendDeliveryDevicePurchaseToInventoryAccept")
    @ResponseBody
    public ResponseEntity<String> sendDeliveryDevicePurchaseToInventoryAccept(@RequestBody Map<String, Object> payload) {

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

            requestData.getPurchase().setPurchaseDeviceReceiverToInventoryManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getPurchase().setPurchaseDeviceSenderToInventoryStatus("Accepted");

            requestData.getPurchase().setPurchaseDeviceReceiverToInventoryTime(getCurrentLocalDateTime());
            requestData.getPurchase().setPurchaseDeviceSenderToInventoryDeviceId(deviceId);
            requestData.setPurchase(requestData.getPurchase());

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

            requestDataService.update();
            addDataService.update();


        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    @PostMapping("/sendDeliveryDevicePurchaseToInventoryForService")
    @ResponseBody
    public ResponseEntity<String> sendDeliveryDevicePurchaseToInventoryForService(@RequestBody Map<String, Object> payload) {

        // Extract requestId and deviceIds from the payload
        String serviceId = (String) payload.get("serviceId");
        List<String> deviceIds = (List<String>) payload.get("deviceId");
        String deviceId=deviceIds.getFirst();
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");
        String problemName = (String) payload.get("problemName");
        String solutionName = (String) payload.get("solutionName");



        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("Generated presentDateTime: " + presentDateTime);

        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();

            // Iterate through each problem in the service request
            requestData.getAllProblem().forEach(problem -> {
                System.out.println("Processing problem: " + problem.getName());
                if (problem.getName().equals(problemName)) {
                    // Find and update the existing solution's price by name
                    problem.getProposalSolution().forEach(proposalSolutionItem -> {
                        if (proposalSolutionItem.getName().equals( solutionName)) {

                            proposalSolutionItem.setPurchaseDeviceReceiverToInventoryManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                            proposalSolutionItem.setPurchaseDeviceSenderToInventoryStatus("Accepted");
                            proposalSolutionItem.setPurchaseDeviceReceiverToInventoryTime(getCurrentLocalDateTime());
                            proposalSolutionItem.setPurchaseDeviceSenderToInventoryDeviceId(deviceId);

                        }
                    });


                    System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                }

            });
            // Persist changes
            serviceRequestRepository.save(requestData);

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
        }

         serviceRequestService.update();
        addDataService.update();
        return ResponseEntity.ok("Selected rows processed successfully");
    }
    @PostMapping("/sendDeliveryDeviceInventoryToCustomerCare")
    @ResponseBody
    public ResponseEntity<String> sendDeliveryDeviceInventoryToCustomerCare(@RequestBody Map<String, Object> payload) {

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

            requestData.getInventory().setInventoryToCustomerCareDeviceSendingManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getInventory().setInventoryToCustomerCareDeviceSendingStatus("Pending");
            requestData.getInventory().setInventoryToCustomerCareDeviceSendingTime(getCurrentDateTime());
            requestData.setInventory(requestData.getInventory());
            // Save the updated RequestData document
            requestDataRepository.save(requestData);




        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }
        requestDataService.update();
        return ResponseEntity.ok("Selected rows processed successfully");
    }

    @PostMapping("/receiveUnOrderedDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> receiveUnOrderedDeviceInformation(@RequestBody Map<String, Object> payload) {


        String deviceId=(String) payload.get("deviceId");
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");


        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Find the RequestData document by requestId and status
        AddData deviceRequestData = addDataRepository.findByIdAndStatus(deviceId, "1");

        if (deviceRequestData !=null) {
            AddData.UnOrderedDevice dd=deviceRequestData.getUnOrderedDevice();
            dd.setUnWantedSendDeviceToInventoryStatus("Accepted");
            dd.setUnWantedReceiveDeviceInventoryManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            dd.setUnWantedReceiveDeviceInventoryTime(getCurrentDateTime());
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

            addDataService.update();


        } else {
            return ResponseEntity.status(404).body("RequestData with deviceId " + deviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    public  String getCurrentLocalDateTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
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
    public String getCurrentDateTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
    }
}
