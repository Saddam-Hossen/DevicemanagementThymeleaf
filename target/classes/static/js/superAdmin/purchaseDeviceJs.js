
function purchaseRequest(requestId,links) {
    // AJAX code
    $.ajax({
        url: '/superAdmin/approvePurchaseRequest', // Replace with your endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({requestId: requestId,comment:$("#comments").val() ,links: links }),
        success: function(response) {
            console.log("AJAX request successful:", response);
            // Handle success response
        },
        error: function(error) {
            console.log("AJAX request failed:", error);
            // Handle error response
        }
    });
}

function setDeviceStatusApprove(requestId,status,categoryName){

            $.ajax({
                url: '/superAdmin/approvePurchaseProductDeviceStatus',
                type: 'POST',
                data: {
                requestId: requestId,
                status:status,
                categoryName:categoryName

                },
                success: function(result) {
                    alert(result);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting user:", error);
                }
            });

}
function setCancelPurchaseDevice(requestId,status){

            $.ajax({
                url: '/superAdmin/setCancelPurchaseDevice',
                type: 'POST',
                data: {
                requestId: requestId,
                status:status,
                cause:$('#rejectCause').val()

                },
                success: function(result) {
                    alert(result);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting user:", error);
                }
            });

}
 window.initPurchaseDeviceGeneral = function () {
    $('#purchaseDeviceInformationTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(2)').text();

        if (!requestId) {
            console.error("Missing data-request-id attribute on button!");
            return;
        }

        if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }

        console.log(`Button Pressed: ${buttonPressed}`);
        console.log(`Button ID: ${buttonId}`);
        console.log(`Request ID: ${requestId}`);

       if (buttonId === "accepted"){

                var htmlToAdd = `
                   <div class="mb-3" style="margin-right: 0%; text-align: right;">
                       <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                   </div>
               `;
               $('.modal-body').html(htmlToAdd);
               $('#publicModalLabel').text("Do you want to  Approve the Request ?");
               $('#AcceptBtn').click(function() {

                   setDeviceStatusApprove(requestId, "Approved",categoryName);

               });
               showModal();
                }
                else if (buttonId === "cancel") {
                 var htmlToAdd = `
                    <div class="mb-3" style="margin-left: 0%; text-align: left;">
                        <label for="rejectCause" class="form-label">Reject Cause</label>
                        <input type="text" class="form-control" id="rejectCause" placeholder="Cause"  required>
                    </div>
                       <div class="mb-3" style="margin-right: 0%; text-align: right;">
                           <button type="button" class="btn btn-primary" id="DeniedBtn">Yes</button>
                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                       </div>
                   `;

                   // Add the HTML code to the modal body using jQuery
                    $('.modal-body').html(htmlToAdd);
                   // edit individual column header
                    $('#publicModalLabel').text("Do you want to Denny this request ?");

                     $('#DeniedBtn').click(function() {

                             setCancelPurchaseDevice(requestId,"Denied");
                      });

                    showModal();
              }
    });
};
