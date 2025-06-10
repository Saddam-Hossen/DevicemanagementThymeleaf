function saveRequestBtn(){
          var requestName = $("#serviceColumnName").val();
          var dataType = $("#inputTypeService").val();
          var requiredType = $("#requiredTypeService").val();
          var visibleType = $("#visibleTypeService").val();

        // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/addServiceColumn", // URL to your controller method
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

function EditTableInformationOfService(serviceId){
          //@RequestParam String requestId,@RequestParam String columnName,
          //@RequestParam String dataType,@RequestParam String requiredType,
          //@RequestParam String visibleType

             $.ajax({
                 url: '/superAdmin/updateServiceColumn', // URL to your endpoint for saving data
                 type: 'POST',
                 data: {
                 serviceId:serviceId,
                 columnName:$('#serviceColumnNameEdit').val(),
                 dataType:$('#inputTypeEditService').val(),
                 requiredType:$('#requiredTypeEditService').val(),
                 visibleType:$('#visibleTypeEditService').val(),

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


window.initServiceColumnGeneral = function () {
    $('#serviceColumnTable tbody tr').click(function(event) {
       var $row = $(this); // Store the clicked row element
               var columnName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
               var dataType = $row.find('td:nth-child(3)').text();
               var requiredType = $row.find('td:nth-child(4)').text();
               var visibleType = $row.find('td:nth-child(5)').text();
              var buttonPressed = $(event.target).closest('button');
                 const button = $(event.target).closest('button');

        if (buttonPressed.hasClass('Edit')) {
            const serviceIdData = button.data('serviceId');
            if (!serviceIdData) {
                console.error("Missing data-service-id attribute on delete button!");
                return;
            }

           var htmlToAdd = `
                          <form   id="dynamicFormAddRequestEdit">
                           <div class="mb-3" style="margin-left: 0%;text-align:left;">
                                      <label for="serviceColumnNameEdit" class="form-label"> Field Name</label>
                                      <input type="text" class="form-control" id="serviceColumnNameEdit" placeholder="Enter field name" value="${columnName}">
                            </div>
                            <div class="mb-3">
                                    <label for="inputTypeEditService" class="form-label">Choose an input type:</label>
                                    <select id="inputTypeEditService" class="form-select" >
                                        <option value="">Select an input type</option>
                                    </select>
                                </div>
                             <div class="mb-3">
                                <label for="requiredTypeEditService" class="form-label">Required Type</label>
                                <select id="requiredTypeEditService" class="form-select"   required >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="visibleTypeEditService" class="form-label">Visible</label>
                                <select id="visibleTypeEditService" class="form-select"  required  >
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
                       $('#requiredTypeEditService').val(requiredType);
                       $('#visibleTypeEditService').val(visibleType);
                       $('#publicModalLabel').text("Edit column Information");

                       $.ajax({
                               type: "POST",
                               url: "/superAdmin/inputTypes",
                               success: function(response) {
                                   const $inputTypeSelect = $('#inputTypeEditService');
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

                           EditTableInformationOfService(serviceIdData );
                           });

                     showModal();
        } else if (buttonPressed.hasClass('Delete')) {
            const serviceId = button.data('serviceId');
            if (!serviceId) {
                console.error("Missing data-service-id attribute on delete button!");
                return;
            }

            $.ajax({
                url: '/superAdmin/deleteServiceColumn',
                type: 'POST',
                data: { serviceId: serviceId },
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

function addServiceDataToggle() {
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
        saveFormData(requestId);
    });

    // Show the modal
    showModal();
}


     function closeToggle(id) {
            var element = document.getElementById(id);
            element.style.display = "none";
              $("#serviceColumnName").val(" ");
        }