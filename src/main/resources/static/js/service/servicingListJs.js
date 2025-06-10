function ServiceReportExport(serviceId, requestInfo, actions, extractComponents, needAccessories) {
    // Convert tables to arrays
    const table1Data = tableToArray(requestInfo);
    const table2Data = tableToArray(actions);
    const table3Data = tableToArray(extractComponents);
    const table4Data = tableToArray(needAccessories);

    // Prepare data payload
    const payload = {
        serviceId: serviceId,
        requestInfo: table1Data,
        actions: table2Data,
        extractComponents: table3Data,
        needAccessories: table4Data
    };

    // Send data using $.ajax
    $.ajax({
        url: "/service/saveExcel", // Update the URL if necessary
        type: "POST",
        contentType: "application/json", // Specify JSON format for the payload
        data: JSON.stringify(payload), // Convert payload to JSON string
        success: function(response) {
            alert("Excel file saved successfully!");
            console.log("Response:", response);
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            console.error("Status:", status);
            console.error("Response:", xhr.responseText);
            alert("Failed to save the Excel file.");
        }
    });
}


// Helper function to calculate the maximum number of columns in a table
function getMaxColumns(tableData) {
    return tableData.reduce((max, row) => Math.max(max, row.length), 0);
}

// Helper function to convert a table element to a 2D array
function tableToArray(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tr");
    const data = [];
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        const rowData = [];
        cells.forEach(cell => {
            rowData.push(cell.innerText.trim());
        });
        data.push(rowData);
    });
    return data;
}


