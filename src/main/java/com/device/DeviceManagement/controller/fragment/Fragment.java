package com.device.DeviceManagement.controller.fragment;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;

@Controller
public class Fragment {
    String nameK="",actionK="",commentK="",nameMain;
    List<String> inputTypes = Arrays.asList(
            "text", "password", "email", "url", "search", "tel", "number", "range",
            "date", "month", "week", "time", "datetime-local", "color", "file",
            "checkbox", "radio", "button", "submit", "reset", "textarea","customDropDownList"
    );
    @Autowired
    private RequestDataRepository requestDataRepository;
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
    @Autowired
    private InternalUserService internalUserService;
    @GetMapping("/fragment/{pageName}")
    public String loadFragment(@PathVariable String pageName,
                               @RequestParam(name = "folder", required = false) String folderName,
                               @RequestParam String departmentName,
                               Model model) {
       // System.out.println(pageName+" "+folderName+" "+departmentName);
        if(folderName.equals("departmentUser")){
            model.addAttribute("departmentUserName", departmentName);
        }
        else{
            model.addAttribute("departmentName", departmentName);

        }
        // Add any model attributes you want here based on fragmentName
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
        List<BranchUser> userAccountData=branchUserService.add();

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
        model.addAttribute("userAccountData",userAccountData);


        model.addAttribute("inputTypes", inputTypes);
        return folderName+"/" + pageName + " :: " + pageName;
    }

}
