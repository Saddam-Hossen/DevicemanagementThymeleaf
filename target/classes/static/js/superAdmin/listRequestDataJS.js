
    function updateSerialNumbers() {
        const rows = document.querySelectorAll("tbody tr");
        let serialNumber = 1;
        rows.forEach(row => {
            if (row.style.display !== 'none') {
                const serialCell = row.querySelector("td.serial-number");
                if (serialCell) {
                    serialCell.textContent = serialNumber++;
                }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        updateSerialNumbers();
    });



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
function listRequestSelect(requestId, deviceId) {

    // AJAX code
    $.ajax({
        url: '/superAdmin/approvedListRequest',
        type: 'POST',
        data: {requestId: requestId, deviceId: deviceId }, // Send as JSON
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
function ApproveAlternativeListDevice(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/superAdmin/ApproveAlternativeDeviceList1",
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

function setListRequestStatus(requestId){
             $.ajax({
                     url: '/superAdmin/listUpdateRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     cause:$('#listRejectCause').val()
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
 window.initListRequestInventoryGeneral = function () {

    $('#listRequestInventoryTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');

        var categoryName = $row.find('td:nth-child(3)').text();

        if (!requestId) {
            console.error("Missing data-request-id attribute on button!");
            return;
        }



        console.log(`Button Pressed: ${buttonPressed}`);

        console.log(`Request ID: ${requestId}`);
        if (buttonPressed === "✔") {

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
                                     <th scope="col" style="background-color: gray;">Action</th>
                                 </tr>
                             </thead>
                             <tbody id="listDeviceInformationBody">

                             </tbody>
                         </table>
                     </div>
                      <div class="mb-3" style="margin-left: 0%; text-align: center;">
                            <button type="button" class="btn btn-primary" id="saveEditBtn">Send</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                 `;
                 $('.modal-body').html(htmlToAdd);

                 $('#publicModalLabel').text("Select Alternative Device");

                  print('requestData', function(requestData) {
                         if (requestData) {
                             // Search for the specific ID using the find method
                             const result = requestData.find(function(data1) {
                                 return data1.id === requestId;
                             });

                             if (result) {
                              var rowsHtml = '';
                                 // Corrected the for loop syntax to iterate over the deviceIds array
                                 for (let i = 0; i < result.inventory.deviceIds.length; i++) {
                                     let deviceIdCheck=result.inventory.deviceIds[i];
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
                                                         <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                     if (individualColumns) {
                                                         individualColumns.forEach(function(individualColumn) {
                                                            if (individualColumn.categoryName=== categoryName) {

                                                             rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                             }
                                                         });
                                                     }

                                                     rowsHtml += `</ul>
                                                         </td>
                                                         <td ><input type="checkbox" style="transform: scale(1.5);margin: 10px;" name="selectDevice"  th:data-selected-id="${data.id}" class="action-checkbox"></td>
                                                     </tr>`;
                                                      }
                                                 });

                                                 $('#listDeviceInformationBody').html(rowsHtml);
                                             });
                                         }
                                     });

                                 }
                             } else {
                                 console.warn(`No data found for Device ID ${requestId}`);
                             }
                         }

                     });




         $('#saveEditBtn').click(function(event) {
             event.preventDefault(); // Prevent the default action (form submission)

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
                   listRequestSelect(requestId,selectedRows);
              } else {
                  console.log("User canceled.");
                  // Handle the cancel action here
              }
             }
             else{
              alert("Please select only one device.");
             }

         });


                 showModal();
             });
         }
        else if (buttonPressed === "✗") {
            var htmlToAdd = `
               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="listRejectCause" class="form-label">Reject Cause</label>
                   <input type="text" class="form-control" id="listRejectCause" placeholder="Cause"  required>
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

                        setListRequestStatus(requestId);
                 });

               showModal();
        }
    });
};


window.initListRequestInventoryTable = function () {
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var allData = data['requestData'];
            var requestColumns = data['requestColumns'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("listRequestInventoryTableBody");
            if (!tableBody) {
                console.error("Table body element with id 'requestForPaymentTableBody' not found.");
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
          allData.forEach(function (device) {
              // Extract required variables
              if(device.inventory.inventoryStatus==='Alternative Proposal' || device.inventory.inventoryStatus==='Alternative Proposal Accepted' )
              {
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



                        // Add new cells for `cooDeliveryAns` and `checkAvailability`
                            htmlData += `

                                <td>
                                    <button class="btn btn-info btn-sm viewAvailability" data-category-id="${categoryName}" data-request-id="${device.id}" data-button-id="viewAlternative" title="View Available Same Accessories Category Devices" >
                                        ${availability}
                                    </button>
                                </td>
                                <td>${device.inventory?.inventoryToAlternativeDeviceRequestStatus || ' '}</td>
                            `;

                          // Action buttons column
                              htmlData += `
                                  <td>
                                      <div class="d-flex justify-content-center align-items-center action-button-container">
                                           <button class="btn  btn-sm text-white viewAlternativeDevice" data-request-id="${device.id}" data-category-id="${device.allData['category']}" style="background-color:green;" data-button-id="chat">✔</button>
                                          <button class="btn btn-danger btn-sm delete-button" data-request-id="${device.id}">
                                              &#10007;
                                          </button>
                                      </div>
                                  </td>
                              `;

                            // Assign the HTML to the row and append it to the table body
                            row.innerHTML = htmlData;
                            tableBody.appendChild(row);
              }

          });

            $(document).on('click', '.viewAlternativeDevice', function() {
                                   var category = $(this).data('category-id');
                                   var requestId=$(this).data('request-id');

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
                                                              <th scope="col" style="background-color: gray;">Action</th>
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
                                                 let ids = requestInfo.inventory.deviceIds || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array
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
                                                             ApproveAlternativeListDevice(requestId,selectedRows);
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
           $(document).on('click', '.delete-button', function() {
            var requestId=$(this).data('request-id');

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

                                      //setRequestStatus(requestId,"Denied");
                               });

                             showModal();
           });




           $(document).on('click', '.viewAvailability', function() {
                         // var requestId = $(this).data('request-id');

                         var category = $(this).data('category-id');
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
                                    categoriesHtml += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                                });
                            }

                            // Build the table structure
                            var htmlToAdd = `
                                <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                    <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" style="background-color: gray;">SN1</th>
                                                <th scope="col" style="background-color: gray; display: none;">Device Id</th>
                                                <th scope="col" style="background-color: gray;">Category Name</th>
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
