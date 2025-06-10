function  sendDeviceToDepartment(deviceId,serviceId,status){
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentname");//it
         var departmentUserName = departmentElement.data("departmentuser-name");//saho
         var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

          $.ajax({
                         url: '/customerCare/setDeliveryDeviceToDepartment',
                         type: 'POST',
                         data: {
                         serviceId: serviceId,
                         status:status,
                         departmentName:departmentName,
                         departmentUserName:departmentUserName,
                         departmentUserId:departmentUserId

                         },
                         success: function(result) {
                             alert(result);
                             location.reload();
                         },
                         error: function(xhr, status, error) {
                             console.error("Error In delivery:", error);
                         }
                     });

}
function  receiveDeviceFromService(deviceId,serviceId,status){
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentname");//it
         var departmentUserName = departmentElement.data("departmentuser-name");//saho
         var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

          $.ajax({
                         url: '/customerCare/setReceiveDeviceFromService',
                         type: 'POST',
                         data: {
                         serviceId: serviceId,
                         status:status,
                         departmentName:departmentName,
                         departmentUserName:departmentUserName,
                         departmentUserId:departmentUserId

                         },
                         success: function(result) {
                             alert(result);
                             location.reload();
                         },
                         error: function(xhr, status, error) {
                             console.error("Error In delivery:", error);
                         }
                     });

}
function addTableInformationOfService(deviceId,comment){
         var formData=$("#problemForm").serialize();
         var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentuser-name");
         console.log(departmentName); // Prints the department name to the console
             // Append the deviceId and category name to the form data
             formData += '&deviceId=' + encodeURIComponent(deviceId);
             formData += '&departmentName=' + encodeURIComponent(departmentName);
             formData += '&comment=' + encodeURIComponent(comment);

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
function setServiceRequestAccept(serviceId,status){
         var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentname");//it
         var departmentUserName = departmentElement.data("departmentuser-name");//saho
         var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

            $.ajax({
                url: '/customerCare/setServiceRequestFromCustomerCareToService',
                type: 'POST',
                data: {
                serviceId: serviceId,
                status:status,
                departmentName:departmentName,
                departmentUserName:departmentUserName,
                departmentUserId:departmentUserId

                },
                success: function(result) {
                    alert(result);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error("Error In delivery:", error);
                }
            });

}


window.initServiceRequestGeneral = function () {
  $('#serviceInformationTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
   var categoryName = $row.find('td:nth-child(3)').text();
    // Target the button itself for better accuracy
       const button = $(event.target).closest('button');
       var buttonId = button.data('buttonId');
       var deviceId = button.data('deviceId');
       var  serviceId = button.data('serviceId');
    // Check if a button was clicked (prevents accidental clicks on other elements)
    if (!button.length) {
      return; // Do nothing if not a button click
    }
      if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)
   if(buttonId==="deliveryDevice"){
   sendDeviceToDepartment(deviceId,serviceId,"Device delivered")
   }
    else if(buttonId==="receiveDevice"){
      receiveDeviceFromService(deviceId,serviceId,"Device received")

     }
     else if(buttonId==="viewAlternative"){

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
                                             <th scope="col" style="background-color: gray;color:white">SN1</th>
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
       else  if (buttonId === "sendDevice"){

               var htmlToAdd = `
                  <div class="mb-3" style="margin-right: 0%; text-align: right;">
                      <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  </div>
              `;
              $('.modal-body').html(htmlToAdd);
              $('#publicModalLabel').text("Do you want to send this device to Servicing ?");
              $('#AcceptBtn').click(function() {
                  setServiceRequestAccept(serviceId, "Device In Pending");
              });
              showModal();
               } else if (button.hasClass("Delete")) {
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
function selectionAndInputDevice(){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItem', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldAdd').val(text);
            var categoriesHtml = '';


            $('#universalDiv').show();



            // show all Individual column according to category
                      print('individualColumns', function(individualColumns) {
                          if (individualColumns) {
                              // Generate HTML for categories
                              //var categoriesHtml = '';
                              individualColumns.forEach(function(column) {
                                if(text===column.categoryName){
                                console.log(column.columnName)
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
                                   default:
                                       categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                       break;
                               }
                                }

                              });

                              // Insert evaluated Thymeleaf expression
                              $('#deviceDiv').html(categoriesHtml); // Corrected line
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


