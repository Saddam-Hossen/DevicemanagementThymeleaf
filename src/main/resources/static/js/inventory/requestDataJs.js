function addTableInformationAlternativeDeviceRequest(requestId){
 // Define the Service class


         var mergedFormData = {}; // Object to hold all form data based on formId

         const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

         // Create an empty array to store service IDs
         let selectedDeviceIds = [];


         // Loop through each checked checkbox and get the data-service-id
         checkboxes.forEach(function(checkbox) {
           // Get the serviceId from the checkbox's data-service-id attribute
             const deviceId = checkbox.getAttribute('data-device-id');


           // Add the serviceId to the selectedServiceIds array
           if (deviceId) {

             selectedDeviceIds.push(deviceId);

           }

         });

          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s

              console.log("xyz "+selectedDeviceIds)

         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/addAlternativeDeviceList",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  requestId: requestId,
                  deviceIds: selectedDeviceIds ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
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
function  editRequestColumnBtn(requestId){

           var columnName=$('#requestNameEdit').val();
           var dataType=$('#requestDataTypeEdit').val();
           var requiredType=$('#requiredTypeRequestEdit').val();

           $.ajax({
               url: '/superAdmin/updateRequestColumn', // URL to your update endpoint
               type: 'POST',
               data: {
                   requestId: requestId,
                   columnName:columnName,
                   dataType: dataType,
                   requiredType:requiredType
               },
               success: function(result) {

                   alert(result);
                  location.reload();

               },
               error: function(xhr, status, error) {
                   console.error("Error updating category: " + error);
               }
           });
}
function listRequest(requestId,deviceIds) {
    // AJAX code
    $.ajax({
        url: '/inventory/addListRequest', // Replace with your endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({requestId: requestId, deviceIds: deviceIds }),
        success: function(response) {
            console.log("AJAX request successful:", response);
            // Handle success response
        },
        error: function(error) {
            console.log("AJAX request failed:", error);
            // Handle error response
        }
    });
}
function setRequestStatusCheckAvailability(requestId,status){
            $.ajax({
                    url: '/inventory/checkProductAvailability',
                    type: 'POST',
                    data: {
                    requestId: requestId,
                    status:status

                    },
                    success: function(result) {
                        alert(result);
                        location.reload();
                    },
                    error: function(xhr, status, error) {
                        console.error("Error deleting user:", error);
                    }
                });
}
function setRequestStatus(requestId,status){
    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                var departmentName = departmentElement.data("departmentname");//it
                var departmentUserName = departmentElement.data("departmentuser-name");//saho
                var departmentUserId = departmentElement.data("departmentuser-id");//s
            if(status=="Direct Delivery"){

             $.ajax({
                     url: '/inventory/deliverRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     status:status

                     },
                     success: function(result) {
                         alert(result);
                         location.reload();
                     },
                     error: function(xhr, status, error) {
                         console.error("Error deleting user:", error);
                     }
                 });

            }
            else if(status=="Purchased"){

            $.ajax({
                     url: '/inventory/purchaseRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     departmentName:departmentName,
                     departmentUserName:departmentUserName,
                     departmentUserId:departmentUserId,
                     status:status

                     },
                     success: function(result) {
                         alert(result);
                         location.reload();
                     },
                     error: function(xhr, status, error) {
                         console.error("Error deleting user:", error);
                     }
                 });
            }


}
function sendDeliveryDevice(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/sendDeliveryDeviceInventoryToCustomerCare",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  requestId: requestId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
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

 function formatDate(inputDate) {
                             // Split the input date into components
                             var parts = inputDate.split('-'); // parts[0] = '2024', parts[1] = '08', parts[2] = '20'

                             // Reformat the date to 'DD/MM/YY'
                             var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0].slice(2); // '20/08/24'

                             return formattedDate;
                         }
 function formatDateTime(inputDateTime) {
                    // Check if inputDateTime is undefined or null
                    if (!inputDateTime) {
                        console.error("inputDateTime is undefined or null");
                        return ""; // or return a default value
                    }

                    // Split the input datetime into date and time components
                    var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                    // Check if the split was successful
                    if (dateTimeParts.length !== 2) {
                        console.error("inputDateTime format is incorrect, expected 'YYYY-MM-DD HH:MM:SS'");
                        return ""; // or handle the error as needed
                    }

                    // Extract the date part
                    var datePart = dateTimeParts[0]; // '2024-08-20'

                    // Split the date into components
                    var dateComponents = datePart.split('-'); // ['2024', '08', '20']

                    // Check if the date split was successful
                    if (dateComponents.length !== 3) {
                        console.error("Date part of inputDateTime is incorrect, expected 'YYYY-MM-DD'");
                        return ""; // or handle the error as needed
                    }

                    // Reformat the date to 'DD/MM/YY'
                    var formattedDate = dateComponents[2] + '/' + dateComponents[1] + '/' + dateComponents[0].slice(2); // '20/08/24'

                    return formattedDate;
                }

