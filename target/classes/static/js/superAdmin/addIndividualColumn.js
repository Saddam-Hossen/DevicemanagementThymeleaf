
function saveIndividualColumnBtn(categoryName,columnName,dataType,requiredType) {
          alert("Add")
          var individualColumnTableBody = $('#individualColumnTableBody');
          var totalRows = individualColumnTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);


          // Send AJAX request to add category
          $.ajax({
              type: "POST",
              url: "/superAdmin/addIndividualColumn", // URL to your controller method
               data: {
                  individualColumnName:columnName,
                  individualCategoryName: categoryName,
                  dataType:dataType,
                  requiredType:requiredType
              },
              success: function(response) {
                         alert(response);

                       location.reload(); // Refresh the page

              },
              error: function(error) {
                  console.error("Error saving category:", error);
              }
          });

}
function editIndividualColumnBtn($row) {
        var categoryName = $row.find('td:nth-child(2)').text();
        var columnName = $row.find('td:nth-child(3)').text();
        var dataType = $row.find('td:nth-child(4)').text();
         var requiredType = $row.find('td:nth-child(5)').text();
          var individualColumnTableBody = $('#individualColumnTableBody');
          var totalRows = individualColumnTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);


           var newIndividualCategoryName = $("#individualCategoryNameEdit").val();
            var newIndividualColumnName = $("#individualColumnNameEdit").val();
            var newDataType = $("#inputTypeIndividualEdit").val();
            var newRequiredType = $("#requiredTypeIndividualEdit").val();

          // Send AJAX request to add category
          $.ajax({
              type: "POST",
              url: "/superAdmin/editIndividualColumn", // URL to your controller method
              data: {
                  oldIndividualCategoryName: categoryName,
                  oldIndividualColumnName: columnName,
                  oldDataType:dataType,
                  oldRequiredType:requiredType,
                  newIndividualCategoryName :newIndividualCategoryName ,
                  newIndividualColumnName:newIndividualColumnName,
                  newDataType:newDataType,
                  newRequiredType:newRequiredType
              },
              success: function(response) {
                   alert(response);
                 location.reload(); // Refresh the page

              },
              error: function(error) {
                  console.error("Error saving category:", error);
              }
          });

}
 window.initAddIndividualColumnGeneral = function () {
    $('#individualColumnTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var categoryName = $row.find('td:nth-child(2)').text();
        var columnName = $row.find('td:nth-child(3)').text(); // Extract category name from the second column
        var dataType = $row.find('td:nth-child(4)').text();
         var requiredType = $row.find('td:nth-child(5)').text();
       var buttonPressed = $(event.target).closest('button');
        console.log("Button Pressed: " + buttonPressed);

        var rowIndex = $(this).index();

        if (buttonPressed.hasClass('Edit')) {
            var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                        <label for="individualCategoryName" class="form-label">Category Name</label>
                        <input type="text" class="form-control " id="individualCategoryNameEdit"  placeholder="Category" value="${categoryName}"  readonly>
                </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <label for="individualColumnNameEdit" class="form-label">Column Name</label>
                    <input type="text" class="form-control" id="individualColumnNameEdit" placeholder="Enter column name" value="${columnName}" required>
                </div>
                <div class="mb-3">
                        <label for="inputTypeIndividualEdit" class="form-label">Choose an input type:</label>
                        <select id="inputTypeIndividualEdit" class="form-select" value="${dataType}" required >
                            <option value="">Select an input type</option>
                        </select>
                 </div>
                 <div class="mb-3">
                     <label for="requiredTypeIndividualEdit" class="form-label">Required Type</label>
                     <select id="requiredTypeIndividualEdit" class="form-select" value="${requiredType}" required>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                     </select>
                 </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            // edit individual column header
             $('#publicModalLabel').text("Edit Individual Column")

            // Show the modal
            $('#publicModal').modal('show');
         // Bind the click event to the Save button inside the modal
                $('#saveEditBtn').click(function() {
                    editIndividualColumnBtn($row);
                });
               $.ajax({
                     type: "POST",
                     url: "/superAdmin/inputTypes",
                     success: function(response) {
                         const $inputTypeSelect = $('#inputTypeIndividualEdit');
                         response.forEach(type => {
                         if(dataType==type){
                         $inputTypeSelect.append(`<option value="${type}" selected>${type}</option>`);
                         }else{
                         $inputTypeSelect.append(`<option value="${type}">${type}</option>`);
                         }

                         });
                     },
                     error: function(error) {
                         console.error("Error fetching input types:", error);
                     }
                 });



        } else if (buttonPressed.hasClass('Delete')) {
            $.ajax({
                url: '/superAdmin/deleteIndividualColumn', // URL to your delete endpoint
                type: 'POST',
                data: {
                    oldIndividualCategoryName: categoryName,
                    oldIndividualColumnName: columnName
                }, // Send category name as data
                success: function(result) {
                    // Remove the row from the table body
                    $row.remove();
                    alert(result);
                    location.reload(); // Refresh the page
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting category: " + error);
                }
            });
        } else {
            // Perform actions for other buttons, if needed
            console.log("Other action here");
        }
    });


};


