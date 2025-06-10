function setServiceRequestToInventoryData(rowData) {

    console.log("Sending Row Data:", rowData);

    // Send the data to the controller using AJAX
    $.ajax({
        url: '/service/setServiceRequestToInventoryData', // Replace with your controller's endpoint
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
    var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the modal-body div
    $(".modal-body form").each(function() {
        var formId = $(this).attr('id'); // Get the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
    var departmentName = departmentElement.data("departmentuser-name");
    console.log(departmentName); // Prints the department name to the console

    // Append serviceId and departmentName to the merged data
    mergedFormData['serviceId'] = serviceId;
    mergedFormData['departmentName'] = departmentName;

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


function setServiceRequestAcceptToInventory(serviceId,status){
var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentname");//it
         var departmentUserName = departmentElement.data("departmentuser-name");//saho
         var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

            $.ajax({
                url: '/service/setServiceRequestToInventory',
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


window.initCooFeedbackGeneral = function () {
  $('#cooFeedbackTable tbody tr').click(function(event) {
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
       else  if (buttonId === "accepted"){

               var htmlToAdd = `
                  <div class="mb-3" style="margin-right: 0%; text-align: right;">
                      <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  </div>
              `;
              $('.modal-body').html(htmlToAdd);
              $('#publicModalLabel').text("Do you want to send request for accessories  ?");
              $('#AcceptBtn').click(function() {
                  setServiceRequestAcceptToInventory(serviceId, "Pending");
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
                                                                 <div class="dropdown">
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

                                        // Find the input field within the 'textDiv' and get its value
                                        const inputValue = textDiv.find('input').val();
                                        const inputValueList = listDiv.find('input').val();
                                        console.log("Input value: " + inputValue); // This will print the value of the input field

                                        addNewAccessoryInput(problemDiv,inputValueList,inputValue);
                                    });


                                     function addNewAccessoryInput(problemDiv,inputValueList,inputValue) {
                                         const accessoryCount = problemDiv.find('.input-group').length + 1;

                                         var newInputGroup = `
                                         <div class="fieldDiv">
                                          <label class ="${inputValue}" class="form-label">${inputValueList}:</label>
                                              <div class="input-group mb-3">
                                                  <input type="text" class="form-control problem-input" name="${inputValueList}" placeholder="${inputValue}" value="${inputValue}" aria-label="Accessories${accessoryCount}" aria-describedby="basic-addon2">
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

                                         addTableInformationOfService(serviceId);
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
window.initCooFeedbackTable = function () {    // Perform a single AJAX call
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging

            var allData = data['serviceRequests'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("cooFeedbackTableBody");

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
                       if (solution.cooManInfoOfPriceAcceptanceCommentStatus === "Accepted" ) {
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

                               <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>
                               <td>

                                  <div class="d-flex justify-content-center align-items-center action-button-container">
                                             ${solution.cooManInfoOfPriceAcceptanceCommentStatus == 'Accepted'  && solution.serviceCenterToInventoryAccessoriesRequestStatus !='Accepted' && solution.action !=='reject'  && solution.serviceCenterToInventoryAccessoriesRequestStatus !=='Pending'   ? `
                                                 <button class="btn btn-sm text-white setAcceptanceCommentBtn" data-category="${solution.category}" data-solution-name="${solution.name}" data-problem-name="${problem.name}" data-service-id="${device.id}" data-button-id="accepted" style="background-color:green;" title="Request to Inventory For Accessories" if="${solution.cooManInfoOfPriceAcceptanceCommentStatus == 'Accepted'  && solution.serviceCenterToInventoryAccessoriesRequestStatus !='Accepted' && solution.action =='rejec' }">✔</button>

                                             ` : ""}

                                              ${availability === "Unavailable" ? `
                                                  <button class="btn btn-sm text-white clock-button" data-date="${solution.deliveryDate}" data-solution-name="${solution.name}" data-problem-name="${problem.name}" data-service-id="${device.id}" data-button-id="clock" style="background-color:#f44336;" title="Edit delivery Date">
                                                      <i class="fas fa-clock"></i>
                                                  </button>
                                              ` : ""}


                                               ${availability !== "Unavailable" ? `
                                               <button class="btn btn-info btn-sm view-button-selected-device"  data-category="${solution.category}" data-service-id="${device.id}" data-button-id="view" data-device-id="${solution.inventoryToServiceCenterDeviceId}" >
                                                    &#128065;
                                                </button>
                                            ` : ""}
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

                    setServiceRequestToInventoryData(rowData);



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


