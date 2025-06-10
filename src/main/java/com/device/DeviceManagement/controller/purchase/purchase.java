package com.device.DeviceManagement.controller.purchase;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.element.Image;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/purchase")
public class purchase {
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
   // private static final Logger logger = LoggerFactory.getLogger(purchase.class);


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

    @PostMapping("/addPurchaseProposal")
    public ResponseEntity<String> addPurchaseProposal(@RequestParam Map<String, String> formData) {
        try {
            // Extract data from formData
            String details = formData.get("details");
            String budget = formData.get("budget");
            String requestId = formData.get("requestId");
            String departmentName=formData.get("departmentName");
            String departmentUserName=formData.get("departmentUserName");
            String departmentUserId =formData.get("departmentUserId");

            formData.remove("details");
            formData.remove("budget");
            formData.remove("requestId");

            formData.remove("departmentName");
            formData.remove("departmentUserName");
            formData.remove("departmentUserId");

            List<String> links=new ArrayList<>();

            formData.forEach((key, value) -> {
                if (key.startsWith("link")) {
                    // Log each link
                    System.out.println("Link: " + value);
                    links.add(value);
                }
            });

            // Generate current date and time
            String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");
            // Perform your business logic here, like saving data to the database
            if (optionalRequestData.isPresent()) {
                RequestData requestData = optionalRequestData.get();

                // Update the inventory with the new deviceIds
                RequestData.Purchase purchase = new RequestData.Purchase("Proposal", presentDateTime, links,details,budget);
                purchase.setCooAns("Pending");
                purchase.setRequestTime(getCurrentLocalDateTime());
                purchase.setPurchaseRequestProviderManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                requestData.setPurchase(purchase);



                requestData.getInventory().setInventoryToPurchaseRequestStatus("Accepted");
                requestData.getInventory().setInventoryToPurchaseRequestAcceptingManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                requestData.getInventory().setInventoryToPurchaseRequestAcceptingTime(getCurrentLocalDateTime());
                requestData.setInventory(requestData.getInventory());
                // Save the updated RequestData document
                requestDataRepository.save(requestData);
                requestDataService.update();
                // Return success message
                return ResponseEntity.ok("Purchase proposal saved successfully!");
            } else {
                return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
            }


        } catch (Exception e) {

            return ResponseEntity.status(500).body("Error saving purchase proposal");
        }
    }
    @PostMapping("/addPurchaseProposalForService")
    public ResponseEntity<String> addPurchaseProposalForService(@RequestParam Map<String, String> formData) {
        try {
            // Extract data from formData
            String details = formData.get("details");
            String budget = formData.get("budget");
            String serviceId = formData.get("serviceId");
            String departmentName=formData.get("departmentName");
            String departmentUserName=formData.get("departmentUserName");
            String departmentUserId =formData.get("departmentUserId");
            String problemName =formData.get("problemName");
            String solutionName =formData.get("solutionName");


            formData.remove("details");
            formData.remove("budget");
            formData.remove("requestId");
            formData.remove("departmentName");
            formData.remove("departmentUserName");
            formData.remove("departmentUserId");
            formData.remove("problemName");
            formData.remove("solutionName");

            List<String> links=new ArrayList<>();

            formData.forEach((key, value) -> {
                if (key.startsWith("link")) {
                    // Log each link
                    System.out.println("Link: " + value);
                    links.add(value);
                }
            });

            // Generate current date and time
            String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


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
                                proposalSolutionItem.setPurchaseProposalToCooManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                                proposalSolutionItem.setPurchaseProposalToCooAns("Pending");
                                proposalSolutionItem.setPurchaseProposalToCooLinks(links);
                                proposalSolutionItem.setPurchaseProposalToCooBudget(budget);
                                proposalSolutionItem.setPurchaseProposalToCooDetails(details);
                                proposalSolutionItem.setPurchaseProposalToCooProposalStatus("Proposal");
                                proposalSolutionItem.setPurchaseProposalToCooTime(getCurrentLocalDateTime());

                            }
                        });


                        System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                    }

                });
                // Persist changes
                serviceRequestRepository.save(requestData);
            }

             serviceRequestService.update();
            return ResponseEntity.ok("Purchase proposal saved successfully!");
        } catch (Exception e) {

            return ResponseEntity.status(500).body("Error saving purchase proposal");
        }
    }

    @PostMapping("/deliverRequestStatus")
    @ResponseBody
    public ResponseEntity<String> deliverRequestStatus(@RequestParam String requestId,@RequestParam String status) {
        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getPurchase().setPurchaseStatus(status);
            requestData.getPurchase().setDeliveryTime(getCurrentLocalDateTime());
            requestData.setPurchase(requestData.getPurchase());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/saveDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> saveTableData(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        String requestId = allParams.get("requestId");
        allParams.remove("requestId");

        //String categoryName = allParams.get("categoryName");
       // allParams.remove("categoryName");

        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getPurchase().setPurchaseStatus("Delivered");
            requestData.getPurchase().setDeliveryTime(getCurrentLocalDateTime());
            requestData.getPurchase().setDeviceData(allParams);
            requestData.getPurchase().setCooPurchaseAcceptedAns("Pending");
            requestData.setPurchase(requestData.getPurchase());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

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
                addDataRepository.save(new AddData(deviceId,device,device.getUserName(),categoryName,formattedDateTime,currentDate,allParams,"1"));
                addDataService.update();

                return ResponseEntity.ok("Device Data Updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }



    }
    @PostMapping("/addProblemSolutionOfServicePrice")
    @ResponseBody
    public ResponseEntity<String> addProblemSolutionOfServicePrice(@RequestBody Map<String, Object> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        System.out.println("Received data: " + allParams);

        // Extract and remove the serviceId as it's not part of the form data
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


        // Retrieve the ServiceRequest by serviceId and status
        Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");

        if (optionalRequestData.isPresent()) {
            ServiceRequest requestData = optionalRequestData.get();
          //  requestData.setPurchaseManInfoOfPriceSetter(departmentName+"_"+departmentUserName+"_"+departmentUserId);

            // Iterate through each problem in the service request
            requestData.getAllProblem().forEach(problem -> {
                System.out.println("Processing problem: " + problem.getName());

                // Process form data entries that match the problem
                allParams.forEach((formId, formData) -> {

                    if (problem.getName().equals(formId)) {
                        List<Map<String, Object>> solutions = (List<Map<String, Object>>) formData;

                        System.out.println("Matched form ID: " + formId);
                        System.out.println("Form data: " + solutions);

                        // Update price for each solution with matching name
                        solutions.forEach(solution -> {
                            String name = (String) solution.get("name");
                            String price = solution.containsKey("value") ? (String) solution.get("value") : "0";

                            // Find and update the existing solution's price by name
                            problem.getProposalSolution().forEach(proposalSolutionItem -> {
                               if (proposalSolutionItem.getName().equals(name)) {
                                    proposalSolutionItem.setPrice( price);
                                    System.out.println("Updated price for solution with name: " + name + " to " + price);
                               }
                            });
                        });

                        System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                    }
                });
            });

            // Persist changes
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();

            return ResponseEntity.ok("Data saved successfully");

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + serviceId + " not found.");
        }
    }
    @PostMapping("/setPrice")
    @ResponseBody
    public ResponseEntity<String> setPrice(@RequestBody Map<String, Object> rowData) {
        try {
            System.out.println("Received data: " + rowData);
            // Extract data
            String serviceId = rowData.getOrDefault("serviceId", "N/A").toString();
            String bibagName = rowData.getOrDefault("bibagName", "N/A").toString();
            String solutionCategory = rowData.getOrDefault("solutionCategory", "N/A").toString();
            String solutionName = rowData.getOrDefault("solutionName", "N/A").toString();
            String problemName = rowData.getOrDefault("problemName", "N/A").toString();
            String price = rowData.getOrDefault("price", "0").toString();

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
                                    proposalSolutionItem.setPrice( price);
                                    proposalSolutionItem.setPurchaseManInfoOfPriceSetter(departmentName + "_" + departmentUserName + "_" + departmentUserId);
                                    proposalSolutionItem.setPurchaseManInfoOfPriceStatus("Updated");
                                    proposalSolutionItem.setPurchaseManInfoOfPriceSettingTime(getCurrentLocalDateTime());
                                    System.out.println(price);
                                }
                            });


                        System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                    }

                });
                // Persist changes
                serviceRequestRepository.save(requestData);
            }


            // Log received data for debugging


            // TODO: Process the data (e.g., save it to the database)
            // Example:
            // servicePriceService.savePrice(serviceId, solutionCategory, solutionName, problemName, price);

            // Return success response
            serviceRequestService.update();
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
    // Endpoint to handle the incoming request
    @PostMapping("/addPaymentList")
    @ResponseBody
    public ResponseEntity<String> addPurchaseList(@RequestBody PurchaseRequestDTO purchaseRequest) {
        try {
            // Extract department information


            List<String> requests=purchaseRequest.getRequests();
            if(!requests.isEmpty()){
             requests.forEach(e->{
                 // Find the RequestData document by requestId and status
                 Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(e, "1");

                 if (optionalRequestData.isPresent()) {
                     RequestData requestData = optionalRequestData.get();

                     requestData.getPurchase().setPurchasePaymentToCooRequestManInfo(purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());
                     requestData.getPurchase().setPurchasePaymentToCooRequestTime(getCurrentLocalDateTime());
                     requestData.getPurchase().setPurchasePaymentToCooRequestStatus("Pending");
                     // Update the inventory with the new deviceIds

                     requestData.setPurchase(requestData.getPurchase());

                     // Save the updated RequestData document
                     requestDataRepository.save(requestData);
                 }
             });
            }
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
                                       proposalSolutionItem.setPurchasePaymentToCooRequestManInfo(purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());
                                        proposalSolutionItem.setPurchasePaymentToCooRequestTime(getCurrentLocalDateTime());
                                        proposalSolutionItem.setPurchasePaymentToCooRequestStatus("Pending");


                                    }
                                });


                                System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                            }

                        });
                        // Persist changes
                       serviceRequestRepository.save(requestData);
                    }
                });
            }

            // Perform necessary logic (e.g., saving to a database)

            requestDataService.update();
            serviceRequestService.update();

            return ResponseEntity.ok("Purchase list added successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }
    @PostMapping("/addPaymentListExport")
    @ResponseBody
    public ResponseEntity<String> addPurchaseListExport(@RequestBody PurchaseRequestDTO purchaseRequest) {
        try {


            List<String> requests=purchaseRequest.getRequests();
            if(!requests.isEmpty()){
                requests.forEach(e->{
                    // Find the RequestData document by requestId and status
                    Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(e, "1");

                    if (optionalRequestData.isPresent()) {
                        RequestData requestData = optionalRequestData.get();
                        requestData.getPurchase().setPurchaseDeviceExportStatus("Exported");
                        requestData.getPurchase().setPurchaseDeviceExportTime(getCurrentLocalDateTime());
                        requestData.getPurchase().setPurchaseDeviceExportManInfo(purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());

                        requestData.setPurchase(requestData.getPurchase());

                        // Save the updated RequestData document
                        requestDataRepository.save(requestData);
                    }
                });
            }
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
                                        proposalSolutionItem.setPurchaseDeviceExportStatus("Exported");
                                        proposalSolutionItem.setPurchaseDeviceExportTime(getCurrentLocalDateTime());
                                        proposalSolutionItem.setPurchaseDeviceExportManInfo(purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());

                                    }
                                });


                                System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                            }

                        });
                        // Persist changes
                        serviceRequestRepository.save(requestData);
                    }
                });
            }

            // Perform necessary logic (e.g., saving to a database)
            requestDataService.update();
            serviceRequestService.update();

            return ResponseEntity.ok("Purchase list added successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }
    @PostMapping("/addDeviceInformationExtraDevice")
    @ResponseBody
    public ResponseEntity<String> addDeviceInformationExtraDevice(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }
        System.out.println("Received data: " + allParams);

        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");
        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");

        String requestId = allParams.get("requestId");
        allParams.remove("requestId");

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
        adddata.setVisibleId(generateNewVisibleIdForNewDevice());
        AddData.UnOrderedDevice unOrderedDevice=new AddData.UnOrderedDevice();
        unOrderedDevice.setCOOUnOrderedDeviceAcceptedStatus("UnOrdered");
       // adddata.setOrderedDeviceStatus("unOrdered");
        adddata.setUnOrderedDevice(unOrderedDevice);
        adddata.setDeviceTypeServicingOrRequestingOrOldAsInputting("New");
        adddata.setDeviceTypePrimaryOrSecondary(deviceType);
        if(deviceType.equals("Secondary")){
            adddata.setDeviceTypeSecondaryInOrOut("Out");
        }
        AddData.DeviceUser user=new AddData.DeviceUser(departmentName,userName,userId,getCurrentLocalDateTime(),"1");
        List<AddData.DeviceUser> list=new ArrayList<>();
        list.add(user);
        adddata.setDeviceUsers(list);

        addDataRepository.save(adddata);

        // last device id
        List<AddData>  data=addDataRepository.findByStatus("1");

        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();
            requestData.getPurchase().setDeviceBuyingStatus("Bought");
            // Update the inventory with the new deviceIds

            requestData.getPurchase().setBuyingDeviceId(data.get(data.size()-1).getId());
            requestData.setPurchase(requestData.getPurchase());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
        }



        try {

          addDataService.update();
          requestDataService.update();
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
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

        System.out.println(allParams);

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
    @PostMapping("/addDeviceInformationPurchase")
    @ResponseBody
    public ResponseEntity<String> addDeviceInformationPurchase(@RequestParam Map<String, String> allParams) {
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

        String requestId = allParams.get("requestId");
        allParams.remove("requestId");
       // System.out.println(allParams);

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

     RequestData data=requestDataRepository.findByIdAndStatus(requestId,"1");
     List<AddData>  dataList=addDataRepository.findByStatus("1");
     RequestData.Purchase mm=data.getPurchase();
     mm.setBuyingDeviceId(dataList.get(dataList.size()-1).getId());
     mm.setDeviceBuyingStatus("Bought");
     requestDataRepository.save(data);
        try {

             addDataService.update();
             requestDataService.update();
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }
    }
    @PostMapping("/addDeviceInformationForService")
    @ResponseBody
    public ResponseEntity<String> addDeviceInformationForService(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }
        System.out.println("Received data: " + allParams);

        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");
        String departmentName = allParams.get("departmentName");
        allParams.remove("departmentName");

        String serviceId = allParams.get("serviceId");
        allParams.remove("serviceId");

        String problemName = allParams.get("problemName");
        allParams.remove("problemName");

        String solutionName = allParams.get("solutionName");
        allParams.remove("solutionName");

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
        adddata.setDeviceTypeServicingOrRequestingOrOldAsInputting("New");
        adddata.setDeviceTypePrimaryOrSecondary(deviceType);
        if(deviceType.equals("Secondary")){
            adddata.setDeviceTypeSecondaryInOrOut("Out");
        }
        AddData.DeviceUser user=new AddData.DeviceUser(departmentName,userName,userId,getCurrentLocalDateTime(),"1");
        List<AddData.DeviceUser> list=new ArrayList<>();
        list.add(user);
        adddata.setDeviceUsers(list);

        addDataRepository.save(adddata);

        // last device id
        List<AddData>  data=addDataRepository.findByStatus("1");

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

                            proposalSolutionItem.setDeviceBuyingStatus("Bought");
                            proposalSolutionItem.setBuyingDeviceId(data.get(data.size()-1).getId());

                        }
                    });


                    System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                }

            });
            // Persist changes
            serviceRequestRepository.save(requestData);
        }


        try {

          addDataService.update();
          serviceRequestService.update();
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }
    }

    // Endpoint to handle the incoming request
    @PostMapping("/sendDeliveryDevicePurchaseToInventory")
    @ResponseBody
    public ResponseEntity<String> sendDeliveryDevicePurchaseToInventory(@RequestBody Map<String, Object> payload) {

        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");
        List<String> deviceIds = (List<String>) payload.get("deviceId");
        String deviceId=deviceIds.getFirst();
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");

        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            requestData.getPurchase().setPurchaseDeviceSenderToInventoryManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
            requestData.getPurchase().setPurchaseDeviceSenderToInventoryStatus("Pending");
            requestData.getPurchase().setPurchaseDeviceSenderToInventoryTime(getCurrentLocalDateTime());
            requestData.getPurchase().setPurchaseDeviceSenderToInventoryDeviceId(deviceId);
            requestData.setPurchase(requestData.getPurchase());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);

             requestDataService.update();

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }

    // Endpoint to handle the incoming request
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

                            proposalSolutionItem.setPurchaseDeviceSenderToInventoryManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                            proposalSolutionItem.setPurchaseDeviceSenderToInventoryStatus("Pending");
                            proposalSolutionItem.setPurchaseDeviceSenderToInventoryTime(getCurrentLocalDateTime());
                            proposalSolutionItem.setPurchaseDeviceSenderToInventoryDeviceId(deviceId);

                        }
                    });


                    System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                }

            });
            // Persist changes
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
        }


        return ResponseEntity.ok("Selected rows processed successfully");
    }

    @PostMapping("/exportDataForOrderedDevice")
    public ResponseEntity<byte[]> exportDataForOrderedDevice(@RequestBody List<Map<String, String>> data) {
       // System.out.println(data);

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            try {
                InputStream imageStream = getClass().getClassLoader()
                        .getResourceAsStream("static/img/eartface.png");

                if (imageStream == null) {
                    throw new FileNotFoundException("Image resource not found");
                }

                ImageData imageData = ImageDataFactory.create(IOUtils.toByteArray(imageStream));
                Image image = new Image(imageData);

                image.setWidth(100);
                image.setAutoScale(true);

                document.add(image);

            } catch (IOException e) {
                throw new RuntimeException("Error loading image resource", e);
            }

            document.add(new Paragraph("\n"));

            Paragraph title = new Paragraph("(Ordered Devices)")
                    .setBold()
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.CENTER);

            document.add(title);
            document.add(new Paragraph("\n"));

            if (!data.isEmpty()) {
                Set<String> headers = data.get(0).keySet();

                double totalPrice = data.stream()
                        .map(row -> row.get("Price"))
                        .filter(Objects::nonNull)
                        .mapToDouble(p -> {
                            try {
                                return Double.parseDouble(p);
                            } catch (Exception e) {
                                return 0.0;
                            }
                        })
                        .sum();

                // Info table for total price and date
                Table infoTable = new Table(2).useAllAvailableWidth();

                Cell priceCell = new Cell()
                        .add(new Paragraph("Total Price: " + String.format("%.2f", totalPrice)).setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.LEFT);

                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
                Cell dateCell = new Cell()
                        .add(new Paragraph("Date: " + currentDate).setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.RIGHT);

                infoTable.addCell(priceCell);
                infoTable.addCell(dateCell);

                document.add(infoTable);
                document.add(new Paragraph("\n"));

                // Remove "Action" from headers before setting column widths
                List<String> filteredHeaders = headers.stream()
                        .filter(h -> !"Action".equalsIgnoreCase(h))
                        .collect(Collectors.toList());

                Table table = new Table(UnitValue.createPercentArray(filteredHeaders.size()))
                        .useAllAvailableWidth();
                // Header row with gray background and white text
                for (String header : filteredHeaders) {
                    Cell headerCell = new Cell()
                            .add(new Paragraph(header).setBold().setFontColor(ColorConstants.WHITE))
                            .setTextAlignment(TextAlignment.CENTER)
                            .setBackgroundColor(ColorConstants.GRAY);
                    table.addHeaderCell(headerCell);
                }

                // Data rows with alternating background colors and centered text
                boolean alternate = false;
                for (Map<String, String> row : data) {
                    for (String header : filteredHeaders) {
                        String value = row.getOrDefault(header, "");

                        // Clean only the "Description" field
                        if ("Description".equalsIgnoreCase(header)) {
                            value = value.replaceAll("\\s+", " ").trim();
                        }

                        Cell cell = new Cell()
                                .add(new Paragraph(value))
                                .setTextAlignment(TextAlignment.CENTER);

                        if (alternate) {
                            cell.setBackgroundColor(ColorConstants.LIGHT_GRAY);
                        }
                        table.addCell(cell);
                    }

                    alternate = !alternate;
                }

                // Add empty cells spanning entire table width for signature row
                int colCount = headers.size();
                Cell signatureCell = new Cell(1, colCount).setBorder(Border.NO_BORDER);
                table.addCell(signatureCell);  // blank row for spacing

                // Signature row (two cells)
                Table signatureTable = new Table(new float[]{1, 1}).useAllAvailableWidth().setBorder(Border.NO_BORDER);

                Cell purchaseCell = new Cell()
                        .add(new Paragraph("Purchase").setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.LEFT);

                Cell cooCell = new Cell()
                        .add(new Paragraph("COO").setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.RIGHT);

                signatureTable.addCell(purchaseCell);
                signatureTable.addCell(cooCell);

                // Wrap signature table in a cell spanning the full width of the main table
                Cell signatureWrapperCell = new Cell(1, colCount)
                        .add(signatureTable)
                        .setBorder(Border.NO_BORDER);

                Cell spacerCell = new Cell(1, colCount)
                        .setBorder(Border.NO_BORDER)
                        .setHeight(60f); // add vertical height for space
                table.addCell(spacerCell);

                table.addCell(signatureWrapperCell);


                document.add(table);
            } else {
                document.add(new Paragraph("No data available."));
            }

            document.close();

            byte[] pdfBytes = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment().filename("exported-data.pdf").build());
            headers.setContentLength(pdfBytes.length);

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/exportDataForExtraDevice")
    public ResponseEntity<byte[]> receiveExportData(@RequestBody List<Map<String, String>> data) {
        System.out.println("Received data: " + data);
        data.forEach(e->{
            Optional<AddData> info=addDataRepository.findByVisibleIdAndStatus(e.get("SN"),"1");
            if(info.isPresent()){
                AddData mat=info.get();
                AddData.UnOrderedDevice unOrderedDevice=mat.getUnOrderedDevice();
                if(unOrderedDevice!=null){
                    unOrderedDevice.setExtraDeviceExportingStatus("Exported");
                    unOrderedDevice.setExtraDeviceExportingTime(getCurrentLocalDateTime());
                    addDataRepository.save(mat);

                }

            }
        });
        addDataService.update();
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            try {
                InputStream imageStream = getClass().getClassLoader()
                        .getResourceAsStream("static/img/eartface.png");

                if (imageStream == null) {
                    throw new FileNotFoundException("Image resource not found");
                }

                ImageData imageData = ImageDataFactory.create(IOUtils.toByteArray(imageStream));
                Image image = new Image(imageData);

                image.setWidth(100);
                image.setAutoScale(true);

                document.add(image);

            } catch (IOException e) {
                throw new RuntimeException("Error loading image resource", e);
            }

            document.add(new Paragraph("\n"));

            Paragraph title = new Paragraph("(Un-Ordered Devices)")
                    .setBold()
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.CENTER);

            document.add(title);
            document.add(new Paragraph("\n"));

            if (!data.isEmpty()) {
                Set<String> headers = data.get(0).keySet();

                double totalPrice = data.stream()
                        .map(row -> row.get("Price"))
                        .filter(Objects::nonNull)
                        .mapToDouble(p -> {
                            try {
                                return Double.parseDouble(p);
                            } catch (Exception e) {
                                return 0.0;
                            }
                        })
                        .sum();

                // Info table for total price and date
                Table infoTable = new Table(2).useAllAvailableWidth();

                Cell priceCell = new Cell()
                        .add(new Paragraph("Total Price: " + String.format("%.2f", totalPrice)).setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.LEFT);

                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
                Cell dateCell = new Cell()
                        .add(new Paragraph("Date: " + currentDate).setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.RIGHT);

                infoTable.addCell(priceCell);
                infoTable.addCell(dateCell);

                document.add(infoTable);
                document.add(new Paragraph("\n"));

                Table table = new Table(UnitValue.createPercentArray(headers.size()))
                        .useAllAvailableWidth();

                // Header row with gray background and white text
                for (String header : headers) {
                    Cell headerCell = new Cell()
                            .add(new Paragraph(header).setBold().setFontColor(ColorConstants.WHITE))
                            .setTextAlignment(TextAlignment.CENTER)
                            .setBackgroundColor(ColorConstants.GRAY);
                    table.addHeaderCell(headerCell);
                }

                // Data rows with alternating background colors and centered text
                boolean alternate = false;
                for (Map<String, String> row : data) {
                    for (String header : headers) {
                        Cell cell = new Cell()
                                .add(new Paragraph(row.getOrDefault(header, "")))
                                .setTextAlignment(TextAlignment.CENTER);
                        if (alternate) {
                            cell.setBackgroundColor(ColorConstants.LIGHT_GRAY);
                        }
                        table.addCell(cell);
                    }
                    alternate = !alternate;
                }

                // Add empty cells spanning entire table width for signature row
                int colCount = headers.size();
                Cell signatureCell = new Cell(1, colCount).setBorder(Border.NO_BORDER);
                table.addCell(signatureCell);  // blank row for spacing

                // Signature row (two cells)
                Table signatureTable = new Table(new float[]{1, 1}).useAllAvailableWidth().setBorder(Border.NO_BORDER);

                Cell purchaseCell = new Cell()
                        .add(new Paragraph("Purchase").setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.LEFT);

                Cell cooCell = new Cell()
                        .add(new Paragraph("COO").setBold())
                        .setBorder(Border.NO_BORDER)
                        .setTextAlignment(TextAlignment.RIGHT);

                signatureTable.addCell(purchaseCell);
                signatureTable.addCell(cooCell);

                // Wrap signature table in a cell spanning the full width of the main table
                Cell signatureWrapperCell = new Cell(1, colCount)
                        .add(signatureTable)
                        .setBorder(Border.NO_BORDER);

                Cell spacerCell = new Cell(1, colCount)
                        .setBorder(Border.NO_BORDER)
                        .setHeight(60f); // add vertical height for space
                table.addCell(spacerCell);

                table.addCell(signatureWrapperCell);


                document.add(table);
            } else {
                document.add(new Paragraph("No data available."));
            }

            document.close();

            byte[] pdfBytes = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment().filename("exported-data.pdf").build());
            headers.setContentLength(pdfBytes.length);

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/deliverUnOrderedDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> deleteDeviceInformation(@RequestBody Map<String, Object> payload) {
        String deviceId=(String) payload.get("deviceId");
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");
        AddData device = addDataRepository.findByIdAndStatus(deviceId,"1");
        try {
            if (device != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                AddData.UnOrderedDevice dd=device.getUnOrderedDevice();
                dd.setUnWantedSendDeviceToInventoryStatus("Pending");
                dd.setUnWantedSendDeviceToInventoryTime(getCurrentLocalDateTime());
                dd.setUnWantedSendDeviceToInventoryManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                addDataRepository.save(device); // Save the updated category


                return ResponseEntity.ok("Device deliver request successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }
    // Method to extract the part before the hyphen inside parentheses
    public static String extractSolution(String input) {
        // Regular expression to capture the part before the hyphen inside parentheses
        Pattern pattern = Pattern.compile("\\(([^-\\)]+)-.*\\)");
        Matcher matcher = pattern.matcher(input);

        // If the pattern is found, return the captured group (before the hyphen)
        if (matcher.find()) {
            return matcher.group(1); // Capture the part before the hyphen
        } else {
            return "No match found"; // Return a default message if no match is found
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
}
