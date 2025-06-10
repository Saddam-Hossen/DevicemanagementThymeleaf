
 function saveTableInformationOfDropDownList(categoryName, dropDownListName) {
     // Serialize form data
     var formData = $("#dropDownListValueForm").serialize();

     // Append categoryName and dropDownListName to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);
     formData += '&dropDownListName=' + encodeURIComponent(dropDownListName);

     // Send the form data via AJAX
     $.ajax({
         url: '/superAdmin/addDropDownListInformation', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data
         success: function(response) {
             alert(response);
             location.reload(); // Refresh the page on success
         },
         error: function(xhr, status, error) {
             console.error("Error saving data: " + error);
         }
     });
 }

// Function to handle saving edited data
function editTableInformationOfDropDownList(listId, categoryName, dropDownListName) {
    // Collect form data
    var formData = $("#dynamicFormEditDropDownList").serialize(); // Serialize all form data

    formData += '&categoryName=' + encodeURIComponent(categoryName);
    formData += '&dropDownListName=' + encodeURIComponent(dropDownListName);
    formData += '&listId=' + encodeURIComponent(listId);
    $.ajax({
        url: '/superAdmin/editDropDownList', // URL to your edit endpoint
        type: 'POST',
        data: formData, // Send serialized form data along with listId
        success: function(response) {
            alert("Data updated successfully!");
            location.reload(); // Refresh the page after successful save
        },
        error: function(xhr, status, error) {
            console.error("Error updating data: " + error);
        }
    });
}


