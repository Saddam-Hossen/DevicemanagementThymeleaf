
function  editRequestColumnBtn(requestId){

           var columnName=$('#requestNameEdit').val();
           var dataType=$('#requestDataTypeEdit').val();
           var requiredType=$('#requiredTypeRequestEdit').val();

           $.ajax({
               url: '/superAdmin/updateRequestColumn', // URL to your update endpoint
               type: 'POST',
               data: {
                   requestId: requestId,
                   columnName:columnName,
                   dataType: dataType,
                   requiredType:requiredType
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
function setRequestStatus(requestId,status){
            if(status=="Accepted"){

             $.ajax({
                     url: '/superAdmin/updateRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     status:status,
                     cause:null
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
            else if(status=="Denied"){

              $.ajax({
                     url: '/superAdmin/updateRequestStatus',
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

}
$(document).ready(function() {
    $('#requestTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var buttonPressed = $(event.target).closest('button').text().trim();; // Get the HTML inside the button
          const button = $(event.target).closest('button');
          var rowIndex = $(this).index();
          // Calculate the total number of columns in the clicked row
          var totalColumns = $row.children('td').length;
          var requestMode = $row.find('td:nth-child(' + totalColumns + ')').text();

       // console.log("Button Pressed: " + buttonPressed);
        const requestId = button.data('requestId');
            if (!requestId) {
                console.error("Missing data-request-id attribute on button!");
                return;
            }
        if (buttonPressed === "✔") { // Accept button
                 var htmlToAdd = `
                    <div class="mb-3" style="margin-right: 0%; text-align: right;">
                        <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    </div>
                `;

                // Add the HTML code to the modal body using jQuery
                 $('.modal-body').html(htmlToAdd);
                // edit individual column header
                 $('#publicModalLabel').text("Do you want to Accept this request ?");

                  $('#AcceptBtn').click(function() {
                          setRequestStatus(requestId,"Accepted");
                   });

                 showModal();

        } else if (buttonPressed === "✗") { // Denied button
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

                         setRequestStatus(requestId,"Denied");
                  });

                showModal();

        } else if (buttonPressed === "👁") { // View button
         const requestIdData=requestId;
           var htmlToAdd = `
                     <form   id="dynamicFormAddRequestEdit">
                   <div id="requestDivEdit" >

                    </div>
                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                        <label for="requestMode" class="form-label">Request Status</label>
                        <input type="text" class="form-control" id="requestMode" placeholder="Enter column name" value="${requestMode}" required>
                    </div>
                     </form>
                      <div class="mb-3" style="margin-left: 0%; text-align: right;">
                           <button type="button" class="btn btn-primary" id="AcceptBtn">Accept</button>
                            <button type="button" class="btn btn-danger" id="DeniedBtn">Reject</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                  `;

                  // Add the HTML code to the modal body using jQuery
                  $('.modal-body').html(htmlToAdd);
                  $('#publicModalLabel').text("Request Data");
                   $('#AcceptBtn').click(function() {
                            setRequestStatus(requestId,"Accepted");
                     });
                      $('#DeniedBtn').click(function() {

                              setRequestStatus(requestId,"Denied");
                       });

                  print('requestColumns', function(requestColumns) {
                              if (requestColumns) {
                                  // Generate HTML for categories
                                       var categoriesHtml = '';
                                  requestColumns.forEach(function(column) {
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
                                           case 'textarea':
                                                   categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><textarea  class="form-control plain-textarea" placeholder="Enter text here" name="${column.columnName}" value="asaa"></textarea></div>`;
                                                   break;
                                           default:
                                               categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                               break;
                                       }


                                      // set value
                                           columnValue(requestIdData, column.columnName, function(value) {
                                             // console.log(column.columnName+':', value);
                                             console.log(value);
                                               $(`[name="${column.columnName}"]`).val(value); // Update this line


                                          });

                                  });

                                  // Insert evaluated Thymeleaf expression
                                  $('#requestDivEdit').html(categoriesHtml); // Corrected line
                              }
                          });



              showModal();

        } else if (buttonPressed === "💬") { // Chat button
             var htmlToAdd = `
             <div class="row">
                     <div class="col-md-12">
                         <div class="chat-frame">
                           <!-- Static Initial Messages -->
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">Hi there!</span>
                           </div>
                           <div class="chat-message right">
                               <span class="message">Hello! How are you?</span>
                           </div>
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">I'm good, thanks! What about you?</span>
                           </div>
                           <div class="chat-message right">
                               <span class="message">I'm doing well, just working on a project.</span>
                           </div>
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">That sounds interesting! What kind of project?</span>
                           </div>
                           <div class="chat-message right">
                               <span class="message">It's a web development project using Bootstrap and Thymeleaf.</span>
                           </div>
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">Nice! Need any help?</span>
                           </div>
                           <div class="chat-message right">
                               <span class="message">Actually, yes. Could you review my code later?</span>
                           </div>
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">Sure, I'd be happy to.</span>
                           </div>
                           <div class="chat-message right">
                               <span class="message">Thanks! I'll send it to you soon.</span>
                           </div>
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">No problem! Looking forward to it.</span>
                               <span style="font-size:12px;"> <br><br> 11/03/2024 10:10AM</span>
                           </div>
                           <div class="chat-message right">
                               <span class="message">Great! Talk to you later.</span>
                               <span style="font-size:12px"> <br><br> 11/03/2024 10:10AM</span>
                           </div>
                           <div class="chat-message">
                               <div class="sender-icon">S</div>
                               <span class="message">Bye!</span>
                               <span style="font-size:12px"> <br><br> 11/03/2024 10:10AM</span>
                           </div>
                         </div>
                         <form th:action="@{/send}" method="post" class="mt-3 mb-3">
                             <div class="input-group">
                                 <input type="text" name="message" class="form-control" placeholder="Type a message...">
                                 <button type="submit" class="btn btn-primary">Send</button>
                             </div>
                         </form>
                     </div>
                 </div>
               <div class="mb-3" style="margin-right: 0%; text-align: right;">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
               </div>
           `;

           // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
           // edit individual column header
            $('#publicModalLabel').text("Chatting....");

             $('#DeniedBtn').click(function() {

                     setRequestStatus(requestId,"Denied");
              });

            showModal();

        }
    });
});

function showModal(){
$('#publicModal').modal('show');
}
function printRejectCause(element) {
        var rejectCause = element.getAttribute("data-reject-cause");

 var htmlToAdd = `
        <div class="mb-3" style="margin-left: 0%; text-align: left;">
           <h1>${rejectCause}
           </h1>
        </div>
           <div class="mb-3" style="margin-right: 0%; text-align: right;">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div>
       `;

       // Add the HTML code to the modal body using jQuery
        $('.modal-body').html(htmlToAdd);
       // edit individual column header
        $('#publicModalLabel').text("Rejected Cause:");

         $('#DeniedBtn').click(function() {

                 setRequestStatus(requestId,"Denied");
          });

        showModal();
    }

     $(document).ready(function() {
                $('.hideButton').click(function() {
                    // Hide the second column
                    $('.secondDiv').hide();

                    // Show the showButton and set display to inline-block
                    $('.showButton').css('display', 'inline-block');

                    // Change the class of the first column to make it full-width
                    $('.firstDiv').removeClass('col-sm-9').addClass('col-sm-12');
                });

                $('.showButton').click(function() {
                    // Show the second column
                    $('.secondDiv').show();

                    // Hide the showButton again
                    $('.showButton').hide();

                    // Revert the class of the first column back to original
                    $('.firstDiv').removeClass('col-sm-12').addClass('col-sm-9');
                    $('.secondDiv').addClass('col-sm-3');
                });
            });

             function printRowDataForCustomerCare(row) {
                                         // Get all the cells of the clicked row
                                         var cells = row.getElementsByTagName('td');
                                         var rowData = [];

                                         // Loop through cells to collect data
                                         for (var i = 0; i < cells.length; i++) {
                                             rowData.push(cells[i].innerText.trim());
                                         }
                                         var biVagName = cells[1].innerText.trim();
                                         var button = row.querySelector('.btn');

                                         if (button) {
                                             // Get the data-request-id attribute value
                                             var requestId = button.getAttribute('data-request-id');

                                             // Print the data-request-id (you can replace this with any action you want)
                                             console.log("data-request-id: " + requestId);
                                                print('requestData', function(requestData) {
                                                    if (requestData) {
                                                        // Search for the specific ID using the find method
                                                        const result = requestData.find(function(data1) {
                                                            return data1.id === requestId;
                                                        });

                            if(result && (result.inventory.inventoryStatus === "Proposal Accepted" || result.inventory.inventoryStatus === "Direct Delivery") ) {
                                                            // Dynamically generate the HTML with standard 'src' attribute
                                                            var htmlToAdd = `
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.presentTime)}</p>
                                                                        <p>${formatTime(result.presentTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>Dept: ${result.departmentName}</span>
                                                                        <span>Requested</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            `;
                                                             if ( result.cooAcceptedTime) {
                                                                    htmlToAdd += `
                                                                 <div class="row">
                                                                    <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                    <div class="col-sm-8" style="height:40px;"></div>
                                                                </div>
                                                                <div class="row bordered-row">
                                                                    <div class="col-sm-3">
                                                                        <div class="text-center">
                                                                            <p>${formatDateTime(result.cooAcceptedTime)}</p>
                                                                            <p>${formatTime(result.cooAcceptedTime)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-2">
                                                                        <div class="text-center">
                                                                            <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-7">
                                                                        <div class="text-3d" style="width:100%">
                                                                            <span>COO:</span>
                                                                            <span>${result.requestMode} Dept Request</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                    `;

                                                                 }

                                                             if (result.inventory && result.inventory.requestTime) {
                                                                htmlToAdd += `

                                                            <div class="row">
                                                                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                <div class="col-sm-8" style="height:40px;"></div>
                                                            </div>
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.inventory.requestTime)}</p>
                                                                        <p>${formatTime(result.inventory.requestTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>Inventory:</span>
                                                                        <span>Send Alternative List Request</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                `;

                                                             }
                                                             if (result.inventory && result.inventory.cooAcceptedTime) {
                                                                htmlToAdd += `

                                                            <div class="row">
                                                                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                <div class="col-sm-8" style="height:40px;"></div>
                                                            </div>
                                                            <div class="row bordered-row">
                                                                <div class="col-sm-3">
                                                                    <div class="text-center">
                                                                        <p>${formatDateTime(result.inventory.cooAcceptedTime)}</p>
                                                                        <p>${formatTime(result.inventory.cooAcceptedTime)}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-2">
                                                                    <div class="text-center">
                                                                        <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-7">
                                                                    <div class="text-3d" style="width:100%">
                                                                        <span>COO:</span>
                                                                        <span>${result.inventory.cooAns} Inventory Request</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                `;

                                                             }

                                                            // Add additional HTML conditionally
                                                            if (result.inventory && result.inventory.deliveryTime) {
                                                                htmlToAdd += `
                                                                <div class="row">
                                                                    <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                    <div class="col-sm-8" style="height:40px;"></div>
                                                                </div>
                                                                <div class="row bordered-row">
                                                                    <div class="col-sm-3">
                                                                        <div class="text-center">
                                                                            <p>${formatDateTime(result.inventory.deliveryTime)}</p>
                                                                            <p>${formatTime(result.inventory.deliveryTime)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-2">
                                                                        <div class="text-center">
                                                                            <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-7">
                                                                        <div class="text-3d" style="width:100%">
                                                                            <span>Inventory:</span>
                                                                            <span>Delivered Device To CustomerCare</span>
                                                                        </div>
                                                                    </div>
                                                                </div>`;
                                                            }

                                                            if (result.customerCare && result.customerCare.deliveryTime) {
                                                                htmlToAdd += `
                                                                <div class="row">
                                                                    <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                    <div class="col-sm-8" style="height:40px;"></div>
                                                                </div>
                                                                <div class="row bordered-row">
                                                                    <div class="col-sm-3">
                                                                        <div class="text-center">
                                                                            <p>${formatDateTime(result.customerCare.deliveryTime)}</p>
                                                                            <p>${formatTime(result.customerCare.deliveryTime)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-2">
                                                                        <div class="text-center">
                                                                            <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-7">
                                                                        <div class="text-3d" style="width:100%">
                                                                            <span>CustomerCare:</span>
                                                                            <span>Delivered Device To User</span>
                                                                        </div>
                                                                    </div>
                                                                </div>`;
                                                            }
                                                     if (result.deviceReceivedStatus) {
                                                              htmlToAdd += `
                                                              <div class="row">
                                                                  <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                  <div class="col-sm-8" style="height:40px;"></div>
                                                              </div>
                                                              <div class="row bordered-row">
                                                                  <div class="col-sm-3">
                                                                      <div class="text-center">
                                                                          <p>${formatDateTime(result.deviceReceivedTime)}</p>
                                                                          <p>${formatTime(result.deviceReceivedTime)}</p>
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-sm-2">
                                                                      <div class="text-center">
                                                                          <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-sm-7">
                                                                      <div class="text-3d" style="width:100%">
                                                                          <span>Dept: ${result.departmentName}</span>
                                                                          <span>Received Device From CustomerCare</span>
                                                                      </div>
                                                                  </div>
                                                              </div>`;
                                                          }
                                                            // Add the HTML code to the modal body using jQuery
                                                            $('.activityDiv').html(htmlToAdd);
                                                        }
                                                        else if(result && result.inventory.inventoryStatus === "Purchased") {
                                                             // Dynamically generate the HTML with standard 'src' attribute
                                                             var htmlToAdd = `
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.presentTime)}</p>
                                                                         <p>${formatTime(result.presentTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>Dept: ${result.departmentName}</span>
                                                                         <span>Requested</span>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                             `;
                                                              if ( result.cooAcceptedTime) {
                                                                     htmlToAdd += `
                                                                  <div class="row">
                                                                     <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                     <div class="col-sm-8" style="height:40px;"></div>
                                                                 </div>
                                                                 <div class="row bordered-row">
                                                                     <div class="col-sm-3">
                                                                         <div class="text-center">
                                                                             <p>${formatDateTime(result.cooAcceptedTime)}</p>
                                                                             <p>${formatTime(result.cooAcceptedTime)}</p>
                                                                         </div>
                                                                     </div>
                                                                     <div class="col-sm-2">
                                                                         <div class="text-center">
                                                                             <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                         </div>
                                                                     </div>
                                                                     <div class="col-sm-7">
                                                                         <div class="text-3d" style="width:100%">
                                                                             <span>COO:</span>
                                                                             <span>${result.requestMode} Dept Request</span>
                                                                         </div>
                                                                     </div>
                                                                 </div>
                                                                     `;

                                                                  }

                                                              if (result.inventory && result.inventory.requestTime) {
                                                                 htmlToAdd += `

                                                             <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.inventory.requestTime)}</p>
                                                                         <p>${formatTime(result.inventory.requestTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>Inventory:</span>
                                                                         <span>Send Purchase Request</span>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                                 `;

                                                              }
                                                              if (result.purchase && result.purchase.requestTime) {
                                                                 htmlToAdd += `

                                                             <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.purchase.requestTime)}</p>
                                                                         <p>${formatTime(result.purchase.requestTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>Purchase:</span>
                                                                         <span>Send Purchase Request To COO</span>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                                 `;

                                                              }
                                                       if (result.purchase && result.purchase.cooAcceptedTime) {
                                                                 htmlToAdd += `

                                                             <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.purchase.cooAcceptedTime)}</p>
                                                                         <p>${formatTime(result.purchase.cooAcceptedTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>COO:</span>
                                                                         <span>${result.purchase.cooAns} Purchase Request</span>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                                 `;

                                                              }
                                                             // Add additional HTML conditionally
                                                             if (result.purchase && result.purchase.deliveryTime) {
                                                                 htmlToAdd += `
                                                                 <div class="row">
                                                                     <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                     <div class="col-sm-8" style="height:40px;"></div>
                                                                 </div>
                                                                 <div class="row bordered-row">
                                                                     <div class="col-sm-3">
                                                                         <div class="text-center">
                                                                             <p>${formatDateTime(result.purchase.deliveryTime)}</p>
                                                                             <p>${formatTime(result.purchase.deliveryTime)}</p>
                                                                         </div>
                                                                     </div>
                                                                     <div class="col-sm-2">
                                                                         <div class="text-center">
                                                                             <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                         </div>
                                                                     </div>
                                                                     <div class="col-sm-7">
                                                                         <div class="text-3d" style="width:100%">
                                                                             <span>Purchase:</span>
                                                                             <span>Delivered Device To Inventory</span>
                                                                         </div>
                                                                     </div>
                                                                 </div>`;
                                                             }

                                                    if (result.inventory && result.inventory.cooAcceptedDeliveryTime) {
                                                                 htmlToAdd += `

                                                             <div class="row">
                                                                 <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                 <div class="col-sm-8" style="height:40px;"></div>
                                                             </div>
                                                             <div class="row bordered-row">
                                                                 <div class="col-sm-3">
                                                                     <div class="text-center">
                                                                         <p>${formatDateTime(result.inventory.cooAcceptedDeliveryTime)}</p>
                                                                         <p>${formatTime(result.inventory.cooAcceptedDeliveryTime)}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-2">
                                                                     <div class="text-center">
                                                                         <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-sm-7">
                                                                     <div class="text-3d" style="width:100%">
                                                                         <span>COO:</span>
                                                                         <span>Given Permission To Delivery</span>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                                 `;

                                                              }

                                                             // Add additional HTML conditionally
                                                            if (result.inventory && result.inventory.deliveryTime) {
                                                                htmlToAdd += `
                                                                <div class="row">
                                                                    <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                    <div class="col-sm-8" style="height:40px;"></div>
                                                                </div>
                                                                <div class="row bordered-row">
                                                                    <div class="col-sm-3">
                                                                        <div class="text-center">
                                                                            <p>${formatDateTime(result.inventory.deliveryTime)}</p>
                                                                            <p>${formatTime(result.inventory.deliveryTime)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-2">
                                                                        <div class="text-center">
                                                                            <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-7">
                                                                        <div class="text-3d" style="width:100%">
                                                                            <span>Inventory:</span>
                                                                            <span>Delivered Device To CustomerCare</span>
                                                                        </div>
                                                                    </div>
                                                                </div>`;
                                                            }
                                                             if (result.customerCare && result.customerCare.deliveryTime) {
                                                                 htmlToAdd += `
                                                                 <div class="row">
                                                                     <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                     <div class="col-sm-8" style="height:40px;"></div>
                                                                 </div>
                                                                 <div class="row bordered-row">
                                                                     <div class="col-sm-3">
                                                                         <div class="text-center">
                                                                             <p>${formatDateTime(result.customerCare.deliveryTime)}</p>
                                                                             <p>${formatTime(result.customerCare.deliveryTime)}</p>
                                                                         </div>
                                                                     </div>
                                                                     <div class="col-sm-2">
                                                                         <div class="text-center">
                                                                             <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                         </div>
                                                                     </div>
                                                                     <div class="col-sm-7">
                                                                         <div class="text-3d" style="width:100%">
                                                                             <span>CustomerCare:</span>
                                                                             <span>Delivered Device To User</span>
                                                                         </div>
                                                                     </div>
                                                                 </div>`;
                                                             }
                                                       if (result.deviceReceivedStatus) {
                                                              htmlToAdd += `
                                                              <div class="row">
                                                                  <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                                                                  <div class="col-sm-8" style="height:40px;"></div>
                                                              </div>
                                                              <div class="row bordered-row">
                                                                  <div class="col-sm-3">
                                                                      <div class="text-center">
                                                                          <p>${formatDateTime(result.deviceReceivedTime)}</p>
                                                                          <p>${formatTime(result.deviceReceivedTime)}</p>
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-sm-2">
                                                                      <div class="text-center">
                                                                          <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-sm-7">
                                                                      <div class="text-3d" style="width:100%">
                                                                          <span>Dept: ${result.departmentName}</span>
                                                                          <span>Received Device From CustomerCare</span>
                                                                      </div>
                                                                  </div>
                                                              </div>`;
                                                          }
                                                             // Add the HTML code to the modal body using jQuery
                                                             $('.activityDiv').html(htmlToAdd);
                                                         }

                                                    }
                                                });





                                         }
                                     }

                                     function formatDate(inputDate) {
                                         // Split the input date into components
                                         var parts = inputDate.split('-'); // parts[0] = '2024', parts[1] = '08', parts[2] = '20'

                                         // Reformat the date to 'DD/MM/YY'
                                         var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0].slice(2); // '20/08/24'

                                         return formattedDate;
                                     }
                            function formatDateTime(inputDateTime) {
                                // Check if inputDateTime is undefined or null
                                if (!inputDateTime) {
                                    console.error("inputDateTime is undefined or null");
                                    return ""; // or return a default value
                                }

                                // Split the input datetime into date and time components
                                var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                                // Check if the split was successful
                                if (dateTimeParts.length !== 2) {
                                    console.error("inputDateTime format is incorrect, expected 'YYYY-MM-DD HH:MM:SS'");
                                    return ""; // or handle the error as needed
                                }

                                // Extract the date part
                                var datePart = dateTimeParts[0]; // '2024-08-20'

                                // Split the date into components
                                var dateComponents = datePart.split('-'); // ['2024', '08', '20']

                                // Check if the date split was successful
                                if (dateComponents.length !== 3) {
                                    console.error("Date part of inputDateTime is incorrect, expected 'YYYY-MM-DD'");
                                    return ""; // or handle the error as needed
                                }

                                // Reformat the date to 'DD/MM/YY'
                                var formattedDate = dateComponents[2] + '/' + dateComponents[1] + '/' + dateComponents[0].slice(2); // '20/08/24'

                                return formattedDate;
                            }

                            function formatTime(inputDateTime) {
                                // Split the input datetime to separate date and time
                                var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                                // Extract the time part
                                var timePart = dateTimeParts[1]; // '15:02:26'

                                // Split the time into components
                                var timeComponents = timePart.split(':'); // ['15', '02', '26']

                                // Convert hour from 24-hour format to 12-hour format
                                var hour = parseInt(timeComponents[0], 10); // Convert '15' to 15
                                var minutes = timeComponents[1]; // '02'
                                var period = 'AM';

                                // Determine AM or PM period and adjust hour accordingly
                                if (hour >= 12) {
                                    period = 'PM';
                                    if (hour > 12) {
                                        hour -= 12; // Convert 13-23 hours to 1-11 PM
                                    }
                                } else if (hour === 0) {
                                    hour = 12; // Midnight case, show as 12 AM
                                }

                                // Format time string as 'H:MM AM/PM'
                                var formattedTime = hour + ':' + minutes + ' ' + period;

                                return formattedTime;
                            }