
function addTableInformationOfService(deviceId,comment,categoryName){
         var formData=$("#problemForm").serialize();
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
            var departmentName = departmentElement.data("departmentuser-name");
         console.log(departmentName); // Prints the department name to the console
             // Append the deviceId and category name to the form data
             formData += '&deviceId=' + encodeURIComponent(deviceId);
             formData += '&departmentName=' + encodeURIComponent(departmentName);
             formData += '&comment=' + encodeURIComponent(comment);
             formData += '&categoryName=' + encodeURIComponent(categoryName);

             $.ajax({
                 url: '/departmentUser/addDeviceInformationOfService', // URL to your endpoint for saving data
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


 function saveExtraDevice(categoryName) {

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
     formData += '&startingDate=' + encodeURIComponent(startingDate);
     formData += '&userName=' + encodeURIComponent(departmentUserName);
     formData += '&userId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceType=' + encodeURIComponent(deviceType);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/purchase/addDeviceInformationExtraDevice', // URL to your endpoint for saving data
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


function editTableInformationOfDevice(deviceId,categoryName){
         var formData=$("#dynamicFormEditDevice").serialize();
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentuser-name");
         console.log(departmentName); // Prints the department name to the console
             // Append the deviceId and category name to the form data
             formData += '&deviceId=' + encodeURIComponent(deviceId);
             formData += '&categoryName=' + encodeURIComponent(categoryName);
              formData += '&departmentName=' + encodeURIComponent(departmentName);

             $.ajax({
                 url: '/purchase/editDeviceInformation', // URL to your endpoint for saving data
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


function addDeviceInformationOfExtraDevice(){
  var formData = $("#dynamicFormAddDevice").serialize();
  var deviceType = $("#deviceTypeAdd").val();
  var departmentUserId = $("#departmentUserIdAdd").val();
  var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
  var departmentName = departmentElement.data("departmentuser-name");

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
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="calendar"  class="form-label dropdown-toggle custom-width">Using starting Date:</label>
                   <input type="datetime-local" id="calendar" name="calendar" class="form-control" style="width: 100%;"  th:data-user-id=" ">
               </div>

               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="deviceType" class="form-label">Device Type</label>
                   <select id="deviceType" class="form-control">
                       <option value="Primary">Primary</option>
                       <option value="Secondary">Secondary</option>
                   </select>
               </div>


               <form   id="dynamicFormAddDevice">
             <div id="universalDiv" style="display:none">

              </div>
              <div id="deviceDiv">

              </div>

               </form>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Add Unordered Device Information")

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

            // selection and input handler.
            selectionAndInputDeviceInfo();
            selectionAndInputUserInfo();


             $('#saveEditBtn').click(function() {
                 var categoryName=$('#deviceInputFieldAdd').val();
                  saveExtraDevice(categoryName);
                });

          showModal();

}

window.initUnOrderedDeviceGeneral = function () {
  $('#unOrderedDeviceTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
   var categoryName = $row.find('td:nth-child(2)').text();
   var text=categoryName;
    // Target the button itself for better accuracy
    const button = $(event.target).closest('button');
     var deviceId = button.data('deviceId');
    // Check if a button was clicked (prevents accidental clicks on other elements)
    if (!button.length) {
      return; // Do nothing if not a button click
    }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)
    if(button.hasClass("componentsView")){


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

                                                       // extract child
                                                      // Find the device data by deviceId
                                                      const deviceData = allAddData.find(item => item.id === deviceId);

                                                      // Initialize an array to hold selected device IDs
                                                      let selectedDevices = [];

                                                      // Check if deviceData exists and has child devices
                                                      if (deviceData && Array.isArray(deviceData.childDevices)) {
                                                          // Filter and map child devices based on the condition
                                                          selectedDevices = deviceData.childDevices
                                                              .filter(data =>
                                                                  data.usingTimeOfChildDevices.some(check => check.status === "1")
                                                              )
                                                              .map(data => data.deviceId);
                                                      }

                                                      // Log the resulting selected devices
                                                      console.log(selectedDevices);

                                                       if(selectedDevices.length>0){
                                                        selectedDevices.forEach( function(ek){
                                                         const deviceInfo = allAddData.find(item => item.id === ek);
                                                         var categoryName=deviceInfo.categoryName;
                                                         allAddData.forEach(function(data, index) {
                                                              if (data.id=== ek) {
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
                                                        } )

                                                         $('#listDeviceInformationBody').html(rowsHtml);

                                                          showModal();
                                                       }
                                                       else{
                                                         alert("No child device Found.");
                                                       }

                                                     });
                                                 }
                                             });




                     });



    }
    else if(button.hasClass("deliverUnOrdered")){
            const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

                  if (!deviceId) {
                    console.error("Missing data-device-id attribute on delete button!");
                    return; // Handle potential missing attribute error gracefully
                  }

                  // Confirmation step (optional):
                  if (confirm(`Are you sure you want to deliver device ${deviceId}?`)) {
                    // Send AJAX request to server for deletion (explained below)
                           var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                            var departmentName = departmentElement.data("departmentname");//it
                            var departmentUserName = departmentElement.data("departmentuser-name");//saho
                            var departmentUserId = departmentElement.data("departmentuser-id");//s
                     $.ajax({
                            url: '/purchase/deliverUnOrderedDeviceInformation', // URL to your delete endpoint
                            type: 'POST',
                           contentType: "application/json",
                            data: JSON.stringify({
                                 deviceId: deviceId ,
                                 departmentName:departmentName,
                                 departmentUserName:departmentUserName,
                                 departmentUserId:departmentUserId
                                 }),// Send category name as data
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
            }
    else if (button.hasClass("Edit")) {
      // Handle edit button click (add your logic here)
      console.log("Edit button clicked!");
      const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

       if (!deviceId) {
              console.error("Missing data-device-id attribute on delete button!");
              return; // Handle potential missing attribute error gracefully
            }
       var htmlToAdd = `
            <div class="mb-3" style="margin-left: 0%; text-align: left;">
                <input type="text" class="form-control  custom-width" id="deviceInputFieldEdit" value="${categoryName}" placeholder="Category" readonly >
            </div>
           <form   id="dynamicFormEditDevice">
         <div id="universalDivEdit" >

          </div>
          <div id="deviceDivEdit">

          </div>

           </form>
            <div class="mb-3" style="margin-left: 0%; text-align: left;">
                <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `;

        // Add the HTML code to the modal body using jQuery
        $('.modal-body').html(htmlToAdd);
          $('#publicModalLabel').text("Edit Device Information")
         print('categories', function(categories) {
               if (categories) {
                   // Generate HTML for categories
                   var categoriesHtml = '';
                   categories.forEach(function(category) {
                       categoriesHtml += `<li><a class="dropdown-item deviceInputEachItemEdit" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                   });

                   // Insert evaluated Thymeleaf expression
                   $('#listItemEditDevice').html(categoriesHtml);
               }
           });


       $('#universalDivEdit').empty();

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
                                           myFunctionThatHandlesCase(column,null,'dynamicFormEditDevice').then(function(dropDownHtml) {
                                               //categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                               $('#universalDivEdit').append(dropDownHtml); // Update the deviceDiv with new HTML
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
                             $('#universalDivEdit').html(categoriesHtml);
                         }
                      }
                  });


      // add individual column
       $('#deviceDivEdit').empty();

        // show all Individual column according to category
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
                                    myFunctionThatHandlesCase(column, text,'dynamicFormEditDevice').then(function(dropDownHtml) {
                                        categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                        $('#deviceDivEdit').append(categoriesHtml); // Update the deviceDiv with new HTML
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
                        $('#deviceDivEdit').html(categoriesHtml);
                    }
                }
            });


          $('#saveEditBtn').click(function() {
              editTableInformationOfDevice(deviceId,categoryName);
            });

          showModal();

      // Adding a delay of 500ms before populating a section
      setTimeout(() => {


          // update field value so that  ui rendering become good
        print('universalColumns', function(universalColumns) {
          console.log('universalColumns', universalColumns);
          if (universalColumns) {
              // Iterate over universalColumns array
              universalColumns.forEach(function(column) {
                  // Fetch and set value asynchronously
                  columnValue1(deviceId, column.columnName, function(value) {
                      // Locate input element by its name attribute
                      var inputElement = $('input[name="' + column.columnName + '"]');
                      if (inputElement.length) {
                          inputElement.val(value); // Set the value
                      } else {
                          console.warn('Input element not found for column:', column.columnName);
                      }
                  });
              });
          }

        });
         print('individualColumns', function(individualColumns) {
                  console.log('individualColumns', individualColumns);
                  if (individualColumns) {
                      // Iterate over universalColumns array
                      individualColumns.forEach(function(column) {
                          // Fetch and set value asynchronously
                          columnValue1(deviceId, column.columnName, function(value) {
                              // Locate input element by its name attribute
                              var inputElement = $('input[name="' + column.columnName + '"]');
                              if (inputElement.length) {
                                  inputElement.val(value); // Set the value
                              } else {
                                  console.warn('Input element not found for column:', column.columnName);
                              }
                          });
                      });
                  }

                });

                 }, 500); // 500 milliseconds delay

         /*if (confirm(`Are you sure you want to edit device ${deviceId}?`)) {
             console.log("edited done.");
         }else{
         console.log("edit canceled.");
         }*/

    }
    else  if (button.hasClass("Service")) {
               // Handle edit button click (add your logic here)
               console.log("Edit button clicked!");
               const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

                if (!deviceId) {
                       console.error("Missing data-device-id attribute on delete button!");
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
                            <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                <label for="comment" class="form-label">Comment</label>
                                <textarea class="form-control" id="comment" name="comment" placeholder="Comment"></textarea>
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
                    addNewProblem();

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
                        addTableInformationOfService(deviceId,$('#comment').val(),categoryName);
                    });

                    // Show the modal
                    showModal();

                  /*if (confirm(`Are you sure you want to edit device ${deviceId}?`)) {
                      console.log("edited done.");
                  }else{
                  console.log("edit canceled.");
                  }*/

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

function columnValue1(deviceId, columnName, callback) {
    print('allAddData', function(allAddData) {
        const deviceData = allAddData.find(item => item.id === deviceId);

        if (deviceData) {
            const columnData = deviceData.allData;

            if (columnData && columnData.hasOwnProperty(columnName)) {
                callback(columnData[columnName]);
            } else {
                console.warn(`Column "${columnName}" not found in device data.`);
                callback(undefined);
            }
        } else {
            console.warn(`No data found for Device ID ${deviceId}`);
            callback(undefined);
        }
    });
}

function showModal(){
$('#publicModal').modal('show');
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
function selectionAndInputDeviceInfo() {
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


function selectionAndInputUserInfo() {

// Event delegation for dynamically added items
    $(document).on('click', '.userInputEachItem', function(event) {
        var text = $(this).text();
        var userId = $(this).attr('data-user-id');
        // print th:data-user-id of .userInputEachItem
        $('#userInputFieldAdd').val(text);
        // Set the userId in the data-user-id attribute of the calendar input
         $('#calendar').attr('data-user-id', userId);

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

function print1(dataType) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/superAdmin/allData',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                // Resolve the Promise with the requested dataType
                resolve(data[dataType]);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
                reject(error); // Reject the Promise if there's an error
            }
        });
    });
}


function exportToModalOfSelectedRow() {
    const mainTable = document.getElementById("unOrderedDeviceTable");
      const modalHeader = document.getElementById("modalHeaderRow");
          const modalBody = document.getElementById("modalBodyRows");
          const totalPriceDisplay = document.getElementById("totalPriceDisplay");

          // Clear previous content
          modalHeader.innerHTML = "";
          modalBody.innerHTML = "";
          totalPriceDisplay.textContent = "";

          const originalHeaderRow = mainTable.querySelector("thead tr");
          const headerClone = originalHeaderRow.cloneNode(true);
          const headerCells = [...headerClone.cells];

          const removeIndexes = [];
          let priceColumnIndex = -1;

          headerCells.forEach((cell, index) => {
              const text = cell.textContent.trim().toLowerCase();
              if (text === "action" || text === "components") {
                  removeIndexes.push(index);
              }
              if (text === "price") {
                  priceColumnIndex = index;
              }
          });

          removeIndexes.reverse().forEach(i => headerClone.deleteCell(i));
          modalHeader.appendChild(headerClone);

          // Sum price from selected rows
          let totalPrice = 0;

          const checkboxes = document.querySelectorAll('input[type="checkbox"][data-button-id="accepted"]:checked');
          checkboxes.forEach((checkbox) => {
              const row = checkbox.closest("tr");
              const rowClone = row.cloneNode(true);

              // Get price before deleting columns
              const cells = row.querySelectorAll("td");
              if (priceColumnIndex !== -1 && cells[priceColumnIndex]) {
                  const priceText = cells[priceColumnIndex].textContent.trim().replace(/[^\d.]/g, "");
                  const price = parseFloat(priceText);
                  if (!isNaN(price)) totalPrice += price;
              }

              // Remove unwanted columns
              removeIndexes.forEach(i => rowClone.deleteCell(i));
              const checkboxCell = rowClone.querySelector('input[type="checkbox"]')?.closest("td");
              if (checkboxCell) checkboxCell.remove();

              modalBody.appendChild(rowClone);
          });

          if (checkboxes.length > 0) {
              totalPriceDisplay.textContent = "Total Price: $" + totalPrice.toFixed(2);
              const modal = new bootstrap.Modal(document.getElementById("exportModal"));
              modal.show();
          } else {
              alert("Please select at least one row.");
          }
}

function confirmExport() {
    const modalRows = document.querySelectorAll("#modalBodyRows tr");
    const headerCells = document.querySelectorAll("#modalHeaderRow th");

    const exportData = [];

    modalRows.forEach(row => {
        const rowData = {};
        const cells = row.querySelectorAll("td");

        cells.forEach((cell, index) => {
            const key = headerCells[index].textContent.trim();
            const value = cell.textContent.trim();
            rowData[key] = value;
        });

        exportData.push(rowData);
    });

    fetch("/purchase/exportDataForExtraDevice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(exportData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to export PDF");
        }
        return response.blob();  // <-- Get PDF blob
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported-data For UnOrdered.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error occurred during export.");
    });
}

