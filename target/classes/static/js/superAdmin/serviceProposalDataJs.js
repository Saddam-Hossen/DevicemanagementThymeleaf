
function setAcceptanceCommentData(rowData) {
    console.log("Sending Row Data:", rowData);

    // Send the data to the controller using AJAX
    $.ajax({
        url: '/superAdmin/setAcceptanceCommentData', // Replace with your controller's endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(rowData), // Send the data as JSON
        success: function (response) {
            console.log("Server Response:", response);
            // Display a success message to the user
            alert("Data saved successfully!");
            location.reload();
            // Optionally refresh the table or update the UI
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", error);
            console.error("Response Text:", xhr.responseText); // Log error details
            // Display an error message to the user
            alert("An error occurred while saving the data!");
        }
    });
}
function addTableInformationOfService(serviceId) {
    var mergedServiceData = {}; // Object to hold all data organized by service ID

      // Select each container with the attribute `data-service-id`
      $("div[data-proposal-id]").each(function() {
          var serviceId1 = $(this).attr("data-proposal-id"); // Get the current service ID
          var serviceData = {}; // Object to hold form data for this specific service

          if(serviceId1===serviceId){
           // Loop through each form within this specific service container
                  $(this).find("form").each(function() {
                      var formId = $(this).attr('id'); // Get form ID (based on `problem.name`)
                      var formData = $(this).serializeArray(); // Serialize form data for each form

                      mergedServiceData[formId] = formData; // Store form data by `formId` (problem name)
                  });
                  return false;

                 // mergedServiceData[serviceId] = serviceData; // Add to main object by `serviceId`
          }

      });
       var departmentElement = $(".departmentName"); // Target element with department data
             var departmentName = departmentElement.data("departmentname"); // e.g., "it"
             var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
             var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    console.log("Final data being sent:", JSON.stringify(mergedServiceData));

    $.ajax({
        url: '/superAdmin/addProblemSolutionOfServicePrice',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            mergedServiceData: mergedServiceData,
            serviceId: serviceId,
            departmentName:departmentName,
            departmentUserName:departmentUserName,
            departmentUserId:departmentUserId
        }),
        success: function(response) {
            alert("Response: " + response);
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });

}