function addDropdownListInformation(){
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

               <div id="dropDownListDiv" class="mb-3" style="margin-left: 0%; text-align: left;">

              </div>

                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("DropDown List")
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

            // selection and input handler.
           selectionAndInputDropDownList();


             $('#saveEditBtn').click(function() {
                  var categoryName=$('#deviceInputFieldAdd').val();
                  var dropDownListName = $('#categoryDropDown').val();
                  saveTableInformationOfDropDownList(categoryName,dropDownListName);
                });

          showModal();

}

 window.initDropDownListGeneral = function () {
  $('#dropdownListInformationTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
   var categoryName = $row.find('td:nth-child(2)').text();
   var dropDownListName = $row.find('td:nth-child(3)').text();
    // Target the button itself for better accuracy
    const button = $(event.target).closest('button');

    // Check if a button was clicked (prevents accidental clicks on other elements)
    if (!button.length) {
      return; // Do nothing if not a button click
    }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)

   if (button.hasClass("Edit")) {
       console.log("Edit button clicked!");

       const listId = button.data('listId'); // Get list ID from data-list-id attribute

       if (!listId) {
           console.error("Missing data-list-id attribute on edit button!");
           return; // Handle potential missing attribute error gracefully
       }

       var htmlToAdd = `
           <div class="mb-3" style="margin-left: 0%; text-align: left;">
               <label for="categoryNameFieldEdit" class="form-label">Category</label>
               <input type="text" class="form-control custom-width" id="categoryNameFieldEdit" value="${categoryName}" placeholder="Category" readonly>
           </div>
           <div class="mb-3" style="margin-left: 0%; text-align: left;">
               <label for="dropDownListNameFieldEdit" class="form-label">List Name</label>
               <input type="text" class="form-control custom-width" id="dropDownListNameFieldEdit" value="${dropDownListName}" placeholder="List Name" readonly>
           </div>
           <form id="dynamicFormEditDropDownList">
               <div id="OldListDivEdit"></div> <!-- Old list values go here -->
               <div id="newListDivEdit"></div> <!-- Additional fields will be added here -->
           </form>
           <div class="mb-3" style="margin-left: 0%; text-align: left;">
               <button type="button" class="btn btn-primary" id="AddList">Add List</button>
           </div>
           <div class="mb-3" style="margin-left: 0%; text-align: left;">
               <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div>
       `;

       // Add the HTML code to the modal body using jQuery
       $('.modal-body').html(htmlToAdd);
       $('#publicModalLabel').text("Edit DropDown List");

       // Fetch categories and populate dropdown
       print('categories', function(categories) {
           if (categories) {
               var categoriesHtml = '';
               categories.forEach(function(category) {
                   categoriesHtml += `<li><a class="dropdown-item deviceInputEachItemEdit" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
               });
               $('#listItemEditDevice').html(categoriesHtml);
           }
       });

       // Fetch list data and populate the form for editing
       print('dropDownLists', function(dropDownLists) {
           if (dropDownLists) {
               const listData = dropDownLists.find(item => item.id === listId); // Get data for the specific listId
               if (listData) {
                   var listHtml = '';

                   listData.allData.forEach(function(value, index) {
                       listHtml += `
                           <div class="input-group mb-3">
                               <input type="text" class="form-control problem-input" name="ListValue${index + 1}" value="${value}" placeholder="ListValue${index + 1}" aria-label="ListValue${index + 1}" aria-describedby="basic-addon2">
                               <div class="input-group-append">
                                   <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                               </div>
                           </div>
                       `;
                   });

                   var htmlBody = `
                       <label> List:</label>
                       ${listHtml}
                   `;

                   $('#OldListDivEdit').html(htmlBody); // Populate the existing values in the form

                   // Attach event listeners to remove button and handle Enter key press
                   attachEvents();
               }
           }

           // Initialize the newListCounter based on the number of inputs in OldListDivEdit
           let newListCounter = $('#OldListDivEdit .input-group').length + 1; // Start after the last existing index

           // Handle "Add List" button click
           $('#AddList').click(function() {
               addNewListField();
           });

           // Function to add a new list field
           function addNewListField() {
               var newListHtml = `
                   <div class="input-group mb-3">
                       <input type="text" class="form-control problem-input" name="NewListValue${newListCounter}" placeholder="New ListValue${newListCounter}" aria-label="New ListValue${newListCounter}" aria-describedby="basic-addon2">
                       <div class="input-group-append">
                           <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                       </div>
                   </div>
               `;

               // Append the new list item to the newListDivEdit div
               $('#newListDivEdit').append(newListHtml);

               // Increment the counter for each new list added
               newListCounter++;

               // Attach event listeners to the new input field and remove button
               attachEvents();
           }

           // Function to attach the necessary event listeners
           function attachEvents() {
               // Attach remove button event
               $('.remove-problem').off('click').on('click', function() {
                   $(this).closest('.input-group').remove(); // Remove the parent input-group div
               });

               // Handle Enter key press in input fields
               $('.problem-input').off('keypress').on('keypress', function(e) {
                   if (e.which === 13) { // 13 is the Enter key code
                       e.preventDefault(); // Prevent form submission on Enter key press
                       addNewListField(); // Call the function to add a new list field
                   }
               });
           }
       });

       // Handle save button click
       $('#saveEditBtn').click(function() {
           var categoryName = $('#categoryNameFieldEdit').val();
           var dropDownListName = $('#dropDownListNameFieldEdit').val();
           editTableInformationOfDropDownList(listId, categoryName, dropDownListName);
       });

       showModal();
   }


else if (button.hasClass("Delete")) {
      const listId = button.data('listId'); // Get device ID from data-device-id attribute

      if (!listId) {
        console.error("Missing data-list-id attribute on delete button!");
        return; // Handle potential missing attribute error gracefully
      }

      // Confirmation step (optional):
      if (confirm(`Are you sure you want to delete this list`)) {
        // Send AJAX request to server for deletion (explained below)

         $.ajax({
                url: '/superAdmin/deleteDropDownListInformation', // URL to your delete endpoint
                type: 'POST',
                data: {
                   listId:listId

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
function selectionAndInputDropDownList() {
    // Event delegation for dynamically added items
    $(document).on('click', '.deviceInputEachItem', function(event) {
        var text = $(this).text();  // Get the text from the clicked item
        $('#deviceInputFieldAdd').val(text);  // Set the input field value to the selected text
        var categoriesHtml = '';  // Initialize the HTML content for the dropdown

        // Get the universal columns
        print('universalColumns', function(universalColumns) {
            if (universalColumns) {
                // Create options from universal columns
                universalColumns.forEach(function(column) {
                    console.log(column.columnName);
                    // Append each universal column to the dropdown
                    categoriesHtml += `<option value="${column.columnName}">${column.columnName}</option>`;
                });

                // Now, fetch and append individual columns for the selected device category
                print('individualColumns', function(individualColumns) {
                    if (individualColumns) {
                        // Create options from individual columns if they match the selected category
                        individualColumns.forEach(function(column) {
                            if (text === column.categoryName) {  // Only include columns that match the selected category
                                console.log(column.columnName);
                                categoriesHtml += `<option value="${column.columnName}">${column.columnName}</option>`;
                            }
                        });
                    }
                    var body = `
                        <label style="margin-bottom:15px"> DropDown List name:</label>
                        <br>
                        <select class="form-select" id="categoryDropDown" style="margin-bottom:15px">${categoriesHtml}</select>

                        <form id="dropDownListValueForm">
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <label class="form-label">List Value:</label>
                           </div>
                           <div id="dropDownListValueDiv" class="mb-3" style="margin-left: 0%; text-align: left;">
                               <!-- Initial accessories input -->
                               <div class="input-group mb-3">
                                   <input type="text" class="form-control problem-input" name="ListValue1" placeholder="ListValue1" aria-label="ListValue1" aria-describedby="basic-addon2">
                                   <div class="input-group-append">
                                       <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                                   </div>
                               </div>
                           </div>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary add-ListValue-btn" data-problem="ListValue">Add List </button>
                           </div>
                       </form>
                    `;
                    // Set the generated HTML to the dropdown list div
                    $('#dropDownListDiv').html(body);

                    // Add event listener for the dropdown list change event
                    $('#categoryDropDown').on('change', function() {
                        var selectedValue = $(this).val();  // Get the selected option value
                        console.log("Selected item: " + selectedValue);  // Print the selected value
                        // You can also display it somewhere on the page if needed
                        $('#selectedItemDisplay').text("Selected: " + selectedValue);
                    });

                    // Add Enter key listener for the first input field
                    handleEnterKeyPress();
                });
            }
        });
    });

    // Add new List Value input field on click
    $(document).on('click', '.add-ListValue-btn', function() {
        addNewTextField();
    });

    // Remove a List Value input field on click
    $(document).on('click', '.remove-problem', function() {
        $(this).closest('.input-group').remove();  // Remove the closest input group
    });

    // Function to add a new text field
    function addNewTextField() {
        var count = $('#dropDownListValueDiv .input-group').length + 1;  // Get the current number of input fields
        var newInput = `
            <div class="input-group mb-3">
                <input type="text" class="form-control problem-input" name="ListValue${count}" placeholder="ListValue${count}" aria-label="ListValue${count}" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary remove-problem" type="button">X</button>
                </div>
            </div>
        `;
        // Append the new input to the div
        $('#dropDownListValueDiv').append(newInput);

        // Reattach the Enter key listener to the newly added input
        handleEnterKeyPress();
    }

    // Function to handle "Enter" key press on the last input field
    function handleEnterKeyPress() {
        // Remove previous Enter keypress event to avoid duplicates
        $('#dropDownListValueDiv .problem-input').off('keypress');

        // Attach Enter key listener to the last input field
        $('#dropDownListValueDiv .problem-input').on('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                addNewTextField();  // Add new text field on Enter key press
            }
        });
    }

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

