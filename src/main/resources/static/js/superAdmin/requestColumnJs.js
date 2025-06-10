function saveRequestBtnRequestColumn(){

          var requestName = $("#requestColumnName").val();
          var dataType = $("#inputTypeRequest").val();
          var requiredType = $("#requiredType").val();
          var visibleType = $("#visibleType").val();

        // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/addRequestColumn", // URL to your controller method
            data: {
            requestName:requestName,
            dataType:dataType,
            requiredType:requiredType,
            visibleType:visibleType
            },
            success: function(response) {

                alert(response);

               location.reload(); // Refresh the page

            },
            error: function(error) {
                console.error("Error saving Request:", error);
            }
        });

}

function EditTableInformationOfRequest(requestId){
          //@RequestParam String requestId,@RequestParam String columnName,
          //@RequestParam String dataType,@RequestParam String requiredType,
          //@RequestParam String visibleType

             $.ajax({
                 url: '/superAdmin/updateRequestColumn', // URL to your endpoint for saving data
                 type: 'POST',
                 data: {
                 requestId:requestId,
                 columnName:$('#requestColumnNameEdit').val(),
                 dataType:$('#inputTypeEdit').val(),
                 requiredType:$('#requiredTypeEdit').val(),
                 visibleType:$('#visibleTypeEdit').val(),

                 }, // Send serialized form data and category name
                 success: function(response) {
                        alert( response);
                       location.reload(); // Refresh the page
                 },
                 error: function(xhr, status, error) {
                     console.error("Error saving data: " + error);
                 }
             });
 }


 window.initRequestColumnGeneral = function () {
    $('#requestColumnTable tbody tr').click(function(event) {
       var $row = $(this); // Store the clicked row element
               var columnName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
               var dataType = $row.find('td:nth-child(3)').text();
               var requiredType = $row.find('td:nth-child(4)').text();
               var visibleType = $row.find('td:nth-child(5)').text();
              var buttonPressed = $(event.target).closest('button');
                 const button = $(event.target).closest('button');

        if (buttonPressed.hasClass('Edit')) {
            const requestIdData = button.data('requestId');
            if (!requestIdData) {
                console.error("Missing data-request-id attribute on delete button!");
                return;
            }

           var htmlToAdd = `
                          <form   id="dynamicFormAddRequestEdit">
                           <div class="mb-3" style="margin-left: 0%;text-align:left;">
                                      <label for="requestColumnNameEdit" class="form-label"> Field Name</label>
                                      <input type="text" class="form-control" id="requestColumnNameEdit" placeholder="Enter field name" value="${columnName}">
                            </div>
                            <div class="mb-3">
                                    <label for="inputTypeEdit" class="form-label">Choose an input type:</label>
                                    <select id="inputTypeEdit" class="form-select" >
                                        <option value="">Select an input type</option>
                                    </select>
                                </div>
                             <div class="mb-3">
                                <label for="requiredTypeEdit" class="form-label">Required Type</label>
                                <select id="requiredTypeEdit" class="form-select"   required >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="visibleTypeEdit" class="form-label">Visible</label>
                                <select id="visibleTypeEdit" class="form-select"  required  >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                          </form>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           </div>
                       `;

                       // Add the HTML code to the modal body using jQuery
                       $('.modal-body').html(htmlToAdd);
                        // Set the values for the select elements
                       $('#requiredTypeEdit').val(requiredType);
                       $('#visibleTypeEdit').val(visibleType);
                       $('#publicModalLabel').text("Edit column Information");

                       $.ajax({
                               type: "POST",
                               url: "/superAdmin/inputTypes",
                               success: function(response) {
                                   const $inputTypeSelect = $('#inputTypeEdit');
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

                        $('#saveEditBtn').click(function() {

                           EditTableInformationOfRequest(requestIdData );
                           });

                     showModal();
        } else if (buttonPressed.hasClass('Delete')) {
            const requestId = button.data('requestId');
            if (!requestId) {
                console.error("Missing data-request-id attribute on delete button!");
                return;
            }

            $.ajax({
                url: '/superAdmin/deleteRequestColumn',
                type: 'POST',
                data: { requestId: requestId },
                success: function(result) {
                    alert(result);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting user:", error);
                }
            });
        }
    });
};

function addRequestDataToggle() {
        var content = document.getElementById("requestForm");
        if (content.style.display === "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
             $("#requestColumnName").val(" ");
        }
    }

     function closeToggle(id) {
            var element = document.getElementById(id);
            element.style.display = "none";
              $("#requestColumnName").val(" ");
        }