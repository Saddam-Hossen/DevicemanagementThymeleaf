package com.device.DeviceManagement.controller.login;


import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.producer.KafkaProducer;
import com.device.DeviceManagement.repository.*;
import com.device.DeviceManagement.service.RedisRateLimiter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/login")
public class Login {
    List<String> inputTypes = Arrays.asList(
            "text", "password", "email", "url", "search", "tel", "number", "range",
            "date", "month", "week", "time", "datetime-local", "color", "file",
            "checkbox", "radio", "button", "submit", "reset", "textarea"
    );
    @Autowired
    private final KafkaProducer kafkaProducer;
    public Login(KafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }
    @Autowired
    private RequestColumnRepository requestColumnRepository;

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private  DesignationRepository designationRepository;
    @Autowired
    private ColumnRepository columnRepository;
    @Autowired
    private AddDataRepository addDataRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;

    @Autowired
    private BranchUserRepository branchUserRepository;
    @Autowired
    private DropDownListRepository dropDownListRepository;
    @GetMapping("/login")
    public String showLoginForm() {
        return "Login";
    }
    @Autowired
    private  RequestDataRepository requestDataRepository;
    @Autowired
    private RedisRateLimiter rateLimiter;

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

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @PostMapping("/home")
    public String login(@RequestParam String username, @RequestParam String password, Model model, HttpServletResponse response, HttpSession session) {
        // Here you can implement your login logic
        // For demonstration purposes, let's just check if the username and password are "admin"
        session.setMaxInactiveInterval(120); // 120 seconds (2 minutes)

        System.out.println(session.getMaxInactiveInterval());
        if (session.getAttribute("loggedInUser") != null) {
            System.out.println(session.getAttribute("loggedInUser"));
           // return "login";
        }

        if (authenticate(username,password)) {

            List<Category> categories = categoriesService.Category();
            List<Column> universalColumns = universalColumnsService.Universal();
            List<Column> individualColumns = individualColumnsService.Individual();
            List<AddData> allDeviceData=addDataService.add();
            List<User> allUser=userService.add();
            List<InternalUser> internalUsers=internalUserService.add();
            List<RequestColumn> requestColumns=requestColumnService.add();
            List<ServiceRequest> serviceRequests =serviceRequestService.add();
            List<RequestData> requestData=requestDataService.add();
            List<Designation> designations=designationService.add();
            List<DropDownList> dropDownLists=dropDownListService.add();
            List<BranchUser> userAccountData=branchUserService.add();

            model.addAttribute("userAccountData",userAccountData);
            if (rateLimiter.isBlocked(username)) {
                model.addAttribute("error", "Too many failed attempts. Try again later.");
                return "login/login"; // return the login.html view
            }


            // If login successful, you can redirect to a success page
            String[] parts = userType(username,password).trim().split("_");
            String userType = parts[0]; // The part before the underscore
            String userId = parts[1];    // The part after the underscore

            // Store user session
            session.setAttribute("loggedInUser", username);
            session.setAttribute("loggedInUserId", userId);
            session.setMaxInactiveInterval(120); // 120 seconds (2 minutes)


            // Create cookies for username and userId
            Cookie usernameCookie = new Cookie("username", username);
            usernameCookie.setMaxAge(1); // Expires in 2 minutes
            usernameCookie.setHttpOnly(true); // Prevents JavaScript access (security)
            usernameCookie.setPath("/");

            Cookie userIdCookie = new Cookie("userId", userId);
            userIdCookie.setMaxAge(1);
            userIdCookie.setHttpOnly(true);
            userIdCookie.setPath("/");

            // Add cookies to response
            response.addCookie(usernameCookie);
            response.addCookie(userIdCookie);


            if(userType.equals("Department")){

                model.addAttribute("departmentName",userType);
                model.addAttribute("userId",userId);

                model.addAttribute("departmentUserName",username);
                model.addAttribute("departmentPassword",password);
                //add needed data


                model.addAttribute("inputTypes", inputTypes);
                model.addAttribute("data",categories);
                model.addAttribute("universalColumns",universalColumns);
                model.addAttribute("individualColumns",individualColumns);
                model.addAttribute("allDeviceData",allDeviceData);
                model.addAttribute("allUsers",allUser);
                model.addAttribute("indoorUsers",internalUsers);
                model.addAttribute("requestColumns",requestColumns);
                model.addAttribute("serviceRequests", serviceRequests);
                model.addAttribute("requestData",requestData);
                model.addAttribute("designations",designations);
                model.addAttribute("userAccountData",userAccountData);



                return "departmentUser/home";
            }
            else if(userType.equals("customerCare")){

                model.addAttribute("departmentName",userType);
                model.addAttribute("userId",userId);
                model.addAttribute("departmentUserName",username);
                model.addAttribute("departmentPassword",password);
                //add needed data

                model.addAttribute("inputTypes", inputTypes);
                model.addAttribute("data",categories);
                model.addAttribute("universalColumns",universalColumns);
                model.addAttribute("individualColumns",individualColumns);
                model.addAttribute("allDeviceData",allDeviceData);
                model.addAttribute("allUsers",allUser);
                model.addAttribute("indoorUsers",internalUsers);
                model.addAttribute("requestColumns",requestColumns);
                model.addAttribute("serviceRequests", serviceRequests);
                model.addAttribute("requestData",requestData);
                model.addAttribute("designations",designations);
                return "customerCare/home";

            }
            else if(userType.equals("service")){
                model.addAttribute("departmentName",userType);
                model.addAttribute("userId",userId);
                model.addAttribute("departmentUserName",username);
                model.addAttribute("departmentPassword",password);
                //add needed data


                model.addAttribute("inputTypes", inputTypes);
                model.addAttribute("data",categories);
                model.addAttribute("universalColumns",universalColumns);
                model.addAttribute("individualColumns",individualColumns);
                model.addAttribute("allDeviceData",allDeviceData);
                model.addAttribute("allUsers",allUser);
                model.addAttribute("indoorUsers",internalUsers);
                model.addAttribute("requestColumns",requestColumns);
                model.addAttribute("serviceRequests", serviceRequests);
                model.addAttribute("requestData",requestData);
                model.addAttribute("designations",designations);
                return "service/home";

            }
            else if(userType.equals("purchase")){
                model.addAttribute("departmentName",userType);
                model.addAttribute("userId",userId);
                model.addAttribute("departmentUserName",username);
                model.addAttribute("departmentPassword",password);
                //add needed data


                model.addAttribute("inputTypes", inputTypes);
                model.addAttribute("data",categories);
                model.addAttribute("universalColumns",universalColumns);
                model.addAttribute("individualColumns",individualColumns);
                model.addAttribute("allDeviceData",allDeviceData);
                model.addAttribute("allUsers",allUser);
                model.addAttribute("indoorUsers",internalUsers);
                model.addAttribute("requestColumns",requestColumns);
                model.addAttribute("serviceRequests", serviceRequests);
                model.addAttribute("requestData",requestData);
                model.addAttribute("designations",designations);
                return "purchase/home";

            }
            else if(userType.equals("inventory")){
                model.addAttribute("departmentName",userType);
                model.addAttribute("userId",userId);
                model.addAttribute("departmentUserName",username);
                model.addAttribute("departmentPassword",password);
                //add needed data


                model.addAttribute("inputTypes", inputTypes);
                model.addAttribute("data",categories);
                model.addAttribute("universalColumns",universalColumns);
                model.addAttribute("individualColumns",individualColumns);
                model.addAttribute("allDeviceData",allDeviceData);
                model.addAttribute("allUsers",allUser);
                model.addAttribute("indoorUsers",internalUsers);
                model.addAttribute("requestColumns",requestColumns);
                model.addAttribute("serviceRequests", serviceRequests);
                model.addAttribute("requestData",requestData);
                model.addAttribute("designations",designations);
                return "inventory/Home";

            }
            else if(userType.equals("Coo")){
                model.addAttribute("departmentName",userType);
                model.addAttribute("userId",userId);
                model.addAttribute("departmentUserName",username);
                model.addAttribute("departmentPassword",password);
                //add needed data


                model.addAttribute("inputTypes", inputTypes);
                model.addAttribute("data",categories);
                model.addAttribute("universalColumns",universalColumns);
                model.addAttribute("individualColumns",individualColumns);
                model.addAttribute("allDeviceData",allDeviceData);
                model.addAttribute("allUsers",allUser);
                model.addAttribute("indoorUsers",internalUsers);
                model.addAttribute("requestColumns",requestColumns);
                model.addAttribute("serviceRequests", serviceRequests);
                model.addAttribute("requestData",requestData);
                model.addAttribute("designations",designations);
                model.addAttribute("dropDownLists",dropDownLists);
                try {
                   // kafkaProducer.sendMessage("This is an error message");
                } catch (Exception e) {
                    e.printStackTrace(); // or log properly
                }

                return "superAdmin/home"; // This will return the index.html Thymeleaf template

            }
            else{
               if(username.equals("coo")&& password.equals("coo")){


                   model.addAttribute("departmentUserName",username);
                   model.addAttribute("departmentPassword",password);


                   model.addAttribute("inputTypes", inputTypes);
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
                   model.addAttribute("designations",designations);


                   return "coo/home";
               }
               else if(username.equals("inventory")&& password.equals("inventory")){


                    model.addAttribute("departmentUserName",username);
                    model.addAttribute("departmentPassword",password);


                   model.addAttribute("inputTypes", inputTypes);
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
                   model.addAttribute("designations",designations);


                    return "inventory/home";
                }
               else if(username.equals("customerCare")&& password.equals("customerCare")){


                   model.addAttribute("departmentUserName",username);
                   model.addAttribute("departmentPassword",password);
                   //add needed data

                   model.addAttribute("inputTypes", inputTypes);
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
                   model.addAttribute("designations",designations);
                   return "customerCare/home";
               }
               else if(username.equals("purchase")&& password.equals("purchase")){

                   model.addAttribute("departmentUserName",username);
                   model.addAttribute("departmentPassword",password);
                   //add needed data


                   model.addAttribute("inputTypes", inputTypes);
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
                   model.addAttribute("designations",designations);
                   return "purchase/home";
               }
               else if(username.equals("service")&& password.equals("service")){

                   model.addAttribute("departmentUserName",username);
                   model.addAttribute("departmentPassword",password);

                   model.addAttribute("inputTypes", inputTypes);
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
                   model.addAttribute("designations",designations);
                   return "service/home";
               }
            }
            return "redirect:/success";
        } else {
            System.out.println(username+" "+password);
            Map<String, Object> additionalFields = new HashMap<>();
            additionalFields.put("email", "user@example.com"); // Example additional field
            additionalFields.put("age", 25); // Another example additional field

            // Set the additional fields in the user object


           // users.forEach(System.out::println);
            // If login fails, you can add an error message to be displayed on the login page
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }

    @GetMapping("/success")
    public String showSuccessPage() {
        return "success";
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
    public String userType(String userName,String userPassword){

        String result=null;
        if(internalUserRepository.existsByUserNameAndUserPasswordAndStatus(userName,userPassword,"1")){
           InternalUser user=internalUserRepository.findByUserNameAndUserPasswordAndStatus(userName,userPassword,"1");
            result=user.getBranchName()+"_"+user.getUserId();// exist
        }
        else if(userRepository.existsByUserNameAndUserPasswordAndStatus(userName,userPassword,"1")){
            result="user";// exist
        }

        return result;

    }
}