function   addExtractDeviceToService(categoryName,deviceId){
//dynamicFormAddDeviceExtract form
 // Serialize form data
     var formData = $("#dynamicFormAddDeviceExtract").serialize();
            var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


     // Append the category name, department name, starting date, username, and userId to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);

     formData += '&departmentName=' + encodeURIComponent(departmentName);
     formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
     formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceId=' + encodeURIComponent(deviceId);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/service/addDeviceInformation', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data along with additional fields
         success: function(response) {
             alert(response);
             hideModalExtract();
             var returnDeviceId=response;
                 var rowsHtmlExtraComponents = '';
                print('universalColumns', function(universalColumns) {

                   print('allAddData', function(allAddData) {
                   if (allAddData) {
                       // First, fetch individual columns
                       print('individualColumns', function(individualColumns) {

                       // device data
                          const data = allAddData.find(item => item.id === returnDeviceId);

                               rowsHtmlExtraComponents += `<tr>
                                   <td>${data.visibleId}</td>
                                    <td style="display: none;">${data.id}</td>
                                   <td>${data.categoryName}</td>`;
                               universalColumns.forEach(function(column) {
                                   rowsHtmlExtraComponents += `<td >${data.allData[column.columnName]}</td>`;
                               });

                               rowsHtmlExtraComponents += `<td>
                                   <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                               if (individualColumns) {
                                   individualColumns.forEach(function(individualColumn) {
                                      if (individualColumn.categoryName=== data.categoryName) {

                                       rowsHtmlExtraComponents += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                       }
                                   });
                               }
                             rowsHtmlExtraComponents += `</ul>
                                     </td>`;

                                 // Add another <td> for the checkbox
                                 rowsHtmlExtraComponents += `
                                     <td>
                                       <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                          value="${data.id}"
                                          style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                     </td>
                                 </tr>`;


                           $('#listDeviceInformationBodyExtraComponents').append(rowsHtmlExtraComponents);
                       });
                   }
               });
             //

          });

         },
         error: function(xhr, status, error) {
             console.error("Error saving data: " + error);
         }
     });
}
function serviceReport(serviceId,selectedExtractListDeviceIds,selectedNeedAccessoriesDeviceIds,status,deviceId) {

    // add action
     var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the modal-body div
    $("#problemActions form").each(function() {
        var formId = $(this).attr('id'); // Get the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    var departmentElement = $(".departmentName"); // Target element with department data
       var departmentName = departmentElement.data("departmentname"); // e.g., "it"
       var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
       var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    // Append serviceId and departmentName to the merged data
    mergedFormData['serviceId'] = serviceId;
    mergedFormData['departmentName'] = departmentName;
    mergedFormData['departmentUserName'] = departmentUserName;
    mergedFormData['departmentUserId'] = departmentUserId;
     mergedFormData['deviceId'] = deviceId;

    mergedFormData['selectedExtractListDeviceIds'] = selectedExtractListDeviceIds;
     mergedFormData['selectedNeedAccessoriesDeviceIds'] = selectedNeedAccessoriesDeviceIds;

     mergedFormData['status'] = status;

    $.ajax({
        url: '/service/generateServiceReport', // URL to your endpoint for saving data
        type: 'POST',
        contentType: 'application/json', // Ensure content type is JSON
        data: JSON.stringify(mergedFormData), // Convert mergedFormData object to JSON string
        success: function(response) {
            alert("Response: " + response);
            location.reload(); // Refresh the page
        },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });

}
function serviceReportEdit(serviceId,selectedExtractListDeviceIds,selectedNeedAccessoriesDeviceIds,status,deviceId) {

    // add action
     var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the modal-body div
    $("#problemActions form").each(function() {
        var formId = $(this).attr('id'); // Get the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    var departmentElement = $(".departmentName"); // Target element with department data
       var departmentName = departmentElement.data("departmentname"); // e.g., "it"
       var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
       var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    // Append serviceId and departmentName to the merged data
    mergedFormData['serviceId'] = serviceId;
    mergedFormData['departmentName'] = departmentName;
    mergedFormData['departmentUserName'] = departmentUserName;
    mergedFormData['departmentUserId'] = departmentUserId;
     mergedFormData['deviceId'] = deviceId;

    mergedFormData['selectedExtractListDeviceIds'] = selectedExtractListDeviceIds;
     mergedFormData['selectedNeedAccessoriesDeviceIds'] = selectedNeedAccessoriesDeviceIds;

     mergedFormData['status'] = status;

    $.ajax({
        url: '/service/generateServiceReportEdit', // URL to your endpoint for saving data
        type: 'POST',
        contentType: 'application/json', // Ensure content type is JSON
        data: JSON.stringify(mergedFormData), // Convert mergedFormData object to JSON string
        success: function(response) {
            alert("Response: " + response);
            location.reload(); // Refresh the page
        },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });

}
function addTableInformationOfServiceForEdit(serviceId) {
    // Extract department data
    var departmentElement = $(".departmentName"); // Target element with department data
    var departmentName = departmentElement.data("departmentname"); // e.g., "it"
    var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
    var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

    // Serialize form data and append additional parameters
    var formData = $("#problemForm").serialize();
    formData += '&serviceId=' + encodeURIComponent(serviceId);
    formData += '&departmentName=' + encodeURIComponent(departmentName);
    formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
    formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);

    // AJAX call to backend
    $.ajax({
        url: '/service/addDeviceInformationOfServiceForEdit', // Backend endpoint
        type: 'POST',
        data: formData,
        success: function(response) {
            alert(response);
            location.reload(); // Refresh the page after success
        },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });
}

function addTableInformationOfService22(serviceId) {
    var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the modal-body div
    $(".modal-body form").each(function() {
        var formId = $(this).attr('id'); // Get the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    var departmentElement = $(".departmentName"); // Target element with department data
       var departmentName = departmentElement.data("departmentname"); // e.g., "it"
       var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
       var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    // Append serviceId and departmentName to the merged data
    mergedFormData['serviceId'] = serviceId;
    mergedFormData['departmentName'] = departmentName;
    mergedFormData['departmentUserName'] = departmentUserName;
    mergedFormData['departmentUserId'] = departmentUserId;

    $.ajax({
        url: '/service/addProblemSolutionOfService', // URL to your endpoint for saving data
        type: 'POST',
        contentType: 'application/json', // Ensure content type is JSON
        data: JSON.stringify(mergedFormData), // Convert mergedFormData object to JSON string
        success: function(response) {
            alert("Response: " + response);
            location.reload(); // Refresh the page
        },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });
}


window.initServicingListGeneral = function () {
  $('#serviceInformationServicingListTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
   var categoryName = $row.find('td:nth-child(3)').text();
    // Target the button itself for better accuracy
       const button = $(event.target).closest('button');
       var buttonId = button.data('buttonId');
       var deviceId = button.data('deviceId');

       var  serviceId = button.data('serviceId');
    // Check if a button was clicked (prevents accidental clicks on other elements)
             var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
             var departmentName = departmentElement.data("departmentname");//it
             var departmentUserName = departmentElement.data("departmentuser-name");//saho
             var departmentUserId = departmentElement.data("departmentuser-id");//s
    if (!button.length) {
      return; // Do nothing if not a button click
    }
      if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)
    if(buttonId==="exportServiceReport"){
     var htmlToAdd = `
                          <div class="mb-3" style="margin-right: 0%; text-align: center;">

                            <div class="text-center" style="background-color:#D2E8E3; padding: 10px; border-radius: 5px; margin-bottom:1px">
                                <h4>Service Report</h4>
                                 <button type="button" class="btn btn-primary exportBtn" >Export</button>
                            </div>
                            <div id="requestInfo"></div>
                            <div id="actions"></div>
                            <div id="extractComponents"></div>
                            <div id="needAccessories"></div>
                          </div>

                          <div class="mb-3" style="margin-right: 0%; text-align: center;">

                              <button type="button" class="btn btn-primary exportBtn" >Export</button>
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                          </div>
                      `;
                      $('.modal-body').html(htmlToAdd);
                       // $('#publicModalLabel').text("Service Report");
                       requestInfo();
                      function requestInfo() {
                          // Get the current date
                          const currentDate = new Date();

                          // Format the date as YYYY-MM-DD
                          const formattedDate = currentDate.toISOString().split('T')[0];

                          // Simulating data fetch
                          print('serviceRequests', function (serviceRequests) {
                              if (serviceRequests) {
                                  // Find the matching service data by serviceId
                                  const serviceData = serviceRequests.find(item => item.id === serviceId);

                                  // Debugging: Log serviceData to ensure it contains the required fields
                                  console.log(serviceData);

                                  if (serviceData) {
                                      const tableHtml = `
                                          <table class="table table-bordered" id="requestInfo">
                                              <tbody>
                                                  <tr>
                                                      <th style="width: 20%;">Device Category</th>
                                                      <td style="width: 30%;">${serviceData.categoryName}</td>
                                                      <th style="width: 20%;">Description</th>
                                                      <td style="width: 30%;">
                                                          <button class="btn btn-info btn-sm viewDevice"
                                                                  data-device-id="${serviceData.deviceId || 'N/A'}"
                                                                  data-button-id="viewDevice">
                                                              View &#128065;
                                                          </button>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <th>Receive Date</th>
                                                      <td>${serviceData.serviceCenterServiceRequestAcceptedTime || 'N/A'}</td>
                                                      <th>Dept. Name</th>
                                                      <td>${serviceData.departmentName || 'N/A'}</td>
                                                  </tr>
                                                  <tr>
                                                      <th>Completed Date</th>
                                                      <td>${serviceData.serviceCenterToCustomerCareTime || 'N/A'}</td>
                                                      <th>Serial No.</th>
                                                      <td>${serviceData.visibleServiceId}</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      `;

                                      // Insert the table into the element with ID "requestInfo"
                                      $('#requestInfo').html(tableHtml);

                                      // Add click event listener for "viewDevice" buttons
                                      $('.viewDevice').on('click', function () {
                                          const deviceId = $(this).data('device-id');
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
                                              $('.modal-bodyView').html(htmlToAdd);

                                              $('#publicModalLabelView').text("Device Information");
                                              colorChange();
                                               function  colorChange(){
                                                           // When the second modal is shown, add a blur effect to the first modal
                                                            $('#publicModalView').on('show.bs.modal', function () {
                                                              $('#publicModal .modal-content').css('filter', 'blur(200px)'); // Apply blur effect
                                                            });

                                                            // When the second modal is hidden, remove the blur effect from the first modal
                                                            $('#publicModalView').on('hidden.bs.modal', function () {
                                                              $('#publicModal .modal-content').css('filter', ''); // Remove blur effect
                                                            });
                                                          }



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


                                              showModalView();
                                          });

                                      });
                                  } else {
                                      console.error('No matching service data found.');
                                  }
                              } else {
                                  console.error('No service requests available.');
                              }
                          });
                      }

                        actions();
                        // Function to dynamically create a table inside #actions div
                         function actions() {
                           // Generate the initial table structure
                           const tableHtml = `
                             <table class="table table-bordered" id="actions">
                               <thead>
                                 <tr>
                                    <th scope="col" style="background-color: gray; text-align: center;" colspan="${3}">
                                     Taken   Actions
                                    </th>
                              </tr>
                                 <tr>
                                  <th>SN</th>
                                   <th>Problems</th>
                                   <th>Actions</th>
                                 </tr>
                               </thead>
                               <tbody id="actionBody">
                                 <!-- Dynamic rows will be appended here -->
                               </tbody>
                             </table>
                           `;
                           $('#actions').html(tableHtml);

                           // Fetch and process serviceRequests data
                           print('serviceRequests', function (serviceRequests) {
                             if (serviceRequests) {
                               // Find the matching service data by serviceId
                               const serviceData = serviceRequests.find(item => item.id === serviceId);

                               if (serviceData && serviceData.allProblem) {
                                 // Clear the table body before appending new rows
                                 const actionBody = $('#actionBody');
                                 actionBody.empty();

                     // Iterate through all problems and populate rows
                            serviceData.allProblem.forEach((problem,sn) => {
                              const actionsList = problem.proposalSolution
                                .map((solution, index) => `${index + 1}. ${solution.value}`) // Add serial number
                                .join('<br>'); // Combine actions as a list with line breaks

                                   const rowHtml = `
                                     <tr>
                                       <td>${sn + 1}</td>
                                       <td>${problem.name}</td>
                                       <td style="text-align: center;">${actionsList}</td> <!-- Left-align actions -->
                                     </tr>
                                   `;
                                   actionBody.append(rowHtml); // Append the generated row
                                 });
                               }
                             }
                           });
                         }
                         extractComponents();
                         function extractComponents(){
                             var selectedDevices = [];
                              print('universalColumns', function(universalColumns) {
                             var categoriesHtmlAccessories = '';
                             if (universalColumns) {
                                 universalColumns.forEach(function(category) {
                                     categoriesHtmlAccessories += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                                 });
                             }

                             var htmlToAddAccessories = `
                             <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                 <table id="extractComponents" class="table table-gray table-bordered table-hover">
                                     <thead>
                                         <tr>
                                             <th scope="col" style="background-color: gray; text-align: center;" colspan="${universalColumns.length + 4}">
                                                Extract Components
                                             </th>
                                       </tr>
                                         <tr>
                                             <th scope="col" style="background-color: gray;">SN</th>
                                             <th scope="col" style="background-color: gray;">Category Name</th>
                                             ${categoriesHtmlAccessories}
                                             <th scope="col" style="background-color: gray;">Description</th>

                                         </tr>
                                     </thead>
                                     <tbody id="listDeviceExtract">

                                     </tbody>
                                 </table>
                             </div>

                         `;
                         $('#extractComponents').html(htmlToAddAccessories);
                          var rowsHtmlAccessories = '';
                             print('allAddData', function(allAddData) {
                                      if (allAddData) {
                                         // First, fetch individual columns
                                          print('individualColumns', function(individualColumns) {
                                            // store all
                                           print('serviceRequests', function (serviceRequests) {
                                                   if (serviceRequests) {
                                                     // Find the matching service data by serviceId
                                                    const serviceData = serviceRequests.find(item => item.id === serviceId);
                                                    const listedExtractsNewComponents=serviceData.extractsNewComponents;
                                                      var sn=0;
                                                        if (listedExtractsNewComponents && listedExtractsNewComponents.length > 0) {

                                                             listedExtractsNewComponents.forEach((accessory, index) => {

                                                                allAddData.forEach(function(data, index) {

                                                                     if (data.id=== accessory) {
                                                                         rowsHtmlAccessories += `<tr>
                                                                             <td>${data.visibleId}</td>
                                                                             <td>${data.categoryName}</td>`;
                                                                         universalColumns.forEach(function(column) {
                                                                             rowsHtmlAccessories += `<td >${data.allData[column.columnName]}</td>`;
                                                                         });

                                                                         rowsHtmlAccessories += `<td>
                                                                             <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                         if (individualColumns) {
                                                                             individualColumns.forEach(function(individualColumn) {
                                                                                if (individualColumn.categoryName=== data.categoryName) {

                                                                                 rowsHtmlAccessories += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                                 }
                                                                             });
                                                                         }
                                                                       rowsHtmlAccessories += `</ul>
                                                                               </td>` ;
                                                                        // Add another <td> for the checkbox
                                                                           rowsHtmlAccessories += `

                                                                           </tr>`;
                                                                           sn++;
                                                                          }
                                                                     });

                                                               });
                                                        }
                                                    $('#listDeviceExtract').html(rowsHtmlAccessories);
                                                   // console.log('Generated rowsHtmlAccessories:', rowsHtmlAccessories);
                                                   }
                                                  });

                                          });




                                      }
                                  });


                         });

                      }
                      needAccessories();
                      function needAccessories(){

                             var selectedDevices = [];
                              print('universalColumns', function(universalColumns) {
                             var categoriesHtmlAccessories = '';
                             if (universalColumns) {
                                 universalColumns.forEach(function(category) {
                                     categoriesHtmlAccessories += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                                 });
                             }

                             var htmlToAddAccessories = `
                             <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                 <table id="needAccessories" class="table table-gray table-bordered table-hover">
                                     <thead>
                                         <tr>
                                                <th scope="col" style="background-color: gray; text-align: center;" colspan="${universalColumns.length + 4}">
                                                   Accessories/Components
                                                </th>
                                          </tr>
                                         <tr>
                                              <th scope="col" style="background-color: gray;">SN</th>
                                              <th scope="col" style="background-color: gray;">Category Name</th>
                                              ${categoriesHtmlAccessories}
                                              <th scope="col" style="background-color: gray;">Description</th>

                                          </tr>
                                     </thead>
                                     <tbody id="listDeviceAccessories">

                                     </tbody>
                                 </table>
                             </div>

                         `;
                         $('#needAccessories').html(htmlToAddAccessories);
                          var rowsHtmlAccessories = '';
                             print('allAddData', function(allAddData) {
                                      if (allAddData) {
                                         // First, fetch individual columns
                                          print('individualColumns', function(individualColumns) {
                                            // store all
                                           print('serviceRequests', function (serviceRequests) {
                                                   if (serviceRequests) {
                                                     // Find the matching service data by serviceId
                                                    const serviceData = serviceRequests.find(item => item.id === serviceId);
                                                    const listedAddAccessories=serviceData.addAccessories;
                                                     var sn=0;
                                                        if (listedAddAccessories && listedAddAccessories.length > 0) {

                                                             listedAddAccessories.forEach((accessory, index) => {

                                                                allAddData.forEach(function(data, index) {

                                                                     if (data.id=== accessory) {
                                                                         rowsHtmlAccessories += `<tr>
                                                                             <td>${data.visibleId}</td>
                                                                             <td>${data.categoryName}</td>`;
                                                                         universalColumns.forEach(function(column) {
                                                                             rowsHtmlAccessories += `<td >${data.allData[column.columnName]}</td>`;
                                                                         });

                                                                         rowsHtmlAccessories += `<td>
                                                                             <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                         if (individualColumns) {
                                                                             individualColumns.forEach(function(individualColumn) {
                                                                                if (individualColumn.categoryName=== data.categoryName) {

                                                                                 rowsHtmlAccessories += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                                 }
                                                                             });
                                                                         }
                                                                       rowsHtmlAccessories += `</ul>
                                                                               </td>` ;
     // Add another <td> for the checkbox
                                                                           rowsHtmlAccessories += `

                                                                           </tr>`;
                                                                            sn++;
                                                                          }
                                                                     });

                                                               });
                                                        }
                                                    $('#listDeviceAccessories').html(rowsHtmlAccessories);
                                                   // console.log('Generated rowsHtmlAccessories:', rowsHtmlAccessories);
                                                   }
                                                  });

                                          });




                                      }
                                  });


                         });
                      }



                      $('.exportBtn').click(function() {

                          ServiceReportExport(serviceId,"requestInfo","actions","extractComponents","needAccessories");
                      });
                      showModal();
    }
    else if(buttonId==="editServiceReport"){

    var htmlToAdd = `
                 <div class="container mt-0">
                     <!-- Tab navigation -->
                     <ul class="nav nav-tabs" id="myTab" role="tablist">
                         <li class="nav-item" role="presentation">
                             <button class="nav-link active" id="actions-tab" data-bs-toggle="tab" data-bs-target="#takenActions" type="button" role="tab" aria-controls="takenActions" aria-selected="true">Taken Actions</button>
                         </li>
                         <li class="nav-item" role="presentation">
                             <button class="nav-link" id="components-tab" data-bs-toggle="tab" data-bs-target="#extractComponents" type="button" role="tab" aria-controls="extractComponents" aria-selected="false">Extract Components</button>
                         </li>
                         <li class="nav-item" role="presentation">
                             <button class="nav-link" id="accessories-tab" data-bs-toggle="tab" data-bs-target="#needAccessories" type="button" role="tab" aria-controls="needAccessories" aria-selected="false">Need Accessories</button>
                         </li>
                     </ul>

                     <!-- Tab content -->
                     <div class="tab-content" id="myTabContent">
                         <!-- Taken Actions Tab -->
                         <div class="tab-pane fade show active" id="takenActions" role="tabpanel" aria-labelledby="actions-tab">
                             <div class="mb-3 text-center">
                                 <h5>Taken Actions:</h5>
                             </div>
                             <div id="problemActionsDiv" class="mb-3 text-left">
                                 <div id="problemActions"></div>
                             </div>
                         </div>

                         <!-- Extract Components Tab -->
                         <div class="tab-pane fade" id="extractComponents" role="tabpanel" aria-labelledby="components-tab">
                             <div class="mb-3 text-center">
                                 <h5>Extract Components:</h5>
                             </div>
                             <div id="problemExtraComponentsDiv" class="mb-3 text-left">
                                 <div id="problemExtraComponents"></div>
                             </div>
                         </div>

                         <!-- Need Accessories Tab -->
                         <div class="tab-pane fade" id="needAccessories" role="tabpanel" aria-labelledby="accessories-tab">
                             <div class="mb-3 text-center">
                                 <h5>Need Accessories:</h5>
                             </div>
                             <div id="problemNeedAccessoriesDiv" class="mb-3 text-left">
                                 <div id="problemNeedAccessories"></div>
                             </div>
                         </div>
                     </div>

                     <!-- Save and Close Buttons -->
                     <div class="mb-3" style="margin-left: 0%; text-align: center;">
                        <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                 </div>

                   `;

                      // Add the HTML code to the modal body using jQuery
                      $('.modal-body').html(htmlToAdd);
                     $('#publicModalLabel').text("Edit Service Report:");
                     showModal();

                     problemActions();
                     function problemActions() {
                         print('serviceRequests', function(serviceRequests) {
                             if (serviceRequests) {
                                 const serviceData = serviceRequests.find(item => item.id === serviceId);

                                 if (serviceData && serviceData.allProblem) {
                                     var categoriesHtml = '';

                                     // Generate the HTML structure for all problems
                                       serviceData.allProblem.forEach(problem => {
                                         console.log(problem.name); // Logs each problem name

                                         // Replace spaces in problem name with dashes for valid HTML IDs
                                         var problemId = problem.name.replace(/\s+/g, '-');
                                         console.log("Problem Id : "+problemId);

                                         // Start generating the HTML for the problem
                                         var htmlToAdd = `
                                             <form id="${problemId}">
                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                     <label class="form-label">Problem: ${problem.name}</label>
                                                 </div>
                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                     <div id="${problemId}-fieldNameProblemActions">
                                         `;

                                         // Check if the problem has predefined actions from the database
                                         if (problem.proposalSolution && Array.isArray(problem.proposalSolution)) {
                                             problem.proposalSolution.forEach((action, index) => {
                                                 htmlToAdd += `
                                                     <div class="input-group mb-3" id="${problemId}-input-${index + 1}">
                                                         <input type="text" class="form-control problem-input" name="${problemId}-action[]"
                                                                value="${action.value}" placeholder="${problem.name} Action" aria-label="${problem.name} Action" aria-describedby="remove-button">
                                                         <div class="input-group-append">
                                                             <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                                         </div>
                                                     </div>
                                                 `;
                                             });
                                         } else {
                                             // Add a single empty input field if no predefined actions exist
                                             htmlToAdd += `
                                                 <div class="input-group mb-3" id="${problemId}-input-1">
                                                     <input type="text" class="form-control problem-input" name="${problemId}-action[]"
                                                            placeholder="${problem.name} Action" aria-label="${problem.name} Action" aria-describedby="remove-button">
                                                     <div class="input-group-append">
                                                         <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                                     </div>
                                                 </div>
                                             `;
                                         }

                                         // Close the field container and form
                                         htmlToAdd += `
                                                     </div>
                                                 </div>
                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                     <button type="button" class="btn btn-primary add-action-btn" data-problem="${problemId}">Add Action</button>
                                                 </div>
                                             </form>
                                         `;

                                         categoriesHtml += htmlToAdd;
                                     });

                                     // Add the generated HTML to the container
                                     $('#problemActions').html(categoriesHtml);

                                     // Unbind previous handlers before adding new ones
                                     $(document).off('click', '.add-action-btn');
                                     $(document).off('click', '.remove-problem');

                                     // Attach event handler for the "Add Action" button
                                     $(document).on('click', '.add-action-btn', function() {
                                         const problemId = $(this).data('problem'); // Get the problem ID from the button
                                         const fieldContainer = $(`#${problemId}-fieldNameProblemActions`); // Select the target div

                                         // Debugging logs
                                         console.log("Button clicked for problemId:", problemId);
                                         console.log("Field container:", fieldContainer);

                                         // Create a new input group with a text field and a remove button
                                         const newIndex = fieldContainer.children().length + 1; // Calculate new index
                                         const htmlToAppend = `
                                             <div class="input-group mb-3" id="${problemId}-input-${newIndex}">
                                                 <input type="text" class="form-control problem-input" name="${problemId}-action[]"
                                                        placeholder="${problemId} Action" aria-label="${problemId} Action" aria-describedby="remove-button">
                                                 <div class="input-group-append">
                                                     <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                                 </div>
                                             </div>
                                         `;

                                         // Append the input group to the field container
                                         fieldContainer.append(htmlToAppend);
                                         console.log(`Added new action field to ${problemId}-fieldNameProblemActions`);
                                     });

                                     // Attach event handler for the "Remove Problem" button
                                     $(document).on('click', '.remove-problem', function() {
                                         $(this).closest('.input-group').remove(); // Remove the closest input group
                                         console.log("Removed action field");
                                     });
                                 }
                             }
                         });
                     }
                     problemExtraComponents();
                    function problemExtraComponents(){


                         var selectedDevices = [];
                            print('universalColumns', function(universalColumns) {
                           var categoriesHtmlExtraComponents = '';
                           if (universalColumns) {
                               universalColumns.forEach(function(category) {
                                   categoriesHtmlExtraComponents += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                               });
                           }

                           var htmlToAddExtraComponents = `
                            <div  style="margin-left: 0%; text-align: left;margin-bottom:10px ">
                              <button type="button" class="btn btn-primary" id="addExtractBtn"> New Component</button>
                            </div>
                               <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                   <table id="deviceInformationTableExtraComponents" class="table table-gray table-bordered table-hover">
                                       <thead>
                                           <tr>
                                               <th scope="col" style="background-color: gray;">SN</th>
                                                <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                               <th scope="col" style="background-color: gray;">Category Name</th>
                                               ${categoriesHtmlExtraComponents}
                                               <th scope="col" style="background-color: gray;">Description</th>
                                               <th scope="col" style="background-color: gray;">Action</th>

                                           </tr>
                                       </thead>
                                       <tbody id="listDeviceInformationBodyExtraComponents">

                                       </tbody>
                                   </table>
                               </div>

                           `;
                           $('#problemExtraComponents').html(htmlToAddExtraComponents);
                              $('#addExtractBtn').on('click', function () {
                                  addDeviceInformation();
                                  function addDeviceInformation(){

                                   var htmlToAdd = `
                                                  <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                      <div class="dropdown">
                                                          <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                                                          <input type="text" class="form-control dropdown-toggle custom-width" id="deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false">
                                                          <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox" id="deviceInputAddUlList">
                                                             <div id="listItemAddDevice"></div>
                                                          </ul>
                                                      </div>
                                                  </div>


                                                 <form   id="dynamicFormAddDeviceExtract">
                                               <div id="universalDiv" style="display:none">

                                                </div>
                                                <div id="deviceDiv">

                                                </div>

                                                 </form>
                                                  <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                      <button type="button" class="btn btn-primary" id="saveDeviceInfoBtn">Save</button>
                                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                  </div>
                                              `;

                                              // Add the HTML code to the modal body using jQuery
                                              $('.modal-bodyExtract').html(htmlToAdd);
                                              $('#publicModalLabelExtract').text("Extract Component Information")
                                               print('categories', function(categories) {
                                                     if (categories) {
                                                         // Generate HTML for categories
                                                         var categoriesHtml = '';
                                                         categories.forEach(function(category) {
                                                             categoriesHtml += `<li><a class="dropdown-item deviceInputEachItem" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                                                         });

                                                         // Insert evaluated Thymeleaf expression
                                                         $('#listItemAddDevice').html(categoriesHtml);
                                                     }
                                                 });
                                              print('universalColumns', function(universalColumns) {
                                                            if (universalColumns) {
                                                                // Generate HTML for categories
                                                                     var categoriesHtml = '';
                                                                universalColumns.forEach(function(column) {
                                                                    console.log(column.dataType);

                                                                     switch (column.dataType) {
                                                                         case 'text':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'password':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'email':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'url':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'search':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'tel':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'number':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'range':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'date':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'month':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'week':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'time':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'datetime-local':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'color':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'file':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'checkbox':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'radio':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'button':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'submit':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'reset':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'customDropDownList':
                                                                                 // Call the custom dropdown function and handle it as a promise
                                                                                 myFunctionThatHandlesCase(column,null,'dynamicFormAddDeviceExtract').then(function(dropDownHtml) {
                                                                                     //categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                                                                     $('#universalDiv').append(dropDownHtml); // Update the deviceDiv with new HTML
                                                                                 }).catch(function(error) {
                                                                                     console.error("Error:", error);
                                                                                 });
                                                                                 break;
                                                                         default:
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                                                             break;
                                                                     }


                                                                });

                                                               if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                                                                   // Only update if there's no custom dropdown list pending
                                                                     console.log(" check "+categoriesHtml);
                                                                   $('#universalDiv').html(categoriesHtml);
                                                               }
                                                            }
                                                        });

                                              // selection and input handler.
                                             selectionAndInputDeviceAddExtract();


                                               $('#saveDeviceInfoBtn').click(function() {
                                                  var categoryName=$('#deviceInputFieldAdd').val();

                                                 addExtractDeviceToService(categoryName,deviceId);
                                                 // saveTableInformationOfDevice(categoryName);
                                                  });
                                            colorChange();
                                            showModalExtract();
                                            function  colorChange(){
                                             // When the second modal is shown, add a blur effect to the first modal
                                              $('#publicModalExtract').on('show.bs.modal', function () {
                                                $('#publicModal .modal-content').css('filter', 'blur(200px)'); // Apply blur effect
                                              });

                                              // When the second modal is hidden, remove the blur effect from the first modal
                                              $('#publicModalExtract').on('hidden.bs.modal', function () {
                                                $('#publicModal .modal-content').css('filter', ''); // Remove blur effect
                                              });
                                            }


                                  }
                              });
                          var rowsHtmlExtraComponents = '';
                       // Corrected the for loop syntax to iterate over the deviceIds array
                          // alert(result.inventory.deviceIds[i]);

                          print('serviceRequests', function(serviceRequests) {
                                       if (serviceRequests) {
                                           const serviceData = serviceRequests.find(item => item.id === serviceId);
                                           print('allAddData', function(allAddData) {
                                                if (allAddData) {
                                                    // First, fetch individual columns
                                                    print('individualColumns', function(individualColumns) {

                                                    // device data
                                                   const deviceData = allAddData.find(item => item.id === deviceId);

                                                   // Ensure listedComponentsDevices is a Set
                                                   const listedComponentsDevices = deviceData.listedComponents instanceof Set
                                                       ? deviceData.listedComponents
                                                       : new Set(deviceData.listedComponents || []);

                                                   // Convert extractsNewComponents to a Set (if it's an array or something similar)
                                                   const extractsNewComponentsSet = new Set(deviceData.extractsNewComponents || []);

                                                   // Merge extractsNewComponentsSet into listedComponentsDevices
                                                   extractsNewComponentsSet.forEach(component => listedComponentsDevices.add(component));

                                                  // remove service center device

                                                   console.log("Updated components:", Array.from(listedComponentsDevices));

                                                   if (listedComponentsDevices && listedComponentsDevices.size > 0) {
                                                       listedComponentsDevices.forEach((accessory) => {
                                                           allAddData.forEach((data, index) => {
                                                               if (data.id === accessory && data.id !== deviceId) {
                                                                   // Begin generating rows
                                                                   rowsHtmlExtraComponents += `
                                                                       <tr>
                                                                           <td>${data.visibleId}</td>
                                                                           <td style="display: none;">${data.id}</td>
                                                                           <td>${data.categoryName}</td>`;

                                                                   // Add universal columns
                                                                   universalColumns.forEach((column) => {
                                                                       rowsHtmlExtraComponents += `<td>${data.allData[column.columnName]}</td>`;
                                                                   });

                                                                   // Add individual columns
                                                                   rowsHtmlExtraComponents += `<td><ul style="list-style: none; padding-left: 0; text-align: center;">`;
                                                                   if (individualColumns) {
                                                                       individualColumns.forEach((individualColumn) => {
                                                                           if (individualColumn.categoryName === data.categoryName) {
                                                                               rowsHtmlExtraComponents += `<li>${individualColumn.columnName}: ${data.allData[individualColumn.columnName]}</li>`;
                                                                           }
                                                                       });
                                                                   }
                                                                   rowsHtmlExtraComponents += `</ul></td>`;

                                                                   // Check if accessory exists in extractsNewComponents
                                                                   const isChecked = serviceData.extractsNewComponents?.includes(accessory);

                                                                   rowsHtmlExtraComponents += `
                                                                       <td>
                                                                           <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                                                               value="${data.id}" ${isChecked ? "checked" : ""}
                                                                               style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                                                       </td>
                                                                   </tr>`;
                                                               }
                                                           });
                                                       });
                                                   } else {
                                                       console.log("No accessories found for this device.");
                                                   }



                                                        $('#listDeviceInformationBodyExtraComponents').html(rowsHtmlExtraComponents);
                                                    });
                                                }
                                            });
                                          }
                                   });

                               });
                              }
                        problemNeedAccessories();
                      function problemNeedAccessories(){

                           var selectedDevices = [];
                              print('universalColumns', function(universalColumns) {
                             var categoriesHtmlAccessories = '';
                             if (universalColumns) {
                                 universalColumns.forEach(function(category) {
                                     categoriesHtmlAccessories += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                                 });
                             }

                             var htmlToAddAccessories = `
                                 <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                     <table id="deviceInformationTableAccessories" class="table table-gray table-bordered table-hover">
                                         <thead>
                                             <tr>
                                                 <th scope="col" style="background-color: gray;">SN</th>
                                                  <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                                 <th scope="col" style="background-color: gray;">Category Name</th>
                                                 ${categoriesHtmlAccessories}
                                                 <th scope="col" style="background-color: gray;">Description</th>
                                                 <th scope="col" style="background-color: gray;">Action</th>

                                             </tr>
                                         </thead>
                                         <tbody id="listDeviceInformationBodyAccessories">

                                         </tbody>
                                     </table>
                                 </div>

                             `;
                             $('#problemNeedAccessories').html(htmlToAddAccessories);

                                          var rowsHtmlAccessories = '';


                                    print('serviceRequests', function(serviceRequests) {
                                       if (serviceRequests) {
                                           const serviceData = serviceRequests.find(item => item.id === serviceId);
                                           print('allAddData', function(allAddData) {
                                                if (allAddData) {
                                                     const deviceData = allAddData.find(item => item.id === deviceId);
                                                      const listedExtractsNewComponents=deviceData.extractsNewComponents;
                                                    // First, fetch individual columns
                                                    print('individualColumns', function(individualColumns) {

                                                    allAddData.forEach(function(data, index) {
                                                        var result=false;
                                                        if(listedExtractsNewComponents){
                                                         listedExtractsNewComponents.forEach(info=>{
                                                               if(info===data.id){
                                                               result=true;
                                                               }
                                                           })  ;
                                                        }


                                                                   if(! result ){
                                                                      console.log(`Device #${index + 1}:`);
                                                                            var selectedDepartmentName="";
                                                                          // Log departmentName from deviceUsers
                                                                          // Get the last departmentName
                                                                          if (Array.isArray(data.deviceUsers) && data.deviceUsers.length > 0) {
                                                                              const lastUser = data.deviceUsers[data.deviceUsers.length - 1];
                                                                              if(lastUser.status==="1"){
                                                                                  selectedDepartmentName=lastUser.departmentName;
                                                                              }

                                                                          } else {
                                                                              console.log("No device users found for this device.");
                                                                          }
                                                                          console.log(`Last Department Name: ${selectedDepartmentName}`);

                                                                          if (selectedDepartmentName=== departmentName  && data.id !==deviceId) {
                                                                              rowsHtmlAccessories += `<tr>
                                                                                  <td>${data.visibleId}</td>
                                                                                   <td style="display: none;">${data.id}</td>
                                                                                  <td>${data.categoryName}</td>`;
                                                                              universalColumns.forEach(function(column) {
                                                                                  rowsHtmlAccessories += `<td >${data.allData[column.columnName]}</td>`;
                                                                              });

                                                                              rowsHtmlAccessories += `<td>
                                                                                  <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                              if (individualColumns) {
                                                                                  individualColumns.forEach(function(individualColumn) {
                                                                                     if (individualColumn.categoryName=== data.categoryName) {

                                                                                      rowsHtmlAccessories += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                                      }
                                                                                  });
                                                                              }
                                                                            rowsHtmlAccessories += `</ul>
                                                                                    </td>`;

                                                                                var boolean = false;
                                                                                var matchedCheck = null; // To store the matched item, if any

                                                                                // Loop through the components
                                                                                deviceData.addAccessories.forEach(check => {
                                                                                    if (data.id === check) {
                                                                                        boolean = true;
                                                                                        matchedCheck = check; // Store the matched item
                                                                                    }
                                                                                });

                                                                                // After the loop, check the result and construct the checkbox HTML
                                                                                if (boolean) {
                                                                                    // Checkbox selected
                                                                                    rowsHtmlAccessories += `
                                                                                        <td>
                                                                                            <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                                                                               value="${data.id}" checked
                                                                                               style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                                                                        </td>
                                                                                    </tr>`;
                                                                                } else {
                                                                                    // Checkbox not selected
                                                                                    rowsHtmlAccessories += `
                                                                                        <td>
                                                                                            <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                                                                               value="${data.id}"
                                                                                               style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                                                                        </td>
                                                                                    </tr>`;
                                                                                }


                                                                               }


                                                                   }



                                                        });

                                                        $('#listDeviceInformationBodyAccessories').html(rowsHtmlAccessories);
                                                    });
                                                }
                                            });
                                          }
                                   });




                                                 });
                            }
                    $('#saveEditBtn').click(function () {

                             const selectedExtractListDeviceIds = [];
                             const selectedNeedAccessoriesDeviceIds = [];
                            // Loop through all checkboxes in the table body
                            $('#listDeviceInformationBodyAccessories .form-check-input').each(function () {
                                if ($(this).is(':checked')) { // Check if checkbox is selected
                                    const row = $(this).closest('tr'); // Get the closest table row
                                    const rowData = {
                                        SN: row.find('td:eq(0)').text().trim(), // Get the SN column
                                        DeviceId: row.find('td:eq(1)').text().trim(), // Get the Device Id column
                                        CategoryName: row.find('td:eq(2)').text().trim(), // Get the Category Name column
                                        Description: row.find('td:eq(3)').text().trim() // Get the Description column
                                    };

                                    // Add DeviceId to the array
                                  selectedNeedAccessoriesDeviceIds.push(rowData.DeviceId);

                                    // Log the entire row data
                                   // console.log('Selected Row Data:', rowData);
                                }
                            });
                             $('#listDeviceInformationBodyExtraComponents .form-check-input').each(function () {
                                if ($(this).is(':checked')) { // Check if checkbox is selected

                                    const row = $(this).closest('tr'); // Get the closest table row
                                    const rowData = {
                                        SN: row.find('td:eq(0)').text().trim(), // Get the SN column
                                        DeviceId: row.find('td:eq(1)').text().trim(), // Get the Device Id column
                                        CategoryName: row.find('td:eq(2)').text().trim(), // Get the Category Name column
                                        Description: row.find('td:eq(3)').text().trim() // Get the Description column
                                    };

                                    selectedExtractListDeviceIds.push(rowData.DeviceId);



                                    // Log the entire row data
                                   // console.log('Selected Row Data:', rowData);
                                }
                            });

                            // Print all Device IDs
                           // console.log('All Selected Device IDs:', selectedNeedAccessoriesDeviceIds.join(', '));

                            // extract component


                            // Example call to your serviceReport function (uncomment if needed)

                           serviceReportEdit(serviceId,selectedExtractListDeviceIds,selectedNeedAccessoriesDeviceIds,"Save",deviceId);
                        });



    }

   else  if(buttonId==="serviceReport"){

                       var htmlToAdd = `
                                 <div class="container mt-0">
                                     <!-- Tab navigation -->
                                     <ul class="nav nav-tabs" id="myTab" role="tablist">
                                         <li class="nav-item" role="presentation">
                                             <button class="nav-link active" id="actions-tab" data-bs-toggle="tab" data-bs-target="#takenActions" type="button" role="tab" aria-controls="takenActions" aria-selected="true">Taken Actions</button>
                                         </li>
                                         <li class="nav-item" role="presentation">
                                             <button class="nav-link" id="components-tab" data-bs-toggle="tab" data-bs-target="#extractComponents" type="button" role="tab" aria-controls="extractComponents" aria-selected="false">Extract Components</button>
                                         </li>
                                         <li class="nav-item" role="presentation">
                                             <button class="nav-link" id="accessories-tab" data-bs-toggle="tab" data-bs-target="#needAccessories" type="button" role="tab" aria-controls="needAccessories" aria-selected="false">Need Accessories</button>
                                         </li>
                                     </ul>

                                     <!-- Tab content -->
                                     <div class="tab-content" id="myTabContent">
                                         <!-- Taken Actions Tab -->
                                         <div class="tab-pane fade show active" id="takenActions" role="tabpanel" aria-labelledby="actions-tab">
                                             <div class="mb-3 text-center">
                                                 <h5>Taken Actions:</h5>
                                             </div>
                                             <div id="problemActionsDiv" class="mb-3 text-left">
                                                 <div id="problemActions"></div>
                                             </div>
                                         </div>

                                         <!-- Extract Components Tab -->
                                         <div class="tab-pane fade" id="extractComponents" role="tabpanel" aria-labelledby="components-tab">
                                             <div class="mb-3 text-center">
                                                 <h5>Extract Components:</h5>
                                             </div>
                                             <div id="problemExtraComponentsDiv" class="mb-3 text-left">
                                                 <div id="problemExtraComponents"></div>
                                             </div>
                                         </div>

                                         <!-- Need Accessories Tab -->
                                         <div class="tab-pane fade" id="needAccessories" role="tabpanel" aria-labelledby="accessories-tab">
                                             <div class="mb-3 text-center">
                                                 <h5>Need Accessories:</h5>
                                             </div>
                                             <div id="problemNeedAccessoriesDiv" class="mb-3 text-left">
                                                 <div id="problemNeedAccessories"></div>
                                             </div>
                                         </div>
                                     </div>

                                     <!-- Save and Close Buttons -->
                                     <div class="mb-3" style="margin-left: 0%; text-align: center;">
                                        <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                 </div>

                       `;

                          // Add the HTML code to the modal body using jQuery
                          $('.modal-body').html(htmlToAdd);
                         $('#publicModalLabel').text("Service Report Generate:")
                           // problemActions
                          problemActions();
                         function problemActions() {
                             print('serviceRequests', function(serviceRequests) {
                                 if (serviceRequests) {
                                     const serviceData = serviceRequests.find(item => item.id === serviceId);

                                     if (serviceData && serviceData.allProblem) {
                                         var categoriesHtml = '';

                                         // Generate the HTML structure for all problems
                                         serviceData.allProblem.forEach(problem => {
                                             console.log(problem.name); // Logs each problem name

                                             // Replace spaces in problem name with dashes for valid HTML IDs
                                             var problemId = problem.name.replace(/\s+/g, '-');

                                             // HTML structure for the "Add Accessories" button and initial input
                                             var htmlToAdd = `
                                                 <form id="${problemId}">
                                                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                         <label class="form-label">Problem: ${problem.name}</label>
                                                     </div>
                                                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                         <div id="${problemId}-fieldNameProblemActions"></div>
                                                     </div>
                                                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                         <button type="button" class="btn btn-primary add-action-btn" data-problem="${problemId}">Add Action</button>
                                                     </div>
                                                 </form>
                                             `;
                                             categoriesHtml += htmlToAdd;
                                         });

                                         // Add the generated HTML to the container
                                         $('#problemActions').html(categoriesHtml);

                                         // Unbind previous handlers before adding new ones
                                         $(document).off('click', '.add-action-btn');
                                         $(document).off('click', '.remove-problem');

                                         // Attach event handler for the "Add Action" button
                                         $(document).on('click', '.add-action-btn', function() {
                                             const problemId = $(this).data('problem'); // Get the problem ID from the button
                                             const fieldContainer = $(`#${problemId}-fieldNameProblemActions`); // Select the target div

                                             // Debugging logs
                                             console.log("Button clicked for problemId:", problemId);
                                             console.log("Field container:", fieldContainer);

                                             // Create a new input group with a text field and a remove button
                                             const newIndex = fieldContainer.children().length + 1; // Calculate new index
                                             const htmlToAppend = `
                                                 <div class="input-group mb-3" id="${problemId}-input-${newIndex}">
                                                     <input type="text" class="form-control problem-input" name="${problemId}-action[]"
                                                            placeholder="${problemId} Action" aria-label="${problemId} Action" aria-describedby="remove-button">
                                                     <div class="input-group-append">
                                                         <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                                     </div>
                                                 </div>
                                             `;

                                             // Append the input group to the field container
                                             fieldContainer.append(htmlToAppend);
                                             console.log(`Added new action field to ${problemId}-fieldNameProblemActions`);
                                         });

                                         // Attach event handler for the "Remove Problem" button
                                         $(document).on('click', '.remove-problem', function() {
                                             $(this).closest('.input-group').remove(); // Remove the closest input group
                                             console.log("Removed action field");
                                         });
                                     }
                                 }
                             });
                         }


                           problemExtraComponents();
                           function problemExtraComponents(){


                                        var selectedDevices = [];
                                           print('universalColumns', function(universalColumns) {
                                          var categoriesHtmlExtraComponents = '';
                                          if (universalColumns) {
                                              universalColumns.forEach(function(category) {
                                                  categoriesHtmlExtraComponents += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                                              });
                                          }

                                          var htmlToAddExtraComponents = `
                                           <div  style="margin-left: 0%; text-align: left;margin-bottom:10px ">
                                             <button type="button" class="btn btn-primary" id="addExtractBtn"> New Component</button>
                                           </div>
                                              <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                                  <table id="deviceInformationTableExtraComponents" class="table table-gray table-bordered table-hover">
                                                      <thead>
                                                          <tr>
                                                              <th scope="col" style="background-color: gray;">SN</th>
                                                               <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                                              <th scope="col" style="background-color: gray;">Category Name</th>
                                                              ${categoriesHtmlExtraComponents}
                                                              <th scope="col" style="background-color: gray;">Description</th>
                                                              <th scope="col" style="background-color: gray;">Action</th>

                                                          </tr>
                                                      </thead>
                                                      <tbody id="listDeviceInformationBodyExtraComponents">

                                                      </tbody>
                                                  </table>
                                              </div>

                                          `;
                                          $('#problemExtraComponents').html(htmlToAddExtraComponents);
                                             $('#addExtractBtn').on('click', function () {
                                                 addDeviceInformation();
                                                 function addDeviceInformation(){

                                                  var htmlToAdd = `
                                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                                     <div class="dropdown">
                                                                         <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                                                                         <input type="text" class="form-control dropdown-toggle custom-width" id="deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false">
                                                                         <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox" id="deviceInputAddUlList">
                                                                            <div id="listItemAddDevice"></div>
                                                                         </ul>
                                                                     </div>
                                                                 </div>


                                                                <form   id="dynamicFormAddDeviceExtract">
                                                              <div id="universalDiv" style="display:none">

                                                               </div>
                                                               <div id="deviceDiv">

                                                               </div>

                                                                </form>
                                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                                     <button type="button" class="btn btn-primary" id="saveDeviceInfoBtn">Save</button>
                                                                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                 </div>
                                                             `;

                                                             // Add the HTML code to the modal body using jQuery
                                                             $('.modal-bodyExtract').html(htmlToAdd);
                                                             $('#publicModalLabelExtract').text("Extract Component Information")
                                                              print('categories', function(categories) {
                                                                    if (categories) {
                                                                        // Generate HTML for categories
                                                                        var categoriesHtml = '';
                                                                        categories.forEach(function(category) {
                                                                            categoriesHtml += `<li><a class="dropdown-item deviceInputEachItem" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                                                                        });

                                                                        // Insert evaluated Thymeleaf expression
                                                                        $('#listItemAddDevice').html(categoriesHtml);
                                                                    }
                                                                });
                                                             print('universalColumns', function(universalColumns) {
                                                                           if (universalColumns) {
                                                                               // Generate HTML for categories
                                                                                    var categoriesHtml = '';
                                                                               universalColumns.forEach(function(column) {
                                                                                   console.log(column.dataType);

                                                                                    switch (column.dataType) {
                                                                                        case 'text':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'password':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'email':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'url':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'search':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'tel':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'number':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'range':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'date':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'month':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'week':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'time':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'datetime-local':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'color':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'file':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'checkbox':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'radio':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'button':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'submit':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'reset':
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                                                                            break;
                                                                                        case 'customDropDownList':
                                                                                                // Call the custom dropdown function and handle it as a promise
                                                                                                myFunctionThatHandlesCase(column,null,'dynamicFormAddDeviceExtract').then(function(dropDownHtml) {
                                                                                                    //categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                                                                                    $('#universalDiv').append(dropDownHtml); // Update the deviceDiv with new HTML
                                                                                                }).catch(function(error) {
                                                                                                    console.error("Error:", error);
                                                                                                });
                                                                                                break;
                                                                                        default:
                                                                                            categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                                                                            break;
                                                                                    }


                                                                               });

                                                                              if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                                                                                  // Only update if there's no custom dropdown list pending
                                                                                    console.log(" check "+categoriesHtml);
                                                                                  $('#universalDiv').html(categoriesHtml);
                                                                              }
                                                                           }
                                                                       });

                                                             // selection and input handler.
                                                            selectionAndInputDeviceAddExtract();


                                                              $('#saveDeviceInfoBtn').click(function() {
                                                                 var categoryName=$('#deviceInputFieldAdd').val();

                                                                addExtractDeviceToService(categoryName,deviceId);
                                                                // saveTableInformationOfDevice(categoryName);
                                                                 });
                                                           colorChange();
                                                           showModalExtract();
                                                           function  colorChange(){
                                                            // When the second modal is shown, add a blur effect to the first modal
                                                             $('#publicModalExtract').on('show.bs.modal', function () {
                                                               $('#publicModal .modal-content').css('filter', 'blur(200px)'); // Apply blur effect
                                                             });

                                                             // When the second modal is hidden, remove the blur effect from the first modal
                                                             $('#publicModalExtract').on('hidden.bs.modal', function () {
                                                               $('#publicModal .modal-content').css('filter', ''); // Remove blur effect
                                                             });
                                                           }


                                                 }
                                             });
                                         var rowsHtmlExtraComponents = '';
                                      // Corrected the for loop syntax to iterate over the deviceIds array
                                         // alert(result.inventory.deviceIds[i]);
                                          print('allAddData', function(allAddData) {
                                                      if (allAddData) {
                                                          // First, fetch individual columns
                                                          print('individualColumns', function(individualColumns) {

                                                          // device data
                                                           const deviceData = allAddData.find(item => item.id === deviceId);
                                                           const listedComponentsDevices=deviceData.listedComponents;
                                                           if (listedComponentsDevices && listedComponentsDevices.length > 0) {

                                                               listedComponentsDevices.forEach((accessory, index) => {
                                                               console.log(`${index + 1}: ${accessory}`);

                                                              allAddData.forEach(function(data, index) {
                                                              if (data.id=== accessory && data.id !==deviceId) {

                                                                  rowsHtmlExtraComponents += `<tr>
                                                                      <td>${data.visibleId}</td>
                                                                       <td style="display: none;">${data.id}</td>
                                                                      <td>${data.categoryName}</td>`;
                                                                  universalColumns.forEach(function(column) {
                                                                      rowsHtmlExtraComponents += `<td >${data.allData[column.columnName]}</td>`;
                                                                  });

                                                                  rowsHtmlExtraComponents += `<td>
                                                                      <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                  if (individualColumns) {
                                                                      individualColumns.forEach(function(individualColumn) {
                                                                         if (individualColumn.categoryName=== data.categoryName) {

                                                                          rowsHtmlExtraComponents += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                          }
                                                                      });
                                                                  }
                                                                rowsHtmlExtraComponents += `</ul>
                                                                        </td>`;

                                                                    // Add another <td> for the checkbox
                                                                    rowsHtmlExtraComponents += `
                                                                        <td>
                                                                          <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                                                             value="${data.id}"
                                                                             style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                                                        </td>
                                                                    </tr>`;

                                                                   }
                                                              });
                                                               });
                                                           } else {
                                                                console.log("No accessories found for this device.");


                                                           }



                                                              $('#listDeviceInformationBodyExtraComponents').html(rowsHtmlExtraComponents);
                                                          });
                                                      }
                                                  });






                                                          });
                                                         }
                              // problemNeedAccessories
                              problemNeedAccessories();
                             function problemNeedAccessories(){

                                                  var selectedDevices = [];
                                                     print('universalColumns', function(universalColumns) {
                                                    var categoriesHtmlAccessories = '';
                                                    if (universalColumns) {
                                                        universalColumns.forEach(function(category) {
                                                            categoriesHtmlAccessories += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                                                        });
                                                    }

                                                    var htmlToAddAccessories = `
                                                        <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                                            <table id="deviceInformationTableAccessories" class="table table-gray table-bordered table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" style="background-color: gray;">SN</th>
                                                                         <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                                                        <th scope="col" style="background-color: gray;">Category Name</th>
                                                                        ${categoriesHtmlAccessories}
                                                                        <th scope="col" style="background-color: gray;">Description</th>
                                                                        <th scope="col" style="background-color: gray;">Action</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody id="listDeviceInformationBodyAccessories">

                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    `;
                                                    $('#problemNeedAccessories').html(htmlToAddAccessories);

                                                                 var rowsHtmlAccessories = '';
                                                                    // Corrected the for loop syntax to iterate over the deviceIds array
                                                                       // alert(result.inventory.deviceIds[i]);
                                                                        print('allAddData', function(allAddData) {
                                                                            if (allAddData) {
                                                                                // First, fetch individual columns
                                                                                print('individualColumns', function(individualColumns) {

                                                                                      // store all

                                                                                    allAddData.forEach(function(data, index) {


                                                                                    console.log(`Device #${index + 1}:`);
                                                                                      var selectedDepartmentName="";
                                                                                    // Log departmentName from deviceUsers
                                                                                    // Get the last departmentName
                                                                                    if (Array.isArray(data.deviceUsers) && data.deviceUsers.length > 0) {
                                                                                        const lastUser = data.deviceUsers[data.deviceUsers.length - 1];
                                                                                        if(lastUser.status==="1"){
                                                                                            selectedDepartmentName=lastUser.departmentName;
                                                                                        }

                                                                                    } else {
                                                                                        console.log("No device users found for this device.");
                                                                                    }
                                                                                    console.log(`Last Department Name: ${selectedDepartmentName}`);

                                                                                    if (selectedDepartmentName=== departmentName && data.id !==deviceId) {
                                                                                        rowsHtmlAccessories += `<tr>
                                                                                            <td>${data.visibleId}</td>
                                                                                             <td style="display: none;">${data.id}</td>
                                                                                            <td>${data.categoryName}</td>`;
                                                                                        universalColumns.forEach(function(column) {
                                                                                            rowsHtmlAccessories += `<td >${data.allData[column.columnName]}</td>`;
                                                                                        });

                                                                                        rowsHtmlAccessories += `<td>
                                                                                            <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                                        if (individualColumns) {
                                                                                            individualColumns.forEach(function(individualColumn) {
                                                                                               if (individualColumn.categoryName=== data.categoryName) {

                                                                                                rowsHtmlAccessories += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                      rowsHtmlAccessories += `</ul>
                                                                                              </td>`;

                                                                                          // Add another <td> for the checkbox
                                                                                          rowsHtmlAccessories += `
                                                                                              <td>
                                                                                                <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                                                                                   value="${data.id}"
                                                                                                   style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                                                                              </td>
                                                                                          </tr>`;

                                                                                         }
                                                                                    });

                                                                                    $('#listDeviceInformationBodyAccessories').html(rowsHtmlAccessories);
                                                                                });
                                                                            }
                                                                        });






                                                });
                           }


                        $('#saveEditBtn').click(function () {

                             const selectedExtractListDeviceIds = [];
                             const selectedNeedAccessoriesDeviceIds = [];
                            // Loop through all checkboxes in the table body
                            $('#listDeviceInformationBodyAccessories .form-check-input').each(function () {
                                if ($(this).is(':checked')) { // Check if checkbox is selected
                                    const row = $(this).closest('tr'); // Get the closest table row
                                    const rowData = {
                                        SN: row.find('td:eq(0)').text().trim(), // Get the SN column
                                        DeviceId: row.find('td:eq(1)').text().trim(), // Get the Device Id column
                                        CategoryName: row.find('td:eq(2)').text().trim(), // Get the Category Name column
                                        Description: row.find('td:eq(3)').text().trim() // Get the Description column
                                    };

                                    // Add DeviceId to the array
                                  selectedNeedAccessoriesDeviceIds.push(rowData.DeviceId);

                                    // Log the entire row data
                                   // console.log('Selected Row Data:', rowData);
                                }
                            });
                             $('#listDeviceInformationBodyExtraComponents .form-check-input').each(function () {
                                if ($(this).is(':checked')) { // Check if checkbox is selected

                                    const row = $(this).closest('tr'); // Get the closest table row
                                    const rowData = {
                                        SN: row.find('td:eq(0)').text().trim(), // Get the SN column
                                        DeviceId: row.find('td:eq(1)').text().trim(), // Get the Device Id column
                                        CategoryName: row.find('td:eq(2)').text().trim(), // Get the Category Name column
                                        Description: row.find('td:eq(3)').text().trim() // Get the Description column
                                    };

                                    selectedExtractListDeviceIds.push(rowData.DeviceId);



                                    // Log the entire row data
                                   // console.log('Selected Row Data:', rowData);
                                }
                            });

                            // Print all Device IDs
                           // console.log('All Selected Device IDs:', selectedNeedAccessoriesDeviceIds.join(', '));

                            // extract component


                            // Example call to your serviceReport function (uncomment if needed)

                           serviceReport(serviceId,selectedExtractListDeviceIds,selectedNeedAccessoriesDeviceIds,"Save",deviceId);
                        });


                     showModal();

     }

     else if(buttonId==="viewAlternative"){

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
                                                          if (data.id=== deviceId) {
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







                         showModal();
                     });




        }
     else if(buttonId === "Edit"){
              // Handle edit button click (add your logic here)
              console.log("Edit button clicked!");
              const serviceId = button.data('serviceId'); // Get device ID from data-device-id attribute

               if (!serviceId) {
                      console.error("Missing data-service-id attribute on delete button!");
                      return; // Handle potential missing attribute error gracefully
                    }
                var htmlToAdd = `
                       <form id="problemForm">
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <label class="form-label">Problems:</label>
                           </div>
                           <div id="problemDiv" class="mb-3" style="margin-left: 0%; text-align: left;">


                           </div>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary" id="addProblemBtn">Add Problem</button>
                           </div>

                       </form>

                       <div class="mb-3" style="margin-left: 0%; text-align: center;">
                           <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                       </div>
                   `;

                   $('.modal-body').html(htmlToAdd);
                   $('#publicModalLabel').text("Service Request");

                   // Function to add a new problem input
                   function addNewProblem() {

                       var problemCount = $('#problemDiv .input-group').length + 1;
                       var problemName = 'Problem' + problemCount;

                       var htmlToAppend = `
                           <div class="input-group mb-3">
                               <input type="text" class="form-control problem-input" name="${problemName}" placeholder="${problemName}" aria-label="${problemName}" aria-describedby="basic-addon2">
                               <div class="input-group-append">
                                   <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                               </div>
                           </div>
                       `;
                       $('#problemDiv').append(htmlToAppend);

                       // Focus on the newly added input field
                       $('#problemDiv .problem-input').last().focus();
                   }

                   // Add initial problem input
                 //  addNewProblem();

                   // Add a problem when the button is clicked
                   $('#addProblemBtn').click(function(event) {
                       addNewProblem();
                   });



                   // Listen for 'Enter' keypress in the problem input fields
                   $('#problemDiv').on('keypress', '.problem-input', function(event) {
                       if (event.key === 'Enter') {
                           event.preventDefault();
                           addNewProblem();
                       }
                   });

                   // Remove problem input on clicking 'X'
                   $('#problemDiv').on('click', '.remove-problem', function() {
                       $(this).closest('.input-group').remove();
                   });

                   // Save data when Save button is clicked
                   $('#saveEditBtn').click(function(event) {
                       addTableInformationOfServiceForEdit(serviceId);
                   });
                   print('serviceRequests', function(serviceRequests) {
                       if (serviceRequests) {
                           const serviceData = serviceRequests.find(item => item.id === serviceId);

                               if (serviceData && serviceData.allProblem) {
                                   var categoriesHtml = '';

                                   // Print all names of allProblem
                                   serviceData.allProblem.forEach(problem => {
                                       console.log(problem.name); // Logs each problem name
                                         var problemCount = $('#problemDiv .input-group').length + 1;
                                          var problemName = 'Problem' + problemCount;

                                          var htmlToAppend = `
                                              <div class="input-group mb-3">
                                                  <input type="text" class="form-control problem-input"  value="${problem.name }" name="${problemName}" placeholder="${problemName}" aria-label="${problemName}" aria-describedby="basic-addon2">
                                                  <div class="input-group-append">
                                                      <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                                  </div>
                                              </div>
                                          `;
                                          $('#problemDiv').append(htmlToAppend);

                                          // Focus on the newly added input field
                                          $('#problemDiv .problem-input').last().focus();

                                       });
                                    }

                           }
                        });

                   // Show the modal
                   showModal();

                 /*if (confirm(`Are you sure you want to edit device ${deviceId}?`)) {
                     console.log("edited done.");
                 }else{
                 console.log("edit canceled.");
                 }*/

        }
     else  if (buttonId === "accepted"){

               var htmlToAdd = `
                  <div class="mb-3" style="margin-right: 0%; text-align: right;">
                      <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  </div>
              `;
              $('.modal-body').html(htmlToAdd);
              $('#publicModalLabel').text("Do you want to accept this service request ?");
              $('#AcceptBtn').click(function() {
                  setServiceRequestAccept(serviceId, "Device In Received");
              });
              showModal();
               }
     else if (buttonId === "chat") {
                         print('serviceRequests', function(serviceRequests) {
                             if (serviceRequests) {
                                 const serviceData = serviceRequests.find(item => item.id === serviceId);

                                 if (serviceData && serviceData.allProblem) {
                                     var categoriesHtml = '';

                                     // Print all names of allProblem
                                     serviceData.allProblem.forEach(problem => {
                                         console.log(problem.name); // Logs each problem name

                                         // Replace spaces in problem name with dashes for valid HTML IDs
                                         var problemId = problem.name.replace(/\s+/g, '-');

                                         // HTML structure for the "Add Accessories" button and initial input
                                         var htmlToAdd = `
                                             <form id="${problemId}">
                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                     <label class="form-label">Problem: ${problem.name}</label>
                                                 </div>
                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                     <div class="row align-items-center" style="min-height: 100px;">
                                                         <div class="col-sm-4 mb-3 d-flex flex-column justify-content-end" style="height: 100%;">
                                                             <div class="mb-3" style="text-align: left;">
                                                                 <div class="dropdown" id="${problemId}-categoryName">
                                                                     <input type="text" class="form-control dropdown-toggle deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false" data-problem-id="${problemId}">
                                                                     <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox">
                                                                         <div class="listItemAddDevice"></div>
                                                                     </ul>
                                                                 </div>
                                                             </div>
                                                             <div class="mb-3" style="text-align: left;">
                                                                 <div id="${problemId}-listName"></div>
                                                             </div>
                                                             <div class="mb-3" style="text-align: left;">
                                                                 <div id="${problemId}-fieldName"></div>
                                                             </div>
                                                         </div>
                                                         <div id="${problemId}-div" class="col-sm-8 mb-3"></div>
                                                     </div>
                                                 </div>
                                                 <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                     <button type="button" class="btn btn-primary add-accessories-btn" data-problem="${problemId}">Add Accessories</button>
                                                 </div>
                                             </form>
                                         `;
                                         categoriesHtml += htmlToAdd;
                                     });

                                     var modalHtml = `
                                         ${categoriesHtml}
                                         <div class="mb-3" style="margin-right: 0%; text-align: center;">
                                             <button type="button" class="btn btn-primary" id="AcceptBtn">Save</button>
                                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                         </div>
                                     `;

                                     $('.modal-body').html(modalHtml);

                                     // print this
                                     $('#publicModalLabel').text("Add Accessories");

                                     // Fetch and update category list for each category field
                                     print('categories', function (categories) {
                                         if (categories) {
                                             var categoriesHtml = '';
                                             categories.forEach(function (category) {
                                                 categoriesHtml += `<li><a class="dropdown-item deviceInputEachItem" href="#" data-category="${category.categoryName}">${category.categoryName}</a></li>`;
                                             });

                                             $('.listItemAddDevice').html(categoriesHtml);

                                             $('.deviceInputEachItem').click(function () {
                                                 const selectedCategory = $(this).data('category'); // Get selected category
                                                 const dropdownInputField = $(this).closest('.dropdown').find('.deviceInputFieldAdd');

                                                 dropdownInputField.val(selectedCategory);
                                                 console.log('Selected Category:', selectedCategory);

                                                 const problemId = dropdownInputField.data('problem-id');
                                                  // do empty


                                                 // Use the problemId in the print function
                                                 print('universalColumns', function (universalColumns) {
                                                     if (universalColumns) {
                                                         var categoriesHtml1 = '';
                                                         universalColumns.forEach(function (category) {
                                                             categoriesHtml1 += `<li><a class="dropdown-item deviceInputEachItemList" href="#" data-columnName="${category.columnName}" data-problem-id="${problemId}">${category.columnName}</a></li>`;
                                                         });
                                                         // Insert universal categories into the "universal" div


                                                         print('individualColumns', function (individualColumns) {
                                                             if (individualColumns) {
                                                                 var categoriesHtml2 = '';

                                                                 // Loop through individualColumns and filter based on selectedCategory
                                                                 individualColumns.forEach(function (category) {
                                                                     console.log(selectedCategory + " " + category.categoryName);
                                                                     if (selectedCategory === category.categoryName) {
                                                                         categoriesHtml2 += `<li><a class="dropdown-item deviceInputEachItemList" href="#" data-columnName="${category.columnName}" data-problem-id="${problemId}">${category.columnName}</a></li>`;
                                                                     }
                                                                 });

                                                                 // Insert filtered categories into the "individual" div
                                                                 $('.individual').html(categoriesHtml2); // Append to .individual div
                                                             }
                                                         });


                                                         // Insert universal and individual items into the dropdown
                                                         var bodyList = `
                                                             <div class="dropdown">
                                                                 <input type="text" class="form-control dropdown-toggle deviceInputFieldAddList" data-bs-toggle="dropdown" placeholder="ListName" aria-expanded="false">
                                                                 <ul class="dropdown-menu custom-dropdown-menu">
                                                                     ${categoriesHtml1} <!-- Universal columns -->
                                                                     <div class="individual"></div> <!-- Individual columns -->
                                                                 </ul>
                                                             </div>
                                                         `;

                                                         dropdownInputField.closest('form').find(`#${problemId}-listName`).html(bodyList);

                                                         // Handle item selection in the dropdown
                                                         $(document).on('click', '.deviceInputEachItemList', function () {
                                                             const selectedListItem = $(this).data('columnname');
                                                             const problemIdList = $(this).data('problem-id');
                                                             console.log('Problem ID:', problemIdList);

                                                             $(this).closest('.dropdown').find('.deviceInputFieldAddList').val(selectedListItem);
                                                             console.log('Selected Column:', selectedListItem);

                                                             // first time need data type according to category and columnName
                                                            // alert(selectedCategory +" "+selectedListItem );

                                                            // do empty

                                                            print('universalColumns', function(universalColumns) {
                                                            if (universalColumns) {
                                                                // Generate HTML for categories
                                                                     var categoriesHtml = '';
                                                                universalColumns.forEach(function(column) {
                                                                    console.log(column.dataType);
                                                                   if(column.columnName===selectedListItem){

                                                                     switch (column.dataType) {
                                                                         case 'text':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'password':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'email':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'url':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'search':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'tel':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'number':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'range':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'date':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'month':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'week':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'time':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'datetime-local':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'color':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'file':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'checkbox':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'radio':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'button':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'submit':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'reset':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                                                             break;
                                                                        case 'customDropDownList':

                                                                         print('dropDownLists', function(dropDownLists) {
                                                                           if (dropDownLists) {
                                                                             const dropDownData = dropDownLists.find(item =>
                                                                               item.dropDownListName === selectedListItem && item.categoryName===selectedCategory
                                                                             );

                                                                             if (dropDownData) {

                                                                               // Assuming dropDownData.allData is an array of values for the dropdown
                                                                               categoriesHtml += `<div class="mb-3">
                                                                                                   <label>${column.columnName} </label>
                                                                                                   <div class="dropdown">
                                                                                                     <input type="text" class="form-control dropdown-toggle InputFieldDropDownList"
                                                                                                            data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                                                            aria-expanded="false" data-problem-id="${problemId}" readonly>
                                                                                                     <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox">`;

                                                                               // Generate each option as a list item in the dropdown
                                                                               dropDownData.allData.forEach(function(option) {
                                                                                 categoriesHtml += `<li class="dropdown-item">${option}</li>`;
                                                                               });

                                                                               categoriesHtml += `     </ul>
                                                                                                     </div>
                                                                                                   </div>`;

                                                                               // Insert the HTML with the custom dropdown into the page
                                                                               $(`#${problemIdList}-fieldName`).html(categoriesHtml);

                                                                               // Attach event listener after the dropdown is inserted into the DOM
                                                                               $('.dropdown-item').on('click', function() {
                                                                                 // Get the selected value from the clicked item
                                                                                 const selectedValue = $(this).text();
                                                                                 // Set the selected value in the input field
                                                                                 $(this).closest('.dropdown').find('.InputFieldDropDownList').val(selectedValue);
                                                                               });
                                                                             }
                                                                             else{
                                                                              categoriesHtml += `<div class="mb-3"><label>${column.columnName}</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                                                            $(`#${problemIdList}-fieldName`).html(categoriesHtml);
                                                                             }
                                                                           }
                                                                         });

                                                                          break;


                                                                         default:
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                                                             break;
                                                                     }

                                                                // Insert evaluated Thymeleaf expression
                                                                $(`#${problemIdList}-fieldName`).html(categoriesHtml);
                                                                }

                                                                });


                                                             }
                                                            });

                                                          print('individualColumns', function(individualColumns) {
                                                            if (individualColumns) {
                                                                // Generate HTML for categories
                                                                     var categoriesHtml = '';
                                                                individualColumns.forEach(function(column) {
                                                                    console.log(column.dataType);
                                                                   if(column.columnName===selectedListItem && column.categoryName===selectedCategory){

                                                                     switch (column.dataType) {
                                                                         case 'text':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'password':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'email':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'url':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'search':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'tel':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'number':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'range':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'date':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'month':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'week':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'time':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'datetime-local':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'color':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'file':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'checkbox':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'radio':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'button':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'submit':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                                                             break;
                                                                         case 'reset':
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                                                             break;
                                                                          case 'customDropDownList':
                                                                               print('dropDownLists', function(dropDownLists) {
                                                                                 if (dropDownLists) {
                                                                                   const dropDownData = dropDownLists.find(item =>
                                                                                     item.dropDownListName === selectedListItem && item.categoryName===selectedCategory
                                                                                   );

                                                                                   if (dropDownData) {

                                                                                     // Assuming dropDownData.allData is an array of values for the dropdown
                                                                                     categoriesHtml += `<div class="mb-3">
                                                                                                         <label>${column.columnName} </label>
                                                                                                         <div class="dropdown">
                                                                                                           <input type="text" class="form-control dropdown-toggle InputFieldDropDownList"
                                                                                                                  data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                                                                  aria-expanded="false" data-problem-id="${problemId}" readonly>
                                                                                                           <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox">`;

                                                                                     // Generate each option as a list item in the dropdown
                                                                                     dropDownData.allData.forEach(function(option) {
                                                                                       categoriesHtml += `<li class="dropdown-item">${option}</li>`;
                                                                                     });

                                                                                     categoriesHtml += `     </ul>
                                                                                                           </div>
                                                                                                         </div>`;

                                                                                     // Insert the HTML with the custom dropdown into the page
                                                                                     $(`#${problemIdList}-fieldName`).html(categoriesHtml);

                                                                                     // Attach event listener after the dropdown is inserted into the DOM
                                                                                     $('.dropdown-item').on('click', function() {
                                                                                       // Get the selected value from the clicked item
                                                                                       const selectedValue = $(this).text();
                                                                                       // Set the selected value in the input field
                                                                                       $(this).closest('.dropdown').find('.InputFieldDropDownList').val(selectedValue);
                                                                                     });
                                                                                   }
                                                                                 }
                                                                               });

                                                                                break;
                                                                         default:
                                                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                                                             break;
                                                                     }

                                                                // Insert evaluated Thymeleaf expression
                                                                $(`#${problemIdList}-fieldName`).html(categoriesHtml);
                                                                }

                                                                });


                                                             }
                                                            });

                                                             // Add a new text field to the corresponding fieldName div
                                                             var textFieldHtml = `
                                                                 <div class="input-group mb-3">
                                                                     <input type="text" class="form-control" name="${selectedListItem}-field" placeholder="Enter value for ${selectedListItem}">
                                                                 </div>
                                                             `;

                                                            // $(`#${problemIdList}-fieldName`).html(textFieldHtml);
                                                         });
                                                     }
                                                 });
                                             });
                                         }
                                     });


                                    // Add new accessories handler
                                    $('.add-accessories-btn').click(function () {

                                        const problemId = $(this).data('problem');
                                        const problemDiv = $('#' + problemId + '-div');
                                        const textDiv = $('#' + problemId + '-fieldName');
                                        const listDiv = $('#' + problemId + '-listName');

                                         const categoryNameDiv = $('#' + problemId + '-categoryName');
                                         const categoryName=categoryNameDiv.find('input').val();
                                        // Find the input field within the 'textDiv' and get its value
                                        const inputValue = textDiv.find('input').val();
                                        const inputValueList = listDiv.find('input').val();
                                        console.log("Input value: " + inputValue); // This will print the value of the input field

                                        addNewAccessoryInput(problemDiv,inputValueList,inputValue ,categoryName);
                                    });


                                     function addNewAccessoryInput(problemDiv,inputValueList,inputValue, categoryName) {
                                         const accessoryCount = problemDiv.find('.input-group').length + 1;

                                         var newInputGroup = `
                                         <div class="fieldDiv">
                                              <div class="input-group mb-3">
                                                  <input type="text" class="form-control problem-input" name="${categoryName}(${inputValueList})" placeholder="${inputValue}" value="${inputValue}" aria-label="Accessories${accessoryCount}" aria-describedby="basic-addon2">
                                                  <div class="input-group-append">
                                                      <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                                  </div>
                                              </div>
                                         </div>

                                         `;

                                         problemDiv.append(newInputGroup);


                                         problemDiv.find('.remove-problem').last().click(function () {
                                             $(this).closest('.fieldDiv').remove();

                                         });
                                     }

                                     // Save button handler
                                     $('#AcceptBtn').click(function() {

                                         addTableInformationOfService22(serviceId);
                                     });

                                     $('.remove-problem').click(function () {
                                         $(this).closest('.fieldDiv').remove();
                                     });

                                     showModal();
                                 }
                             }
                         });
                     }

     else if (button.hasClass("Delete")) {
      const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

      if (!deviceId) {
        console.error("Missing data-device-id attribute on delete button!");
        return; // Handle potential missing attribute error gracefully
      }

      // Confirmation step (optional):
      if (confirm(`Are you sure you want to delete device ${deviceId}?`)) {
        // Send AJAX request to server for deletion (explained below)

         $.ajax({
                url: '/departmentUser/deleteDeviceInformation', // URL to your delete endpoint
                type: 'POST',
                data: {
                    deviceId:deviceId

                }, // Send category name as data
                success: function(result) {
                    // Remove the row from the table body
                  //  $row.remove();
                     alert(result);
                     location.reload();
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting category: " + error);
                }
            });

      } else {
        console.log("Delete canceled.");
      }
    } else {
      // Perform actions for other buttons, if needed
      console.log(`Other button clicked: ${buttonText}`);
    }
  });
};

function showModal(){
$('#publicModal').modal('show');
}
function showModalView(){
$('#publicModalView').modal('show');
}
function showModalExtract(){
$('#publicModalExtract').modal('show');
}
function hideModalExtract(){
$('#publicModalExtract').modal('hide');
}

function selectionAndInputDeviceEdit(deviceId){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItemEdit', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldEdit').val(text);
            var categoriesHtml = '';


            $('#universalDivEdit').show();

       });



        // Filter items based on input
            $(document).on('keyup', '#deviceInputFieldEdit', function() {
                var filter = $(this).val().toUpperCase();
                $('#deviceInputEditUlList li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}
function selectionAndInputDeviceAddExtract(){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItem', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldAdd').val(text);
            var categoriesHtml = '';

            $('#universalDiv').show();

       // do previous data empty
        $('#deviceDiv').empty();

        // Show all Individual column according to category
        print('individualColumns', function(individualColumns) {
            if (individualColumns) {
                individualColumns.forEach(function(column) {
                    if (text === column.categoryName) {
                        console.log(column.columnName);
                        switch (column.dataType) {
                              case 'text':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                  break;
                              case 'password':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                  break;
                              case 'email':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                  break;
                              case 'url':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                  break;
                              case 'search':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                  break;
                              case 'tel':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                  break;
                              case 'number':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                  break;
                              case 'range':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'date':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'month':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'week':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'time':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'datetime-local':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'color':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'file':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'checkbox':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                  break;
                              case 'radio':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                  break;
                              case 'button':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                  break;
                              case 'submit':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                  break;
                              case 'reset':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                  break;
                            case 'customDropDownList':
                                // Call the custom dropdown function and handle it as a promise
                                myFunctionThatHandlesCase(column, text,'dynamicFormAddDeviceExtract').then(function(dropDownHtml) {
                                    categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                    $('#deviceDiv').append(categoriesHtml); // Update the deviceDiv with new HTML
                                }).catch(function(error) {
                                    console.error("Error:", error);
                                });
                                console.log(" last")
                                return; // Prevent further execution in this case

                        }
                    }
                });
                if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                    // Only update if there's no custom dropdown list pending
                    $('#deviceDiv').html(categoriesHtml);
                }
            }
        });
       });



        // Filter items based on input
            $(document).on('keyup', '#deviceInputFieldAdd', function() {
                var filter = $(this).val().toUpperCase();
                $('#deviceInputAddUlList li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}
function selectionAndInputDeviceAdd(){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItem', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldAdd').val(text);
            var categoriesHtml = '';

            $('#universalDiv').show();

       // do previous data empty
        $('#deviceDiv').empty();

        // Show all Individual column according to category
        print('individualColumns', function(individualColumns) {
            if (individualColumns) {
                individualColumns.forEach(function(column) {
                    if (text === column.categoryName) {
                        console.log(column.columnName);
                        switch (column.dataType) {
                              case 'text':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                  break;
                              case 'password':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                  break;
                              case 'email':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                  break;
                              case 'url':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                  break;
                              case 'search':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                  break;
                              case 'tel':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                  break;
                              case 'number':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                  break;
                              case 'range':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'date':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'month':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'week':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'time':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'datetime-local':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'color':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'file':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                  break;
                              case 'checkbox':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                  break;
                              case 'radio':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                  break;
                              case 'button':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                  break;
                              case 'submit':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                  break;
                              case 'reset':
                                  categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                  break;
                            case 'customDropDownList':
                                // Call the custom dropdown function and handle it as a promise
                                myFunctionThatHandlesCase(column, text,'dynamicFormAddDevice').then(function(dropDownHtml) {
                                    categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                    $('#deviceDiv').append(categoriesHtml); // Update the deviceDiv with new HTML
                                }).catch(function(error) {
                                    console.error("Error:", error);
                                });
                                console.log(" last")
                                return; // Prevent further execution in this case

                        }
                    }
                });
                if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                    // Only update if there's no custom dropdown list pending
                    $('#deviceDiv').html(categoriesHtml);
                }
            }
        });
       });



        // Filter items based on input
            $(document).on('keyup', '#deviceInputFieldAdd', function() {
                var filter = $(this).val().toUpperCase();
                $('#deviceInputAddUlList li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}
// The function to handle the custom dropdown case
function myFunctionThatHandlesCase(column, text,formId) {
    return new Promise((resolve, reject) => {
        print1('dropDownLists')
            .then(function(dropDownLists) {
                if (dropDownLists) {
                    let dropDownData = null;
                    if (text === null || text === '') {
                        dropDownData = dropDownLists.find(item =>
                            item.dropDownListName === column.columnName
                        );
                    } else {
                        dropDownData = dropDownLists.find(item =>
                            item.dropDownListName === column.columnName && item.categoryName === text
                        );
                    }

                    if (dropDownData) {
                        // Generate the dropdown HTML
                        var categoriesHtml11 = `
                            <div class="mb-3">
                                <label>${column.columnName}</label>
                                <div class="dropdown">
                                    <input type="text" class="form-control dropdown-toggle ${column.columnName}-input"
                                           data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                           aria-expanded="false" data-problem-id="${column.columnName}" name="${column.columnName}" >
                                    <ul class="dropdown-menu ${column.columnName}-ul" aria-labelledby="dropdownTextFieldPopupBox">`;

                        // Add the dropdown items
                        dropDownData.allData.forEach(function(option) {
                            categoriesHtml11 += `<li class="dropdown-item ${column.columnName}-customDropDownClick">${option}</li>`;
                        });

                        categoriesHtml11 += `
                                    </ul>
                                </div>
                            </div>`;

                        resolve(categoriesHtml11); // Resolve with the generated HTML

                        const formSelector = `#${formId}`;
                       $(formSelector).off('click', `.${column.columnName}-customDropDownClick`);
                       $(formSelector).on('click', `.${column.columnName}-customDropDownClick`, function() {

                            const selectedValue = $(this).text(); // Get selected value
                            console.log("Dropdown item clicked:", selectedValue); // Print the selected value

                            // Set the selected value in the input field
                            $(this).closest('.dropdown').find(`.${column.columnName}-input`).val(selectedValue);
                        });
                    } else {
                        console.log("Sorry, Not Found");
                        resolve(''); // Resolve with empty if no data found
                    }
                } else {
                    console.error("dropDownLists data is null or undefined");
                    reject("dropDownLists data is null or undefined");
                }
            })
            .catch(function(error) {
                console.error("An error occurred: ", error);
                reject(error); // Reject in case of error
            });
    });
}


function getCurrentDateTime() {
    const now = new Date();

    // Format the date as YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');

    // Format the time as HH:mm:ss
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Combine date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}