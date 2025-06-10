function sendDeliveryDeviceAccept(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/sendDeliveryDevicePurchaseToInventoryAccept",
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
window.initRequestDataProposalGeneral = function () {
    $('#requestInventoryProposalTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
        var deviceId=button.data('purchasedevice-id')
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();
        var category=categoryName;
        if (!requestId) {
            console.error("Missing data-request-id attribute on button!");
            return;
        }

        if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }

        console.log(`Button Pressed: ${buttonPressed}`);
        console.log(`Button ID: ${buttonId}`);
        console.log(`Request ID: ${requestId}`);

  if (buttonId === "deliver") {


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
                    <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px; margin-right:5px;">Accept</button>
                     <button class="btn btn-danger btn-sm  btnReject" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Reject</button>
                    </div>
                </div>
            `;

            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Have you receive this device?");

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
                                 sendDeliveryDeviceAccept(requestId,selectedRows);
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
        }
        else if (buttonId === "purchase") {
            var htmlToAdd = `
                <div class="mb-3" style="margin-right: 0%; text-align: right;">
                    <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
            `;
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Do you want to Purchase this Product ?");
            $('#AcceptBtn').click(function() {
                setRequestStatus(requestId, "Purchased");
            });
            showModal();
        }

    });
};


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
