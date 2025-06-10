function saveFormDataForService(serviceId,problemName,solutionName) {
    var formData = $("#linkForm").serialize();

    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
     var departmentName = departmentElement.data("departmentname");//it
     var departmentUserName = departmentElement.data("departmentuser-name");//saho
     var departmentUserId = departmentElement.data("departmentuser-id");//s
    // Append the requestId to the form data
    formData += '&serviceId=' + encodeURIComponent(serviceId);
    formData += '&departmentName=' + encodeURIComponent(departmentName);
    formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
    formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);
     formData += '&problemName=' + encodeURIComponent(problemName);
      formData += '&solutionName=' + encodeURIComponent(solutionName);


    $.ajax({
        url: '/purchase/addPurchaseProposalForService',
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
function saveFormData(requestId) {
    var formData = $("#linkForm").serialize();

     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
     var departmentName = departmentElement.data("departmentname");//it
     var departmentUserName = departmentElement.data("departmentuser-name");//saho
     var departmentUserId = departmentElement.data("departmentuser-id");//s
    // Append the requestId to the form data
    formData += '&requestId=' + encodeURIComponent(requestId);
    formData += '&departmentName=' + encodeURIComponent(departmentName);
    formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
    formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);


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
function addTableInformationOfDeviceForService(categoryName,serviceId,problemName,solutionName) {
     // Serialize form data
     var formData = $("#dynamicFormAddDevice").serialize();


            var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

     // Get the selected starting date, username, and userId
     var startingDate = $('#calendar').val(); // Fetch value from the date input

     var deviceType = $('#deviceType').val();


     // Append the category name, department name, starting date, username, and userId to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);
     formData += '&departmentName=' + encodeURIComponent(departmentName);
     formData += '&userName=' + encodeURIComponent(departmentUserName);
     formData += '&userId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceType=' + encodeURIComponent(deviceType);
     formData += '&serviceId=' + encodeURIComponent(serviceId);
     formData += '&problemName=' + encodeURIComponent(problemName);
     formData += '&solutionName=' + encodeURIComponent(solutionName);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/purchase/addDeviceInformationForService', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data along with additional fields
         success: function(response) {
             alert(response);
             location.reload(); // Refresh the page
         },
         error: function(xhr, status, error) {
             console.error("Error saving data: " + error);
         }
     });
 }
