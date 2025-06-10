
function saveFormData(requestId) {
    var formData = $("#linkForm").serialize();

    // Debugging: Check the serialized form data
    console.log(formData);

    // Append the requestId to the form data
    formData += '&requestId=' + encodeURIComponent(requestId);

    $.ajax({
        url: '/purchase/addPurchaseProposal',
        type: 'POST',
        data: formData,
        success: function(response) {
            alert(response);
            location.reload(); // Refresh the page
        },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
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

function setRequestStatusApprove(requestId,status){

            $.ajax({
                url: '/superAdmin/approveDeliveryProductRequestStatus',
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
function setCancelRequest(requestId,status){

            $.ajax({
                url: '/superAdmin/setCancelRequestCustomerCare',
                type: 'POST',
                data: {
                requestId: requestId,
                status:status,
                cause:$('#rejectCause').val()

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
 window.initCustomerCareRequestDataGeneral = function () {
    $('#requestCustomerCareTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('th:nth-child(3)').text();

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
        if(buttonId==="viewAlternative"){
         print('requestData', function(requestData) {
                    if (requestData) {
                        // Search for the specific ID using the find method
                        const result = requestData.find(function(data1) {
                            return data1.id === requestId;
                        });
                        if(result.inventory.cooAns=="Accepted")
                        {

                         var selectedDevices = [];
                          print('universalColumns', function(universalColumns) {
                         var categoriesHtml = '';
                         if (universalColumns) {
                             universalColumns.forEach(function(category) {
                                 categoriesHtml += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                             });
                         }

                         var htmlToAdd = `
                             <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                 <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                     <thead>
                                         <tr>
                                             <th scope="col" style="background-color: gray;">SN1</th>
                                              <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                             <th scope="col" style="background-color: gray;">Category Name</th>
                                             ${categoriesHtml}
                                             <th scope="col" style="background-color: gray;">Description</th>

                                         </tr>
                                     </thead>
                                     <tbody id="listDeviceInformationBody">

                                     </tbody>
                                 </table>
                             </div>

                         `;
                         $('.modal-body').html(htmlToAdd);

                         $('#publicModalLabel').text("Alternative Device Information");

                          print('requestData', function(requestData) {
                                 if (requestData) {
                                     // Search for the specific ID using the find method
                                     const result = requestData.find(function(data1) {
                                         return data1.id === requestId;
                                     });

                                     if (result) {
                                      var rowsHtml = '';
                                         // Corrected the for loop syntax to iterate over the deviceIds array

                                             let deviceIdCheck=result.inventory.acceptedId;
                                            // alert(result.inventory.deviceIds[i]);
                                             print('allAddData', function(allAddData) {
                                                 if (allAddData) {
                                                     // First, fetch individual columns
                                                     print('individualColumns', function(individualColumns) {

                                                         allAddData.forEach(function(data, index) {
                                                          if (data.id=== deviceIdCheck) {
                                                             rowsHtml += `<tr>
                                                                 <td>${index + 1}</td>
                                                                  <td style="display: none;">${data.id}</td>
                                                                 <td>${data.categoryName}</td>`;
                                                             universalColumns.forEach(function(column) {
                                                                 rowsHtml += `<td >${data.allData[column.columnName]}</td>`;
                                                             });

                                                             rowsHtml += `<td>
                                                                 <ul style="list-style: none; padding-left: 0; text-align: left;">`;

                                                             if (individualColumns) {
                                                                 individualColumns.forEach(function(individualColumn) {
                                                                    if (individualColumn.categoryName=== categoryName) {

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


                                     } else {
                                         console.warn(`No data found for Device ID ${requestId}`);
                                     }
                                 }

                             });

                         showModal();
                     });


                        }
                       else if(result.inventory.cooAns=="Rejected")
                       {
                       alert("Rejected Cause: \n"+result.inventory.rejectedCause);
                       }
                       else{

                       }

                        }});
        }
       else  if (buttonId === "accepted"){

         var htmlToAdd = `
            <div class="mb-3" style="margin-right: 0%; text-align: right;">
                <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
        `;
        $('.modal-body').html(htmlToAdd);
        $('#publicModalLabel').text("Do you want to  Approve the Request ?");
        $('#AcceptBtn').click(function() {

            setRequestStatusApprove(requestId, "Approved");

        });
        showModal();
         }
         else if (buttonId === "cancel") {
          var htmlToAdd = `
             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                 <label for="rejectCause" class="form-label">Reject Cause</label>
                 <input type="text" class="form-control" id="rejectCause" placeholder="Cause"  required>
             </div>
                <div class="mb-3" style="margin-right: 0%; text-align: right;">
                    <button type="button" class="btn btn-primary" id="DeniedBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
             $('.modal-body').html(htmlToAdd);
            // edit individual column header
             $('#publicModalLabel').text("Do you want to Denny this request ?");

              $('#DeniedBtn').click(function() {

                      setCancelRequest(requestId,"Denied");
               });

             showModal();
       }


    });
};


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
