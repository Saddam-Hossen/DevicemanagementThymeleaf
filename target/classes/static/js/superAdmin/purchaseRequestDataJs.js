
function purchaseRequest1(requestId,links) {
 var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
             var departmentName = departmentElement.data("departmentname");//it
             var departmentUserName = departmentElement.data("departmentuser-name");//saho
             var departmentUserId = departmentElement.data("departmentuser-id");//s
    // AJAX code
    $.ajax({
        url: '/superAdmin/approvePurchaseRequest', // Replace with your endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
        requestId: requestId,
        comment:$("#comments").val() ,
        links: links ,
        departmentName:departmentName,
        departmentUserName:departmentUserName,
        departmentUserId:departmentUserId
        }),
        success: function(response) {
        alert(response);
            console.log("AJAX request successful:", response);
             location.reload();
            // Handle success response
        },
        error: function(error) {
            console.log("AJAX request failed:", error);
            // Handle error response
        }
    });
}
function purchaseRequestForService(serviceId,problemName,solutionName,links) {
 var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
             var departmentName = departmentElement.data("departmentname");//it
             var departmentUserName = departmentElement.data("departmentuser-name");//saho
             var departmentUserId = departmentElement.data("departmentuser-id");//s
    // AJAX code
    $.ajax({
        url: '/superAdmin/approvePurchaseRequestForService', // Replace with your endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
        serviceId: serviceId,
        problemName:problemName,
        solutionName:solutionName,
        comment:$("#comments").val() ,
        links: links ,
        departmentName:departmentName,
        departmentUserName:departmentUserName,
        departmentUserId:departmentUserId
        }),
        success: function(response) {
        alert(response);
            console.log("AJAX request successful:", response);
            location.reload();
            // Handle success response
        },
        error: function(error) {
            console.log("AJAX request failed:", error);
            // Handle error response
        }
    });
}


 window.initRequestPurchaseDataGeneral = function () {
    $('#requestPurchaseDataTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
         var buttonPTag = $(event.target).closest('td');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('th:nth-child(3)').text();


        console.log(`Button Pressed: ${buttonPressed}`);
        console.log(`Button ID: ${buttonId}`);
        console.log(`Request ID: ${requestId}`);

if (buttonPTag.hasClass('viewInfo')) {

                           print('requestColumns', function(requestColumns) {
                          var categoriesHtml = '';
                          if (requestColumns) {
                              requestColumns.forEach(function(category) {
                                  categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                              });
                          }

                          var htmlToAdd = `
                              <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                  <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                      <thead>
                                          <tr>
                                              <th scope="col" style="background-color: gray; color:white">SN</th>
                                               <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                              <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                              ${categoriesHtml}

                                          </tr>
                                      </thead>
                                      <tbody id="listDeviceInformationBody">

                                      </tbody>
                                  </table>
                              </div>

                          `;
                          $('.modal-body').html(htmlToAdd);

                          $('#publicModalLabel').text("Request Information");



                                var rowsHtml = '';

                                print('requestData', function(requestData) {
                                  if (requestData) {
                                    // Replace requestId with a valid id to search for
                                    const requestId = buttonPTag.data('requestId');
                                    const Data = requestData.find(item => item.id === requestId);

                                    if (Data) {
                                      // Generate the HTML for the found item
                                      rowsHtml += `
                                        <tr>
                                          <td>${Data.visibleRequestId}</td>
                                          <td>${Data.allData['category']}</td>
                                           `;
                                           requestColumns.forEach(function(column) {
                                               rowsHtml += `<td >${Data.allData[column.columnName]}</td>`;
                                           });


                                        rowsHtml += `  </tr>
                                      `;

                                      // Insert the generated HTML into the table body
                                      $('#listDeviceInformationBody').html(rowsHtml);
                                    } else {
                                      console.error('No data found with the specified requestId.');
                                    }
                                  } else {
                                    console.error('requestData is null or undefined.');
                                  }
                                });



                          showModal();
                      });


             }

else  if (buttonId === "chat") {
        var htmlToAdd = `
          <div class="mb-3" style="margin-left: 0%; text-align: left;">
          <h6 id="detailsId"></h6>
          <h6 id="budgetId"></h6>
          </div>
             <div class="mb-9" style="margin-left: 0%; text-align: left;">
                 <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                     <thead>
                         <tr>
                             <th scope="col" style="background-color: gray;">SN</th>
                              <th scope="col" style="background-color: gray;display: none;">Link</th>
                               <th scope="col" style="background-color: gray;">Links</th>
                              <th scope="col" style="background-color: gray;">Action</th>

                         </tr>
                     </thead>
                     <tbody id="purchaseRequestInformationBody">

                     </tbody>
                 </table>
             </div>
             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                <label for="comments" class="form-label">Comments</label>
                <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
            </div>
              <div class="mb-3" style="margin-left: 0%; text-align: center;">
                 <button type="button" class="btn btn-primary" id="saveEditBtn">Send</button>
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             </div>

         `;
         $('.modal-body').html(htmlToAdd);

         $('#publicModalLabel').text("Purchase Request Form");

       print('requestData', function(requestData) {
           if (requestData) {
               const result = requestData.find(function(data1) {
                   return data1.id === requestId;
               });
               $("#detailsId").text("Details: " + result.purchase.details);
               $("#budgetId").text("Budget: " + result.purchase.budget);

               var rowsHtml = '';
               for (let i = 0; i < result.purchase.links.length; i++) {
                   // Ensure the link includes the protocol (http:// or https://)
                   const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                       ? result.purchase.links[i]
                       : 'https://' + result.purchase.links[i];

                   rowsHtml += `<tr>
                       <td>${i + 1}</td>
                       <td style="display: none;">${link}</td>
                       <td>
                           <a href="${link}" target="_blank" style="text-decoration: none;">
                               ${link}
                           </a>
                       </td>
                       <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice" class="action-checkbox"></td>
                   </tr>`;
               }

               $('#purchaseRequestInformationBody').html(rowsHtml);
           }
       });



 $('#saveEditBtn').click(function(event) {
             event.preventDefault(); // Prevent the default action (form submission)

             const checkboxes = document.querySelectorAll('input[name="selectDevice"]:checked');
             const selectedRows = Array.from(checkboxes).map(checkbox => {
                 const row = checkbox.closest('tr'); // Get the parent row of the checkbox
                 const secondColumn = row.querySelector('td:nth-child(2)'); // Get the second column (assuming columns are indexed from 1)

                 if (secondColumn) {
                     const secondColumnValue = secondColumn.textContent.trim(); // Get the text content of the second column
                     return secondColumnValue;
                 } else {
                     return null;
                 }
             });

             if(selectedRows.length==0){
               alert("Please select a device.");
             }
             else{
               // Show a confirmation alert
                const userConfirmed = confirm("Do you want to proceed with the selected device?");
                if (userConfirmed) {
                     hideModal();
                    purchaseRequest1(requestId,selectedRows);
                } else {
                    console.log("User canceled.");
                    // Handle the cancel action here
                }
             }

         });

           showModal();
       }

else if (buttonId === "view") {
          var htmlToAdd = `
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <h6 id="detailsId"></h6>
                   <h6 id="budgetId"></h6>
                   </div>
                      <div class="mb-9" style="margin-left: 0%; text-align: left;">
                          <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th scope="col" style="background-color: gray;">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;">Link</th>
                                        <th scope="col" style="background-color: gray;">Links</th>
                                       <th scope="col" style="background-color: gray;">Action</th>

                                  </tr>
                              </thead>
                              <tbody id="purchaseRequestInformationBody">

                              </tbody>
                          </table>
                      </div>
                      <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <label for="comments" class="form-label">Comments</label>
                         <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
                     </div>
                       <div class="mb-3" style="margin-left: 0%; text-align: center;">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>

                  `;
                  $('.modal-body').html(htmlToAdd);

                  $('#publicModalLabel').text("Accepted Request Form");

                print('requestData', function(requestData) {
                    if (requestData) {
                        const result = requestData.find(function(data1) {
                            return data1.id === requestId;
                        });
                        $("#detailsId").text("Details: " + result.purchase.details);
                        $("#budgetId").text("Budget: " + result.purchase.budget);
                        $("#comments").text( result.purchase.cooComment);

                        var rowsHtml = '';
                            for (let j = 0; j < result.purchase.acceptedLinks.length; j++) {
                             for (let i = 0; i < result.purchase.links.length; i++) {
                              const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                                     ? result.purchase.links[i]
                                     : 'https://' + result.purchase.links[i];
                             if(result.purchase.acceptedLinks[j]===link){
                              // Ensure the link includes the protocol (http:// or https://)
                                 const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                                     ? result.purchase.links[i]
                                     : 'https://' + result.purchase.links[i];

                                 rowsHtml += `<tr>
                                     <td>${i + 1}</td>
                                     <td style="display: none;">${link}</td>
                                     <td>
                                         <a href="${link}" target="_blank" style="text-decoration: none;">
                                             ${link}
                                         </a>
                                     </td>
                                     <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice"  class="action-checkbox" checked></td>
                                 </tr>`;

                             }
                            }
                            }


                        $('#purchaseRequestInformationBody').html(rowsHtml);
                    }
                });


                    showModal();
        }
    });
};

    window.initRequestPurchaseDataTable = function () {
         // Perform a single AJAX call
         $.ajax({
             url: '/superAdmin/allData',
             type: 'POST',
             dataType: 'json',
             success: function(data) {
                 console.log(data); // Log the entire data for debugging

                 var allData = data['serviceRequests'];
                 var allAddData = data['allAddData'];
                 const tableBody = document.getElementById("requestPurchaseDataTableBody");
                    if (!tableBody) {
                        console.error("Table body element with id 'requestForPaymentTableBody' not found.");
                        return;
                    }
                 // Function to check availability count
                 function getAvailability(categoryName) {
                     let count = 0;
                     allAddData.forEach(function(device) {

                         if (device.categoryName === categoryName) {
                             count++;
                         }
                     });
                     return count === 0 ? "Unavailable" : `Available(${count})`;
                 }

                let counter = 1; // Initialize a counter variable

                // Loop through each device in allData
                allData.forEach(function(device) {
                    const bivagName = device.departmentName;
                    const categoryName = device.categoryName;
                    const sn=device.visibleServiceId;
                   // Ensure allProblem exists before iterating
                       if (!device.allProblem || !Array.isArray(device.allProblem)) {
                           console.warn("Skipping device due to missing or invalid allProblem array:", device);
                           return; // Skip this device if allProblem is missing or not an array
                       }
                    // Loop through each problem in the allProblem array for the device
                    device.allProblem.forEach(function(problem) {
                        console.log("Problem Name:", problem.name);
                        console.log("Proposal Solutions:");
                        // Ensure proposalSolution exists before iterating
                                if (!problem.proposalSolution || !Array.isArray(problem.proposalSolution)) {
                                    console.warn("Skipping problem due to missing or invalid proposalSolution array:", problem);
                                    return; // Skip this problem if proposalSolution is missing or not an array
                                }
                        // Loop through each proposalSolution in the problem
                        problem.proposalSolution.forEach(function(solution) {
                              var text;
                              // Check if solution.solution exists
                                if (solution.purchaseProposalToCooAns ) {
                                   text = solution.purchaseProposalToCooAns;

                                } else {
                                text=" ";

                                  // Optionally, set a default or handle the missing property case
                                }

                            if (text === "Pending" || text === "Accepted") {
                                const row = document.createElement("tr");

                                console.log("Name:", solution.name);
                                console.log("Value:", solution.value);
                                console.log("Category:", solution.category);
                                console.log("Price:", solution.price);
                                console.log("Action:", solution.action);
                                console.log("Comment:", solution.comment);
                                var status=solution.purchaseManInfoOfPriceStatus;
                                if(status==null){
                                status=" ";
                                }

                               //  console.log("inventoryToServiceCenterDeviceStatus:", solution.inventoryToServiceCenterDeviceStatus);

                                // Determine availability
                                const availability = getAvailability(solution.category);

                                // Create and append cells to the row
                                row.innerHTML = `
                                    <td >${sn}</td>  <!-- Dynamic Counter -->
                                    <td>${bivagName}</td>
                                    <td>${solution.category}</td>
                                    <td style="text-align:left">
                                    <span>${solution.name}:${solution.value} </span> <br>
                                    <span>Price:${solution.price} </span>
                                    </td>
                                     <td>
                                     ${solution.purchaseProposalToCooAns}
                                     </td>
                                     <td>${solution.purchaseProposalToCooTime ? formatDateTimeToAmPm(solution.purchaseProposalToCooTime) : " "}</td>
                                    <td>

                                       <div class="d-flex justify-content-center align-items-center action-button-container">


                                                         ${solution.purchaseProposalToCooAns !== "Accepted"  ? `
                                                           <button class="btn btn-secondary btn-sm chat-buttonForService" data-problemname-id="${problem.name}" data-solutionname-id="${solution.name}" data-service-id="${device.id}" th:data-button-id="chat">
                                                              &#128172; <!-- Speech Bubble -->
                                                          </button>
                                                       ` : ""}

                                                        ${solution.purchaseProposalToCooAns === "Accepted"  ? `
                                                          <button class="btn btn-info btn-sm view-selectedLinkPurchase" data-details-id="${solution.purchaseProposalToCooDetails}" data-budget-id="${solution.purchaseProposalToCooBudget}" data-coocomment-id="${solution.purchaseProposalToCooComment}" data-link-id="${solution.purchaseProposalToCooLinks}" data-acceptedlink-id="${solution.purchaseProposalToCooAcceptedLinks}" data-problemname-id="${problem.name}" data-solutionname-id="${solution.name}" data-service-id="${device.id}" >
                                                               &#128065;
                                                           </button>
                                                       ` : ""}
                                               </div>
                                    </td>
                                `;

                                // Increment the counter for the next row
                                counter++;

                                // Append the row to the table body
                                tableBody.appendChild(row);
                            }


                        });
                    });
                });
                //const myTable = document.querySelector("table");  // or more specific selector if you want
                //sortAndFormatTable(myTable);
                $(document).on('click', '.view-selectedLinkPurchase', function() {
                            var details = $(this).data('details-id');
                            var budget = $(this).data('budget-id');
                            var cooComment = $(this).data('coocomment-id');
                            var acceptedLinks = ($(this).data('acceptedlink-id') || "").toString().split(',');
                            var links = ($(this).data('link-id') || "").toString().split(',');

                             // Ensure `acceptedLinks` and `links` are arrays

                             var htmlToAdd = `
                                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                     <h6 id="detailsId"></h6>
                                     <h6 id="budgetId"></h6>
                                     </div>
                                        <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                            <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style="background-color: gray;">SN</th>
                                                         <th scope="col" style="background-color: gray;display: none;">Link</th>
                                                          <th scope="col" style="background-color: gray;">Links</th>
                                                         <th scope="col" style="background-color: gray;">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody id="purchaseRequestInformationBody">

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                           <label for="comments" class="form-label">Comments</label>
                                           <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
                                       </div>
                                         <div class="mb-3" style="margin-left: 0%; text-align: center;">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>

                                    `;
                                    $('.modal-body').html(htmlToAdd);

                                    $('#publicModalLabel').text("Accepted Request Form");

                                          $("#detailsId").text("Details: " + details);
                                          $("#budgetId").text("Budget: " + budget);
                                          $("#comments").text( cooComment);

                                          var rowsHtml = '';
                                              for (let j = 0; j < acceptedLinks.length; j++) {
                                               for (let i = 0; i < links.length; i++) {
                                                const link = links[i].startsWith('http://') || links[i].startsWith('https://')
                                                       ? links[i]
                                                       : 'https://' + links[i];
                                               if(acceptedLinks[j]===link){
                                                // Ensure the link includes the protocol (http:// or https://)
                                                   const link = links[i].startsWith('http://') || links[i].startsWith('https://')
                                                       ? links[i]
                                                       : 'https://' + links[i];

                                                   rowsHtml += `<tr>
                                                       <td>${i + 1}</td>
                                                       <td style="display: none;">${link}</td>
                                                       <td>
                                                           <a href="${link}" target="_blank" style="text-decoration: none;">
                                                               ${link}
                                                           </a>
                                                       </td>
                                                       <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice"  class="action-checkbox" checked></td>
                                                   </tr>`;

                                               }
                                              }
                                              }


                                          $('#purchaseRequestInformationBody').html(rowsHtml);




                                      showModal();
                                   });
                 $(document).on('click', '.chat-buttonForService', function() {

                       var serviceId = $(this).data('service-id');
                        var problemName = $(this).data('problemname-id');
                         var solutionName = $(this).data('solutionname-id');

                         var htmlToAdd = `
                                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                           <h6 id="detailsId"></h6>
                                           <h6 id="budgetId"></h6>
                                           </div>
                                              <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                                  <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                                      <thead>
                                                          <tr>
                                                              <th scope="col" style="background-color: gray;">SN</th>
                                                               <th scope="col" style="background-color: gray;display: none;">Link</th>
                                                                <th scope="col" style="background-color: gray;">Links</th>
                                                               <th scope="col" style="background-color: gray;">Action</th>

                                                          </tr>
                                                      </thead>
                                                      <tbody id="purchaseRequestInformationBody">

                                                      </tbody>
                                                  </table>
                                              </div>
                                              <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                                 <label for="comments" class="form-label">Comments</label>
                                                 <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
                                             </div>
                                               <div class="mb-3" style="margin-left: 0%; text-align: center;">
                                                  <button type="button" class="btn btn-primary" id="saveEditBtn1" data-service-id="${serviceId}" data-problemname-id="${problemName}" data-solutionname-id="${solutionName}">Send</button>
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                              </div>

                                          `;
                                          $('.modal-body').html(htmlToAdd);

                                          $('#publicModalLabel').text("Accepted Request Form");

                                        print('serviceRequests', function(serviceRequests) {
                                            if (serviceRequests) {
                                                const result = serviceRequests.find(function(data1) {
                                                    return data1.id === serviceId;
                                                });


                                                result.allProblem.forEach(function(problem){
                                                console.log("Problem Name:", problem.name);
                                                 console.log("Proposal Solutions:");
                                                 if(problemName===problem.name){

                                                      problem.proposalSolution.forEach(function(solution) {
                                                       if(solutionName===solution.name){
                                                           console.log("Name:", solution.name);
                                                           console.log("Value:", solution.value);
                                                           console.log("Category:", solution.category);
                                                           console.log("Price:", solution.price);
                                                           console.log("Action:", solution.action);
                                                           console.log("Comment:", solution.comment);

                                                            $("#detailsId").text("Details: " + solution.purchaseProposalToCooDetails);
                                                           $("#budgetId").text("Budget: " + solution.purchaseProposalToCooBudget);
                                                            var rowsHtml = '';
                                                                          for (let i = 0; i < solution.purchaseProposalToCooLinks.length; i++) {
                                                                              // Ensure the link includes the protocol (http:// or https://)
                                                                              const link = solution.purchaseProposalToCooLinks[i].startsWith('http://') || solution.purchaseProposalToCooLinks[i].startsWith('https://')
                                                                                  ? solution.purchaseProposalToCooLinks[i]
                                                                                  : 'https://' + solution.purchaseProposalToCooLinks[i];

                                                                              rowsHtml += `<tr>
                                                                                  <td>${i + 1}</td>
                                                                                  <td style="display: none;">${link}</td>
                                                                                  <td>
                                                                                      <a href="${link}" target="_blank" style="text-decoration: none;">
                                                                                          ${link}
                                                                                      </a>
                                                                                  </td>
                                                                                  <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice" class="action-checkbox"></td>
                                                                              </tr>`;
                                                                          }

                                                                          $('#purchaseRequestInformationBody').html(rowsHtml);

                                                       }


                                                     });
                                                 }


                                                })


                                            }
                                        });
                $('#saveEditBtn1').click(function(event) {
                             event.preventDefault(); // Prevent the default action (form submission)
                             var serviceId=$(this).data('service-id');
                             var problemName=$(this).data('problemname-id');
                             var solutionName=$(this).data('solutionname-id');
                             const checkboxes = document.querySelectorAll('input[name="selectDevice"]:checked');
                             const selectedRows = Array.from(checkboxes).map(checkbox => {
                                 const row = checkbox.closest('tr'); // Get the parent row of the checkbox
                                 const secondColumn = row.querySelector('td:nth-child(2)'); // Get the second column (assuming columns are indexed from 1)

                                 if (secondColumn) {
                                     const secondColumnValue = secondColumn.textContent.trim(); // Get the text content of the second column
                                     return secondColumnValue;
                                 } else {
                                     return null;
                                 }
                             });

                             if(selectedRows.length==0){
                               alert("Please select a device.");
                             }
                             else{
                               // Show a confirmation alert
                                const userConfirmed = confirm("Do you want to proceed with the selected device?");
                                if (userConfirmed) {
                                     hideModal();
                                    purchaseRequestForService(serviceId,problemName,solutionName,selectedRows);
                                } else {
                                    console.log("User canceled.");
                                    // Handle the cancel action here
                                }
                             }

                         });

                                     showModal();
                        });
      // Add event listener for the availability button click
                 $(document).on('click', '.view-button-selected-device', function() {
                                     var category = $(this).data('category');
                                     var deviceId=$(this).data('deviceId');
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
                                                         <th scope="col" style="background-color: gray;">SN</th>
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
                                                                             <td>${data.visibleId}</td>
                                                                              <td style="display: none;">${data.id}</td>
                                                                             <td>${data.categoryName}</td>`;
                                                                         universalColumns.forEach(function(column) {
                                                                             rowsHtml += `<td >${data.allData[column.columnName]}</td>`;
                                                                         });

                                                                         rowsHtml += `<td>
                                                                             <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                         if (individualColumns) {
                                                                             individualColumns.forEach(function(individualColumn) {
                                                                                if (individualColumn.categoryName=== category) {

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


                 });
               $(document).on('click', '.clock-button', function() {
                 var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
                 var problemName = $(this).data('problemName');
                 var solutionName = $(this).data('solutionName');
                 var date = $(this).data('date');

                 var htmlToAdd = `
                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <label for="deliveryDate" class="form-label">Change Delivery Date:</label>
                         <input type="date" class="form-control" id="deliveryDate" name="deliveryDate" value="${date}">
                     </div>
                     <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>
                 `;

                 // Add the HTML code to the modal body using jQuery
                 $('.modal-body').html(htmlToAdd);
                 $('#publicModalLabel').text("Do you want to update delivery date?");

                 // Add event listener for save button
                 $('#saveEditBtn').click(function() {
                     var updatedDate = $('#deliveryDate').val();

                     // Send data to the controller using AJAX
                    $.ajax({
                                type: "POST",
                                url: "/inventory/updateDeliveryDate",  // Replace with your controller endpoint
                                data: {
                                    serviceId: serviceId,
                                    problemName: problemName,
                                    solutionName: solutionName,
                                    date: updatedDate
                                },
                                success: function(response) {
                                    // Handle success (e.g., show a message or close the modal)
                                    alert("Delivery date updated successfully!");
                                    hideModal();
                                    location.reload();
                                },
                                error: function(error) {
                                    // Handle error (e.g., show an error message)
                                    alert("Error updating delivery date!");
                                }
                            });
                         });

                 showModal();
             });
             // Add event listener for the availability button click
                 $(document).on('click', '.setPriceBtn', function() {// Get the clicked button
                         const $button = $(this);
                         var button = $(event.target).closest('button');
                         var serviceId = button.data('serviceId');
                         // Get the parent row (tr)
                         const $row = $button.closest('tr');

                       // Extract data from specific child cells using nth-child (1-based index)
                          // const serviceId = $row.find('td:nth-child(1)').text(); // First column
                            const bibagName = $row.find('td:nth-child(2)').text(); // Second column
                           const solutionCategory = $row.find('td:nth-child(3)').text(); //Third column
                           const solutionName = $row.find('td:nth-child(4)').text(); // Fourth column
                           const problemName = $row.find('td:nth-child(5)').text(); // Fifth column
                           const price = $row.find('td:nth-child(6) input').val(); // six column, assuming it contains an <input>


                            var departmentElement = $(".departmentName"); // Target element with department data
                            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
                            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
                            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"
                           // Create a formatted object with the row data
                          // Create a formatted object with the row and department data
                             const rowData = {
                                 serviceId: serviceId,
                                 bibagName: bibagName,
                                 solutionCategory: solutionCategory,
                                 solutionName: solutionName,
                                 problemName: problemName,
                                 price: price,
                                 departmentName: departmentName,
                                 departmentUserName: departmentUserName,
                                 departmentUserId: departmentUserId
                             };

                         // Print the row's data
                         console.log("Row Data:", rowData);

                         setPriceData(rowData);



                 });

                 // Add event listener for the availability button click
             $(document).on('click', '.view-button-pending', function() {
                            var category = $(this).data('category');
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
                                                    <th scope="col" style="background-color: gray;">SN</th>
                                                    <th scope="col" style="background-color: gray; display: none;">Device Id</th>
                                                    <th scope="col" style="background-color: gray;">Category Name</th>
                                                    ${categoriesHtml}
                                                    <th scope="col" style="background-color: gray;">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody id="listDeviceInformationBody"></tbody>
                                        </table>
                                    </div>
                                `;

                                $('.modal-body').html(htmlToAdd);
                                $('#publicModalLabel').text("Device Information");

                                var rowsHtml = '';

                                print('allAddData', function(allAddData) {
                                    if (allAddData) {
                                        print('individualColumns', function(individualColumns) {
                                            allAddData.forEach(function(data, index) {
                                                if (data.categoryName === category) {
                                                    rowsHtml += `<tr>
                                                        <td>${data.visibleId}</td>
                                                        <td style="display: none;">${data.id}</td>
                                                        <td>${data.categoryName}</td>`;

                                                    universalColumns.forEach(function(column) {
                                                        rowsHtml += `<td>${data.allData[column.columnName]}</td>`;
                                                    });

                                                    rowsHtml += `<td>
                                                        <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                    if (individualColumns) {
                                                        individualColumns.forEach(function(individualColumn) {
                                                            if (individualColumn.categoryName === category) {
                                                                rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                            }
                                                        });
                                                    }

                                                    rowsHtml += `</ul></td></tr>`;
                                                }
                                            });

                                            // Populate the table only if rowsHtml has content
                                            if (rowsHtml) {
                                                $('#listDeviceInformationBody').html(rowsHtml);

                                                // Show modal only if rows were added
                                                showModal();
                                            } else {
                                                alert("No data found to display in the modal.");
                                            }
                                        });
                                    }
                                });
                            });
                        });


             },
             error: function(xhr, status, error) {
                 console.error('Error fetching data:', error);
             }
         });
     };


