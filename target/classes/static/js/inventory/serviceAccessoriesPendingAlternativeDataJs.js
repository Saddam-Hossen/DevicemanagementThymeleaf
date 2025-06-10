function addTableInformationOfService() {
// Define the Service class
        class Service {
        constructor(serviceId, problemName, solutionName) {
            this.serviceId = serviceId;
            this.problemName = problemName;
            this.solutionName = solutionName;
        }

        toString() {
            return `Service { serviceId: ${this.serviceId}, problemName: ${this.problemName}, solutionName: ${this.solutionName} }`;
        }
        }

       var mergedFormData = {}; // Object to hold all form data based on formId

       const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

       // Create an empty array to store service IDs
       let selectedServiceIds = [];

       // Loop through each checked checkbox and get the data-service-id
       checkboxes.forEach(function(checkbox) {
         // Get the serviceId from the checkbox's data-service-id attribute
           const serviceId = checkbox.getAttribute('data-service-id');
           const problemName = checkbox.getAttribute('data-problem-name');
           const solutionName = checkbox.getAttribute('data-solution-name');

         // Add the serviceId to the selectedServiceIds array
         if (serviceId) {

           selectedServiceIds.push(new Service(serviceId, problemName, solutionName));

         }
       });

       // Print all services
       console.log("All services:");
       selectedServiceIds.forEach(service => console.log(service.toString()));

        var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        var departmentUserName = departmentElement.data("departmentuser-name");//saho
        var departmentUserId = departmentElement.data("departmentuser-id");//s

    // Build the request payload
       const requestData = {
           departmentName: departmentName,
           departmentUserName: departmentUserName,
           departmentUserId: departmentUserId,
           services: selectedServiceIds
       };

       // Send AJAX request to backend
       $.ajax({
           url: "/inventory/addPurchaseList",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify(requestData),
           success: function (response) {
               alert(response); // Display success response
               location.reload(); // Refresh the page
           },
           error: function (xhr, status, error) {
               alert("Error: " + error); // Display error response
               console.error("Error:", error);
           }
       });
}
function sendDeliveryDeviceAcceptForService(serviceId,deviceId,problemName,solutionName){

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/sendDeliveryDevicePurchaseToInventoryForService",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  serviceId: serviceId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId,
                  problemName:problemName,
                  solutionName:solutionName

                  }),
             success: function (response) {
                 alert(response); // Display success response
                 location.reload(); // Refresh the page
             },
             error: function (xhr, status, error) {
                 alert("Error: " + error); // Display error response
                 console.error("Error:", error);
             }
         });
}


 $(document).ready(function() {
            $('.hideButton').click(function() {
                // Hide the second column
                $('.secondDiv').hide();

                // Show the showButton and set display to inline-block
                $('.showButton').css('display', 'inline-block');

                // Change the class of the first column to make it full-width
                $('.firstDiv').removeClass('col-sm-9').addClass('col-sm-12');
            });

            $('.showButton').click(function() {
                // Show the second column
                $('.secondDiv').show();

                // Hide the showButton again
                $('.showButton').hide();

                // Revert the class of the first column back to original
                $('.firstDiv').removeClass('col-sm-12').addClass('col-sm-9');
                $('.secondDiv').addClass('col-sm-3');
            });
        });
 function printRowDataForCustomerCare(row) {
                                     // Get all the cells of the clicked row
                                     var cells = row.getElementsByTagName('td');
                                     var rowData = [];

                                     // Loop through cells to collect data
                                     for (var i = 0; i < cells.length; i++) {
                                         rowData.push(cells[i].innerText.trim());
                                     }
                                     var biVagName = cells[1].innerText.trim();
                                     var button = row.querySelector('.btn');

                                     if (button) {
                                         // Get the data-request-id attribute value
                                         var requestId = button.getAttribute('data-request-id');

                                         // Print the data-request-id (you can replace this with any action you want)
                                         console.log("data-request-id: " + requestId);
                                            print('requestData', function(requestData) {
                                                if (requestData) {
                                                    // Search for the specific ID using the find method
                                                    const result = requestData.find(function(data1) {
                                                        return data1.id === requestId;
                                                    });

                                   if(result && (result.inventory.inventoryStatus === "Proposal Accepted" || result.inventory.inventoryStatus === "Direct Delivery") ) {
                                                        // Dynamically generate the HTML with standard 'src' attribute
                                                        var htmlToAdd = `
                                                        <div class="row bordered-row">
                                                            <div class="col-sm-3">
                                                                <div class="text-center">
                                                                    <p>${formatDateTime(result.presentTime)}</p>
                                                                    <p>${formatTime(result.presentTime)}</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-2">
                                                                <div class="text-center">
                                                                    <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-7">
                                                                <div class="text-3d" style="width:100%">
                                                                    <span>Dept: ${result.departmentName}</span>
                                                                    <span>Requested</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        `;
                                                         if ( result.cooAcceptedTime) {
                                                                htmlToAdd += `
                                                             <div class="row">
                                                                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                <div class="col-sm-8" style="height:40px;"></div>
                                                            </div>
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.cooAcceptedTime)}</p>
                                                                        <p>${formatTime(result.cooAcceptedTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>COO:</span>
                                                                        <span>${result.requestMode} Dept Request</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                `;

                                                             }

                                                         if (result.inventory && result.inventory.requestTime) {
                                                            htmlToAdd += `

                                                        <div class="row">
                                                            <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                            <div class="col-sm-8" style="height:40px;"></div>
                                                        </div>
                                                        <div class="row bordered-row">
                                                            <div class="col-sm-3">
                                                                <div class="text-center">
                                                                    <p>${formatDateTime(result.inventory.requestTime)}</p>
                                                                    <p>${formatTime(result.inventory.requestTime)}</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-2">
                                                                <div class="text-center">
                                                                    <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-7">
                                                                <div class="text-3d" style="width:100%">
                                                                    <span>Inventory:</span>
                                                                    <span>Send Alternative List Request</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            `;

                                                         }
                                                         if (result.inventory && result.inventory.cooAcceptedTime) {
                                                            htmlToAdd += `

                                                        <div class="row">
                                                            <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                            <div class="col-sm-8" style="height:40px;"></div>
                                                        </div>
                                                        <div class="row bordered-row">
                                                            <div class="col-sm-3">
                                                                <div class="text-center">
                                                                    <p>${formatDateTime(result.inventory.cooAcceptedTime)}</p>
                                                                    <p>${formatTime(result.inventory.cooAcceptedTime)}</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-2">
                                                                <div class="text-center">
                                                                    <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-7">
                                                                <div class="text-3d" style="width:100%">
                                                                    <span>COO:</span>
                                                                    <span>${result.inventory.cooAns} Inventory Request</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            `;

                                                         }

                                                        // Add additional HTML conditionally
                                                        if (result.inventory && result.inventory.deliveryTime) {
                                                            htmlToAdd += `
                                                            <div class="row">
                                                                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                <div class="col-sm-8" style="height:40px;"></div>
                                                            </div>
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.inventory.deliveryTime)}</p>
                                                                        <p>${formatTime(result.inventory.deliveryTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>Inventory:</span>
                                                                        <span>Delivered Device To CustomerCare</span>
                                                                    </div>
                                                                </div>
                                                            </div>`;
                                                        }

                                                        if (result.customerCare && result.customerCare.deliveryTime) {
                                                            htmlToAdd += `
                                                            <div class="row">
                                                                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                <div class="col-sm-8" style="height:40px;"></div>
                                                            </div>
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.customerCare.deliveryTime)}</p>
                                                                        <p>${formatTime(result.customerCare.deliveryTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>CustomerCare:</span>
                                                                        <span>Delivered Device To User</span>
                                                                    </div>
                                                                </div>
                                                            </div>`;
                                                        }
                                               if (result.deviceReceivedStatus) {
                                                      htmlToAdd += `
                                                      <div class="row">
                                                          <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                          <div class="col-sm-8" style="height:40px;"></div>
                                                      </div>
                                                      <div class="row bordered-row">
                                                          <div class="col-sm-3">
                                                              <div class="text-center">
                                                                  <p>${formatDateTime(result.deviceReceivedTime)}</p>
                                                                  <p>${formatTime(result.deviceReceivedTime)}</p>
                                                              </div>
                                                          </div>
                                                          <div class="col-sm-2">
                                                              <div class="text-center">
                                                                  <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                              </div>
                                                          </div>
                                                          <div class="col-sm-7">
                                                              <div class="text-3d" style="width:100%">
                                                                  <span>Dept: ${result.departmentName}</span>
                                                                  <span>Received Device From CustomerCare</span>
                                                              </div>
                                                          </div>
                                                      </div>`;
                                                  }
                                                        // Add the HTML code to the modal body using jQuery
                                                        $('.activityDiv').html(htmlToAdd);
                                                    }
                                                    else if(result && result.inventory.inventoryStatus === "Purchased") {
                                                         // Dynamically generate the HTML with standard 'src' attribute
                                                         var htmlToAdd = `
                                                         <div class="row bordered-row">
                                                             <div class="col-sm-3">
                                                                 <div class="text-center">
                                                                     <p>${formatDateTime(result.presentTime)}</p>
                                                                     <p>${formatTime(result.presentTime)}</p>
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-2">
                                                                 <div class="text-center">
                                                                     <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-7">
                                                                 <div class="text-3d" style="width:100%">
                                                                     <span>Dept: ${result.departmentName}</span>
                                                                     <span>Requested</span>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                         `;
                                                          if ( result.cooAcceptedTime) {
                                                                 htmlToAdd += `
                                                              <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.cooAcceptedTime)}</p>
                                                                         <p>${formatTime(result.cooAcceptedTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>COO:</span>
                                                                         <span>${result.requestMode} Dept Request</span>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                                 `;

                                                              }

                                                          if (result.inventory && result.inventory.requestTime) {
                                                             htmlToAdd += `

                                                         <div class="row">
                                                             <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                             <div class="col-sm-8" style="height:40px;"></div>
                                                         </div>
                                                         <div class="row bordered-row">
                                                             <div class="col-sm-3">
                                                                 <div class="text-center">
                                                                     <p>${formatDateTime(result.inventory.requestTime)}</p>
                                                                     <p>${formatTime(result.inventory.requestTime)}</p>
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-2">
                                                                 <div class="text-center">
                                                                     <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-7">
                                                                 <div class="text-3d" style="width:100%">
                                                                     <span>Inventory:</span>
                                                                     <span>Send Purchase Request</span>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                             `;

                                                          }
                                                          if (result.purchase && result.purchase.requestTime) {
                                                             htmlToAdd += `

                                                         <div class="row">
                                                             <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                             <div class="col-sm-8" style="height:40px;"></div>
                                                         </div>
                                                         <div class="row bordered-row">
                                                             <div class="col-sm-3">
                                                                 <div class="text-center">
                                                                     <p>${formatDateTime(result.purchase.requestTime)}</p>
                                                                     <p>${formatTime(result.purchase.requestTime)}</p>
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-2">
                                                                 <div class="text-center">
                                                                     <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-7">
                                                                 <div class="text-3d" style="width:100%">
                                                                     <span>Purchase:</span>
                                                                     <span>Send Purchase Request To COO</span>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                             `;

                                                          }
                                                   if (result.purchase && result.purchase.cooAcceptedTime) {
                                                             htmlToAdd += `

                                                         <div class="row">
                                                             <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                             <div class="col-sm-8" style="height:40px;"></div>
                                                         </div>
                                                         <div class="row bordered-row">
                                                             <div class="col-sm-3">
                                                                 <div class="text-center">
                                                                     <p>${formatDateTime(result.purchase.cooAcceptedTime)}</p>
                                                                     <p>${formatTime(result.purchase.cooAcceptedTime)}</p>
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-2">
                                                                 <div class="text-center">
                                                                     <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-7">
                                                                 <div class="text-3d" style="width:100%">
                                                                     <span>COO:</span>
                                                                     <span>${result.purchase.cooAns} Purchase Request</span>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                             `;

                                                          }
                                                         // Add additional HTML conditionally
                                                         if (result.purchase && result.purchase.deliveryTime) {
                                                             htmlToAdd += `
                                                             <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.purchase.deliveryTime)}</p>
                                                                         <p>${formatTime(result.purchase.deliveryTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>Purchase:</span>
                                                                         <span>Delivered Device To Inventory</span>
                                                                     </div>
                                                                 </div>
                                                             </div>`;
                                                         }

                                                if (result.inventory && result.inventory.cooAcceptedDeliveryTime) {
                                                             htmlToAdd += `

                                                         <div class="row">
                                                             <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                             <div class="col-sm-8" style="height:40px;"></div>
                                                         </div>
                                                         <div class="row bordered-row">
                                                             <div class="col-sm-3">
                                                                 <div class="text-center">
                                                                     <p>${formatDateTime(result.inventory.cooAcceptedDeliveryTime)}</p>
                                                                     <p>${formatTime(result.inventory.cooAcceptedDeliveryTime)}</p>
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-2">
                                                                 <div class="text-center">
                                                                     <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                 </div>
                                                             </div>
                                                             <div class="col-sm-7">
                                                                 <div class="text-3d" style="width:100%">
                                                                     <span>COO:</span>
                                                                     <span>Given Permission To Delivery</span>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                             `;

                                                          }

                                                         // Add additional HTML conditionally
                                                        if (result.inventory && result.inventory.deliveryTime) {
                                                            htmlToAdd += `
                                                            <div class="row">
                                                                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                <div class="col-sm-8" style="height:40px;"></div>
                                                            </div>
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.inventory.deliveryTime)}</p>
                                                                        <p>${formatTime(result.inventory.deliveryTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>Inventory:</span>
                                                                        <span>Delivered Device To CustomerCare</span>
                                                                    </div>
                                                                </div>
                                                            </div>`;
                                                        }
                                                         if (result.customerCare && result.customerCare.deliveryTime) {
                                                             htmlToAdd += `
                                                             <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.customerCare.deliveryTime)}</p>
                                                                         <p>${formatTime(result.customerCare.deliveryTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>CustomerCare:</span>
                                                                         <span>Delivered Device To User</span>
                                                                     </div>
                                                                 </div>
                                                             </div>`;
                                                         }
                                                    if (result.deviceReceivedStatus) {
                                                              htmlToAdd += `
                                                              <div class="row">
                                                                  <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                  <div class="col-sm-8" style="height:40px;"></div>
                                                              </div>
                                                              <div class="row bordered-row">
                                                                  <div class="col-sm-3">
                                                                      <div class="text-center">
                                                                          <p>${formatDateTime(result.deviceReceivedTime)}</p>
                                                                          <p>${formatTime(result.deviceReceivedTime)}</p>
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-sm-2">
                                                                      <div class="text-center">
                                                                          <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-sm-7">
                                                                      <div class="text-3d" style="width:100%">
                                                                          <span>Dept: ${result.departmentName}</span>
                                                                          <span>Received Device From CustomerCare</span>
                                                                      </div>
                                                                  </div>
                                                              </div>`;
                                                          }
                                                         // Add the HTML code to the modal body using jQuery
                                                         $('.activityDiv').html(htmlToAdd);
                                                     }

                                                }
                                            });





                                     }
                                 }