function addTableInformationOfDevice(categoryName,requestId) {
     // Serialize form data
     var formData = $("#dynamicFormAddDevice").serialize();


            var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

     // Get the selected starting date, username, and userId
     var startingDate = $('#calendar').val(); // Fetch value from the date input

     var deviceType = $('#deviceType').val();


     // Append the category name, department name, starting date, username, and userId to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);
     formData += '&departmentName=' + encodeURIComponent(departmentName);
     formData += '&userName=' + encodeURIComponent(departmentUserName);
     formData += '&userId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceType=' + encodeURIComponent(deviceType);
     formData += '&requestId=' + encodeURIComponent(requestId);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/purchase/addDeviceInformation', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data along with additional fields
         success: function(response) {
             alert(response);
             location.reload(); // Refresh the page
         },
         error: function(xhr, status, error) {
             console.error("Error saving data: " + error);
         }
     });
 }
 function addTableInformationOfDevicePurchase(categoryName,requestId) {
      // Serialize form data
      var formData = $("#dynamicFormAddDevice").serialize();


             var departmentElement = $(".departmentName"); // Target element with department data
             var departmentName = departmentElement.data("departmentname"); // e.g., "it"
             var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
             var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

      // Get the selected starting date, username, and userId
      var startingDate = $('#calendar').val(); // Fetch value from the date input

      var deviceType = $('#deviceType').val();


      // Append the category name, department name, starting date, username, and userId to the form data
      formData += '&categoryName=' + encodeURIComponent(categoryName);
      formData += '&departmentName=' + encodeURIComponent(departmentName);
      formData += '&userName=' + encodeURIComponent(departmentUserName);
      formData += '&userId=' + encodeURIComponent(departmentUserId);
      formData += '&deviceType=' + encodeURIComponent(deviceType);
      formData += '&requestId=' + encodeURIComponent(requestId);

      // Debugging: Print the collected data
      console.log("Form Data:", formData);

      // AJAX call to save data
      $.ajax({
          url: '/purchase/addDeviceInformationPurchase', // URL to your endpoint for saving data
          type: 'POST',
          data: formData, // Send serialized form data along with additional fields
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
function sendDeliveryDevice22(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/purchase/sendDeliveryDevicePurchaseToInventory",
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
function sendDeliveryDeviceForService(serviceId,deviceId,problemName,solutionName){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/purchase/sendDeliveryDevicePurchaseToInventoryForService",
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
function setRequestStatus(requestId,status){

            $.ajax({
                url: '/purchase/deliverRequestStatus',
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
function saveTableInformationOfDevice(requestId,categoryName){
         var formData=$("#dynamicFormSaveDevice").serialize();

             // Append the deviceId and category name to the form data
             formData += '&requestId=' + encodeURIComponent(requestId);
             formData += '&categoryName=' + encodeURIComponent(categoryName);

             $.ajax({
                 url: '/purchase/saveDeviceInformation', // URL to your endpoint for saving data
                 type: 'POST',
                 data: formData, // Send serialized form data and category name
                 success: function(response) {
                     alert( response);
                       location.reload(); // Refresh the page
                 },
                 error: function(xhr, status, error) {
                     console.error("Error saving data: " + error);
                 }
             });
 }
window.initRequestDataGeneral = function () {
    $('#requestPurchaseTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
         var buttonPTag = $(event.target).closest('td');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
          var category = button.data('category-id');
        var deviceId=button.data('buyingdevice-id');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();
        var text=categoryName;
      // i want check by class name

        console.log(`Button Pressed: ${buttonPressed}`);
        console.log(`Button ID: ${buttonId}`);
        console.log(`Request ID: ${requestId}`);
        // Check if the button has a specific class
if(buttonId ==="deliverPurchase"){
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
                                    if (data.categoryName === category && data.userName==='purchase') {
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
                                 sendDeliveryDevice22(requestId,selectedRows);
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
       else if (buttonPTag.hasClass('viewInfo')) {

                      print('requestColumns', function(requestColumns) {
                     var categoriesHtml = '';
                     if (requestColumns) {
                         requestColumns.forEach(function(category) {
                             categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                         });
                     }

                     var htmlToAdd = `
                         <div class="mb-9" style="margin-left: 0%; text-align: left;">
                             <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                 <thead>
                                     <tr>
                                         <th scope="col" style="background-color: gray; color:white">SN</th>
                                          <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                         <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                         ${categoriesHtml}

                                     </tr>
                                 </thead>
                                 <tbody id="listDeviceInformationBody">

                                 </tbody>
                             </table>
                         </div>

                     `;
                     $('.modal-body').html(htmlToAdd);

                     $('#publicModalLabel').text("Request Information");



                           var rowsHtml = '';

                           print('requestData', function(requestData) {
                             if (requestData) {
                               // Replace requestId with a valid id to search for
                               const requestId = buttonPTag.data('requestId');
                               const Data = requestData.find(item => item.id === requestId);

                               if (Data) {
                                 // Generate the HTML for the found item
                                 rowsHtml += `
                                   <tr>
                                     <td>${Data.visibleRequestId}</td>
                                     <td>${Data.allData['category']}</td>
                                      `;
                                      requestColumns.forEach(function(column) {
                                          rowsHtml += `<td >${Data.allData[column.columnName]}</td>`;
                                      });


                                   rowsHtml += `  </tr>
                                 `;

                                 // Insert the generated HTML into the table body
                                 $('#listDeviceInformationBody').html(rowsHtml);
                               } else {
                                 console.error('No data found with the specified requestId.');
                               }
                             } else {
                               console.error('requestData is null or undefined.');
                             }
                           });



                     showModal();
                 });


        }
        else if (buttonId === "addDevice"){
         var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentuser-name");

             var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <div class="dropdown">
                       <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                       <input
                           type="text"
                           value="${text}"
                           class="form-control custom-width"
                           id="deviceInputFieldAdd"
                           placeholder="Category"
                           aria-expanded="false"
                           readonly

                       >

                   </div>

                </div>


               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="deviceType" class="form-label">Device Type</label>
                   <select id="deviceType" class="form-control">
                       <option value="Primary">Primary</option>
                       <option value="Secondary">Secondary</option>
                   </select>
               </div>


               <form   id="dynamicFormAddDevice">
             <div id="universalDiv" >

              </div>
              <div id="deviceDiv">

              </div>

               </form>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" data-request-id="${requestId}" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Add Device Information")

            $('#universalDiv').empty();

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
                                    myFunctionThatHandlesCase(column,null,'dynamicFormAddDevice').then(function(dropDownHtml) {
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
                      //  console.log(" check "+categoriesHtml);
                      $('#universalDiv').html(categoriesHtml);
                  }
               }
           });
           $('#deviceDiv').empty();
           // Show all Individual column according to category

             print('individualColumns', function(individualColumns) {
                       if (individualColumns) {
                       var categoriesHtml = '';
                           individualColumns.forEach(function(column) {
                               if (text === column.categoryName) {
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




             $('#saveEditBtn').click(function() {
                 var categoryName=$('#deviceInputFieldAdd').val();
                      var requestId=$(this).data('request-id');
                  addTableInformationOfDevicePurchase(categoryName,requestId);
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
                                      <th scope="col" style="background-color: gray;color:white">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;color:white">Link</th>
                                        <th scope="col" style="background-color: gray;color:white">Links</th>
                                       <th scope="col" style="background-color: gray;color:white">Action</th>

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

window.initRequestDataPurchaseTable = function () {     // Perform a single AJAX call
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging

            var allData = data['serviceRequests'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("requestPurchaseTableBody");

            // Function to check availability count
            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(function(device) {

                    if (device.categoryName === categoryName) {
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

               // Loop through each problem in the allProblem array for the device
               device.allProblem.forEach(function(problem) {
                  // console.log("Problem Name:", problem.name);
                   //console.log("Proposal Solutions:");

                   // Loop through each proposalSolution in the problem
                   problem.proposalSolution.forEach(function(solution) {
                       if (solution.inventoryToServiceCenterDeviceStatus !== "Accepted" && solution.inventoryToServiceCenterDeviceStatus !== "Pending") {
                           const row = document.createElement("tr");


                           var status=solution.purchaseManInfoOfPriceStatus;
                           if(status==null){
                           status=" ";
                           }

                           // console.log("inventoryToServiceCenterDeviceStatus:", solution.inventoryToServiceCenterDeviceStatus);

                           // Determine availability
                           const availability = getAvailability(solution.category);

                           // Create and append cells to the row
                           row.innerHTML = `
                               <td >${sn}</td>  <!-- Dynamic Counter -->
                               <td>${bivagName}</td>
                               <td>${solution.category}</td>
                               <td style="text-align:left">
                               <span>${solution.name}:${solution.value} </span> <br>
                               <span>Price:${solution.price} </span>
                               </td>
                               <td>${solution.purchaseProposalToCooProposalStatus ? solution.purchaseProposalToCooProposalStatus : ''}</td>
                                <td>${solution.purchaseProposalToCooAns ? solution.purchaseProposalToCooAns : ''}</td>
                               <td></td>
                               <td>${solution.inventoryForPurchaseRequestTime ? formatDateTimeToAmPm(solution.inventoryForPurchaseRequestTime) : 'N/A'}</td>
                               <td>
                                 <div class="d-flex justify-content-center align-items-center action-button-container">
                                       ${solution.deviceBuyingStatus === 'Bought' && solution.purchaseDeviceSenderToInventoryStatus !=='Accepted' && solution.purchaseDeviceExportStatus ==='Exported' ? `
                                          <button class="btn btn-primary btn-sm text-white fas  deliverForService"
                                          data-service-id="${device.id}"
                                          data-category-id="${solution.category}"
                                          data-problemname-id="${problem.name}"
                                          data-solutionname-id="${solution.name}"
                                          data-buyingdevice-id="${solution.buyingDeviceId}"
                                          data-button-id="deliver" title="Deliver Device">
                                           &#xf0d1;
                                       </button>` : ''}

                                   ${solution.deviceBuyingStatus !== 'Bought' && solution.purchaseProposalToCooAns === 'Accepted' && solution.purchaseDeviceExportStatus ==='Exported' ? `
                                     <button class="btn btn-sm text-white accepted"
                                             data-service-id="${device.id}"
                                             data-category-id="${solution.category}"
                                             data-problemname-id="${problem.name}"
                                             data-solutionname-id="${solution.name}"
                                             data-button-id="accepted"
                                             style="background-color: green;"
                                             title="Add Device Information">✔</button>` : ''}
                                   ${solution.purchaseProposalToCooAns !== 'Accepted' ? `
                                     <button class="btn btn-secondary btn-sm chat-buttonForService"
                                             data-problemname-id="${problem.name}"
                                             data-solutionname-id="${solution.name}"
                                             data-service-id="${device.id}"
                                             data-button-id="chat"
                                             title="Send Proposal to Coo">&#128172;</button>` : ''}
                                     ${solution.purchaseProposalToCooProposalStatus === 'Proposal' ? `
                                     <button class="btn btn-info btn-sm viewAcceptingLink"
                                             data-problemname-id="${problem.name}"
                                             data-solutionname-id="${solution.name}"
                                             data-service-id="${device.id}"
                                             data-button-id="chat"
                                             title="Send Proposal to Coo">  &#128065;</button>` : ''}
                                 </div>
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
           sortAndFormatAllTables();
   $(document).on('click', '.deliverForService', function(){
   var deviceId = $(this).data('buyingdevice-id');
   var category = $(this).data('category-id');
   var serviceId = $(this).data('service-id');
   var problemName = $(this).data('problemname-id');
   var solutionName = $(this).data('solutionname-id');
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
                    <button class="btn btn-success btn-sm  btnSave" data-service-id="${serviceId}" data-problemname-id="${problemName}" data-solutionname-id="${solutionName}"  style="width: 10%; margin-top: 20px;">Send</button>
                    </div>
                </div>
            `;

            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Device Information");

            var rowsHtml = '';
               let ids = deviceId || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array

               print('allAddData', function(allAddData) {
               if (allAddData) {
                   print('individualColumns', function(individualColumns) {
                       allAddData.forEach(function(data, index) {
                           if (data.categoryName === category && data.userName==='purchase') {
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
                            var problemName = $(this).data('problemname-id');
                               var solutionName = $(this).data('solutionname-id');
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
                                 sendDeliveryDeviceForService(serviceId,selectedRows,problemName,solutionName);
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
           $(document).on('click', '.viewAcceptingLink', function(){

           var serviceId = $(this).data('service-id');
           var problemName = $(this).data('problemname-id');
           var solutionName = $(this).data('solutionname-id');
          var htmlToAdd = `
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <h6 id="detailsId"></h6>
                   <h6 id="budgetId"></h6>
                   </div>
                      <div class="mb-9" style="margin-left: 0%; text-align: left;">
                          <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th scope="col" style="background-color: gray;color:white">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;color:white">Link</th>
                                        <th scope="col" style="background-color: gray;color:white">Links</th>
                                       <th scope="col" style="background-color: gray;color:white">Action</th>

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

                print('serviceRequests', function(requestData) {
                    if (requestData) {
                        const result = requestData.find(function(data1) {
                            return data1.id === serviceId;
                        });
                        result.allProblem.forEach(function(problem){
                          problem.proposalSolution.forEach(function(solution) {
                          if(problem.name===problemName   &&  solution.name===solutionName ){
                           $("#detailsId").text("Details: " + solution.purchaseProposalToCooDetails);
                            $("#budgetId").text("Budget: " + solution.purchaseProposalToCooBudget);
                            $("#comments").text( solution.purchaseProposalToCooComment);

                            var rowsHtml = '';
                                for (let j = 0; j < solution.purchaseProposalToCooAcceptedLinks.length; j++) {
                                 for (let i = 0; i < solution.purchaseProposalToCooLinks.length; i++) {
                                  const link = solution.purchaseProposalToCooLinks[i].startsWith('http://') || solution.purchaseProposalToCooLinks[i].startsWith('https://')
                                         ? solution.purchaseProposalToCooLinks[i]
                                         : 'https://' + solution.purchaseProposalToCooLinks[i];
                                 if(solution.purchaseProposalToCooAcceptedLinks[j]===link){
                                  // Ensure the link includes the protocol (http:// or https://)
                                     const link = solution.purchaseProposalToCooLinks[i].startsWith('http://') || solution.purchaseProposalToCooLinks[i].startsWith('https://')
                                         ? solution.purchaseProposalToCooLinks[i]
                                         : 'https://' + solution.purchaseProposalToCooLinks[i];

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
                        });


                    }
                });


                    showModal();
           });
           $(document).on('click', '.accepted', function(){
           var text = $(this).data('category-id');
           var serviceId = $(this).data('service-id');
           var problemName = $(this).data('problemname-id');
           var solutionName = $(this).data('solutionname-id');
            var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                    var departmentName = departmentElement.data("departmentuser-name");

                        var htmlToAdd = `
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <div class="dropdown">
                                   <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                                   <input type="text" value="${text}"class="form-control dropdown-toggle custom-width" id="deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false" readonly>

                               </div>
                           </div>


                          <div class="mb-3" style="margin-left: 0%; text-align: left;">
                              <label for="deviceType" class="form-label">Device Type</label>
                              <select id="deviceType" class="form-control">
                                  <option value="Primary">Primary</option>
                                  <option value="Secondary">Secondary</option>
                              </select>
                          </div>


                          <form   id="dynamicFormAddDevice">
                        <div id="universalDiv" >

                         </div>
                         <div id="deviceDiv">

                         </div>

                          </form>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary" data-service-id="${serviceId}" data-problemname-id="${problemName}" data-solutionname-id="${solutionName}"id="saveEditBtn">Save</button>
                               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           </div>

                       `;

                       // Add the HTML code to the modal body using jQuery
                       $('.modal-body').html(htmlToAdd);
                       $('#publicModalLabel').text("Add Old Device Information")


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
                                               myFunctionThatHandlesCase(column,null,'dynamicFormAddDevice').then(function(dropDownHtml) {
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
                      // Show all Individual column according to category
                        print('individualColumns', function(individualColumns) {
                                  if (individualColumns) {
                                  var categoriesHtml = '';
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




                        $('#saveEditBtn').click(function() {
                            var categoryName=$('#deviceInputFieldAdd').val();
                                 var serviceId=$(this).data('service-id');
                                 var problemName = $(this).data('problemname-id');
                                 var solutionName = $(this).data('solutionname-id');
                               addTableInformationOfDeviceForService(categoryName,serviceId,problemName,solutionName);
                           });

                     showModal();
           });
            $(document).on('click', '.chat-buttonForService', function() {

                  var serviceId = $(this).data('service-id');
                   var problemName = $(this).data('problemname-id');
                    var solutionName = $(this).data('solutionname-id');
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
                             <button type="button" class="btn btn-primary" id="saveEditBtnForService">Save</button>
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

                     $('#saveEditBtnForService').click(function(event) {
                         saveFormDataForService(serviceId,problemName,solutionName);
                     });

                     showModal();
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


            // Add event listener for the availability button click
            $(document).on('click', '.view-button-pending', function() {
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
                                           if (data.categoryName === category) {
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