function addIndividualColumn(){
               var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <div class="dropdown">
                        <label for="individualCategoryName" class="form-label">Category Name</label>
                        <input type="text" class="form-control dropdown-toggle custom-width" id="individualCategoryName" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false">
                        <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox" id="IndividualUlList">
                           <div id="listItemAdd"></div>
                        </ul>
                    </div>
                </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <label for="individualColumnName" class="form-label">Column Name</label>
                    <input type="text" class="form-control" id="individualColumnName" placeholder="Enter column name">
                </div>
                <div class="mb-3">
                    <label for="inputTypeIndividual" class="form-label">Choose an input type:</label>
                    <select id="inputTypeIndividual" class="form-select" >
                        <option value="">Select an input type</option>
                    </select>
                </div>
                 <div class="mb-3">
                    <label for="requiredTypeIndividual" class="form-label">Required Type</label>
                    <select id="requiredTypeIndividual" class="form-select" required>
                        <option value="" disabled selected>Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
             print('categories', function(categories) {
                   if (categories) {
                       // Generate HTML for categories
                       var categoriesHtml = '';
                       categories.forEach(function(category) {
                           categoriesHtml += `<li><a class="dropdown-item individualEachItem" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                       });

                       // Insert evaluated Thymeleaf expression
                       $('#listItemAdd').html(categoriesHtml);
                   }
               });
              $.ajax({
                      type: "POST",
                      url: "/superAdmin/inputTypes",
                      success: function(response) {
                          const $inputTypeSelect = $('#inputTypeIndividual');
                          response.forEach(type => {
                           $inputTypeSelect.append(`<option value="${type}">${type}</option>`);
                          });
                      },
                      error: function(error) {
                          console.error("Error fetching input types:", error);
                      }
                  });

            // selection and input handler.
            selectionAndInputHandlerForAddColumn();


             $('#saveEditBtn').click(function() {
             var categoryName=$('#individualCategoryName').val();
             var columnName=$('#individualColumnName').val();
             var dataType=$('#requiredTypeIndividual').val();
             var requiredType=$('#inputTypeIndividual').val();
                    saveIndividualColumnBtn(categoryName,columnName,dataType,requiredType);
                });

                showModal();

}
function selectionAndInputHandler(){
// Event delegation for dynamically added items
        $(document).on('click', '.individualEachItemEdit', function(event) {
                var text = $(this).text();
                $('#individualCategoryNameEdit').val(text);
        });

        // Filter items based on input
            $(document).on('keyup', '#individualCategoryNameEdit', function() {
                var filter = $(this).val().toUpperCase();
                $('#IndividualUlListEdit li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}
function selectionAndInputHandlerForAddColumn(){
// Event delegation for dynamically added items
        $(document).on('click', '.individualEachItem', function(event) {
                var text = $(this).text();
                $('#individualCategoryName').val(text);
        });

        // Filter items based on input
            $(document).on('keyup', '#individualCategoryName', function() {
                var filter = $(this).val().toUpperCase();
                $('#IndividualUlList li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}


        //top searchbar
 $(document).ready(function() {
          // Handle item selection
          $('.individualTopSelection').on('click', function() {
              var text = $(this).text().trim().toLowerCase();
              $('#individualTopInput').val(text);

              // Filter table rows based on the selected text in the second column
              $('#individualColumnTable tbody tr').each(function() {
                  // for specific column
                  var cellText = $(this).find('td').eq(0).text().trim().toLowerCase(); // Target the second column (index 1)
                  var match = cellText.indexOf(text) > -1;
                  $(this).toggle(match);
              });
          });

          // Filter items based on input
          $('#individualTopInput').on('keyup', function() {
              var filter = $(this).val().trim().toLowerCase();

              // Show all rows if the input is empty
              if (filter === '') {
                  $('#individualColumnTable tbody tr').show();
              } else {
                  $('#individualColumnTable tbody tr').each(function() {
                      var cellText = $(this).find('td').eq(0).text().trim().toLowerCase(); // Target the second column (index 1)
                      var match = cellText.indexOf(filter) > -1;
                      $(this).toggle(match);
                  });
              }

              // Filter list items based on input
              $('#individualTopUlList li').each(function() {
                  var text = $(this).text().toUpperCase();
                  if (text.indexOf(filter.toUpperCase()) > -1) {
                      $(this).show();
                  } else {
                      $(this).hide();
                  }
              });
          });
      });

 function inputTypes()
        {
        $.ajax({
                type: "POST",
                url: "/superAdmin/inputTypes",
                success: function(response) {
                    const $inputTypeSelect = $('#inputTypeIndividual');
                    response.forEach(type => {
                     $inputTypeSelect.append(`<option value="${type}">${type}</option>`);
                    });
                },
                error: function(error) {
                    console.error("Error fetching input types:", error);
                }
            });
        }