window.initServiceAccessoriesPendingAlternativeDataTable = function () {
            var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging

            var allData = data['serviceRequests'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("serviceAccessoriesPendingAlternativeDataTableBody");

            // Function to check availability count
            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(function(device) {
                    if (device.categoryName === categoryName && device.userName===departmentName) {
                        count++;
                    }
                });
                return count === 0 ? "Unavailable" : `Available(${count})`;
            }

           let counter = 1; // Initialize a counter variable

           // Loop through each device in allData
           allData.forEach(function(device) {
               const bivagName = device.departmentName;
               const categoryName = device.categoryName;
               const sn=device.visibleServiceId;
// Ensure allProblem exists before iterating
                 if (!device.allProblem || !Array.isArray(device.allProblem)) {
                     console.warn("Skipping device due to missing or invalid allProblem array:", device);
                     return; // Skip this device if allProblem is missing or not an array
                 }
               // Loop through each problem in the allProblem array for the device
               device.allProblem.forEach(function(problem) {
                   console.log("Problem Name:", problem.name);
                   console.log("Proposal Solutions:");
// Ensure proposalSolution exists before iterating
                   if (!problem.proposalSolution || !Array.isArray(problem.proposalSolution)) {
                       console.warn("Skipping problem due to missing or invalid proposalSolution array:", problem);
                       return; // Skip this problem if proposalSolution is missing or not an array
                   }
                   // Loop through each proposalSolution in the problem
                   problem.proposalSolution.forEach(function(solution) {
                       if (solution.serviceCenterToInventoryAccessoriesRequestStatus === 'Pending' && solution.deviceManageType !=='Purchased' &&  (solution.inventoryToServiceCenterDeviceStatus==='Accepted' || solution.inventoryToServiceCenterDeviceStatus==='Pending' )) {
                           const row = document.createElement("tr");

                           console.log("Name:", solution.name);
                           console.log("Value:", solution.value);
                           console.log("Category:", solution.category);
                           console.log("Price:", solution.price);
                           console.log("Action:", solution.action);
                           console.log("Comment:", solution.comment);
                            console.log("inventoryToServiceCenterDeviceStatus:", solution.inventoryToServiceCenterDeviceStatus);

                           // Determine availability
                           const availability = getAvailability(solution.category);

                           // Create and append cells to the row
                           row.innerHTML = `
                               <td>${sn}</td>  <!-- Dynamic Counter -->
                               <td>${bivagName}</td>
                               <td>${categoryName}</td>
                               <td>${problem.name}</td>
                               <td>${solution.category} (${solution.name}-${solution.value})</td>

                               <td>
                                   <button class="btn btn-info btn-sm view-button-pending" data-category="${solution.category}" data-device-id="${device.deviceId}" data-button-id="viewAlternative" title="View Available Same Accessories Category Devices" >
                                       ${availability}
                                   </button>
                               </td>
                               <td>
                                    ${solution.inventoryToServiceCenterDeviceTime !== null ?  formatDateTimeToAmPm(solution.inventoryToServiceCenterDeviceTime ): ""}

                                 </td>
                                <td>
                                 ${solution.deliveryDate !== null ? solution.deliveryDate : ""}

                              </td>



                           `;

                           // Increment the counter for the next row
                           counter++;

                           // Append the row to the table body
                           tableBody.appendChild(row);
                       }
                   });
               });
           });
            sortAndFormatAllTables() ;
    $(document).on('click', '.deliver', function(){
            var serviceId = $(this).data('service-id');
            var category = $(this).data('category');
            var deviceId=$(this).data('purchasedevice-id');
            var problemName=$(this).data('problemname-id');
            var solutionName=$(this).data('solutionname-id');

        var selectedDevices = [];

        print('universalColumns', function(universalColumns) {
            var categoriesHtml = '';
            if (universalColumns) {
                universalColumns.forEach(function(category) {
                    categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                });
            }

            var htmlToAdd = `
                <div class="mb-9" style="margin-left: 0%; text-align: left;">
                    <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="background-color: gray;color:white">SN</th>
                                <th scope="col" style="background-color: gray; display: none;color:white">Device Id</th>
                                <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                ${categoriesHtml}
                                <th scope="col" style="background-color: gray;color:white">Description</th>
                                  <th scope="col" style="background-color: gray;color:white">Action</th>
                            </tr>
                        </thead>
                        <tbody id="listDeviceInformationBody"></tbody>
                    </table>
                    <div class="d-flex justify-content-center mb-2">
                    <button class="btn btn-success btn-sm  btnSave" data-service-id="${serviceId}" data-solutionname-id="${solutionName}" data-problemname-id="${problemName}" style="width: 10%; margin-top: 20px; margin-right:5px;">Accept</button>
                     <button class="btn btn-danger btn-sm  btnReject" data-service-id="${serviceId}" data-solution-name="${solutionName}" data-problem-name="${problemName}" style="width: 10%; margin-top: 20px;">Reject</button>
                    </div>
                </div>
            `;

            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Have you receive this device?");

            var rowsHtml = '';
               let ids = deviceId || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array
                print('allAddData', function(allAddData) {
                   if (allAddData) {
                       print('individualColumns', function(individualColumns) {
                           allAddData.forEach(function(data, index) {
                               if (data.categoryName === category && data.id===deviceId) {
                                   rowsHtml += `<tr>
                                       <td>${data.visibleId}</td>
                                       <td style="display: none;">${data.id}</td>
                                       <td>${data.categoryName}</td>`;

                                   universalColumns.forEach(function(column) {
                                       rowsHtml += `<td>${data.allData[column.columnName]}</td>`;
                                   });

                                   rowsHtml += `<td>
                                       <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                   if (individualColumns) {
                                       individualColumns.forEach(function(individualColumn) {
                                           if (individualColumn.categoryName === category) {
                                               rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                           }
                                       });
                                   }



                                   rowsHtml += `
                                       <td>
                                           <input
                                                name="selectDevice"
                                               type="checkbox"
                                               data-device-id="${data.id}"
                                               data-button-id="accepted"
                                               style="background-color: green; transform: scale(1.5); width: 12px; height: 12px;"
                                               title="Delivery Device"
                                               ${ids.includes(data.id) ? 'checked' : ''}>
                                       </td>
                                   </tr>`;

                               }
                           });

                           // Populate the table only if rowsHtml has content
                           if (rowsHtml) {
                               $('#listDeviceInformationBody').html(rowsHtml);

                               // Show modal only if rows were added
                               showModal();
                           } else {
                               alert("No data found to display in the modal.");
                           }
                       });
                   }
               });

               $('.btnSave').click(function(event) {
                           event.preventDefault(); // Prevent the default action (form submission)
                            var serviceId=$(this).data('service-id');
                            var problemName=$(this).data('problemname-id');
                            var solutionName=$(this).data('solutionname-id');
                           const checkboxes = document.querySelectorAll('input[name="selectDevice"]:checked');
                           const selectedRows = Array.from(checkboxes).map(checkbox => {
                               const row = checkbox.closest('tr'); // Get the parent row of the checkbox
                               const secondColumn = row.querySelector('td:nth-child(2)'); // Get the second column (assuming columns are indexed from 1)

                               if (secondColumn) {
                                   const secondColumnValue = secondColumn.textContent.trim(); // Get the text content of the second column
                                   return secondColumnValue;
                               } else {
                                   return null;
                               }
                           });

                           if(selectedRows.length==0){
                             alert("Please select a device.");
                           }
                           else if(selectedRows.length==1){
                            // Show a confirmation alert
                            const userConfirmed = confirm("Do you want to proceed with the selected device?");
                            if (userConfirmed) {
                                 hideModal();
                                 sendDeliveryDeviceAcceptForService(serviceId,selectedRows,problemName,solutionName);
                            } else {
                                console.log("User canceled.");
                                // Handle the cancel action here
                            }
                           }
                           else{
                            alert("Please select only one device.");
                           }

                       });

        });
           });
 // Add event listener for the availability button click
            $(document).on('click', '.view-button-selected-device', function() {
                                var category = $(this).data('category');
                                var deviceId=$(this).data('deviceId');
                                 var selectedDevices = [];
                                 print('universalColumns', function(universalColumns) {
                                var categoriesHtml = '';
                                if (universalColumns) {
                                    universalColumns.forEach(function(category) {
                                        categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                                    });
                                }

                                var htmlToAdd = `
                                    <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                        <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style="background-color: gray;color:white">SN</th>
                                                     <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                                    <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                                    ${categoriesHtml}
                                                    <th scope="col" style="background-color: gray;color:white">Description</th>

                                                </tr>
                                            </thead>
                                            <tbody id="listDeviceInformationBody">

                                            </tbody>
                                        </table>
                                    </div>

                                `;
                                $('.modal-body').html(htmlToAdd);

                                $('#publicModalLabel').text("Device Information");




                                             var rowsHtml = '';
                                                // Corrected the for loop syntax to iterate over the deviceIds array
                                                   // alert(result.inventory.deviceIds[i]);
                                                    print('allAddData', function(allAddData) {
                                                        if (allAddData) {
                                                            // First, fetch individual columns
                                                            print('individualColumns', function(individualColumns) {

                                                                allAddData.forEach(function(data, index) {
                                                                 if (data.id=== deviceId) {
                                                                    rowsHtml += `<tr>
                                                                        <td>${data.visibleId}</td>
                                                                         <td style="display: none;">${data.id}</td>
                                                                        <td>${data.categoryName}</td>`;
                                                                    universalColumns.forEach(function(column) {
                                                                        rowsHtml += `<td >${data.allData[column.columnName]}</td>`;
                                                                    });

                                                                    rowsHtml += `<td>
                                                                        <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                    if (individualColumns) {
                                                                        individualColumns.forEach(function(individualColumn) {
                                                                           if (individualColumn.categoryName=== category) {

                                                                            rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                            }
                                                                        });
                                                                    }


                                                                     }
                                                                });

                                                                $('#listDeviceInformationBody').html(rowsHtml);
                                                            });
                                                        }
                                                    });







                                showModal();
                            });


            });
        $(document).on('click', '.clock-button', function() {
            var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
            var problemName = $(this).data('problemName');
            var solutionName = $(this).data('solutionName');
            var date = $(this).data('date');

            var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <label for="deliveryDate" class="form-label">Change Delivery Date:</label>
                    <input type="date" class="form-control" id="deliveryDate" name="deliveryDate" value="${date}">
                </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Do you want to update delivery date?");

            // Add event listener for save button
            $('#saveEditBtn').click(function() {
                var updatedDate = $('#deliveryDate').val();

                // Send data to the controller using AJAX
               $.ajax({
                           type: "POST",
                           url: "/inventory/updateDeliveryDate",  // Replace with your controller endpoint
                           data: {
                               serviceId: serviceId,
                               problemName: problemName,
                               solutionName: solutionName,
                               date: updatedDate
                           },
                           success: function(response) {
                               // Handle success (e.g., show a message or close the modal)
                               alert("Delivery date updated successfully!");
                               hideModal();
                               location.reload();
                           },
                           error: function(error) {
                               // Handle error (e.g., show an error message)
                               alert("Error updating delivery date!");
                           }
                       });
                    });

            showModal();
        });
 // Add event listener for the availability button click
            $(document).on('click', '.delivery-button', function() {
                                var category = $(this).data('category');
                                var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
                                var problemName = $(this).data('problemName');
                                var solutionName = $(this).data('solutionName');

                                 var departmentElement = $(".departmentName"); // Target element with department data
                                var departmentName = departmentElement.data("departmentname"); // e.g., "it"
                                var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
                                var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"
                             var selectedDevices = [];
                              print('universalColumns', function(universalColumns) {
                                var categoriesHtml = '';
                                if (universalColumns) {
                                    universalColumns.forEach(function(category) {
                                        categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                                    });
                                }

                                var htmlToAdd = `
                                    <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                        <table id="selectDeviceInformationTable" class="table table-gray table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style="background-color: gray;color:white">SN</th>
                                                     <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                                    <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                                    ${categoriesHtml}
                                                    <th scope="col" style="background-color: gray;color:white">Description</th>
                                                    <th scope="col" style="background-color: gray;color:white">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody id="listDeviceInformationBody">

                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="mb-9" style="margin-left: 0%; text-align: center;">
                                            <button type="button" class="btn btn-primary" id="selectBtn">Select</button>
                                    </div>


                                `;
                                $('.modal-body').html(htmlToAdd);

                                $('#publicModalLabel').text("Device Information");





                                             var rowsHtml = '';
                                                // Corrected the for loop syntax to iterate over the deviceIds array
                                                   // alert(result.inventory.deviceIds[i]);
                                                    print('allAddData', function(allAddData) {
                                                        if (allAddData) {
                                                            // First, fetch individual columns
                                                            print('individualColumns', function(individualColumns) {

                                                                allAddData.forEach(function(data, index) {
                                                                if (data.categoryName === category && data.userName===departmentName) {
                                                                    rowsHtml += `<tr>
                                                                        <td>${index + 1}</td>
                                                                        <td style="display: none;">${data.id}</td>
                                                                        <td>${data.categoryName}</td>`;

                                                                    // Add universal columns
                                                                    universalColumns.forEach(function(column) {
                                                                        rowsHtml += `<td>${data.allData[column.columnName]}</td>`;
                                                                    });

                                                                    // Add individual columns within a list
                                                                    rowsHtml += `<td>
                                                                        <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                    if (individualColumns) {
                                                                        individualColumns.forEach(function(individualColumn) {
                                                                            if (individualColumn.categoryName === category) {
                                                                                rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                            }
                                                                        });
                                                                    }

                                                                    // Close the list
                                                                    rowsHtml += `</ul></td>`;

                                                                    // Add checkbox in a new td cell
                                                                    rowsHtml += `<td>
                                                                        <input type="checkbox" name="selectRow" value="${data.id}" data-device-id="${data.id}">
                                                                    </td>`;

                                                                    // Close the row
                                                                    rowsHtml += `</tr>`;
                                                                }

                                                                });

                                                                $('#listDeviceInformationBody').html(rowsHtml);
                                                            });
                                                        }
                                                    });



                             // Event listener for the 'Select' button
                                        $(document).on('click', '#selectBtn', function() {
                                            var selectedDeviceIds = [];

                                            // Loop through each checked checkbox to get the deviceId
                                            $('#listDeviceInformationBody input[name="selectRow"]:checked').each(function() {
                                                var deviceId = $(this).data('device-id');
                                                selectedDeviceIds.push(deviceId); // Add the deviceId to the array
                                            });

                                            // Check selection conditions and respond accordingly
                                                if (selectedDeviceIds.length === 0) {
                                                    alert("Please select at least one device.");
                                                } else if (selectedDeviceIds.length > 1) {
                                                    alert("Please select only one device.");
                                                } else {
                                                    // Only one device is selected
                                                    console.log("Selected Device ID:", selectedDeviceIds[0]);
                                                     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                                                     var departmentName = departmentElement.data("departmentname");//it
                                                     var departmentUserName = departmentElement.data("departmentuser-name");//saho
                                                     var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

                                                     // Send data to the controller using AJAX
                                                   $.ajax({
                                                               type: "POST",
                                                               url: "/inventory/updateDeliveryStatusAndDeliveryDevice",  // Replace with your controller endpoint
                                                               data: {
                                                                   serviceId: serviceId,
                                                                   problemName: problemName,
                                                                   solutionName: solutionName,
                                                                   deviceId: selectedDeviceIds[0],
                                                                   departmentName:departmentName,
                                                                   departmentUserName:departmentUserName,
                                                                   departmentUserId:departmentUserId
                                                               },
                                                               success: function(response) {
                                                                   // Handle success (e.g., show a message or close the modal)
                                                                   alert("Delivery was completed successfully!");
                                                                   hideModal();
                                                                   location.reload();
                                                               },
                                                               error: function(error) {
                                                                   // Handle error (e.g., show an error message)
                                                                   alert("Error updating delivery date!");
                                                               }
                                                           });

                                                }
                                        });



                                showModal();
                            });




            });

            // Add event listener for the availability button click
        $(document).on('click', '.view-button-pending', function() {

                     var departmentElement = $(".departmentName"); // Target element with department data
                    var departmentName = departmentElement.data("departmentname"); // e.g., "it"
                    var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
                    var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


                       var category = $(this).data('category');
                       var selectedDevices = [];

                       print('universalColumns', function(universalColumns) {
                           var categoriesHtml = '';
                           if (universalColumns) {
                               universalColumns.forEach(function(category) {
                                   categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                               });
                           }

                           var htmlToAdd = `
                               <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                   <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                       <thead>
                                           <tr>
                                               <th scope="col" style="background-color: gray;color:white">SN</th>
                                               <th scope="col" style="background-color: gray; display: none;color:white">Device Id</th>
                                               <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                               ${categoriesHtml}
                                               <th scope="col" style="background-color: gray;color:white">Description</th>
                                           </tr>
                                       </thead>
                                       <tbody id="listDeviceInformationBody"></tbody>
                                   </table>
                               </div>
                           `;

                           $('.modal-body').html(htmlToAdd);
                           $('#publicModalLabel').text("Device Information");

                           var rowsHtml = '';

                           print('allAddData', function(allAddData) {
                               if (allAddData) {
                                   print('individualColumns', function(individualColumns) {
                                       allAddData.forEach(function(data, index) {
                                           if (data.categoryName === category && data.userName===departmentName ) {
                                               rowsHtml += `<tr>
                                                   <td>${data.visibleId}</td>
                                                   <td style="display: none;">${data.id}</td>
                                                   <td>${data.categoryName}</td>`;

                                               universalColumns.forEach(function(column) {
                                                   rowsHtml += `<td>${data.allData[column.columnName]}</td>`;
                                               });

                                               rowsHtml += `<td>
                                                   <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                               if (individualColumns) {
                                                   individualColumns.forEach(function(individualColumn) {
                                                       if (individualColumn.categoryName === category) {
                                                           rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                       }
                                                   });
                                               }

                                               rowsHtml += `</ul></td></tr>`;
                                           }
                                       });

                                       // Populate the table only if rowsHtml has content
                                       if (rowsHtml) {
                                           $('#listDeviceInformationBody').html(rowsHtml);

                                           // Show modal only if rows were added
                                           showModal();
                                       } else {
                                           alert("No data found to display in the modal.");
                                       }
                                   });
                               }
                           });
                       });
                   });


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};