function formatTime(inputDateTime) {
                    // Split the input datetime to separate date and time
                    var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                    // Extract the time part
                    var timePart = dateTimeParts[1]; // '15:02:26'

                    // Split the time into components
                    var timeComponents = timePart.split(':'); // ['15', '02', '26']

                    // Convert hour from 24-hour format to 12-hour format
                    var hour = parseInt(timeComponents[0], 10); // Convert '15' to 15
                    var minutes = timeComponents[1]; // '02'
                    var period = 'AM';

                    // Determine AM or PM period and adjust hour accordingly
                    if (hour >= 12) {
                        period = 'PM';
                        if (hour > 12) {
                            hour -= 12; // Convert 13-23 hours to 1-11 PM
                        }
                    } else if (hour === 0) {
                        hour = 12; // Midnight case, show as 12 AM
                    }

                    // Format time string as 'H:MM AM/PM'
                    var formattedTime = hour + ':' + minutes + ' ' + period;

                    return formattedTime;
                }
window.initRequestDataTable = function () {    // Perform a single AJAX call
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var allData = data['requestData'];
            var requestColumns = data['requestColumns'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("requestInventoryTableBody");

            // Function to check availability count
            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(function(device) {

                    if (device.categoryName === categoryName && device.userName==='inventory') {
                        count++;
                    }
                });
                return count === 0 ? "Unavailable" : `Available(${count})`;
            }

           let counter = 1; // Initialize a counter variable

           // Loop through each device in allData
          allData.forEach(function (device) {
              // Extract required variables
              const bivagName = device.departmentName || "N/A"; // Handle undefined cases
              const categoryName = device.allData["category"] || "N/A";
              const sn = device.visibleRequestId || "N/A";
              console.log(bivagName);

             const availability = getAvailability(categoryName);
              // Create a new row
              const row = document.createElement("tr");
                // Add the onclick attribute dynamically
                row.setAttribute("onclick", "printRowDataForCustomerCare(this)");
              // Base table row HTML
              let htmlData = `
                  <td>${sn}</td>  <!-- Serial Number -->
                  <td>${bivagName}</td>
                  <td>${device.allData["category"] || "N/A"}</td>
              `;

              // Conditional cell for request information
              htmlData += `
                  <td style="text-align: left;" data-request-id="${device.id}" class="viewInfo">
                      <div th:if="${device.requestMode === 'Accepted' && device.inventory?.inventoryStatus === 'Purchased'}">
              `;

              // Loop through request columns to add additional data
              requestColumns.forEach(function (column) {
                  if (column.visibleType === "yes") {
                      const columnName = column.columnName || "N/A";
                      const columnType = column.dataType || "text";
                      const value = device.allData[columnName] || "N/A";

                      if (columnType === "textarea") {
                          // Add textarea for columns with 'textarea' data type
                          htmlData += `
                              <div>
                                  <textarea class="plain-textarea">${value}</textarea>
                              </div>
                          `;
                      } else {
                          // Add spans for other data types
                          htmlData += `
                              <div>
                                  <span>${columnName}</span>: <span>${value}</span>
                              </div>
                          `;
                      }
                  }
              });

              // Close the div in the dynamic cell
              htmlData += `
                      </div>
                      <p  data-request-id="${device.id}" data-button-id="viewInfo">
                          &#128065;
                      </p>
                  </td>
              `;

              // Add other inventory data
              htmlData += `
                  <td>${device.inventory?.deliveryMode || "Not Delivered"}</td>
                  <td>${device.inventory?.inventoryStatus || "N/A"}</td>
              `;

          // Add new cells for `cooDeliveryAns` and `checkAvailability`
              htmlData += `
               <td>${device.inventory?.cooDeliveryAns || 'Pending'}</td>
                 <td>${device.inventory?.inventoryToCustomerCareDeviceSendingStatus || 'Pending'}</td>
                  <td>
                      <button class="btn btn-info btn-sm viewAvailability" data-category-id="${categoryName}" data-request-id="${device.id}" data-button-id="viewAlternative" title="View Available Same Accessories Category Devices" >
                          ${availability}
                      </button>
                  </td>
               <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>


              `;

            // Action buttons column
                htmlData += `
                    <td>
                        <div class="d-flex justify-content-center align-items-center action-button-container">


                             ${ device.inventory?.inventoryStatus==='Alternative Proposal Accepted' && device.inventory?.inventoryToAlternativeDeviceRequestStatus==='Accepted' && device.inventory?.inventoryToCustomerCareDeviceSendingStatus !=='Accepted' ? `
                               <button class="btn btn-primary btn-sm text-white fas  deliverDeviceForAlternative" if="${device.inventory.inventoryStatus==='Alternative Proposal Accepted' }" data-category-id="${device.allData['category']}" data-alternativedevice-id="${device.inventory.acceptedId}" data-request-id="${device.id}" data-button-id="deliver" title="Delivery device">
                                   &#xf0d1;
                               </button>
                             ` : ""}
                             ${ device.inventory.inventoryStatus==='Purchased' && device.purchase ?.purchaseDeviceSenderToInventoryStatus ==='Accepted' && device.inventory?.inventoryToCustomerCareDeviceSendingStatus !=='Accepted' ? `
                                 <button class="btn btn-primary btn-sm text-white fas  deliverDeviceForPurchase"  data-category-id="${device.allData['category']}" data-buyingdevice-id="${device.purchase.purchaseDeviceSenderToInventoryDeviceId}" data-request-id="${device.id}" data-button-id="deliver" title="Delivery device">
                                    &#xf0d1;
                                </button>
                              ` : ""}


                            ${ device.inventory.inventoryStatus !=='Alternative Proposal Accepted' && device.purchase ?.cooAns !=='Accepted' ?  `
                               <button class="btn btn-danger btn-sm delete-button fas purchase" data-request-id="${device.id}" data-button-id="purchase" title="Request for purchase">
                                    &#xf07a;
                                </button>
                          ` : ""}
                           ${ device.inventory.inventoryToAlternativeDeviceRequestStatus ==='Rejected'  ? `
                             <button class="btn btn-danger btn-sm delete-button fas purchase" data-request-id="${device.id}" data-button-id="purchase" title="Request for purchase">
                                  &#xf07a;
                              </button>
                        ` : ""}



                           ${ device.inventory.inventoryStatus !=='Purchased' && device.inventory.inventoryToAlternativeDeviceRequestStatus !=='Accepted' ? `
                              <button class="btn btn-secondary btn-sm chat-button  viewAlternativeDevice"  data-category-id="${device.allData['category']}" data-request-id="${device.id}" data-button-id="chat" title="Request for Alternative Device">
                                  &#128172; <!-- Speech Bubble -->
                              </button>
                          ` : ""}
                           ${ device.purchase ?.cooAns ==='Rejected'  ? `
                            <button class="btn btn-secondary btn-sm chat-button  viewAlternativeDevice"  data-category-id="${device.allData['category']}" data-request-id="${device.id}" data-button-id="chat" title="Request for Alternative Device">
                                &#128172; <!-- Speech Bubble -->
                            </button>
                        ` : ""}


                            <button class="btn btn-info btn-sm view-button chat"  data-buyingdevice-id="${device.purchase ?.purchaseDeviceSenderToInventoryDeviceId}" data-alternativedevice-id="${device.inventory.acceptedId}"   data-category-id="${device.allData['category']}" data-request-id="${device.id}" data-button-id="view" title="View Delivery device">
                                &#128065;
                            </button>

                        </div>
                    </td>
                `;

              // Assign the HTML to the row and append it to the table body
              row.innerHTML = htmlData;
              tableBody.appendChild(row);
          });
          //const myTable = document.getElementById("requestInventoryTable");  // or more specific selector if you want
          const myTable = document.querySelector("table");  // or more specific selector if you want
          sortAndFormatTable(myTable);
          $(document).on('click', '.deliverDeviceForPurchase', function() {
           var requestId=$(this).data('request-id');
           var deviceId=$(this).data('buyingdevice-id');
           var category=$(this).data('category-id');
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
                                             <th scope="col" style="background-color: gray; color:white">SN</th>
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
                                 <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Send</button>
                                 </div>
                             </div>
                         `;

                         $('.modal-body').html(htmlToAdd);
                         $('#publicModalLabel').text("Device Information");

                         var rowsHtml = '';
                             print('requestData', function(requestData){
                              if(requestData){

                                 const requestInfo = requestData.find(item => item.id === requestId);
                                 // Assuming you already have `rowsHtml` to construct your HTML.
                                  let ids = deviceId || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array
                                  print('allAddData', function(allAddData) {
                                     if (allAddData) {
                                         print('individualColumns', function(individualColumns) {
                                             allAddData.forEach(function(data, index) {
                                                 if (data.categoryName === category && data.userName==='inventory' && data.id ===deviceId) {
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
                              }
                             });

                            $('.btnSave').click(function(event) {
                                        event.preventDefault(); // Prevent the default action (form submission)
                                         var requestId=$(this).data('request-id');

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
                                              sendDeliveryDevice(requestId,selectedRows);
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
          $(document).on('click', '.deliverDeviceForAlternative', function() {
                     var requestId=$(this).data('request-id');
                     var deviceId=$(this).data('alternativedevice-id');
                     var category=$(this).data('category-id');
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
                                           <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Send</button>
                                           </div>
                                       </div>
                                   `;

                                   $('.modal-body').html(htmlToAdd);
                                   $('#publicModalLabel').text("Device Information");

                                   var rowsHtml = '';
                                       print('requestData', function(requestData){
                                        if(requestData){

                                           const requestInfo = requestData.find(item => item.id === requestId);
                                           // Assuming you already have `rowsHtml` to construct your HTML.
                                            let ids = deviceId || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array
                                            print('allAddData', function(allAddData) {
                                               if (allAddData) {
                                                   print('individualColumns', function(individualColumns) {
                                                       allAddData.forEach(function(data, index) {
                                                           if (data.categoryName === category && data.userName==='inventory' && data.id ===deviceId) {
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
                                        }
                                       });

                                      $('.btnSave').click(function(event) {
                                                  event.preventDefault(); // Prevent the default action (form submission)
                                                   var requestId=$(this).data('request-id');

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
                                                        sendDeliveryDevice(requestId,selectedRows);
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
          $(document).on('click', '.purchase', function() {
           var requestId=$(this).data('request-id');
              var htmlToAdd = `
                <div class="mb-3" style="margin-right: 0%; text-align: right;">
                    <button type="button" class="btn btn-primary" data-request-id="${requestId}" id="AcceptBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
            `;
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Do you want to Purchase this Product ?");
            $('#AcceptBtn').click(function() {

                setRequestStatus(requestId, "Purchased");
            });
            showModal();
           });
           $(document).on('click', '.viewAlternativeDevice', function() {
                                   var category = $(this).data('category-id');
                                   var requestId=$(this).data('request-id');

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
                                                <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Send</button>
                                                </div>
                                            </div>
                                        `;

                                        $('.modal-body').html(htmlToAdd);
                                        $('#publicModalLabel').text("Device Information");

                                        var rowsHtml = '';

                                        print('allAddData', function(allAddData) {
                                            if (allAddData) {
                                                print('individualColumns', function(individualColumns) {
                                                    allAddData.forEach(function(data, index) {
                                                        if (data.categoryName === category && data.userName==='inventory' && data.bookingStatus !=='Booked') {
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

                                                            rowsHtml += `</ul></td>
                                                            <td><input type="checkbox"  data-device-id="${data.id}" data-button-id="accepted" style="background-color: green; transform: scale(1.5); width: 12px; height: 12px;"  title="Delivery Device"></td>
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
                                         $('.btnSave').click(function() {
                                             var requestId=$(this).data('request-id');
                                            addTableInformationAlternativeDeviceRequest(requestId)
                                          });

                                    });
                                 });
           $(document).on('click', '.chat', function() {
             var category = $(this).data('category-id');
             var deviceId;
              deviceId=$(this).data('alternativedevice-id');
              if(deviceId==null){
               deviceId=$(this).data('buyingdevice-id');
              }

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
                                  if (data.categoryName === category && data.userName==='inventory' && data.id ===deviceId) {
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

                                      rowsHtml += `</ul></td>

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
              });
           });
           $(document).on('click', '.viewAvailability', function() {
                         // var requestId = $(this).data('request-id');

                         var category = $(this).data('category-id');
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
                                              if (data.categoryName === category && data.userName==='inventory') {
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

            $(document).on('click', '.viewInfo', function() {
                var requestId = $(this).data('request-id');

                // Fetch requestData
                print('requestData', function(requestData) {
                    if (requestData) {
                        // Find the specific device using its ID
                        const device = requestData.find(function(data1) {
                            return data1.id === requestId;
                        });

                        // Array to store selected devices (if needed later)
                        var selectedDevices = [];

                        // Fetch universal columns for table headers
                        print('requestColumns', function(universalColumns) {
                            var categoriesHtml = '';

                            if (universalColumns) {
                                universalColumns.forEach(function(category) {
                                    categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                                });
                            }

                            // Build the table structure
                            var htmlToAdd = `
                                <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                    <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" style="background-color: gray;color:white">SN</th>
                                                <th scope="col" style="background-color: gray; display: none;color:white">Device Id</th>
                                                <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                                ${categoriesHtml}

                                            </tr>
                                        </thead>
                                        <tbody id="listDeviceInformationBody"></tbody>
                                    </table>
                                </div>
                            `;

                            // Populate modal body
                            $('.modal-body').html(htmlToAdd);
                            $('#publicModalLabel').text("Request Information");

                            // Fetch columns to populate table rows
                            print('requestColumns', function(requestColumns) {
                                if (requestColumns && device) {
                                    var rowsHtml = `
                                        <tr>
                                            <td>${device.visibleRequestId || ''}</td>
                                            <td style="display: none;">${device.id || ''}</td>
                                            <td>${device.allData['category'] || 'N/A'}</td>
                                    `;

                                    // Add dynamic columns
                                    requestColumns.forEach(function(column) {
                                        rowsHtml += `<td>${device.allData[column.columnName] || 'N/A'}</td>`;
                                    });



                                    // Add rows to the table
                                    $('#listDeviceInformationBody').html(rowsHtml);
                                }
                            });

                            // Display the modal
                            showModal();
                        });
                    }
                });
            });





        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};