window.initServiceProposalGeneral = function () {
    $('#serviceProposalTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var serviceId = button.data('serviceId');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();
        var category =  button.data('category'); // Get the category for this row


           if(buttonId==="viewAlternative"){

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

                         $('#publicModalLabel').text("Device Information");




                                      var rowsHtml = '';
                                         // Corrected the for loop syntax to iterate over the deviceIds array
                                            // alert(result.inventory.deviceIds[i]);
                                             print('allAddData', function(allAddData) {
                                                 if (allAddData) {
                                                     // First, fetch individual columns
                                                     print('individualColumns', function(individualColumns) {

                                                         allAddData.forEach(function(data, index) {
                                                          if (data.categoryName=== category) {
                                                             rowsHtml += `<tr>
                                                                 <td>${index + 1}</td>
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




        }
        else if (buttonId === "accepted"){
          var htmlToAdd = `
                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>
                 `;

                 // Add the HTML code to the modal body using jQuery
                 $('.modal-body').html(htmlToAdd);
                   $('#publicModalLabel').text("Do you want to save price information ?")

                   $('#saveEditBtn').click(function() {
                     addTableInformationOfService(serviceId);
                     });

               showModal();
         }
         else if (buttonId === "chat") {

           var htmlToAdd = `
               <form id="linkForm">
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <label for="details" class="form-label">Details</label>
                       <textarea class="form-control" id="details" name="details" placeholder="Details"></textarea>
                   </div>
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <label for="budget" class="form-label">Budget</label>
                       <input type="number" class="form-control" name="budget" id="budget" placeholder="Budget">
                   </div>
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <label class="form-label">Links:</label>
                   </div>
                   <div id="linkDiv" class="mb-3" style="margin-left: 0%; text-align: left;">
                   </div>
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <button type="button" class="btn btn-primary" id="addLinkBtn">Add Link</button>
                   </div>
               </form>
               <div class="mb-3" style="margin-left: 0%; text-align: center;">
                   <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               </div>
           `;
           $('.modal-body').html(htmlToAdd);

           $('#publicModalLabel').text("Purchase Request");

           $('#addLinkBtn').click(function(event) {
               var linkCount = $('#linkDiv .input-group').length + 1;
               var linkName = 'link' + linkCount;

               var htmlToAppend = `
                   <div class="input-group mb-3">
                       <input type="text" class="form-control" name="${linkName}" placeholder="link1" aria-label="link1" aria-describedby="basic-addon2">
                       <div class="input-group-append">
                           <button class="btn btn-outline-secondary remove-link" type="button">X</button>
                       </div>
                   </div>
               `;
               $('#linkDiv').append(htmlToAppend);
           });

           $('#linkDiv').on('click', '.remove-link', function() {
               $(this).closest('.input-group').remove();
           });

           $('#saveEditBtn').click(function(event) {
               saveFormData(requestId);
           });

           showModal();
       }

     else if (buttonId === "view") {

          var htmlToAdd = `
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <h6 id="detailsId"></h6>
                   <h6 id="budgetId"></h6>
                   </div>
                      <div class="mb-9" style="margin-left: 0%; text-align: left;">
                          <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th scope="col" style="background-color: gray;">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;">Link</th>
                                        <th scope="col" style="background-color: gray;">Links</th>
                                       <th scope="col" style="background-color: gray;">Action</th>

                                  </tr>
                              </thead>
                              <tbody id="purchaseRequestInformationBody">

                              </tbody>
                          </table>
                      </div>
                      <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <label for="comments" class="form-label">Comments</label>
                         <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
                     </div>
                       <div class="mb-3" style="margin-left: 0%; text-align: center;">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>

                  `;
                  $('.modal-body').html(htmlToAdd);

                  $('#publicModalLabel').text("Accepted Request Form");

                print('requestData', function(requestData) {
                    if (requestData) {
                        const result = requestData.find(function(data1) {
                            return data1.id === requestId;
                        });
                        $("#detailsId").text("Details: " + result.purchase.details);
                        $("#budgetId").text("Budget: " + result.purchase.budget);
                        $("#comments").text( result.purchase.cooComment);

                        var rowsHtml = '';
                            for (let j = 0; j < result.purchase.acceptedLinks.length; j++) {
                             for (let i = 0; i < result.purchase.links.length; i++) {
                              const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                                     ? result.purchase.links[i]
                                     : 'https://' + result.purchase.links[i];
                             if(result.purchase.acceptedLinks[j]===link){
                              // Ensure the link includes the protocol (http:// or https://)
                                 const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                                     ? result.purchase.links[i]
                                     : 'https://' + result.purchase.links[i];

                                 rowsHtml += `<tr>
                                     <td>${i + 1}</td>
                                     <td style="display: none;">${link}</td>
                                     <td>
                                         <a href="${link}" target="_blank" style="text-decoration: none;">
                                             ${link}
                                         </a>
                                     </td>
                                     <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice"  class="action-checkbox" checked></td>
                                 </tr>`;

                             }
                            }
                            }


                        $('#purchaseRequestInformationBody').html(rowsHtml);
                    }
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


 $(document).ready(function() {
       // Loop through each solution and count devices based on category
       $('.device-count').each(function() {
           var category = $(this).data('category'); // Get the category for this row

           // Use the print function to get the count of devices for the category
           printAvailable('allAddData', category, function(count) {
               // Update the span with the count of devices
               if(count==0){
               $(this).text("Unavailable");
               }else{
               $(this).text("Available("+count+")");
               }

           }.bind(this));  // Bind the `this` context to update the correct span
       });
   });
function  printAvailable(dataType, category, callback) {
    // Ensure callback is a function
    if (typeof callback !== 'function') {
        console.error('Callback is not a function');
        return;
    }

    // Perform the AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging
            // Fetch the required data (assuming `dataType` gives the correct key)
            var allData = data[dataType];

            // Now count the devices matching the given category
            var count = 0;
            allData.forEach(function(device) {
                if (device.categoryName === category) {
                    count++; // Increment count for each matching category
                }
            });

            // Execute the callback with the count
            callback(count);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

window.initServiceProposalTable = function () {    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var allData = data['serviceRequests'];
            var allAddData = data['allAddData'];

            const tableBody = document.getElementById("serviceProposalTableBody");
            if (!tableBody) {
                console.error("Table body element with id 'serviceProposalTableBody' not found.");
                return;
            }
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
                     //  if (solution.action === "accept" && device.cooAcceptOfServiceRequest === 'Accepted') {
                           const row = document.createElement("tr");

                           console.log("Name:", solution.name);
                           console.log("Value:", solution.value);
                           console.log("Category:", solution.category);
                           console.log("Price:", solution.price);
                           console.log("Action:", solution.action);
                           console.log("Comment:", solution.comment);
                           console.log(solution);
                           var status = solution.cooManInfoOfPriceAcceptanceCommentStatus;

                           if(status==null){
                           status=" ";
                           }

                            console.log("inventoryToServiceCenterDeviceStatus:", solution.inventoryToServiceCenterDeviceStatus);

                           // Determine availability
                           const availability = getAvailability(solution.category);

                           // Create and append cells to the row
                           row.innerHTML = `
                               <td >${sn}</td>  <!-- Dynamic Counter -->
                               <td>${bivagName}</td>
                               <td>${categoryName}</td>
                               <td>${problem.name}</td>
                               <td>${solution.category}(${solution.name}-${solution.value})</td>
                                <td>
                                    <input type="text" name="inputField" id="inputField" placeholder="Enter Price" class="form-control" value="${solution.price}">
                                </td>
                                 <td>
                                     <div class="d-flex justify-content-center align-items-center action-button-container">
                                         <select class="form-select form-select-sm">
                                             <option value="" disabled ${solution.action == null ? 'selected' : ''}>Select</option>
                                             <option value="accept" ${solution.action == 'accept' ? 'selected' : ''}>Accept</option>
                                             <option value="reject" ${solution.action == 'reject' ? 'selected' : ''}>Reject</option>
                                         </select>
                                     </div>
                                 </td>

                                  <td>
                                    <input type="text" name="inputComment" id="inputComment" placeholder="Enter Comment" class="form-control" value="${solution.comment}">
                                </td>

                               <td>
                                   <button class="btn btn-info btn-sm view-button-pending" data-category="${solution.category}" data-device-id="${device.deviceId}" data-button-id="viewAlternative" title="View Available Same Accessories Category Devices" >
                                       ${availability}
                                   </button>
                               </td>
                               <td>
                               ${status}
                               </td>
                                 <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>
                               <td>

                                  <div class="d-flex justify-content-center align-items-center action-button-container">


                                             ${solution.cooManInfoOfPriceAcceptanceCommentStatus !== "Accepted"  ? `
                                                 <button class="btn btn-sm text-white setAcceptanceCommentBtn" data-category="${solution.category}" data-solution-name="${solution.name}" data-problem-name="${problem.name}" data-service-id="${device.id}" data-button-id="accepted" style="background-color:green;" title="Delivery Device">✔</button>
                                             ` : ""}


                                          </div>
                               </td>
                           `;

                           // Increment the counter for the next row
                           counter++;

                           // Append the row to the table body
                           tableBody.appendChild(row);
                      // }
                   });
               });
           });
           sortAndFormatAllTables();
 // Add event listener for the availability button click
            $(document).on('click', '.view-button-selected-device', function() {
                                var category = $(this).data('category');
                                var deviceId=$(this).data('deviceId');
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
                                                    <th scope="col" style="background-color: gray;">SN</th>
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
            $(document).on('click', '.setAcceptanceCommentBtn', function() {// Get the clicked button
                    const $button = $(this);
                    var button = $(event.target).closest('button');
                    var serviceId = button.data('serviceId');
                    // Get the parent row (tr)
                    const $row = $button.closest('tr');

                  // Extract data from specific child cells using nth-child (1-based index)
                     // const serviceId = $row.find('td:nth-child(1)').text(); // First column
                       const bibagName = $row.find('td:nth-child(2)').text(); // Second column
                      const solutionCategory = $row.find('td:nth-child(3)').text(); //Third column
                      const solutionName = $row.find('td:nth-child(4)').text(); // Fourth column
                      const problemName = $row.find('td:nth-child(5)').text(); // Fifth column
                      const price = $row.find('td:nth-child(6) input').val(); // six column, assuming it contains an <input>
                      const action = $row.find('td:nth-child(7) select').val(); // six column, assuming it contains an <input>
                      const comment = $row.find('td:nth-child(8) input').val(); // six column, assuming it contains an <input>

                       var departmentElement = $(".departmentName"); // Target element with department data
                       var departmentName = departmentElement.data("departmentname"); // e.g., "it"
                       var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
                       var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"
                      // Create a formatted object with the row data
                     // Create a formatted object with the row and department data
                        const rowData = {
                            serviceId: serviceId,
                            bibagName: bibagName,
                            solutionCategory: solutionCategory,
                            solutionName: solutionName,
                            problemName: problemName,
                            price: price,
                            action:action,
                            comment:comment,
                            departmentName: departmentName,
                            departmentUserName: departmentUserName,
                            departmentUserId: departmentUserId
                        };

                    // Print the row's data
                    console.log("Row Data:", rowData);

                    setAcceptanceCommentData(rowData);



            });

            // Add event listener for the availability button click
        $(document).on('click', '.view-button-pending', function() {
                       var category = $(this).data('category');
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
                                               <th scope="col" style="background-color: gray;">SN</th>
                                               <th scope="col" style="background-color: gray; display: none;">Device Id</th>
                                               <th scope="col" style="background-color: gray;">Category Name</th>
                                               ${categoriesHtml}
                                               <th scope="col" style="background-color: gray;">Description</th>
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


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};
