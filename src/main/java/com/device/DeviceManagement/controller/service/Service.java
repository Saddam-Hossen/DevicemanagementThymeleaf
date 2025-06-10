package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.AddData;
import com.device.DeviceManagement.model.RequestData;
import com.device.DeviceManagement.model.ServiceRequest;
import com.device.DeviceManagement.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayOutputStream;
import java.util.List;

import static com.device.DeviceManagement.controller.superAdmin.SuperAdmin.extractSolution;

@Controller
@RequestMapping("/service")
public class Service {
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

    @PostMapping("/setServiceRequestForReceivingDevice")
    @ResponseBody
    public ResponseEntity<String> setServiceRequestForReceivingDevice(
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
            requestData.setServiceCenterReceiverInfoFromCustomerCare(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setServiceCenterServiceRequestAcceptedTime(getCurrentLocalDateTime());

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
            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
            addDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/setServiceRequestForDeliveryDevice")
    @ResponseBody
    public ResponseEntity<String> setServiceRequestForDeliveryDevice(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {

        // Find the RequestData document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setServiceCenterToCustomerCareStatus(status);

            requestData.setServiceCenterManInfoForDeliveryToCustomerCare(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setServiceCenterToCustomerCareTime(getCurrentLocalDateTime());

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
    @PostMapping("/setServiceRequestToInventory")
    @ResponseBody
    public ResponseEntity<String> setServiceRequestToInventory(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId) {

        // Find the RequestData document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setServiceCenterRequestToInventoryForAccessoriesStatus(status);
           // requestData.setServiceCenterManInfoToInventoryAccessoriesRequest(departmentName+"_"+departmentUserName+"_"+departmentUserId);

            requestData.setServiceCenterRequestToInventoryForAccessoriesTime(getCurrentLocalDateTime());
            requestData.getAllProblem().forEach(problem -> {
                problem.getProposalSolution().forEach(proposalSolutionItem -> {
                    if (proposalSolutionItem.getAction().equals("accept")) {
                        proposalSolutionItem.setDeliveryDate(adjustDate(getCurrentDate(),7));

                    }
                });
                    });
            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/updateAccessoriesReceivedStatus")
    public ResponseEntity<String> updateAccessoriesReceivedStatus(
            @RequestParam("serviceId") String serviceId,
            @RequestParam("problemName") String problemName,
            @RequestParam("solutionName") String solutionName,
            @RequestParam("status") String status,
            @RequestParam String departmentName,
            @RequestParam String departmentUserName,
            @RequestParam String departmentUserId,
            @RequestParam String deviceId
            ) {
        // have to change service device owner info



        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.getAllProblem().forEach(problem -> {
                if(problem.getName().equals(problemName)){
                    problem.getProposalSolution().forEach(proposalSolutionItem -> {
                        if (proposalSolutionItem.getName().equals(solutionName)) {
                            proposalSolutionItem.setInventoryToServiceCenterDeviceStatus(status);
                            proposalSolutionItem.setServiceCenterManInfoReceivingDeviceOfInventory(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                            proposalSolutionItem.setInventoryToServiceCenterDeviceReceiveTime(getCurrentLocalDateTime());
                        }
                    });
                }

            });
            // update device info
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
            // Save the updated RequestData document
            serviceRequestRepository.save(requestData);
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }


        // Example of updating the data (this is just a placeholder for actual business logic)
        // Update delivery date in the database or perform other necessary actions

        // Return a success message
        serviceRequestService.update();
        addDataService.update();
        return ResponseEntity.ok("Device was received successfully.");
    }
    @PostMapping("/addProblemSolutionOfService")
    @ResponseBody
    public ResponseEntity<String> addProblemSolutionOfService(@RequestBody Map<String, Object> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }



        // Extract serviceId and departmentName from the map
        String serviceId = (String) allParams.get("serviceId");
        String departmentName = (String) allParams.get("departmentName");
        String departmentUserName = (String) allParams.get("departmentUserName");
        String departmentUserId = (String) allParams.get("departmentUserId");

        // Remove these keys from the map since they are not form data
        allParams.remove("serviceId");
        allParams.remove("departmentName");
        allParams.remove("departmentUserName");
        allParams.remove("departmentUserId");

        // Find the ServiceRequest document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setServiceAccessoriesSolutionProvider(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            // Iterate through each problem in the request
            requestData.getAllProblem().forEach(problem -> { // all problem
                // Normalize the problem name by replacing spaces with hyphens to match form IDs
                String normalizedProblemName = problem.getName().replace(" ", "-");

                System.out.println("Processing problem: " + problem.getName());

                // Iterate over the remaining entries in allParams (which are the form data)
                for (Map.Entry<String, Object> entry : allParams.entrySet()) {
                    String formId = entry.getKey(); // This is the form's ID (e.g., "LapTop-Slow", "Monitor-Scratch")

                    // Match the normalized problem name with the formId
                    if (normalizedProblemName.equals(formId)) {
                        List<Map<String, Object>> formData = (List<Map<String, Object>>) entry.getValue(); // Form data (list of key-value pairs)

                        System.out.println("Matched form ID: " + formId);
                        System.out.println("Form data: " + formData);

                        // Clear existing proposalSolution if it exists
                        if (problem.getProposalSolution() != null) {
                            problem.getProposalSolution().clear();
                            System.out.println("Cleared existing proposalSolution for problem: " + problem.getName());
                        } else {
                            problem.setProposalSolution(new ArrayList<>());
                        }
                     List<ServiceRequest.problems.ProposalSolutionItem> list=new ArrayList<>();
                        // Add new form data to proposalSolution
                        formData.forEach(solutionData -> {
                            ServiceRequest.problems.ProposalSolutionItem data=new ServiceRequest.problems.ProposalSolutionItem();
                            String input = (String) solutionData.get("name");
                            String[] parts = input.split("\\(");  // Split by "("
                            // Print the first and second parts, trimming extra spaces
                            if (parts.length > 1) {
                                String firstPart = parts[0].trim();  // Get the first part before "("
                                data.setCategory(firstPart);
                                String secondPart = parts[1].replace(")", "").trim();  // Get the second part after "(" and remove ")"
                                data.setName(secondPart);
                                System.out.println("First Part: " + firstPart);   // Output: "Laptop"
                                System.out.println("Second Part: " + secondPart); // Output: "FITNESS - L"
                                data.setValue((String) solutionData.get("value"));
                                data.setPrice(solutionData.containsKey("price") ? (String) solutionData.get("price") : "0");
                                data.setAction(solutionData.containsKey("action") ? (String) solutionData.get("action") : " ");
                                data.setComment(solutionData.containsKey("comment") ? (String) solutionData.get("comment") : " ");
                                list.add(data);
                                System.out.println("Added new solution item: " + data);
                            } else {
                                System.out.println("Input does not contain a second part.");
                            }


                        });
                        problem.setProposalSolution(list);

                        System.out.println("Updated proposalSolution for problem '" + problem.getName() + "': " + problem.getProposalSolution());
                    }
                }
            });

            // Save the updated requestData object to the database
           serviceRequestRepository.save(requestData);
           serviceRequestService.update();

            return ResponseEntity.ok("Data saved successfully");

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }
    }
    @PostMapping("/generateServiceReport")
    @ResponseBody
    public ResponseEntity<String> generateServiceReport(@RequestBody Map<String, Object> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }



        // Extract serviceId and departmentName from the map
        String serviceId = (String) allParams.get("serviceId");
        String departmentName = (String) allParams.get("departmentName");
        String departmentUserName = (String) allParams.get("departmentUserName");
        String departmentUserId = (String) allParams.get("departmentUserId");
        String deviceId = (String) allParams.get("deviceId");

        // Extract device ID lists
        List<String> selectedNeedAccessoriesDeviceIds = (List<String>) allParams.get("selectedNeedAccessoriesDeviceIds");
        List<String> selectedExtractListDeviceIds = (List<String>) allParams.get("selectedExtractListDeviceIds");
        String status = (String) allParams.get("status");
        // Remove these keys from the map since they are not form data
        allParams.remove("serviceId");
        allParams.remove("departmentName");
        allParams.remove("departmentUserName");
        allParams.remove("departmentUserId");
        allParams.remove("deviceId");

        allParams.remove("selectedNeedAccessoriesDeviceIds");
        allParams.remove("selectedExtractListDeviceIds");
        allParams.remove("status");
        String startingDate = getCurrentDateTime();

        System.out.println("Received data: " + allParams);

        // Fetch the device based on ID and status
        // Fetch the device based on ID and status
        AddData device = addDataRepository.findByIdAndStatus(deviceId, "1");
        if (device == null) {
            return ResponseEntity.status(404).body("Device with ID " + deviceId + " not found.");
        }

// Initialize components
        Set<String> allListedData = Optional.ofNullable(device.getListedComponents()).orElse(new HashSet<>());
        Set<String> allAccessoriesData = Optional.ofNullable(device.getAddAccessories()).orElse(new HashSet<>());

// Process extracted list
        selectedExtractListDeviceIds.stream()
                .map(id -> addDataRepository.findByIdAndStatus(id, "1"))
                .filter(Objects::nonNull)
                .forEach(newDevice -> {
                    newDevice.setDeviceUsers(Collections.singletonList(new AddData.DeviceUser(
                            departmentName, departmentUserName, departmentUserId, startingDate, "0"
                    )));
                    addDataRepository.save(newDevice);
                  //  allListedData.remove(newDevice.getId());
                   // allAccessoriesData.remove(newDevice.getId());
                });

// Add selected accessories
        if (selectedNeedAccessoriesDeviceIds != null) {
            allAccessoriesData.addAll(selectedNeedAccessoriesDeviceIds);
            allListedData.addAll(selectedNeedAccessoriesDeviceIds);
        }

// Save updated device data
        device.setAddAccessories(allAccessoriesData);
        device.setListedComponents(allListedData);
        device.setExtractsNewComponents(new HashSet<>(selectedExtractListDeviceIds));
        addDataRepository.save(device);





        // Find the ServiceRequest document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");


        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setServiceReportTime(getCurrentLocalDateTime());
            requestData.setServiceReportGenerator(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            // Convert List to Set for extractsNewComponents
            requestData.setExtractsNewComponents(new HashSet<>(selectedExtractListDeviceIds));

            // Convert List to Set for addAccessories
            if (selectedNeedAccessoriesDeviceIds != null) {
                requestData.setAddAccessories(new HashSet<>(selectedNeedAccessoriesDeviceIds));
            } else {
                requestData.setAddAccessories(Collections.emptySet());
            }
            requestData.setServiceReportStatus("Saved");
            requestData.setServiceAccessoriesSolutionProvider(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            // Iterate through each problem in the request
            List<ServiceRequest.problems> serviceFormData1=requestData.getAllProblem();
            List<ServiceRequest.problems> serviceFormData  =new ArrayList<>(serviceFormData1);
            System.out.println("gh "+serviceFormData);
            requestData.getAllProblem().forEach(problem -> { // all problem
                // Normalize the problem name by replacing spaces with hyphens to match form IDs
                String normalizedProblemName = problem.getName().replace(" ", "-");

                System.out.println("Processing problem: " + problem.getName());

                // Iterate over the remaining entries in allParams (which are the form data)
                for (Map.Entry<String, Object> entry : allParams.entrySet()) {
                    String formId = entry.getKey(); // This is the form's ID (e.g., "LapTop-Slow", "Monitor-Scratch")

                    // Match the normalized problem name with the formId
                    if (normalizedProblemName.equals(formId)) {
                        List<Map<String, Object>> formData = (List<Map<String, Object>>) entry.getValue(); // Form data (list of key-value pairs)

                        System.out.println("Matched form ID: " + formId);
                        System.out.println("Form data: " + formData);

                        // Clear existing proposalSolution if it exists
                        if (problem.getProposalSolution() != null) {
                            problem.getProposalSolution().clear();
                            System.out.println("Cleared existing proposalSolution for problem: " + problem.getName());
                        } else {
                            problem.setProposalSolution(new ArrayList<>());
                        }
                        List<ServiceRequest.problems.ProposalSolutionItem> list=new ArrayList<>();
                        // Add new form data to proposalSolution
                        formData.forEach(solutionData -> {
                            ServiceRequest.problems.ProposalSolutionItem data= new ServiceRequest.problems.ProposalSolutionItem();
                            data.setValue((String) solutionData.get("value"));
                            list.add(data);

                        });
                        problem.setProposalSolution(list);

                        System.out.println("Updated proposalSolution for problem '" + problem.getName() + "': " + problem.getProposalSolution());
                    }
                }
            });


            serviceRequestRepository.save(requestData);
            addDataService.update();
            serviceRequestService.update();

            return ResponseEntity.ok("Data saved successfully");

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }
    }
    @PostMapping("/generateServiceReportEdit")
    @ResponseBody
    public ResponseEntity<String> generateServiceReportEdit(@RequestBody Map<String, Object> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        // Extract serviceId and departmentName from the map
        String serviceId = (String) allParams.get("serviceId");
        String departmentName = (String) allParams.get("departmentName");
        String departmentUserName = (String) allParams.get("departmentUserName");
        String departmentUserId = (String) allParams.get("departmentUserId");
        String deviceId = (String) allParams.get("deviceId");

        // Extract device ID lists
        List<String> selectedNeedAccessoriesDeviceIds = (List<String>) allParams.get("selectedNeedAccessoriesDeviceIds");
        List<String> selectedExtractListDeviceIds = (List<String>) allParams.get("selectedExtractListDeviceIds");
        String status = (String) allParams.get("status");
        // Remove these keys from the map since they are not form data
        allParams.remove("serviceId");
        allParams.remove("departmentName");
        allParams.remove("departmentUserName");
        allParams.remove("departmentUserId");
        allParams.remove("deviceId");

        allParams.remove("selectedNeedAccessoriesDeviceIds");
        allParams.remove("selectedExtractListDeviceIds");
        allParams.remove("status");
        String startingDate = getCurrentDateTime();

        System.out.println("Received data: " + allParams);

        // Fetch the device based on ID and status
        // Fetch the device based on ID and status
        AddData device = addDataRepository.findByIdAndStatus(deviceId, "1");
        if (device == null) {
            return ResponseEntity.status(404).body("Device with ID " + deviceId + " not found.");
        }

// Initialize components
        Set<String> allListedData = Optional.ofNullable(device.getListedComponents()).orElse(new HashSet<>());
        Set<String> allAccessoriesData = Optional.ofNullable(device.getAddAccessories()).orElse(new HashSet<>());

// Process extracted list
        selectedExtractListDeviceIds.stream()
                .map(id -> addDataRepository.findByIdAndStatus(id, "1"))
                .filter(Objects::nonNull)
                .forEach(newDevice -> {
                    newDevice.setDeviceUsers(Collections.singletonList(new AddData.DeviceUser(
                            departmentName, departmentUserName, departmentUserId, startingDate, "0"
                    )));
                    addDataRepository.save(newDevice);
                   // allListedData.remove(newDevice.getId());
                   // allAccessoriesData.remove(newDevice.getId());
                });

// Add selected accessories
        if (selectedNeedAccessoriesDeviceIds != null) {
            allAccessoriesData.addAll(selectedNeedAccessoriesDeviceIds);
            allListedData.addAll(selectedNeedAccessoriesDeviceIds);
        }

// Save updated device data
        device.setAddAccessories(allAccessoriesData);
        device.setListedComponents(allListedData);
        device.setExtractsNewComponents(new HashSet<>(selectedExtractListDeviceIds));
        addDataRepository.save(device);




        // Find the ServiceRequest document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");
        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setServiceReportTime(getCurrentLocalDateTime());
            requestData.setServiceReportGenerator(departmentName+"_"+departmentUserName+"_"+departmentUserId);

            // Convert List to Set for extractsNewComponents
            requestData.setExtractsNewComponents(new HashSet<>(selectedExtractListDeviceIds));

            // Convert List to Set for addAccessories
            if (selectedNeedAccessoriesDeviceIds != null) {
                requestData.setAddAccessories(new HashSet<>(selectedNeedAccessoriesDeviceIds));
            } else {
                requestData.setAddAccessories(Collections.emptySet());
            }
            requestData.setServiceReportStatus("Saved");
            requestData.setServiceAccessoriesSolutionProvider(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            // Iterate through each problem in the request
            List<ServiceRequest.Solution> serviceFormData1=requestData.getServiceReportFormData();
            List<ServiceRequest.Solution> serviceFormData  =new ArrayList<>(serviceFormData1);
            System.out.println("gh "+serviceFormData);
            requestData.getServiceReportFormData().forEach(problem -> { // all problem
                // Normalize the problem name by replacing spaces with hyphens to match form IDs
                String normalizedProblemName = problem.getName().replace(" ", "-");

                System.out.println("Processing problem: " + problem.getName());

                // Iterate over the remaining entries in allParams (which are the form data)
                for (Map.Entry<String, Object> entry : allParams.entrySet()) {
                    String formId = entry.getKey(); // This is the form's ID (e.g., "LapTop-Slow", "Monitor-Scratch")

                    // Match the normalized problem name with the formId
                    if (normalizedProblemName.equals(formId)) {
                        List<Map<String, Object>> formData = (List<Map<String, Object>>) entry.getValue(); // Form data (list of key-value pairs)

                        System.out.println("Matched form ID: " + formId);
                        System.out.println("Form data: " + formData);

                        // Clear existing proposalSolution if it exists
                        if (problem.getProposalSolution() != null) {
                            problem.getProposalSolution().clear();
                            System.out.println("Cleared existing proposalSolution for problem: " + problem.getName());
                        } else {
                            problem.setProposalSolution(new ArrayList<>());
                        }
                        List<ServiceRequest.Solution.ProposalSolutionItem> list=new ArrayList<>();
                        // Add new form data to proposalSolution
                        formData.forEach(solutionData -> {
                            ServiceRequest.Solution.ProposalSolutionItem data= new ServiceRequest.Solution.ProposalSolutionItem();
                            data.setValue((String) solutionData.get("value"));
                            list.add(data);

                        });
                        problem.setProposalSolution(list);

                        System.out.println("Updated proposalSolution for problem '" + problem.getName() + "': " + problem.getProposalSolution());
                    }
                }
            });


            serviceRequestRepository.save(requestData);
            addDataService.update();
            serviceRequestService.update();

            return ResponseEntity.ok("Data saved successfully");

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
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

        String departmentUserId = allParams.get("departmentUserId");
        allParams.remove("departmentUserId");

        String departmentUserName = allParams.get("departmentUserName");
        allParams.remove("departmentUserName");

        String deviceId = allParams.get("deviceId");
        allParams.remove("deviceId");

        String startingDate = getCurrentDateTime();

        System.out.println(allParams);

        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        AddData adddata = new AddData(departmentName, categoryName, formattedDateTime, currentDate, allParams, "1");
        adddata.setVisibleId(generateNewVisibleIdForNewDevice());
        adddata.setDeviceTypeServicingOrRequestingOrOldAsInputting("Service");
        adddata.setDeviceTypePrimaryOrSecondary("Secondary");
        adddata.setDeviceTypeSecondaryInOrOut("In");

       // AddData.DeviceUser user = new AddData.DeviceUser(departmentName, departmentUserName, departmentUserId, startingDate, "0");
       // List<AddData.DeviceUser> list = new ArrayList<>();
       // list.add(user);
       // adddata.setDeviceUsers(list);

        addDataRepository.save(adddata);


        // return

        // Variable to hold the last device ID
        String lastDeviceId = null;

        // Add this device to extractsNewComponents
        List<AddData> deviceList = addDataRepository.findByStatus("1");

        // Check if the list is not empty
        if (!deviceList.isEmpty()) {
            // Get the last index value
            AddData lastDevice = deviceList.get(deviceList.size() - 1);
            lastDeviceId = lastDevice.getId(); // Capture the ID to return later
            System.out.println("Last Device ID: " + lastDeviceId);

            AddData device = addDataRepository.findByIdAndStatus(deviceId, "1");
            if (device != null) {


                Set<String> data = device.getListedComponents();
                if (data == null) {
                    data = new HashSet<>(); // Initialize the list if null
                }

                // Add the last device ID to extractsNewComponents
                data.add(lastDevice.getId());
                device.setListedComponents(data);

                try {
                    addDataRepository.save(device); // Save the updated device
                    System.out.println("Device updated successfully: " + device.getId());
                } catch (Exception e) {
                    System.out.println("Error saving device: " + e.getMessage());
                    e.printStackTrace();
                }
            } else {
                System.out.println("Device with ID " + deviceId + " and status '1' not found.");
            }
        } else {
            System.out.println("No devices found with status '1'.");
        }
        addDataService.update();
        try {
            // Return last device ID if available
            if (lastDeviceId != null) {
                return ResponseEntity.ok( lastDeviceId);
            } else {
                return ResponseEntity.ok("Data saved successfully, but no last device ID found.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }
    }

    @PostMapping("/addDeviceInformationOfServiceForEdit")
    @ResponseBody
    public ResponseEntity<String> addDeviceInformationOfService(
            @RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        String serviceId = allParams.get("serviceId");
        allParams.remove("serviceId");

        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");

        String departmentUserName = allParams.get("departmentUserName");
        allParams.remove("departmentUserName");

        String departmentUserId = allParams.get("departmentUserId");
        allParams.remove("departmentUserId");




        List<ServiceRequest.problems> listData=new ArrayList<>();
        // Approach 2: Using keySet() and get() method

        for (String key : allParams.keySet()) {
            ServiceRequest.problems data=new ServiceRequest.problems(allParams.get(key),"Pending");
            // System.out.println("Key: " + key + ", Value: " + allParams.get(key));
            listData.add(data);
        }

        // Find the ServiceRequest document by requestId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
            requestData.setProblemEditor(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.setAllProblem(listData);
            serviceRequestRepository.save(requestData);
        }


        try {
            serviceRequestService.update();
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }



    }
    @PostMapping("/setServiceRequestToInventoryData")
    @ResponseBody
    public ResponseEntity<String> setServiceRequestToInventoryData(@RequestBody Map<String, Object> rowData) {
        try {
            System.out.println("Received data: " + rowData);
            // Extract data
            String serviceId = rowData.getOrDefault("serviceId", "N/A").toString();
            String bibagName = rowData.getOrDefault("bibagName", "N/A").toString();
            String solutionCategory = rowData.getOrDefault("solutionCategory", "N/A").toString();
            String solutionName = rowData.getOrDefault("solutionName", "N/A").toString();
            String problemName = rowData.getOrDefault("problemName", "N/A").toString();
            String price = rowData.getOrDefault("price", "0").toString();
            String action = rowData.getOrDefault("action", " ").toString();
            String comment = rowData.getOrDefault("comment", " ").toString();

            String departmentName = rowData.getOrDefault("departmentName", "Unknown").toString();
            String departmentUserName = rowData.getOrDefault("departmentUserName", "Anonymous").toString();
            String departmentUserId = rowData.getOrDefault("departmentUserId", "UnknownID").toString();

            // Retrieve the ServiceRequest by serviceId and status
            Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");
            System.out.println("Fetched ServiceRequest: " + optionalRequestData);

            if (optionalRequestData.isPresent()) {
                ServiceRequest requestData = optionalRequestData.get();

                // Iterate through each problem in the service request
                requestData.getAllProblem().forEach(problem -> {
                    System.out.println("Processing problem: " + problem.getName());
                    if (problem.getName().equals(solutionName)) {
                        // Find and update the existing solution's price by name
                        problem.getProposalSolution().forEach(proposalSolutionItem -> {
                            System.out.println(proposalSolutionItem.getName()+" "+problemName);
                            if (proposalSolutionItem.getName().equals( extractSolution(problemName))) {

                                proposalSolutionItem.setServiceCenterManInfoToInventoryAccessoriesRequest(departmentName + "_" + departmentUserName + "_" + departmentUserId);
                                proposalSolutionItem.setServiceCenterToInventoryAccessoriesRequestStatus("Pending");
                                proposalSolutionItem.setServiceCenterToInventoryAccessoriesRequestTime(getCurrentLocalDateTime());

                            }
                        });


                        System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                    }

                });
                // Persist changes
                serviceRequestRepository.save(requestData);
                serviceRequestService.update();
            }


            // Log received data for debugging


            // TODO: Process the data (e.g., save it to the database)
            // Example:
            // servicePriceService.savePrice(serviceId, solutionCategory, solutionName, problemName, price);

            // Return success response
            return ResponseEntity.ok("Data saved successfully!");

        } catch (Exception ex) {
            // Log the error
            System.err.println("Error processing data: " + ex.getMessage());
            ex.printStackTrace();

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving data. Please try again.");
        }
    }

    @PostMapping("/saveExcel")
    public ResponseEntity<?> saveExcel(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("Received Payload: " + payload);


            // Extract specific data
            String serviceId = (String) payload.get("serviceId");
            List<List<String>> requestInfo = (List<List<String>>) payload.get("requestInfo");
            List<List<String>> actions = (List<List<String>>) payload.get("actions");
            List<List<String>> extractComponents = (List<List<String>>) payload.get("extractComponents");
            List<List<String>> needAccessories = (List<List<String>>) payload.get("needAccessories");

            // Retrieve the service request
            ServiceRequest request = serviceRequestRepository.findByIdAndStatus(serviceId, "1");
            if (request == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service request not found");
            }

            AddData addData=addDataRepository.findByIdAndStatus(request.getDeviceId(),"1");

            requestInfo.forEach(row -> {
                if (requestInfo.indexOf(row) == 0) { // Check if this is the first row
                    row.set(2, "Device-Id"); // Set third column (index 2) value
                    row.set(3, addData.getVisibleId());      // Set fourth column (index 3) value
                }
            });



            // Prepare the PDF
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(outputStream);
            com.itextpdf.kernel.pdf.PdfDocument pdfDocument = new com.itextpdf.kernel.pdf.PdfDocument(writer);
            Document document = new Document(pdfDocument);

            // Add Title
            document.add(new Paragraph("Service Report").setBold().setFontSize(16).setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" ").setMarginTop(0));
            document.add(new Paragraph("Report Created Date: "+request.getServiceReportTime()).setFontSize(12).setTextAlignment(TextAlignment.CENTER));
            // Add tables with headers
            addTableWithHeader("Request Info:", requestInfo, document); // this work fine
            addTableWithHeader1("Taken Actions:", actions, document); // but in this case o index array only on text , but 1 index array table column header names
            addTableWithHeader1("Extract Components:", extractComponents, document);// but in this case o index array only on text , but 1 index array table column header names
            addTableWithHeader1("Add Accessories:", needAccessories, document);// but in this case o index array only on text , but 1 index array table column header names
            document.add(new Paragraph("Servicing Manger Comments:").setMarginTop(10));
            document.add(new Paragraph("COO Comments:").setMarginTop(20));
            document.add(new Paragraph(" ").setMarginTop(40));
            // Create a two-column table for signatures
            Table signatureTable = new Table(2);  // 2 columns

// Add the first cell for "Signature Of Servicing Manager"
            signatureTable.addCell(
                    new Cell()
                            .add(new Paragraph("Signature Of Servicing Manager"))
                            .setTextAlignment(TextAlignment.LEFT)  // Align text to the left
                            .setBorder(Border.NO_BORDER)          // Remove the border if not needed
            );

// Add the second cell for "Signature Of COO"
            signatureTable.addCell(
                    new Cell()
                            .add(new Paragraph("Signature Of COO"))
                            .setTextAlignment(TextAlignment.RIGHT) // Align text to the right
                            .setBorder(Border.NO_BORDER)           // Remove the border if not needed
            );

// Add the table to the document
            signatureTable.setWidth(UnitValue.createPercentValue(100));
            signatureTable.setMarginRight(20f); // Set right margin (in points)
            document.add(signatureTable);



            // Close the document
            document.close();

            // Save PDF to the Downloads directory
            String userHome = System.getProperty("user.home");
            String downloadsDir = userHome + "/Downloads";
            String filePath = downloadsDir + "/service_report.pdf";

            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(outputStream.toByteArray());
                System.out.println("PDF saved to: " + filePath);
            }

            // Return the PDF file as a response
            byte[] pdfBytes = outputStream.toByteArray();
            addDataService.update();
            serviceRequestService.update();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=service_report.pdf")
                    .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while creating the PDF file.");
        }
    }

    private void addTableWithHeader1(String title, List<List<String>> data, Document document) {
        document.add(new Paragraph(title).setBold().setFontSize(14).setMarginTop(10).setMarginBottom(5));

        if (data != null && !data.isEmpty()) {
            // First row is plain text
            List<String> firstRow = data.get(0);
           // document.add(new Paragraph("Text Content: " + String.join(", ", firstRow)).setFontSize(12).setMarginBottom(10));

            // Check if there are more rows to process as the table
            if (data.size() > 1) {
                // Second row as headers
                List<String> headerRow = data.get(1);

                // Create table with the number of columns based on the header row
                Table table = new Table(headerRow.size());

                // Add header row (start from index 1)
                for (String header : headerRow) {
                    // Set background color for header cells
                    Cell headerCell = new Cell().add(new Paragraph(header).setBold()).setTextAlignment(TextAlignment.CENTER);
                    headerCell.setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(169, 169, 169));  // Set background color using iText's DeviceRgb
                    table.addHeaderCell(headerCell);
                }

                // Add body rows (from index 2 onwards)
                for (int i = 2; i < data.size(); i++) {
                    List<String> row = data.get(i);
                    for (String cell : row) {
                        table.addCell(new Cell().add(new Paragraph(cell)).setTextAlignment(TextAlignment.CENTER));
                    }
                }

                // Set table width to a fixed percentage of the page width (e.g., 100%)
                table.setWidth(UnitValue.createPercentValue(100));  // This ensures the table spans 100% of the page width

                // Set left and right margins for the table
                table.setMarginLeft(0f);  // Set left margin (in points)
                table.setMarginRight(20f); // Set right margin (in points)

                // Center align the table horizontally
                table.setHorizontalAlignment(HorizontalAlignment.CENTER);

                // Add table to the document
                document.add(table);
            } else {
                document.add(new Paragraph("No table data available").setItalic());
            }
        } else {
            document.add(new Paragraph("No data available").setItalic());
        }
    }



    // Helper method to add a table with the first row as a header
    private void addTableWithHeader(String title, List<List<String>> data, Document document) {
        document.add(new Paragraph(title).setBold().setFontSize(14).setMarginTop(0).setMarginBottom(5));

        if (data != null && !data.isEmpty()) {
            List<String> headerRow = data.get(0); // First row as header
            List<List<String>> bodyRows = data.subList(1, data.size()); // Remaining rows as body

            // Create table with the number of columns based on the header row
            Table table = new Table(headerRow.size());

            // Add header row with conditional background colors and borders
            int headerColumnIndex = 0;  // Track column index for header row
            for (String header : headerRow) {
                // Create the header cell
                Cell headerCell = new Cell()
                        .add(new Paragraph(header).setBold())
                        .setTextAlignment(TextAlignment.CENTER)
                        .setBorder(new SolidBorder(1));  // Add a border with 1pt width

                // Apply background color for the first and third columns
                if (headerColumnIndex == 0 || headerColumnIndex == 2) {  // First and third columns
                    headerCell.setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(169, 169, 169));  // Light gray
                } else {
                   // headerCell.setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(211, 211, 211));  // Default gray
                }
                headerCell.setTextAlignment(TextAlignment.CENTER);
                // Add the header cell to the table
                table.addHeaderCell(headerCell);

                // Increment column index
                headerColumnIndex++;
            }

// Add body rows with conditional background colors and borders
            int columnIndex;  // Track column index for body rows
            for (List<String> row : bodyRows) {
                columnIndex = 0;
                for (String cell : row) {
                    // Create the cell
                    Cell tableCell = new Cell()
                            .add(new Paragraph(cell))
                            .setBorder(new SolidBorder(1));  // Add a border with 1pt width

                    // Apply background color for the first and third columns
                    if (columnIndex == 0 || columnIndex == 2) {  // First and third columns
                        tableCell.setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(169, 169, 169));  // Light gray

                    }
                    tableCell.setTextAlignment(TextAlignment.CENTER);
                    // Add the cell to the table
                    table.addCell(tableCell);

                    // Increment column index
                    columnIndex++;
                }
            }


            // Set table width to a fixed percentage of the page width (e.g., 100%)
            table.setWidth(UnitValue.createPercentValue(100));  // This ensures the table spans 100% of the page widththe page
            // Set left and right margins for the table
            table.setMarginLeft(0f);  // Set left margin (in points)
            table.setMarginRight(20f); // Set right margin (in points)
            // Center align the entire table
            table.setHorizontalAlignment(HorizontalAlignment.CENTER);
            // Add table to the document
            document.add(table);
        } else {
            document.add(new Paragraph("No data available").setItalic());
        }
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
}
