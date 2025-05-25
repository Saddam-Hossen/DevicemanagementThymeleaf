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
function approveFinalPurchaseDeviceDelivery(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/superAdmin/approveFinalPurchaseDeviceDelivery",
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

function showModal(){
$('#publicModal').modal('show');
}
function hideModal(){
$('#publicModal').modal('hide');
}
function printRejectCause(element) {
        var rejectCause = element.getAttribute("data-reject-cause");

 var htmlToAdd = `
        <div class="mb-3" style="margin-left: 0%; text-align: left;">
           <h1>${rejectCause}
           </h1>
        </div>
           <div class="mb-3" style="margin-right: 0%; text-align: right;">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div>
       `;

       // Add the HTML code to the modal body using jQuery
        $('.modal-body').html(htmlToAdd);
       // edit individual column header
        $('#publicModalLabel').text("Rejected Cause:");

         $('#DeniedBtn').click(function() {

                 setRequestStatus(requestId,"Denied");
          });

        showModal();
    }

 function print(dataType, callback) {
            // Ensure callback is a function
            if (typeof callback !== 'function') {
                console.error('Callback is not a function');
                return;
            }

            $.ajax({
                url: '/superAdmin/allData',
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    // Execute the callback with the requested dataType
                    callback(data[dataType]);
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching data:', error);
                }
            });
        }

 function columnValue(requestId, columnName, callback) {
            print('requestData', function(allAddData) {
                const deviceData = allAddData.find(item => item.id === requestId);

                if (deviceData) {
                    const columnData = deviceData.allData;

                    if (columnData && columnData.hasOwnProperty(columnName)) {
                        callback(columnData[columnName]);
                    } else {
                        console.warn(`Column "${columnName}" not found in request data.`);
                        callback(undefined);
                    }
                } else {
                    console.warn(`No data found for Device ID ${requestId}`);
                    callback(undefined);
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


$(document).ready(function() {
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var allData = data['requestData'];
            var requestColumns = data['requestColumns'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("deliveryDeviceTableBody");

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
          if(device.inventory?.inventoryStatus==='Purchased' && device.inventory?.inventoryToCustomerCareDeviceSendingStatus==='Pending' ){

              // Extract required variables
              const bivagName = device.departmentName || "N/A"; // Handle undefined cases
              const categoryName = device.allData["category"] || "N/A";
              const sn = device.visibleRequestId || "N/A";
              console.log(bivagName);
                 let content = '';

                  if (device.inventory?.inventoryStatus === "Purchased") {
                      content = device.inventory?.inventoryToCustomerCareDeviceSendingStatus || ' ';
                  } else if (device.inventory?.inventoryStatus === "Alternative Proposal Accepted") {
                      content = device.inventory?.cooDeliveryAns || ' ';
                  } else {
                      content = ' ';
                  }
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
              `;

            // Action buttons column
                htmlData += `
                    <td>
                        <div class="d-flex justify-content-center align-items-center action-button-container">


                             ${ device.inventory?.inventoryToCustomerCareDeviceSendingStatus === "Pending" ? `
                               <button class="btn btn-primary btn-sm text-white fas  approveDeliveryDevice"  data-category-id="${device.allData['category']}" data-alternativedevice-id="${device.inventory.acceptedId}" data-request-id="${device.id}" data-button-id="deliver" title="Approve device delivery">
                                  ✔
                               </button>
                             ` : ""}


                        </div>
                    </td>
                `;

              // Assign the HTML to the row and append it to the table body
              row.innerHTML = htmlData;
              tableBody.appendChild(row);
            }
          }
          );
          $(document).on('click', '.approveDeliveryDevice', function() {
              var requestId = $(this).data('request-id');
              var deviceId = $(this).data('buyingdevice-id');
              var category = $(this).data('category-id');

              // Add confirmation
              if (confirm("Are you sure you want to approve delivery for this device?")) {
                  approveFinalPurchaseDeviceDelivery(requestId, deviceId);
              }
          });


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
});