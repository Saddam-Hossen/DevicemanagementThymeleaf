$(document).ready(function () {

$(function () {
        // Get last active fragment from localStorage
        const lastPage = localStorage.getItem("lastActivePage");

        if (lastPage) {
            loadFragment(lastPage); // Load previously active fragment
        } else {
            loadFragment("serviceProposalData"); // Load default fragment
        }
    });

// Main function to load and initialize fragment
function loadFragment(pageName) {
var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        // Save page name to localStorage
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("fragmentContainer");
        container.innerHTML = "<p>Loading...</p>";
        const url = `/fragment/${pageName}?folder=${encodeURIComponent("superAdmin")}&departmentName=${encodeURIComponent(departmentName)}`;

        fetch(url)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;

               const fragmentInitializers = {
                   serviceProposalData: [
                       window.initServiceProposalTable,
                       window.initServiceProposalGeneral,
                       window.initGlobalDivToggle
                   ],
                   requestDataForPayment: [
                       window.initRequestForPaymentTable,
                       window.initRequestForPaymentGeneral,
                       window.initGlobalDivToggle
                   ],
                   purchaseRequestData: [
                       window.initRequestPurchaseDataTable,
                       window.initRequestPurchaseDataGeneral,
                       window.initGlobalDivToggle
                   ],
                   listRequestData: [
                       window.initListRequestInventoryTable,
                       window.initListRequestInventoryGeneral,
                       window.initGlobalDivToggle
                   ],
                   Category: [
                       window.initAddCategoryGeneral,
                       window.initGlobalDivToggle
                   ],
                   AddUser: [
                       window.initAddUserGeneral,
                       window.initGlobalDivToggle
                   ],
                   CustomerCareRequestData: [
                       window.initCustomerCareRequestDataGeneral,
                       window.initGlobalDivToggle
                   ],
                   deliveryPurchaseDevice: [
                       window.initDeliveryPurchaseDeviceGeneral,
                       window.initGlobalDivToggle
                   ],
                   Designation: [
                       window.initAddDesignationGeneral,
                       window.initGlobalDivToggle
                   ],
                   deviceInformation: [
                       window.initDeviceInformationGeneral,
                       window.initGlobalDivToggle
                   ],
                   // deviceList: [window.initDeviceTable], // Uncomment and add if needed
                   dropdownList: [
                       window.initDropDownListGeneral,
                       window.initGlobalDivToggle
                   ],
                   individualColumn: [
                       window.initAddIndividualColumnGeneral,
                       window.initGlobalDivToggle
                   ],
                   internalUser: [
                       window.initInternalUserGeneral,
                       window.initGlobalDivToggle
                   ],
                   purchaseDevice: [
                       window.initPurchaseDeviceGeneral,
                       window.initGlobalDivToggle
                   ],
                   requestColumn: [
                       window.initRequestColumnGeneral,
                       window.initGlobalDivToggle
                   ],
                   requestData: [
                       window.initRequestDataGeneral,
                       window.initGlobalDivToggle
                   ],
                   serviceReportData: [
                       window.initServiceReportDataGeneral,
                       window.initGlobalDivToggle
                   ],
                   serviceRequest: [
                       window.initDeviceTable,
                       window.initGlobalDivToggle
                   ],
                   universalColumn: [
                       window.initAddUniversalColumnGeneral,
                       window.initGlobalDivToggle
                   ],
                   unOrderedDevice: [
                       window.initUnOrderedDeviceGeneral,
                       window.initGlobalDivToggle
                   ],
                   // Add more pageName: [function1, function2, window.initGlobalDivToggle] pairs as needed
               };


                const initFun = fragmentInitializers[pageName];
                 if (Array.isArray(initFun)) {
                     initFun.forEach(fn => {
                         if (typeof fn === "function") {
                             fn();
                         }
                     });
                 } else if (typeof initFuncs === "function") {
                     // For backward compatibility
                     initFun();
                 }


                // Optional: general fragment initialization
                if (typeof window.initFragment === "function") {
                    window.initFragment(pageName);
                }
            })
            .catch(error => {
                console.error("Error loading fragment:", error);
                container.innerHTML = "<p>Error loading content.</p>";
            });
    }
