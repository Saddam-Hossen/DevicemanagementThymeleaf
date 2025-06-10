function deliveryDeviceToCustomerCare(deviceId,serviceId,status){
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentname");//it
         var departmentUserName = departmentElement.data("departmentuser-name");//saho
         var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

          $.ajax({
                         url: '/service/setServiceRequestForDeliveryDevice',
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

function setServiceRequestAccept1(serviceId,status){
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentname");//it
         var departmentUserName = departmentElement.data("departmentuser-name");//saho
         var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

            $.ajax({
                url: '/service/setServiceRequestForReceivingDevice',
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


window.initDeviceInOutListGeneral = function () {
  $('#serviceInformationDeviceInOutListTable tbody tr').click(function(event) {
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
     if(buttonId==="sendDevice"){
          deliveryDeviceToCustomerCare(deviceId,serviceId,"Device delivered")
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
                  setServiceRequestAccept1(serviceId, "Device In Received");
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


