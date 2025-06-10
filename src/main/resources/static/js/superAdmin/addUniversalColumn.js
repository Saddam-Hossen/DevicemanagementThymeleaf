function saveUniversalColumnBtn(Id) {
  // Capture the category name from the input field
          var universalColumnName = $("#universalColumnName").val();
          var universalColumnTableBody = $('#universalColumnTableBody');
          var totalRows = universalColumnTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);

            const dataType = $('#inputTypeUniversal').val();
            const requiredType = $('#requiredTypeUniversal').val();


        // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/addUniversalColumn", // URL to your controller method
            data: {
             universalColumnName: universalColumnName,
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
function  editUniversalColumnBtn($row){
        var columnName = $row.find('td:nth-child(2)').text();
        var dataType = $row.find('td:nth-child(3)').text();
         var requiredType = $row.find('td:nth-child(4)').text();

         // Display category name in a text field
           // AJAX request to update the category
           var newColumnName=$('#universalCategoryNameEdit').val();
           var newDataType=$('#inputTypeUniversalEdit').val();
            var newRequiredType=$('#requiredTypeUniversalEdit').val();
           $.ajax({
               url: '/superAdmin/updateUniversalColumn', // URL to your update endpoint
               type: 'POST',
               data: {
                   oldColumnName: columnName,
                   oldDataType:dataType,
                   oldRequiredType:requiredType,
                   newColumnName: newColumnName,
                   newDataType:newDataType,
                   newRequiredType:newRequiredType
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
 window.initAddUniversalColumnGeneral = function () {
    $('#universalColumnTable tbody tr').click(function(event) {
       var $row = $(this); // Store the clicked row element
        var columnName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
        var dataType = $row.find('td:nth-child(3)').text();
        var requiredType = $row.find('td:nth-child(4)').text();
       var buttonPressed = $(event.target).closest('button');
        console.log("Button Pressed: " + buttonPressed);

        var rowIndex = $(this).index();

        if (buttonPressed.hasClass('Edit')) {


        var htmlToAdd = `
                        <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                <label for="universalCategoryNameEdit" class="form-label">Category Name</label>
                                <input type="text" class="form-control " id="universalCategoryNameEdit"  placeholder="Category"  value="${columnName}">
                        </div>
                        <div class="mb-3">
                            <label for="inputTypeUniversalEdit" class="form-label">Choose an input type:</label>
                            <select id="inputTypeUniversalEdit" class="form-select" >
                                <option value="">Select an input type</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="requiredTypeUniversalEdit" class="form-label">Required Type</label>
                            <select id="requiredTypeUniversalEdit" class="form-select" value="${requiredType}" required>
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
                    $('#requiredTypeUniversalEdit').val(requiredType);
                     $.ajax({
                            type: "POST",
                            url: "/superAdmin/inputTypes",
                            success: function(response) {
                                const $inputTypeSelect = $('#inputTypeUniversalEdit');
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
                    // edit individual column header
                     $('#publicModalLabel').text("Edit Individual Column")

                    // Show the modal
                    $('#publicModal').modal('show');
                 // Bind the click event to the Save button inside the modal
                        $('#saveEditBtn').click(function() {
                            editUniversalColumnBtn($row);
                        });
                    // method to list item add


        }  else if (buttonPressed.hasClass('Delete')) {


            $.ajax({
                url: '/superAdmin/deleteUniversalColumn', // URL to your delete endpoint
                type: 'POST',
                data: { universalColumnName: columnName }, // Send category name as data
                success: function(result) {
                   // i want to remove rowIndex row remove from table body

                      alert(result);
                      location.reload();
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

function addUniversalColumnToggle() {
        var content = document.getElementById("universalColumnForm");
        if (content.style.display === "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
             $("#categoryName").val(" ");
        }
    }

 function closeToggle(id) {
            var element = document.getElementById(id);
            element.style.display = "none";
              $("#universalColumnName").val(" ");
        }