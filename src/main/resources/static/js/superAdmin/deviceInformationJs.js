
function saveTableInformationOfDeviceSuperAdmin(categoryName) {
// Replace hyphens with spaces in input field names before submission
    $("input").each(function() {
        let originalName = $(this).attr("name");
        if (originalName) {
            let updatedName = originalName.replace(/-/g, ' '); // Replace all '-' with space
            $(this).attr("name", updatedName);
        }
    });
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
         url: '/inventory/addDeviceInformation', // URL to your endpoint for saving data
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
// Replace hyphens with spaces in input field names before submission
 $("input").each(function() {
        let originalName = $(this).attr("name");
        if (originalName) {
            let updatedName = originalName.replace(/-/g, ' '); // Replace all '-' with space
            $(this).attr("name", updatedName);
        }
    });
         var formData=$("#dynamicFormEditDevice").serialize();
          var departmentElement = $(".departmentName"); // Target element with department data
         var departmentName = departmentElement.data("departmentname"); // e.g., "it"
         var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
         var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"
           console.log(departmentName); // Prints the department name to the console
             // Append the deviceId and category name to the form data
             formData += '&deviceId=' + encodeURIComponent(deviceId);
             formData += '&categoryName=' + encodeURIComponent(categoryName);
             formData += '&departmentName=' + encodeURIComponent(departmentName);
             formData += '&userName=' + encodeURIComponent(departmentUserName);
             formData += '&userId=' + encodeURIComponent(departmentUserId);

             $.ajax({
                 url: '/departmentUser/editDeviceInformation', // URL to your endpoint for saving data
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
function addDeviceInformation(){
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
            $('#publicModalLabel').text("Add Old Device Information")

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
                                   var text=null;
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

                                             console.log("DropdownList: ", dropDownData); // Debugging
                                             let columnClass = column.columnName.replace(/\s+/g, '-');

                                             if (dropDownData && dropDownData.allData) {
                                                 var categoriesHtml11 = `
                                                     <div class="mb-3">
                                                         <label>${column.columnName}</label>
                                                         <div class="dropdown">
                                                             <input type="text" class="form-control dropdown-toggle ${columnClass}-input"
                                                                    data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                    aria-expanded="false" data-problem-id="${columnClass}" name="${columnClass}">
                                                             <ul class="dropdown-menu ${columnClass}-ul">`;

                                                 dropDownData.allData.forEach(function(option) {
                                                     categoriesHtml11 += `<li class="dropdown-item ${columnClass}-customDropDownClick">${option}</li>`;
                                                 });

                                                 categoriesHtml11 += `</ul></div></div>`;

                                                 console.log(categoriesHtml11); // Debugging

                                                 if ($('#deviceDiv').length > 0) {
                                                     $('#deviceDiv').append(categoriesHtml11);
                                                 } else {
                                                     console.error("#deviceDiv not found in the DOM.");
                                                 }

                                                 const formSelector = `#dynamicFormAddDevice`;
                                                 $(formSelector).off('click', `.${columnClass}-customDropDownClick`); // Prevent duplicate events
                                                 $(formSelector).on('click', `.${columnClass}-customDropDownClick`, function() {
                                                     const selectedValue = $(this).text();
                                                     console.log("Dropdown item clicked:", selectedValue);
                                                     $(this).closest('.dropdown').find(`.${columnClass}-input`).val(selectedValue);
                                                 });
                                             } else {
                                                 console.log("Sorry, Not Found");
                                             }
                                         } else {
                                             console.error("dropDownLists data is null or undefined");
                                         }
                                     })
                                     .catch(function(error) {
                                         console.error("An error occurred: ", error);
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
           // selectionAndInputUserInfo();


             $('#saveEditBtn').click(function() {
                 var categoryName=$('#deviceInputFieldAdd').val();
                  saveTableInformationOfDeviceSuperAdmin(categoryName);
                });

          showModal();

}
 window.initDeviceInformationGeneral = function () {
  $('#deviceInformationTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
   var categoryName = $row.find('td:nth-child(2)').text();
     var text=categoryName;
    // Target the button itself for better accuracy
    const button = $(event.target).closest('button');

    // Check if a button was clicked (prevents accidental clicks on other elements)
    if (!button.length) {
      return; // Do nothing if not a button click
    }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)

    if (button.hasClass("Edit")) {
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
                                               var text1=null;
                                            print1('dropDownLists')
                                                .then(function(dropDownLists) {
                                                    if (dropDownLists) {
                                                        let dropDownData = null;
                                                        if (text1 === null || text1 === '') {
                                                            dropDownData = dropDownLists.find(item =>
                                                                item.dropDownListName === column.columnName
                                                            );
                                                        } else {
                                                            dropDownData = dropDownLists.find(item =>
                                                                item.dropDownListName === column.columnName && item.categoryName === text
                                                            );
                                                        }

                                                        console.log("DropdownList: ", dropDownData); // Debugging
                                                        let columnClass = column.columnName.replace(/\s+/g, '-');

                                                        if (dropDownData && dropDownData.allData) {
                                                            var categoriesHtml11 = `
                                                                <div class="mb-3">
                                                                    <label>${column.columnName}</label>
                                                                    <div class="dropdown">
                                                                        <input type="text" class="form-control dropdown-toggle ${columnClass}-input"
                                                                               data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                               aria-expanded="false" data-problem-id="${columnClass}" name="${columnClass}">
                                                                        <ul class="dropdown-menu ${columnClass}-ul">`;

                                                            dropDownData.allData.forEach(function(option) {
                                                                categoriesHtml11 += `<li class="dropdown-item ${columnClass}-customDropDownClick">${option}</li>`;
                                                            });

                                                            categoriesHtml11 += `</ul></div></div>`;

                                                            console.log(categoriesHtml11); // Debugging

                                                            if ($('#universalDivEdit').length > 0) {
                                                                $('#universalDivEdit').append(categoriesHtml11);
                                                            } else {
                                                                console.error("#deviceDivEdit not found in the DOM.");
                                                            }

                                                            const formSelector = `#dynamicFormEditDevice`;
                                                            $(formSelector).off('click', `.${columnClass}-customDropDownClick`); // Prevent duplicate events
                                                            $(formSelector).on('click', `.${columnClass}-customDropDownClick`, function() {
                                                                const selectedValue = $(this).text();
                                                                console.log("Dropdown item clicked:", selectedValue);
                                                                $(this).closest('.dropdown').find(`.${columnClass}-input`).val(selectedValue);
                                                            });
                                                        } else {
                                                            console.log("Sorry, Not Found");
                                                        }
                                                    } else {
                                                        console.error("dropDownLists data is null or undefined");
                                                    }
                                                })
                                                .catch(function(error) {
                                                    console.error("An error occurred: ", error);
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
                                            // var text=null;
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

                                                      console.log("DropdownList: ", dropDownData); // Debugging
                                                      let columnClass = column.columnName.replace(/\s+/g, '-');

                                                      if (dropDownData && dropDownData.allData) {
                                                          var categoriesHtml11 = `
                                                              <div class="mb-3">
                                                                  <label>${column.columnName}</label>
                                                                  <div class="dropdown">
                                                                      <input type="text" class="form-control dropdown-toggle ${columnClass}-input"
                                                                             data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                             aria-expanded="false" data-problem-id="${columnClass}" name="${columnClass}">
                                                                      <ul class="dropdown-menu ${columnClass}-ul">`;

                                                          dropDownData.allData.forEach(function(option) {
                                                              categoriesHtml11 += `<li class="dropdown-item ${columnClass}-customDropDownClick">${option}</li>`;
                                                          });

                                                          categoriesHtml11 += `</ul></div></div>`;

                                                          console.log(categoriesHtml11); // Debugging

                                                          if ($('#deviceDivEdit').length > 0) {
                                                              $('#deviceDivEdit').append(categoriesHtml11);
                                                          } else {
                                                              console.error("#deviceDivEdit not found in the DOM.");
                                                          }

                                                          const formSelector = `#dynamicFormEditDevice`;
                                                          $(formSelector).off('click', `.${columnClass}-customDropDownClick`); // Prevent duplicate events
                                                          $(formSelector).on('click', `.${columnClass}-customDropDownClick`, function() {
                                                              const selectedValue = $(this).text();
                                                              console.log("Dropdown item clicked:", selectedValue);
                                                              $(this).closest('.dropdown').find(`.${columnClass}-input`).val(selectedValue);
                                                          });
                                                      } else {
                                                          console.log("Sorry, Not Found");
                                                      }
                                                  } else {
                                                      console.error("dropDownLists data is null or undefined");
                                                  }
                                              })
                                              .catch(function(error) {
                                                  console.error("An error occurred: ", error);
                                              });
                                           break;
                                         default:
                                        categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                        break;

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
                           let columnClass = column.columnName.replace(/\s+/g, '-');
                           var inputElement = $('input[name="' + columnClass + '"]');
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
                                  let columnClass = column.columnName.replace(/\s+/g, '-');
                                  var inputElement = $('input[name="' + columnClass + '"]');
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
                url: '/superAdmin/deleteDeviceInformation', // URL to your delete endpoint
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
                                //  var text=null;
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

                                           console.log("DropdownList: ", dropDownData); // Debugging
                                           let columnClass = column.columnName.replace(/\s+/g, '-');

                                           if (dropDownData && dropDownData.allData) {
                                               var categoriesHtml11 = `
                                                   <div class="mb-3">
                                                       <label>${column.columnName}</label>
                                                       <div class="dropdown">
                                                           <input type="text" class="form-control dropdown-toggle ${columnClass}-input"
                                                                  data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                  aria-expanded="false" data-problem-id="${columnClass}" name="${columnClass}">
                                                           <ul class="dropdown-menu ${columnClass}-ul">`;

                                               dropDownData.allData.forEach(function(option) {
                                                   categoriesHtml11 += `<li class="dropdown-item ${columnClass}-customDropDownClick">${option}</li>`;
                                               });

                                               categoriesHtml11 += `</ul></div></div>`;

                                               console.log(categoriesHtml11); // Debugging

                                               if ($('#deviceDiv').length > 0) {
                                                   $('#deviceDiv').append(categoriesHtml11);
                                               } else {
                                                   console.error("#deviceDiv not found in the DOM.");
                                               }

                                               const formSelector = `#dynamicFormAddDevice`;
                                               $(formSelector).off('click', `.${columnClass}-customDropDownClick`); // Prevent duplicate events
                                               $(formSelector).on('click', `.${columnClass}-customDropDownClick`, function() {
                                                   const selectedValue = $(this).text();
                                                   console.log("Dropdown item clicked:", selectedValue);
                                                   $(this).closest('.dropdown').find(`.${columnClass}-input`).val(selectedValue);
                                               });
                                           } else {
                                               console.log("Sorry, Not Found");
                                           }
                                       } else {
                                           console.error("dropDownLists data is null or undefined");
                                       }
                                   })
                                   .catch(function(error) {
                                       console.error("An error occurred: ", error);
                                   });
                                break;

                             default:
                                 categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                 break;

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



