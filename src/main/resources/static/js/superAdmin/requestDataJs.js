
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
function setRequestStatusData(requestId,status){
             var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
             var departmentName = departmentElement.data("departmentname");//it
             var departmentUserName = departmentElement.data("departmentuser-name");//saho
             var departmentUserId = departmentElement.data("departmentuser-id");//s

            if(status=="Accepted"){

             $.ajax({
                     url: '/superAdmin/updateRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     status:status,
                      departmentName:departmentName,
                      departmentUserName:departmentUserName,
                      departmentUserId:departmentUserId,
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
window.initRequestDataGeneral = function () {
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
                          setRequestStatusData(requestId,"Accepted");
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
};

function printRowData(row) {
                // Get all the cells of the clicked row
                var cells = row.getElementsByTagName('td');
                var rowData = [];

                // Loop through cells to collect data
                for (var i = 0; i < cells.length; i++) {
                    rowData.push(cells[i].innerText.trim());
                }
                var biVagName=cells[1].innerText.trim();
                var button = row.querySelector('.btn');

                if (button) {
                    // Get the data-request-id attribute value
                    var requestId = button.getAttribute('data-request-id');

                    // Print the data-request-id (you can replace this with any action you want)
                    console.log("data-request-id: " + requestId);

                  var htmlToAdd = `

                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                     <p>${biVagName}</p>
                        <p>${requestId}</p>
                    </div>


                  `;

                  // Add the HTML code to the modal body using jQuery
                  $('.activityDiv').html(htmlToAdd);
                }
            }
