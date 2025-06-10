package com.device.DeviceManagement.controller.superAdmin;
import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.Designation;


import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/superAdmin")
public class SuperAdmin {
    String nameK="",actionK="",commentK="",nameMain;
    List<String> inputTypes = Arrays.asList(
            "text", "password", "email", "url", "search", "tel", "number", "range",
            "date", "month", "week", "time", "datetime-local", "color", "file",
            "checkbox", "radio", "button", "submit", "reset", "textarea","customDropDownList"
    );
    @Autowired
    private  RequestDataRepository requestDataRepository;
    @Autowired
    private BranchUserRepository branchUserRepository;

    @Autowired
    private RequestColumnRepository requestColumnRepository;
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DesignationRepository designationRepository;

    @Autowired
    private ColumnRepository columnRepository;
    @Autowired
    private AddDataRepository addDataRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;

    @Autowired
    private DropDownListRepository dropDownListRepository;

    boolean resultAccessories,resultComponents;
    int sizeAccessories,sizeComponents;
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

    @GetMapping("/home")
    public String home(Model model) {
//

        List<Category> categories = categoriesService.Category();
       List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();
        List<AddData> allDeviceData=addDataService.add();
        List<User> allUser=userService.add();
        List<InternalUser> internalUsers=internalUserService.add();
        List<RequestColumn> requestColumns=requestColumnService.add();
        List<ServiceRequest> serviceRequests = serviceRequestService.add();
        List<RequestData> requestData=requestDataService.add();
        List<DropDownList> dropDownLists=dropDownListService.add();
        List<Designation> designations=designationService.add();

       model.addAttribute("data",categories);
       model.addAttribute("universalColumns",universalColumns);
        model.addAttribute("individualColumns",individualColumns);
        model.addAttribute("individualColumns",individualColumns);
        model.addAttribute("allDeviceData",allDeviceData);
        model.addAttribute("allUsers",allUser);
        model.addAttribute("indoorUsers",internalUsers);
        model.addAttribute("requestColumns",requestColumns);
        model.addAttribute("serviceRequests", serviceRequests);
        model.addAttribute("requestData",requestData);
        model.addAttribute("dropDownLists",dropDownLists);
        model.addAttribute("designations",designations);


        model.addAttribute("inputTypes", inputTypes);
        return "superAdmin/home"; // This will return the index.html Thymeleaf template
    }
    // Add category method here
    @PostMapping("/addCategory")
    @ResponseBody
    public ResponseEntity<String> addCategory(@RequestParam String categoryName, Model model) {

        if(! categoryRepository.existsByCategoryNameAndStatus(categoryName,"1")){
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
             // permanent field
            Column data=columnRepository.findByColumnNameAndStatus("Price","1");
            if(data==null){
                columnRepository.save(new Column("Price",formattedDateTime,currentDate,"1","universal","universal","yes","number"));
                return ResponseEntity.ok("Successfully added data");

            }
            // Save the Category object
            categoryRepository.save(new Category(categoryName,formattedDateTime,currentDate,"1"));

            // move to return "user/Home";
            // redis update
            categoriesService.updateCategories();
            return ResponseEntity.ok("Successfully added data");
        }else{
            return ResponseEntity.ok("Sorry, Already category added");
        }


    }
    @PostMapping("/addDesignation")
    @ResponseBody
    public ResponseEntity<String> addDesignation(@RequestParam String designationName, Model model) {

        if(! designationRepository.existsByDesignationNameAndStatus(designationName,"1")){
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


            // Save the Category object
            designationRepository.save(new Designation(designationName,formattedDateTime,currentDate,"1"));
            designationService.update();
            // move to return "user/Home";
            return ResponseEntity.ok("Successfully added data");
        }else{
            return ResponseEntity.ok("Sorry, Already Designation added");
        }


    }