// Expose globally for use elsewhere (e.g., in nav click handlers)
window.toggleListItem = loadFragment;
window.toggleListItem = function (item, pageName) {
var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("fragmentContainer");
        container.innerHTML = "<p>Loading...</p>";
        const url = `/fragment/${pageName}?folder=${encodeURIComponent("superAdmin")}&departmentName=${encodeURIComponent(departmentName)}`;

        fetch(url)
          .then(response => response.text())
          .then(html => {
            container.innerHTML = html;

             const fragmentInitializers = {
                 serviceProposalData: [
                     window.initServiceProposalTable,
                     window.initServiceProposalGeneral,
                     window.initGlobalDivToggle
                 ],
                 requestDataForPayment: [
                     window.initRequestForPaymentTable,
                     window.initRequestForPaymentGeneral,
                     window.initGlobalDivToggle
                 ],
                 purchaseRequestData: [
                     window.initRequestPurchaseDataTable,
                     window.initRequestPurchaseDataGeneral,
                     window.initGlobalDivToggle
                 ],
                 listRequestData: [
                     window.initListRequestInventoryTable,
                     window.initListRequestInventoryGeneral,
                     window.initGlobalDivToggle
                 ],
                 Category: [
                     window.initAddCategoryGeneral,
                     window.initGlobalDivToggle
                 ],
                 AddUser: [
                     window.initAddUserGeneral,
                     window.initGlobalDivToggle
                 ],
                 CustomerCareRequestData: [
                     window.initCustomerCareRequestDataGeneral,
                     window.initGlobalDivToggle
                 ],
                 deliveryPurchaseDevice: [
                     window.initDeliveryPurchaseDeviceGeneral,
                     window.initGlobalDivToggle
                 ],
                 Designation: [
                     window.initAddDesignationGeneral,
                     window.initGlobalDivToggle
                 ],
                 deviceInformation: [
                     window.initDeviceInformationGeneral,
                     window.initGlobalDivToggle
                 ],
                 // deviceList: [window.initDeviceTable], // Uncomment and add if needed
                 dropdownList: [
                     window.initDropDownListGeneral,
                     window.initGlobalDivToggle
                 ],
                 individualColumn: [
                     window.initAddIndividualColumnGeneral,
                     window.initGlobalDivToggle
                 ],
                 internalUser: [
                     window.initInternalUserGeneral,
                     window.initGlobalDivToggle
                 ],
                 purchaseDevice: [
                     window.initPurchaseDeviceGeneral,
                     window.initGlobalDivToggle
                 ],
                 requestColumn: [
                     window.initRequestColumnGeneral,
                     window.initGlobalDivToggle
                 ],
                 requestData: [
                     window.initRequestDataGeneral,
                     window.initGlobalDivToggle
                 ],
                 serviceReportData: [
                     window.initServiceReportDataGeneral,
                     window.initGlobalDivToggle
                 ],
                 serviceRequest: [
                     window.initDeviceTable,
                     window.initGlobalDivToggle
                 ],
                 universalColumn: [
                     window.initAddUniversalColumnGeneral,
                     window.initGlobalDivToggle
                 ],
                 unOrderedDevice: [
                     window.initUnOrderedDeviceGeneral,
                     window.initGlobalDivToggle
                 ],
                 // Add more pageName: [function1, function2, window.initGlobalDivToggle] pairs as needed
             };

          const initFun = fragmentInitializers[pageName];
           if (Array.isArray(initFun)) {
               initFun.forEach(fn => {
                   if (typeof fn === "function") {
                       fn();
                   }
               });
           } else if (typeof initFuncs === "function") {
               // For backward compatibility
               initFun();
           }


            // Optional: General fragment init
            if (typeof window.initFragment === "function") {
              window.initFragment(pageName);
            }

          })
          .catch(error => {
            console.error("Error loading fragment:", error);
            container.innerHTML = "<p>Error loading content.</p>";
          });

    };

// Adjust styles on window resize
});