    // Update category method
    @PostMapping("/updateCategory")
    @ResponseBody
    public ResponseEntity<String> updateCategory(@RequestParam String oldCategoryName, @RequestParam String newCategoryName) {
        try {
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            // Find the category by old name
            Category category = categoryRepository.findByCategoryName(oldCategoryName);
            if (category != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                category.setStatus("0");
                categoryRepository.save(category); // Save the updated category
                // new save
                categoryRepository.save(new Category(newCategoryName,formattedDateTime,currentDate,"1"));

                // also update column

                // Fetch and update columns associated with the category
                List<Column> columns = columnRepository.findByCategoryName(oldCategoryName);
                for (Column column : columns) {
                    column.setCategoryName(newCategoryName);
                    columnRepository.save(column);
                }

// redis update
                categoriesService.updateCategories();
                return ResponseEntity.ok("Category updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }
    // Update category method
    @PostMapping("/updateDesignation")
    @ResponseBody
    public ResponseEntity<String> updateDesignation(@RequestParam String oldDesignationName, @RequestParam String newDesignationName) {
        try {
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            // Find the category by old name
            Designation designation = designationRepository.findByDesignationName(oldDesignationName);
            if (designation != null) {
                // Update Designation name
                /// category.setCategoryName(newCategoryName);
                designation.setStatus("0");
                designationRepository.save(designation); // Save the updated category
                // new save
                designationRepository.save(new Designation                                                    (newDesignationName,formattedDateTime,currentDate,"1"));
                designationService.update();
                return ResponseEntity.ok("Designation updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }

    @PostMapping("/deleteCategory")
    @ResponseBody
    public ResponseEntity<String> deleteCategory(@RequestParam String categoryName) {
        Category category = categoryRepository.findByCategoryName(categoryName);
        try {
            if (category != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                category.setStatus("2");
                categoryRepository.save(category); // Save the updated category

                // Fetch and update columns associated with the category
                List<Column> columns = columnRepository.findByCategoryName(categoryName);
                for (Column column : columns) {
                    column.setStatus("2");
                    System.out.println(column.getColumnName()+" is updated");
                    columnRepository.save(column);
                }


// redis update
                categoriesService.clearCategoriesCache();
                return ResponseEntity.ok("Category deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }
    @PostMapping("/deleteDesignation")
    @ResponseBody
    public ResponseEntity<String> deleteDesignation(@RequestParam String designationName) {
        Designation designation = designationRepository.findByDesignationName(designationName);
        try {
            if (designation != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                designation.setStatus("2");
                designationRepository.save(designation); // Save the updated category


                designationService.clearCache();
                return ResponseEntity.ok("Designation deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }

    @PostMapping("/addUniversalColumn")
    @ResponseBody
    public ResponseEntity<String> addColumn(@RequestParam String universalColumnName,@RequestParam String dataType,@RequestParam String requiredType, Model model) {

        if( !columnRepository.existsByColumnNameAndCategoryNameAndStatus(universalColumnName,"universal","1")){

            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            Column data=columnRepository.findByColumnNameAndStatus(universalColumnName,"1");
            if(data!=null){
                columnRepository.save(new Column(universalColumnName,formattedDateTime,currentDate,"1","universal","universal",requiredType,dataType));
            }
            // Save the Category object

            // move to return "user/Home";
            universalColumnsService.updateUniversalColumn();
            return ResponseEntity.ok("Successfully added data");
        }else{
            return ResponseEntity.ok("Sorry, Already column added to universal category");
        }

    }

    @PostMapping("/updateUniversalColumn")
    @ResponseBody
    public ResponseEntity<String> updateColumn(@RequestParam String oldColumnName,
                                               @RequestParam String oldDataType,
                                               @RequestParam String oldRequiredType,
                                               @RequestParam String newColumnName,
                                               @RequestParam String newDataType,
                                               @RequestParam String newRequiredType) {
        try {
            // Find the category by old name
            Column column = columnRepository.findByColumnNameAndColumnTypeAndStatus(oldColumnName,"universal","1");
            if (column != null) {

                column.setStatus("0");
                // Update category name
               // column.setColumnName(newColumnName);
                columnRepository.save(column); // Save the updated category

                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


                // Save the Category object
                columnRepository.save(new Column(newColumnName,formattedDateTime,currentDate,"1","universal","universal",newRequiredType,newDataType));
                universalColumnsService.updateUniversalColumn();
                return ResponseEntity.ok("Column updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }

    @PostMapping("/deleteUniversalColumn")
    @ResponseBody
    public ResponseEntity<String> deleteColumn(@RequestParam String universalColumnName) {
        try {
            // Find the category by old name
            Column column = columnRepository.findByColumnNameAndColumnTypeAndStatus(universalColumnName,"universal","1");
            if (column != null) {

                column.setStatus("2");

                columnRepository.save(column); // Save the updated category

                universalColumnsService.clearUniversalColumnCache();
                return ResponseEntity.ok("Column deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }

    @PostMapping("/addIndividualColumn")
    @ResponseBody
    public ResponseEntity<String> addIndividualColumn(@RequestParam String individualColumnName,@RequestParam String individualCategoryName, @RequestParam String dataType,@RequestParam String requiredType,Model model) {
        if(!columnRepository.existsByColumnNameAndCategoryNameAndStatus(individualColumnName,individualCategoryName,"1")){
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            Optional<Column> existingColumn = columnRepository.findByCategoryNameAndColumnNameAndColumnTypeAndStatus(
                    individualCategoryName, individualColumnName, "individual", "1");

            if (existingColumn.isEmpty()) {
                Column newColumn = new Column(
                        individualColumnName,
                        formattedDateTime,
                        currentDate,
                        "1",
                        "individual",
                        individualCategoryName,
                        dataType,
                        requiredType
                );
                individualColumnsService.updateUniversalColumn();
                columnRepository.save(newColumn);
               // System.out.println("Inserted");
            }

            else{
                System.out.println("Not Inserted");
            }
            // Save the Category object

            // move to return "user/Home";
            return ResponseEntity.ok("Successfully added data");
        }else {
            return ResponseEntity.ok("Sorry, Already this column added to "+individualCategoryName+" category");
        }



    }
    @PostMapping("/deleteIndividualColumn")
    @ResponseBody
    public ResponseEntity<String> deleteIndividualColumn(@RequestParam String oldIndividualCategoryName,@RequestParam String oldIndividualColumnName) {
        try {
            // Find the category by old name
            Optional<Column> columnOptional = columnRepository.findByCategoryNameAndColumnNameAndColumnTypeAndStatus(
                    oldIndividualCategoryName, oldIndividualColumnName, "individual", "1");

            if (columnOptional.isPresent()) {
                Column column = columnOptional.get();
                column.setStatus("2");
                columnRepository.save(column);
                individualColumnsService.clearUniversalColumnCache();
                return ResponseEntity.ok("Column deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }
    @PostMapping("/editIndividualColumn")
    @ResponseBody
    public ResponseEntity<String> editIndividualColumn(
            @RequestParam String oldIndividualCategoryName,
            @RequestParam String oldIndividualColumnName,
            @RequestParam String oldDataType, // Corrected typo here
            @RequestParam String oldRequiredType,
            @RequestParam String newIndividualCategoryName,
            @RequestParam String newIndividualColumnName,
            @RequestParam String newDataType,
            @RequestParam String newRequiredType) {
        try {
            // Find the category by old name
            Optional<Column> optionalOldColumn = columnRepository.findByCategoryNameAndColumnNameAndColumnTypeAndStatus(
                    oldIndividualCategoryName, oldIndividualColumnName, "individual", "1");

            if (optionalOldColumn.isPresent()) {
                Column oldColumn = optionalOldColumn.get();
                oldColumn.setStatus("0");
                columnRepository.save(oldColumn); // Mark the old column as inactive

                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                Optional<Column> optionalNewColumn = columnRepository.findByCategoryNameAndColumnNameAndColumnTypeAndStatus(
                        newIndividualCategoryName, newIndividualColumnName, "individual", "1");

                if (optionalNewColumn.isPresent()) {
                    // Save the new column object
                    Column newColumn = new Column(
                            newIndividualColumnName,
                            formattedDateTime,
                            currentDate,
                            "1",
                            "individual",
                            newIndividualCategoryName,
                            newDataType,
                            newRequiredType
                    );
                    individualColumnsService.updateUniversalColumn();
                    columnRepository.save(newColumn);
                }

                return ResponseEntity.ok("Column updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }


    @PostMapping("/addUser")
    @ResponseBody
    public ResponseEntity<String> addUser(@RequestParam String userName,@RequestParam String userId,@RequestParam String userPassword, Model model) {

        if(! authenticate(userName,userPassword))
        {
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


            // Save the Category object
            userRepository.save(new User(userName,userId,userPassword,currentDate,formattedDateTime,"1"));
            userService.update();
            // move to return "user/Home";
            return ResponseEntity.ok("Successfully added user");
        }else{
            return ResponseEntity.ok("Sorry, Already user added");
        }


    }
    @PostMapping("/deleteUser")
    @ResponseBody
    public ResponseEntity<String> deleteUser(@RequestParam String userName,@RequestParam String userId,@RequestParam String userPassword) {
        try {
            // Find the category by old name
            User user = userRepository.findByUserNameAndUserIdAndUserPasswordAndStatus(userName,userId,userPassword,"1");
            if (user != null) {

                user.setStatus("2");

                userRepository.save(user); // Save the updated category
                userService.clearCache();

                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }
    @PostMapping("/editUser")
    @ResponseBody
    public ResponseEntity<String> editUser(@RequestParam String oldUserName,@RequestParam String oldUserId,@RequestParam String oldUserPassword,@RequestParam String newUserName,@RequestParam String newUserId,@RequestParam String newUserPassword) {

        try {
            // Find the category by old name
            User user = userRepository.findByUserNameAndUserIdAndUserPasswordAndStatus(oldUserName,oldUserId,oldUserPassword,"1");
            if (user != null) {


                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                if(! authenticate(newUserName,newUserPassword)){
                    userRepository.save(new User(newUserName,newUserId,newUserPassword,currentDate,formattedDateTime,"1"));
                    user.setStatus("0");

                    userRepository.save(user); // Save the updated category
                    List<InternalUser> data=internalUserRepository.findByBranchNameAndStatus(oldUserName,"1");
                    data.forEach(e->{
                       // System.out.println(oldUserId+" gg "+ e.getBranchName());
                        if(oldUserName.equals(e.getBranchName())){
                            e.setBranchName(newUserName);
                            internalUserRepository.save(e);
                            System.out.println("Updated InternalUser: " + e); // Logging
                        }
                    });

                    userService.update();
                    return ResponseEntity.ok("User edited successfully");
                }
                else{
                    return ResponseEntity.ok("Sorry This user already exist");
                }
                // Save the Category object


            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }
    @PostMapping("/addInternalUser")
    @ResponseBody
    public ResponseEntity<String>addInternalUser(@RequestParam String branchName,@RequestParam String userName,@RequestParam String userId,@RequestParam String userPassword, Model model) {

        if(! authenticate(userName,userPassword)){
            // Get the current localDate time and date
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


            // Save the Category object
            internalUserRepository.save(new InternalUser(branchName,userName,userId,userPassword,currentDate,formattedDateTime,"1"));
             internalUserService.update();
            // move to return "user/Home";
            return ResponseEntity.ok("Successfully added user");
        }else{
            return ResponseEntity.ok("Sorry, Already user added");
        }


    }
    @PostMapping("/editInternalUser")
    @ResponseBody
    public ResponseEntity<String> editInternalUser(@RequestParam String oldBranchName,@RequestParam String oldUserName,@RequestParam String oldUserId,@RequestParam String oldUserPassword,@RequestParam String newBranchName,@RequestParam String newUserName,@RequestParam String newUserId,@RequestParam String newUserPassword) {

        System.out.println(oldUserName+" "+newUserName);
        try {
            // Find the category by old name
            InternalUser user = internalUserRepository.findByBranchNameAndUserNameAndUserIdAndUserPasswordAndStatus(oldBranchName,oldUserName,oldUserId,oldUserPassword,"1");
            if (user != null) {


                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                if(! authenticate(newUserName,newUserPassword)){
                    internalUserRepository.save(new InternalUser(newBranchName,newUserName,newUserId,newUserPassword,currentDate,formattedDateTime,"1"));
                    user.setStatus("0");

                    internalUserRepository.save(user); // Save the updated category
                    internalUserService.update();
                    // update requestData
                    List<RequestData> data=requestDataRepository.findByDepartmentNameAndStatus(oldUserName,"1");
                    data.forEach(e->{
                        System.out.println(oldUserName+" gg" + e.getDepartmentName());
                    if(oldUserName.equals(e.getDepartmentName())){
                        e.setDepartmentName(newUserName);
                        requestDataRepository.save(e);
                        requestDataService.update();
                    }

                    });
                    requestDataService.update();
                    return ResponseEntity.ok("User gfhg edited successfully");
                }
                else {
                    return ResponseEntity.ok("Sorry, Already this user exist");
                }
                // Save the Category object



            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }
    @PostMapping("/deleteInternalUser")
    @ResponseBody
    public ResponseEntity<String> deleteInternalUser(@RequestParam String branchName,@RequestParam String userName,@RequestParam String userId,@RequestParam String userPassword) {
        try {
            // Find the category by old name
            InternalUser user = internalUserRepository.findByBranchNameAndUserNameAndUserIdAndUserPasswordAndStatus(branchName,userName,userId,userPassword,"1");
            if (user != null) {

                user.setStatus("2");

                internalUserRepository.save(user); // Save the updated category
                internalUserService.update();

                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category");
        }
    }
    @PostMapping("/addDeviceInformation")
    @ResponseBody
    public ResponseEntity<String> saveTableData(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }
        System.out.println("Received data: " + allParams);


        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");


        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        addDataRepository.save(new AddData("SaddamNvn",categoryName,formattedDateTime,currentDate,allParams,"1"));

        try {

            addDataService.update();
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving data: " + e.getMessage());
        }
    }

    @PostMapping("/addDropDownListInformation")
    @ResponseBody
    public ResponseEntity<String> addDropDownListInformation(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }


        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");

        String dropDownListName = allParams.get("dropDownListName");
        allParams.remove("dropDownListName");

        List<String> data=new ArrayList<>();
        for (String key : allParams.keySet()) {
            data.add(allParams.get(key));
        }

        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        dropDownListRepository.save(new DropDownList(categoryName,dropDownListName,data,formattedDateTime,currentDate,"1"));

        // change datatype of dropDownList



        try {
         dropDownListService.update();

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
        try {
            if (device != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                device.setStatus("2");
                addDataRepository.save(device); // Save the updated category

                // add again
                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                addDataRepository.save(new AddData("SaddamNvn",categoryName,formattedDateTime,currentDate,allParams,"1"));

                 addDataService.update();
                return ResponseEntity.ok("Category deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }



    }
    @PostMapping("/editDropDownList")
    @ResponseBody
    public ResponseEntity<String> editDropDownList(@RequestParam Map<String, String> allParams) {
        if (allParams.isEmpty()) {
            return ResponseEntity.badRequest().body("No data provided");
        }

        String listId = allParams.get("listId");
        allParams.remove("listId");

        String categoryName = allParams.get("categoryName");
        allParams.remove("categoryName");

        String dropDownListName = allParams.get("dropDownListName");
        allParams.remove("dropDownListName");

        DropDownList list = dropDownListRepository.findByIdAndStatus(listId,"1");
        try {
            if (list != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                list.setStatus("2");
                dropDownListRepository.save(list); // Save the updated category

                // add again
                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                List<String> data=new ArrayList<>();
                for (String key : allParams.keySet()) {
                    data.add(allParams.get(key));
                }

                dropDownListRepository.save(new DropDownList(categoryName,dropDownListName,data,formattedDateTime,currentDate,"1"));

                 dropDownListService.update();
                return ResponseEntity.ok("Category deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
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
                return ResponseEntity.ok("Category deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }
    @PostMapping("/deleteDropDownListInformation")
    @ResponseBody
    public ResponseEntity<String> deleteDropDownListInformation(@RequestParam String listId) {
        DropDownList list = dropDownListRepository.findByIdAndStatus(listId,"1");
        try {
            if (list != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                list.setStatus("2");
                dropDownListRepository.save(list); // Save the updated category

                dropDownListService.update();
                return ResponseEntity.ok("Category deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }

    @PostMapping("/addRequestColumn")
    @ResponseBody
    public ResponseEntity<String> addRequestColumn(@RequestParam String requestName, @RequestParam String dataType, @RequestParam String requiredType, @RequestParam String visibleType) {
// Print the values to the console
        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        requestColumnRepository.save(new RequestColumn(requestName,dataType,requiredType,visibleType,formattedDateTime,currentDate,"1"));
         requestColumnService.update();
        return ResponseEntity.ok("Request column saved successfully");
    }

    @PostMapping("/deleteRequestColumn")
    @ResponseBody
    public ResponseEntity<String> deleteRequestColumn(@RequestParam String requestId) {
        RequestColumn request = requestColumnRepository.findByIdAndStatus(requestId,"1");
        try {
            if (request != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                request.setStatus("2");
                requestColumnRepository.save(request); // Save the updated category
                requestColumnService.update();

                return ResponseEntity.ok("Request Column deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting request column");
        }
    }
    @PostMapping("/serviceReportAccept")
    @ResponseBody
    public ResponseEntity<String> serviceReportAccept(
            @RequestParam String serviceId,
            @RequestParam String status,
            @RequestParam String comment) {
        try {
            // Retrieve the service request
            ServiceRequest request = serviceRequestRepository.findByIdAndStatus(serviceId, "1");
            if (request == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service request not found");
            }

            // Update service request details
            request.setCooServiceReportAcceptStatus(status);
            request.setCooServiceReportComment(comment);
            request.setCooServiceReportAcceptTime(getCurrentLocalDateTime());
            String deviceId = request.getDeviceId();

            // Process extractsNewComponents
            Set<String> newComponents = request.getExtractsNewComponents();
            if (newComponents != null && !newComponents.isEmpty()) {
                newComponents.forEach(componentId -> {
                    AddData device = addDataRepository.findByIdAndStatus(componentId, "1");
                    if (device != null) {
                        List<AddData.ParentDevices> parentDevices=device.getParentDevices();

                        if ( parentDevices == null) {
                            parentDevices = new ArrayList<>();
                        }
                        // device part
                        resultComponents=false;
                        sizeComponents=0;

                        parentDevices.forEach(k->{
                            if(k.getSource().equals(deviceId)){
                                resultComponents=true;
                                sizeComponents=k.getUsingTimeOfParentDevices().size();
                            }
                        });
                        if (resultComponents) {
                            boolean updated = false;

                            for (AddData.ParentDevices parentDevice : parentDevices) {
                                if (parentDevice.getSource().equals(deviceId)) {
                                    List<AddData.ParentDevices.UsingTimeOfParentDevice> listData = parentDevice.getUsingTimeOfParentDevices();
                                    if (listData != null && !listData.isEmpty()) {
                                        AddData.ParentDevices.UsingTimeOfParentDevice lastUsage = listData.get(listData.size() - 1);
                                        lastUsage.setEndingDate(getCurrentLocalDateTime());
                                        lastUsage.setStatus("0");
                                        updated = true; // Mark as updated
                                    }
                                }
                            }

                            if (updated) {
                                addDataRepository.save(device);
                            }
                        }else
                        {
                            // Create a new Parent device
                            AddData.ParentDevices newParentDevice = new AddData.ParentDevices(deviceId,"id");

                            // Initialize and populate the usage list
                            List<AddData.ParentDevices.UsingTimeOfParentDevice> usageList = new ArrayList<>();
                            AddData.ParentDevices.UsingTimeOfParentDevice usageEntry = new AddData.ParentDevices.UsingTimeOfParentDevice(device.getPresentTime(), "0");
                            usageEntry.setEndingDate(getCurrentLocalDateTime());
                            usageList.add(usageEntry);

                            // Set the usage list to the new child device
                            newParentDevice.setUsingTimeOfParentDevices(usageList);

                            // Add the new child device to the parent device
                            parentDevices.add(newParentDevice);
                            device.setParentDevices(parentDevices);

                            // Save the updated device
                            addDataRepository.save(device);


                        }
                        // close device part

                        // person part
                        resultComponents=false;
                        sizeComponents=0;

                        parentDevices.forEach(k->{
                            if(k.getSource().equals(request.getServiceReportGenerator())){
                                resultComponents=true;
                                sizeComponents=k.getUsingTimeOfParentDevices().size();
                            }
                        });
                        if (resultComponents){
                            boolean updated = false;

                            for (AddData.ParentDevices parentDevice : parentDevices) {
                                if (parentDevice.getSource().equals(request.getServiceReportGenerator())) {
                                    List<AddData.ParentDevices.UsingTimeOfParentDevice> listData = parentDevice.getUsingTimeOfParentDevices();
                                    if (listData != null && !listData.isEmpty()) {
                                        AddData.ParentDevices.UsingTimeOfParentDevice lastUsage =
                                                new AddData.ParentDevices.UsingTimeOfParentDevice(getCurrentLocalDateTime(), "1");
                                        listData.add(lastUsage);
                                        updated = true; // Mark as updated
                                    }
                                }
                            }

                            // Save the updated device only once if changes were made
                            if (updated) {
                                try {
                                    addDataRepository.save(device);
                                } catch (Exception m) {
                                    // Handle the exception (e.g., log it, rethrow, or return an error response)
                                    System.err.println("Failed to save device: " + m.getMessage());
                                }
                            }
                        }else{
                            // Create a new Parent device
                            AddData.ParentDevices newParentDevice = new AddData.ParentDevices(request.getServiceReportGenerator(),"person");
                            // Initialize and populate the usage list
                            List<AddData.ParentDevices.UsingTimeOfParentDevice> usageList = new ArrayList<>();
                            AddData.ParentDevices.UsingTimeOfParentDevice usageEntry = new AddData.ParentDevices.UsingTimeOfParentDevice(getCurrentLocalDateTime(), "1");
                            // usageEntry.setEndingDate(getCurrentLocalDateTime());
                            usageList.add(usageEntry);

                            // Set the usage list to the new child device
                            newParentDevice.setUsingTimeOfParentDevices(usageList);

                            // Add the new child device to the parent device
                            parentDevices.add(newParentDevice);
                            device.setParentDevices(parentDevices);

                            // Save the updated device
                            addDataRepository.save(device);
                        }
                        // close person part


                        List<AddData.DeviceUser> deviceUsers = device.getDeviceUsers();
                        device.setDeviceTypeSecondaryInOrOut("Out");
                        if (deviceUsers != null && !deviceUsers.isEmpty()) {
                            AddData.DeviceUser lastUser = deviceUsers.get(deviceUsers.size() - 1);
                            lastUser.setStatus("1");
                            addDataRepository.save(device);
                            System.out.println("Last user updated for device: " + componentId);
                        } else {
                            System.out.println("No users found for device: " + componentId);
                        }
                    } else {
                        System.out.println("Device not found or inactive for ID: " + componentId);
                    }
                });
            } else {
                System.out.println("No new components to process.");
            }

            // Process the main device
            AddData device = addDataRepository.findByIdAndStatus(deviceId, "1");
            if (device != null) {
                // Update listedComponents
                Set<String> listedComponents = device.getListedComponents();
                if (listedComponents == null) {
                    listedComponents = new HashSet<>();
                }
                Set<String> listedChild = device.getListedChild();
                if (listedChild == null) {
                    listedChild = new HashSet<>();
                }
                // Remove processed components
                if (newComponents != null && !newComponents.isEmpty()) {
                    listedComponents.removeAll(newComponents);
                    listedChild.removeAll(newComponents);

                    System.out.println("Removed components: " + newComponents);

                    newComponents.forEach(e->{
                        List<AddData.ChildDevices> childDevices=device.getChildDevices();

                        if ( childDevices == null) {
                            childDevices = new ArrayList<>();
                        }
                        resultComponents=false;
                        sizeComponents=0;
                        childDevices.forEach(k->{
                            if(k.getDeviceId().equals(e)){
                                resultComponents=true;
                                sizeComponents=k.getUsingTimeOfChildDevices().size();
                            }
                        });
                        if (resultComponents) {
                            boolean updated = false;

                            for (AddData.ChildDevices childDevice : childDevices) {
                                if (childDevice.getDeviceId().equals(e)) {
                                    List<AddData.ChildDevices.UsingTimeOfChildDevice> listData = childDevice.getUsingTimeOfChildDevices();
                                    if (listData != null && !listData.isEmpty()) {
                                        AddData.ChildDevices.UsingTimeOfChildDevice lastUsage = listData.get(listData.size() - 1);
                                        lastUsage.setEndingDate(getCurrentLocalDateTime());
                                        lastUsage.setStatus("0");
                                        updated = true; // Mark as updated
                                    }
                                }
                            }

                            if (updated) {
                                addDataRepository.save(device);
                            }
                        }

                        else {
                            // Create a new child device
                            AddData.ChildDevices newChildDevice = new AddData.ChildDevices(e);

                            // Initialize and populate the usage list
                            List<AddData.ChildDevices.UsingTimeOfChildDevice> usageList = new ArrayList<>();
                            AddData.ChildDevices.UsingTimeOfChildDevice usageEntry =
                                    new AddData.ChildDevices.UsingTimeOfChildDevice(device.getPresentTime(), "0");
                            usageEntry.setEndingDate(getCurrentLocalDateTime());
                            usageList.add(usageEntry);

                            // Set the usage list to the new child device
                            newChildDevice.setUsingTimeOfChildDevices(usageList);

                            // Add the new child device to the parent device
                            childDevices.add(newChildDevice);
                            device.setChildDevices(childDevices);

                            // Save the updated device
                            addDataRepository.save(device);
                        }


                    });

                }

                // Add accessories
                Set<String> accessories = request.getAddAccessories();
                // for parent calculation
                if (accessories != null && !accessories.isEmpty()) {
                    accessories.forEach(e-> {
                        AddData device2 = addDataRepository.findByIdAndStatus(e, "1");
                        List<AddData.ParentDevices> parentDevices=device2.getParentDevices();

                        if ( parentDevices == null) {
                            parentDevices = new ArrayList<>();
                        }
                        // service part
                        resultAccessories=false;
                        sizeAccessories=0;
                        parentDevices.forEach(k->{
                            if(k.getSource().equals(request.getServiceReportGenerator())){
                                resultAccessories=true;
                                sizeAccessories=k.getUsingTimeOfParentDevices().size();
                            }
                        });
                        if (resultAccessories) {
                            boolean updated = false;

                            for (AddData.ParentDevices parentDevice : parentDevices) {
                                if (parentDevice.getSource().equals(request.getServiceReportGenerator())) {
                                    List<AddData.ParentDevices.UsingTimeOfParentDevice> listData = parentDevice.getUsingTimeOfParentDevices();
                                    if (listData != null && !listData.isEmpty()) {
                                        AddData.ParentDevices.UsingTimeOfParentDevice lastUsage = listData.get(listData.size() - 1);
                                        lastUsage.setEndingDate(getCurrentLocalDateTime());
                                        lastUsage.setStatus("0");
                                        updated = true; // Mark as updated
                                    }
                                }
                            }

                            if (updated) {
                                addDataRepository.save(device2);
                            }

                        }else{
                            // Create a new Parent device
                            AddData.ParentDevices newParentDevice = new AddData.ParentDevices(request.getServiceReportGenerator(),"person");
                            // Initialize and populate the usage list
                            List<AddData.ParentDevices.UsingTimeOfParentDevice> usageList = new ArrayList<>();
                            AddData.ParentDevices.UsingTimeOfParentDevice usageEntry = new AddData.ParentDevices.UsingTimeOfParentDevice(getCurrentLocalDateTime(), "0");
                            usageEntry.setEndingDate(getCurrentLocalDateTime());
                            usageList.add(usageEntry);

                            // Set the usage list to the new child device
                            newParentDevice.setUsingTimeOfParentDevices(usageList);

                            // Add the new child device to the parent device
                            parentDevices.add(newParentDevice);
                            device.setParentDevices(parentDevices);

                            // Save the updated device
                            addDataRepository.save(device2);
                        }
                        // close service part

                        //device part
                        resultAccessories=false;
                        sizeAccessories=0;
                        parentDevices.forEach(k->{
                            if(k.getSource().equals(deviceId)){
                                resultAccessories=true;
                                sizeAccessories=k.getUsingTimeOfParentDevices().size();
                            }
                        });
                        if (resultAccessories) {
                            boolean updated = false;

                            for (AddData.ParentDevices parentDevice : parentDevices) {
                                if (parentDevice.getSource().equals(deviceId)) {
                                    List<AddData.ParentDevices.UsingTimeOfParentDevice> listData = parentDevice.getUsingTimeOfParentDevices();
                                    if (listData != null && !listData.isEmpty()) {
                                        AddData.ParentDevices.UsingTimeOfParentDevice lastUsage =
                                                new AddData.ParentDevices.UsingTimeOfParentDevice(getCurrentLocalDateTime(), "1");
                                        listData.add(lastUsage);
                                        updated = true; // Mark as updated
                                    }
                                }
                            }

                            // Save the updated device only once if changes were made
                            if (updated) {
                                try {
                                    addDataRepository.save(device2);
                                } catch (Exception m) {
                                    // Handle the exception (e.g., log it, rethrow, or return an error response)
                                    System.err.println("Failed to save device: " + m.getMessage());
                                }
                            }
                        }

                        else{
                            // Create a new Parent device
                            AddData.ParentDevices newParentDevice = new AddData.ParentDevices(deviceId,"id");
                            // Initialize and populate the usage list
                            List<AddData.ParentDevices.UsingTimeOfParentDevice> usageList = new ArrayList<>();
                            AddData.ParentDevices.UsingTimeOfParentDevice usageEntry = new AddData.ParentDevices.UsingTimeOfParentDevice(getCurrentLocalDateTime(), "1");
                           // usageEntry.setEndingDate(getCurrentLocalDateTime());
                            usageList.add(usageEntry);

                            // Set the usage list to the new child device
                            newParentDevice.setUsingTimeOfParentDevices(usageList);

                            // Add the new child device to the parent device
                            parentDevices.add(newParentDevice);
                            device.setParentDevices(parentDevices);

                            // Save the updated device
                            addDataRepository.save(device2);
                        }
                        // close device part

                    });
                }
                // for child calculation
                if (accessories != null && !accessories.isEmpty()) {
                    listedComponents.addAll(accessories);
                    listedChild.addAll(accessories);
                    System.out.println("Added accessories: " + accessories);
                    accessories.forEach(e->{
                        AddData device2 = addDataRepository.findByIdAndStatus(e, "1");
                                if (device2 != null) {
                                    device2.setDeviceTypeSecondaryInOrOut("In");
                                    addDataRepository.save(device2);

                                    List<AddData.ChildDevices> childDevices=device.getChildDevices();
                                    if ( childDevices == null) {
                                        childDevices = new ArrayList<>();
                                    }
                                    resultAccessories=false;
                                    sizeAccessories=0;
                                     childDevices.forEach(k->{
                                        if(k.getDeviceId().equals(e)){
                                            resultAccessories=true;
                                            sizeAccessories=k.getUsingTimeOfChildDevices().size();
                                        }
                                    });
                                     if(resultAccessories){
                                         childDevices.forEach(k->{
                                             if(k.getDeviceId().equals(e)){
                                                 List<AddData.ChildDevices.UsingTimeOfChildDevice> listData=k.getUsingTimeOfChildDevices();
                                                 listData.add(new AddData.ChildDevices.UsingTimeOfChildDevice(getCurrentLocalDateTime(),"1"));
                                                 k.setUsingTimeOfChildDevices(listData);
                                                 addDataRepository.save(device);
                                             }
                                         });


                                     }
                                     else{
                                        AddData.ChildDevices data=new AddData.ChildDevices(e) ;
                                        List<AddData.ChildDevices.UsingTimeOfChildDevice> internalListData=new ArrayList<>();
                                        internalListData.add(new AddData.ChildDevices.UsingTimeOfChildDevice(getCurrentLocalDateTime(),"1"));
                                        data.setUsingTimeOfChildDevices(internalListData);
                                        childDevices.add(data);
                                        device.setChildDevices(childDevices);
                                        addDataRepository.save(device);
                                     }


                                }

                    });
                }

                device.setListedComponents(listedComponents);


                // Clear extracted components and accessories in the device
                device.setExtractsNewComponents(new HashSet<>());
                device.setAddAccessories(new HashSet<>());

                // Save the updated device
                addDataRepository.save(device);
            } else {
                System.out.println("Main device not found or inactive for ID: " + deviceId);
            }

            // Save the updated service request
            serviceRequestRepository.save(request);
            serviceRequestService.update();
            addDataService.update();

            return ResponseEntity.ok("Service Report accepted successfully");
        } catch (Exception e) {
            // Log exception for debugging
            System.err.println("Error updating service report: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating service report");
        }
    }


    @PostMapping("/deleteServiceColumn")
    @ResponseBody
    public ResponseEntity<String> deleteServiceColumn(@RequestParam String serviceId) {
        ServiceRequest service = serviceRequestRepository.findByIdAndStatus(serviceId,"1");
        try {
            if (service != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
               // service.setStatus("2");
                serviceRequestRepository.save(service); // Save the updated category
                serviceRequestService.update();

                return ResponseEntity.ok("Service Column deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting request column");
        }
    }

    @PostMapping("/updateRequestColumn")
    @ResponseBody
    public ResponseEntity<String> updateRequestColumn(@RequestParam String requestId,@RequestParam String columnName,@RequestParam String dataType,@RequestParam String requiredType,@RequestParam String visibleType) {
        RequestColumn request = requestColumnRepository.findByIdAndStatus(requestId,"1");
        try {
            if (request != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                request.setStatus("0");
                requestColumnRepository.save(request); // Save the updated category

                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                requestColumnRepository.save(new RequestColumn(columnName,dataType,requiredType,visibleType,formattedDateTime,currentDate,"1"));
                requestColumnService.update();

                return ResponseEntity.ok("Request Column updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting request column");
        }
    }
    @PostMapping("/updateServiceColumn")
    @ResponseBody
    public ResponseEntity<String> updateServiceColumn(@RequestParam String serviceId,@RequestParam String columnName,@RequestParam String dataType,@RequestParam String requiredType,@RequestParam String visibleType) {
        ServiceRequest service = serviceRequestRepository.findByIdAndStatus(serviceId,"1");
        try {
            if (service != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
               // service.setStatus("0");
                serviceRequestRepository.save(service); // Save the updated category

                LocalDateTime now = LocalDateTime.now();
                String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
               // serviceRequestRepository.save(new ServiceRequest(columnName,dataType,requiredType,visibleType,formattedDateTime,currentDate,"1"));

               serviceRequestService.update();
                return ResponseEntity.ok("Service Column updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting request column");
        }
    }

    @PostMapping("/updateRequestStatus")
    @ResponseBody
    public ResponseEntity<String> updateRequestStatus(@RequestParam String requestId,@RequestParam String status,
                                                      @RequestParam String departmentName,
                                                      @RequestParam String departmentUserName,
                                                      @RequestParam String departmentUserId,
                                                      @RequestParam String cause) {

        RequestData data = requestDataRepository.findByIdAndStatus(requestId,"1");
        try {
            if (data != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                String time=getCurrentLocalDateTime();
                data.setCooAcceptedTime(time);
                data.setRequestMode(status);
                data.setCooDeviceRequestAcceptedManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                if(status.equals("Denied")){
                    data.setRejectCause(cause);
                }


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
    @PostMapping("/deliverRequestStatus")
    @ResponseBody
    public ResponseEntity<String> deliverRequestStatus(@RequestParam String requestId,@RequestParam String status) {

        RequestData data = requestDataRepository.findByIdAndStatus(requestId,"1");
        try {
            if (data != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName);
                RequestData.Inventory db=new RequestData.Inventory();
                db.setInventoryStatus(status);
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
    @PostMapping("/approvedListRequest")
    public ResponseEntity<String> processSelectedRows(@RequestParam String requestId, @RequestParam String deviceId) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getInventory().setInventoryStatus("Proposal Accepted");
            requestData.getInventory().setCooAns("Accepted");
            requestData.getInventory().setCooDeliveryAns("Approved");
            requestData.getInventory().setCooAcceptedTime(getCurrentLocalDateTime());

            requestData.getInventory().setAcceptedId(deviceId);
            requestData.setInventory(requestData.getInventory());


            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }

    @PostMapping("/listUpdateRequestStatus")
    @ResponseBody
    public ResponseEntity<String> listUpdateRequestStatus(@RequestParam String requestId,@RequestParam String cause) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getInventory().setInventoryStatus("Proposal Rejected");
            requestData.getInventory().setCooAns("Rejected");
            requestData.getInventory().setRejectedCause(cause);
            requestData.setInventory(requestData.getInventory());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");


    }
    @PostMapping("/approveDeliveryProductRequestStatus")
    @ResponseBody
    public ResponseEntity<String> approveCustomerCareRequestStatus(@RequestParam String requestId, @RequestParam String status) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            //requestData.getCustomerCare().setCustomerCareStatus("Accepted");
            requestData.getInventory().setCooDeliveryAns("Approved");
            requestData.getInventory().setCooAcceptedTime(getCurrentLocalDateTime());
            if(requestData.getInventory().getInventoryStatus().equals("Purchased")){
                requestData.getInventory().setCooAcceptedDeliveryTime(getCurrentLocalDateTime());
            }
            requestData.setInventory(requestData.getInventory());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/approvePurchaseProductDeviceStatus")
    @ResponseBody
    public ResponseEntity<String> approvePurchaseProductDeviceStatus(@RequestParam String requestId, @RequestParam String status,@RequestParam String categoryName) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            //requestData.getCustomerCare().setCustomerCareStatus("Accepted");
            requestData.getPurchase().setCooPurchaseAcceptedAns("Accepted");
            requestData.setPurchase(requestData.getPurchase());
            //  save to device table

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();

            Map<String,String> deviceData= requestData.getPurchase().getDeviceData();
            deviceData.remove("categoryName");

            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            addDataRepository.save(new AddData("SaddamNvn",categoryName,formattedDateTime,currentDate,deviceData,"1"));
            addDataService.update();

        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/setCancelRequestCustomerCare")
    @ResponseBody
    public ResponseEntity<String> setCancelRequestCustomerCare(@RequestParam String requestId,@RequestParam String status,@RequestParam String cause) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            //requestData.getCustomerCare().setCustomerCareStatus("Accepted");
            requestData.getInventory().setCooDeliveryRejectCauseAns(cause);
            requestData.getInventory().setCooDeliveryAns("Rejected");

            requestData.setInventory(requestData.getInventory());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/setCancelPurchaseDevice")
    @ResponseBody
    public ResponseEntity<String> setCancelPurchaseDevice(@RequestParam String requestId,@RequestParam String status,@RequestParam String cause) {

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            //requestData.getCustomerCare().setCustomerCareStatus("Accepted");
            requestData.getPurchase().setCooPurchaseAcceptedAns("Rejected");
            requestData.getPurchase().setPurchaseRejectedCause(cause);
            requestData.getPurchase().setCooPurchaseAcceptedTime(getCurrentLocalDateTime());

            requestData.setPurchase(requestData.getPurchase());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");

    }
    @PostMapping("/approvePurchaseRequest")
    public ResponseEntity<String> processSelectedRows(@RequestBody Map<String, Object> payload) {
        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");
        String comment = (String) payload.get("comment");
        List<String> links = (List<String>) payload.get("links");
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");

        // Generate current date and time
        String presentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("Generated presentDateTime: " + presentDateTime);

        // Find the RequestData document by requestId and status
        Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(requestId, "1");

        if (optionalRequestData.isPresent()) {
            RequestData requestData = optionalRequestData.get();

            // Update the inventory with the new deviceIds
            requestData.getPurchase().setCooComment(comment);
            requestData.getPurchase().setAcceptedLinks(links);
            requestData.getPurchase().setCooAcceptedTime(getCurrentLocalDateTime());
            requestData.getPurchase().setCooAns("Accepted");
            requestData.getPurchase().setCooPurchaseAcceptManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);


            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();
        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    @PostMapping("/approvePurchaseRequestForService")
    public ResponseEntity<String> processSelectedRowsForService(@RequestBody Map<String, Object> payload) {
        // Extract requestId and deviceIds from the payload
        String serviceId = (String) payload.get("serviceId");
        String problemName = (String) payload.get("problemName");
        String solutionName = (String) payload.get("solutionName");
        String comment = (String) payload.get("comment");
        List<String> links = (List<String>) payload.get("links");
        String departmentName = (String) payload.get("departmentName");
        String departmentUserName = (String) payload.get("departmentUserName");
        String departmentUserId = (String) payload.get("departmentUserId");


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
                            proposalSolutionItem.setPurchaseProposalToCooComment(comment);
                            proposalSolutionItem.setPurchaseProposalToCooAcceptedLinks(links);
                            proposalSolutionItem.setPurchaseProposalToCooAcceptedTime(getCurrentLocalDateTime());
                            proposalSolutionItem.setPurchaseProposalToCooAns("Accepted");
                            proposalSolutionItem.setPurchaseProposalCooAcceptedManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);


                        }
                    });


                    System.out.println("Updated proposalSolution: " + problem.getProposalSolution());
                }

            });
            // Persist changes
            serviceRequestRepository.save(requestData);
            serviceRequestService.update();
        }


        return ResponseEntity.ok("Purchase proposal saved successfully!");
        // Find the RequestData document by requestId and status


    }

    @PostMapping("/addProblemSolutionOfServicePrice")
    @ResponseBody
    public ResponseEntity<String> addProblemSolutionOfServicePrice(@RequestBody Map<String, Object> requestData) {
        try {
            // Extract serviceId and mergedServiceData from requestData
            String serviceId = (String) requestData.get("serviceId");
            String departmentName = (String) requestData.get("departmentName");
            String departmentUserName = (String) requestData.get("departmentUserName");
            String departmentUserId = (String) requestData.get("departmentUserId");

            Map<String, List<Map<String, String>>> mergedServiceData = (Map<String, List<Map<String, String>>>) requestData.get("mergedServiceData");

            System.out.println("Service ID: " + serviceId);
            System.out.println("Merged Service Data: " + mergedServiceData);

            // Process the mergedServiceData as before
            Map<String, Map<String, Map<String, String>>> groupedData = new HashMap<>();

            for (Map.Entry<String, List<Map<String, String>>> entry : mergedServiceData.entrySet()) {
                String formId = entry.getKey();
                List<Map<String, String>> formData = entry.getValue();

                // Create a nested map to group by `name`
                Map<String, Map<String, String>> formGroupedData = formData.stream()
                        .collect(Collectors.groupingBy(
                                data -> data.get("name"),
                                Collectors.toMap(
                                        data -> data.containsKey("action_" + data.get("name")) ? "action" :
                                                data.containsKey("comment_" + data.get("name")) ? "comment" : "value",
                                        data -> data.get("value")
                                )
                        ));

                groupedData.put(formId, formGroupedData);
            }

            // Log or process the grouped data as needed
            System.out.println("Grouped Data: " + groupedData);

            // Additional logic using serviceId
            System.out.println("Processing data for serviceId: " + serviceId);
            Optional<ServiceRequest> optionalRequestData = serviceRequestRepository.findDevicesIDS(serviceId, "1");
            if (optionalRequestData.isPresent()) {
                ServiceRequest requestData1 = optionalRequestData.get();
                requestData1.setCooManInfoOfAccessoriesSolutionAccept(departmentName+"_"+departmentUserName+"_"+departmentUserId);
                requestData1.setCooAcceptOfServiceRequest("Accepted");
                requestData1.setCooAcceptOfServiceRequestTime(getCurrentLocalDateTime());
                // Iterate through each problem in the service request
                requestData1.getAllProblem().forEach(problem -> {
                    System.out.println("Processing problem: " + problem.getName());
                    // Extract non-hyphenated keys
                    Map<String, List<String>> result = getNonHyphenatedKeys(groupedData);

                    for (Map.Entry<String, List<String>> entry : result.entrySet()) {
                        String formId = entry.getKey();
                        List<String> nonHyphenatedKeys = entry.getValue();

                        System.out.println("Form ID: " + formId);
                        System.out.println("Keys without hyphens:");
                        if(problem.getName().equals(formId)){

                        for (String key : nonHyphenatedKeys) {
                            System.out.println("- " + key + " " +
                                    getValueForFormAndName(groupedData, formId, "action_" + key) + " " +
                                    getValueForFormAndName(groupedData, formId, "comment_" + key) + " " +
                                    getValueForFormAndName(groupedData, formId, key));
                            // Find and update the existing solution's price by name
                            problem.getProposalSolution().forEach(proposalSolutionItem -> {
                                if (proposalSolutionItem.getName().equals(key)) {
                                    proposalSolutionItem.setPrice( getValueForFormAndName(groupedData, formId, key));
                                    proposalSolutionItem.setAction( getValueForFormAndName(groupedData, formId, "action_" + key));
                                    proposalSolutionItem.setComment(getValueForFormAndName(groupedData, formId, "comment_" + key));
                                   // System.out.println("Updated price for solution with name: " + name + " to " + price);
                                }
                            });
                        }

                        }

                    }

                            });
                  // Persist changes
                 serviceRequestRepository.save(requestData1);
                serviceRequestService.update();

                        }



            // Return success message
            return ResponseEntity.ok("Data processed and grouped successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing data.");
        }
    }
    @PostMapping("/setAcceptanceCommentData")
    @ResponseBody
    public ResponseEntity<String> setAcceptanceCommentData(@RequestBody Map<String, Object> rowData) {
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
                                proposalSolutionItem.setPrice( price);
                                proposalSolutionItem.setComment(comment);
                                proposalSolutionItem.setAction(action);

                                proposalSolutionItem.setCooManInfoOfPriceAcceptanceCommentSetter(departmentName + "_" + departmentUserName + "_" + departmentUserId);
                                proposalSolutionItem.setCooManInfoOfPriceAcceptanceCommentStatus("Accepted");
                                proposalSolutionItem.setCooManInfoOfPriceAcceptanceCommentSettingTime(getCurrentLocalDateTime());
                                System.out.println(price);
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
    // Endpoint to handle the incoming request
    @PostMapping("/addPaymentListApprove")
    @ResponseBody
    public ResponseEntity<String> addPaymentListApprove(@RequestBody PurchaseRequestDTO purchaseRequest) {
        try {
            // Extract department information
            System.out.println("Department Name: " + purchaseRequest.getDepartmentName());
            System.out.println("Department User Name: " + purchaseRequest.getDepartmentUserName());
            System.out.println("Department User ID: " + purchaseRequest.getDepartmentUserId());

            List<String> requests=purchaseRequest.getRequests();
            if(!requests.isEmpty()){
                requests.forEach(e->{
                    // Find the RequestData document by requestId and status
                    Optional<RequestData> optionalRequestData = requestDataRepository.findDevicesIDS(e, "1");

                    if (optionalRequestData.isPresent()) {
                        RequestData requestData = optionalRequestData.get();

                        requestData.getPurchase().setPurchasePaymentToCooAcceptManInfo(purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());
                        requestData.getPurchase().setPurchasePaymentToCooAcceptingTime(getCurrentLocalDateTime());
                        requestData.getPurchase().setPurchasePaymentToCooRequestStatus("Accepted");
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

                                        proposalSolutionItem.setPurchasePaymentToCooAcceptManInfo(purchaseRequest.getDepartmentName() + "_" + purchaseRequest.getDepartmentUserName() + "_" + purchaseRequest.getDepartmentUserId());
                                        proposalSolutionItem.setPurchasePaymentToCooAcceptingTime(getCurrentLocalDateTime());
                                        proposalSolutionItem.setPurchasePaymentToCooRequestStatus("Accepted");

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
            serviceRequestService.update();
            requestDataService.update();
            // Perform necessary logic (e.g., saving to a database)

            return ResponseEntity.ok("Payment Approved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }
    // Endpoint to handle the incoming request
    @PostMapping("/ApproveAlternativeDeviceList1")
    @ResponseBody
    public ResponseEntity<String> ApproveAlternativeDeviceList(@RequestBody Map<String, Object> payload) {
        System.out.println("sadimmmmm");
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

            // Update the inventory with the new deviceIds
            requestData.getInventory().setInventoryStatus("Alternative Proposal Accepted");
            requestData.getInventory().setInventoryToAlternativeDeviceRequestStatus("Accepted");
            requestData.getInventory().setInventoryToAlternativeDeviceRequestAcceptingAns("Accepted");
            requestData.getInventory().setInventoryToAlternativeDeviceRequestAcceptingTime(getCurrentLocalDateTime());
            requestData.getInventory().setInventoryToAlternativeDeviceRequestAcceptingManInfo(departmentName+"_"+departmentUserName+"_"+departmentUserId);

            requestData.getInventory().setCooAns("Accepted");
            requestData.getInventory().setCooDeliveryAns("Approved");
            requestData.getInventory().setCooAcceptedTime(getCurrentLocalDateTime());

            requestData.getInventory().setAcceptedId(deviceId);
            requestData.setInventory(requestData.getInventory());


            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();


        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
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
    // Endpoint to handle the incoming request
    @PostMapping("/approveFinalPurchaseDeviceDelivery")
    @ResponseBody
    public ResponseEntity<String> approveFinalPurchaseDeviceDelivery(@RequestBody Map<String, Object> payload) {

        // Extract requestId and deviceIds from the payload
        String requestId = (String) payload.get("requestId");

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
            requestData.getInventory().setCooDeliveryAns("Accepted");
            requestData.setPurchase(requestData.getPurchase());

            // Save the updated RequestData document
            requestDataRepository.save(requestData);
            requestDataService.update();



        } else {
            return ResponseEntity.status(404).body("RequestData with requestId " + requestId + " not found.");
        }

        return ResponseEntity.ok("Selected rows processed successfully");
    }
    // Method to get the value for a specific formId and name
    public static String getValueForFormAndName(Map<String, Map<String, Map<String, String>>> groupedData, String formId, String name) {
        // Check if the formId exists in the groupedData map
        if (groupedData.containsKey(formId)) {
            Map<String, Map<String, String>> formData = groupedData.get(formId);

            // Check if the specified name exists in the formData map
            if (formData.containsKey(name)) {
                Map<String, String> fieldData = formData.get(name);

                // Return the "value" from the inner map if it exists
                return fieldData.getOrDefault("value", null);
            }
        }

        // Return null if formId, name, or value is not found
        return null;
    }
    public static Map<String, List<String>> getNonHyphenatedKeys(Map<String, Map<String, Map<String, String>>> groupedData) {
        Map<String, List<String>> nonHyphenatedKeysMap = new HashMap<>();

        for (Map.Entry<String, Map<String, Map<String, String>>> entry : groupedData.entrySet()) {
            String formId = entry.getKey();
            Map<String, Map<String, String>> formData = entry.getValue();

            List<String> nonHyphenatedKeys = new ArrayList<>();

            // Iterate over the inner map to find keys without hyphens
            for (String key : formData.keySet()) {
                if (!key.contains("_")) {
                    nonHyphenatedKeys.add(key);
                }
            }

            // Store the non-hyphenated keys for the current form ID
            nonHyphenatedKeysMap.put(formId, nonHyphenatedKeys);
        }

        return nonHyphenatedKeysMap;
    }
    // Add category method here
@PostMapping("/allData")
@ResponseBody
public ResponseEntity<AllData> AllData(){
        List<Category> categories = categoriesService.Category();
        List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();
        List<AddData> allAddData =addDataService.add();
        List<User> allUser = userService.add();
        List<RequestColumn> requestColumns=requestColumnService.add();
        List<ServiceRequest> serviceRequests = serviceRequestService.add();
        List<RequestData> requestData=requestDataService.add();
        List<DropDownList> dropDownLists=dropDownListService.add();
        List<Designation> designations=designationService.add();
        List<BranchUser> userAccountData=branchUserService.add();
        List<InternalUser> internalUsers=internalUserService.add();

        AllData homeData = new  AllData();
        homeData.setCategories(categories);
        homeData.setUniversalColumns(universalColumns);
        homeData.setIndividualColumns(individualColumns);
        homeData.setAllAddData(allAddData);
        homeData.setAllUser(allUser);
        homeData.setRequestColumns(requestColumns);
        homeData.setServiceRequests(serviceRequests);
        homeData.setRequestData(requestData);
        homeData.setDropDownLists(dropDownLists);
        homeData.setDesignations(designations);
        homeData.setUserAccountData(userAccountData);
        homeData.setInternalUsers(internalUsers);

        return ResponseEntity.ok(homeData);
}
    // Add category method here
    @PostMapping("/allData1")
    @ResponseBody
    public ResponseEntity<AllData> AllData1(@RequestParam String dataType){
       // System.out.println(dataType);
        AllData homeData = new  AllData();
        if(dataType.equals("categories")){
            List<Category> categories = categoriesService.Category();
            homeData.setCategories(categories);
        }
        else if(dataType.equals("universalColumns")){
            List<Column> universalColumns =universalColumnsService.Universal();
            homeData.setUniversalColumns(universalColumns);
        }
        else if(dataType.equals("individualColumns")){
            List<Column> individualColumns = individualColumnsService.Individual();
            homeData.setIndividualColumns(individualColumns);
        }
        else if(dataType.equals("allAddData")){
            List<AddData> allAddData = addDataService.add();
            homeData.setAllAddData(allAddData);
        }
        else if(dataType.equals("allUser")){
            List<User> allUser = userService.add();
            homeData.setAllUser(allUser);
        }
        else if(dataType.equals("requestColumns")){
            List<RequestColumn> requestColumns=requestColumnService.add();
            homeData.setRequestColumns(requestColumns);
        }
        else if(dataType.equals("serviceRequests")){
            List<ServiceRequest> serviceRequests = serviceRequestService.add();
            homeData.setServiceRequests(serviceRequests);
        }
        else if(dataType.equals("requestData")){
            List<RequestData> requestData=requestDataService.add();
            homeData.setRequestData(requestData);
        }
        else if(dataType.equals("dropDownLists")){
            List<DropDownList> dropDownLists=dropDownListService.add();
            homeData.setDropDownLists(dropDownLists);
        }
        else if(dataType.equals("designations")){
            List<Designation> designations=designationService.add();
            homeData.setDesignations(designations);
        }
        else if(dataType.equals("userAccountData")){
            List<BranchUser> userAccountData=branchUserService.add();
            homeData.setUserAccountData(userAccountData);
        }
        else if(dataType.equals("internalUsers")){
            List<InternalUser> internalUsersData=internalUserService.add();
            homeData.setInternalUsers(internalUsersData);
        }

        return ResponseEntity.ok(homeData);
    }

    @PostMapping("/acceptUnOrderedDevice")
    @ResponseBody
    public ResponseEntity<String> acceptUnOrderedDevice(@RequestParam String deviceId) {
        AddData device = addDataRepository.findByIdAndStatus(deviceId,"1");
        try {
            if (device != null) {
                // Update category name
                /// category.setCategoryName(newCategoryName)
                AddData.UnOrderedDevice  unOrderedDevice = device.getUnOrderedDevice();
                unOrderedDevice.setCOOUnOrderedDeviceAcceptedStatus("Ordered");
                device.setUnOrderedDevice(unOrderedDevice);
                addDataRepository.save(device); // Save the updated category
               addDataService.update();

                return ResponseEntity.ok("Device Accepted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category");
        }
    }
@PostMapping("/individualColumnData")
@ResponseBody
public List<Column> individualColumnData(@RequestParam String categoryName) {
    return columnRepository.findByCategoryNameAndStatus(categoryName,"1");
}
    @PostMapping("/branchWiseInternalUserData")
    @ResponseBody
    public List<InternalUser> branchWiseInternalUserData(@RequestParam String branchName) {
        return internalUserRepository.findByBranchNameAndStatus(branchName,"1");
    }
    @PostMapping("/inputTypes")
    @ResponseBody
    public List inputTypes() {
        return inputTypes;
    }

    @PostMapping("/saveFile")
    public ResponseEntity<String> saveFile(@RequestBody Map<String, String> requestData) {
        String data = requestData.get("data");
        String fileName = "src/main/resources/"+"data.txt";

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            writer.write(data);
            return ResponseEntity.ok("File saved successfully as " + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }
    @GetMapping("/retrieveFile")
    public ResponseEntity<String> retrieveFile() {
        try {
            String content = new String(Files.readAllBytes(Paths.get("src/main/resources/data.txt")));
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error reading file: " + e.getMessage());
        }
    }
    public boolean authenticate(String userName,String userPassword){

       boolean result=false;
        if(internalUserRepository.existsByUserNameAndUserPasswordAndStatus(userName,userPassword,"1")){
            result= true;// exist
        }

        if(userRepository.existsByUserNameAndUserPasswordAndStatus(userName,userPassword,"1")){
            result= true; // exist
        }

        return result;

    }

    public  String getCurrentLocalDateTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
    public  String getCurrentDate() {
        LocalDate today = LocalDate.now();
        return today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
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
}