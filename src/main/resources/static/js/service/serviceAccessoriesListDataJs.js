function addTableInformationOfService() {
    var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the #serviceAccessoriesDataTable div
    $("#serviceAccessoriesDataTable form").each(function() {
        var proposalId = $(this).data('proposal-id'); // Get the proposalId from data-proposal-id attribute
        var formId = $(this).attr('id') + "_" + proposalId; // Append proposalId to the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    console.log("Final data being sent:", JSON.stringify(mergedFormData));

    // Assuming you are sending this data using AJAX
    $.ajax({
        url: "/inventory/addProblemSolutionOfServicePrice",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(mergedFormData),
        success: function(response) {
            // Display the server response in an alert
            alert( response);
             location.reload(); // Refresh the page
        },
        error: function(xhr, status, error) {
            // Display the error in an alert for debugging purposes
            alert("Error: " + error);
            console.error("Error:", error);
        }
    });
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

window.initServiceAccessoriesListDataTable = function () {    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging

            var allData = data['serviceRequests'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("serviceAccessoriesListDataTableBody");

            // Function to check availability count
            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(function(device) {
                    if (device.categoryName === categoryName && device.userName==='inventory') {
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
               // Loop through each problem in the allProblem array for the device
               device.allProblem.forEach(function(problem) {
                   console.log("Problem Name:", problem.name);
                   console.log("Proposal Solutions:");


                   if(problem.proposalSolution)
                   {
                    // Loop through each proposalSolution in the problem
                   problem.proposalSolution.forEach(function(solution) {
                          if ( solution.cooManInfoOfPriceAcceptanceCommentStatus === 'Accepted') {
                              const row = document.createElement("tr");

                              console.log("Name:", solution.name);
                              console.log("Value:", solution.value);
                              console.log("Category:", solution.category);
                              console.log("Price:", solution.price);
                              console.log("Action:", solution.action);
                              console.log("Comment:", solution.comment);
                               console.log("inventoryToServiceCenterDeviceStatus:", solution.inventoryToServiceCenterDeviceStatus);

                              // Determine availability
                              const availability = getAvailability(solution.category);

                              // Create and append cells to the row
                              row.innerHTML = `
                                  <td>${sn}</td>  <!-- Dynamic Counter -->
                                  <td>${bivagName}</td>
                                  <td>${categoryName}</td>
                                  <td>${problem.name}</td>
                                  <td>${solution.category} (${solution.name}-${solution.value})</td>

                                  <td>
                                      <button class="btn btn-info btn-sm view-button-availability" data-category="${solution.category}" data-device-id="${device.deviceId}" data-button-id="viewAlternative" title="View Available Same Accessories Category Devices">
                                          ${availability}
                                      </button>
                                  </td>
                                  <td>
                                      ${solution.deliveryDate !== null ? solution.deliveryDate : ""}
                                   </td>

                                  <td>
                                          ${solution.inventoryToServiceCenterDeviceStatus != null ? solution.inventoryToServiceCenterDeviceStatus : ' '}
                                   </td>  <!-- Corrected text binding for this column -->
                                 <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>
                                  <td>

                                     <div class="d-flex justify-content-center align-items-center action-button-container">
                                                ${availability !== "Unavailable" && solution.inventoryToServiceCenterDeviceStatus !=='Accepted' && solution.inventoryToServiceCenterDeviceStatus ==='Pending' ? `
                                                    <button class="btn btn-sm text-white delivery-button" data-category="${solution.category}" data-solution-name="${solution.name}" data-problem-name="${problem.name}" data-service-id="${device.id}" data-device-id="${solution.inventoryToServiceCenterDeviceId}" data-button-id="accepted" style="background-color:green;" title="Receive Device">✔</button>
                                                ` : ""}

                                                  ${availability !== "Unavailable" ? `
                                                     <button class="btn btn-info btn-sm view-button-selected-device" data-category="${solution.category}" data-service-id="${device.id}" data-button-id="view" title="View Accessories Device" data-device-id="${solution.inventoryToServiceCenterDeviceId}">
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
                   }


               });
           });
         sortAndFormatAllTables();
 // Add event listener for the availability button click
            $(document).on('click', '.delivery-button', function() {
                                var category = $(this).data('category');
                                var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
                                var problemName = $(this).data('problemName');
                                var solutionName = $(this).data('solutionName');
                                var deviceId=$(this).data('deviceId');
                                alert(deviceId);
                                 var htmlToAdd = `
                                  <div class="mb-3" style="margin-right: 0%; text-align: right;">
                                      <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                  </div>
                              `;
                              $('.modal-body').html(htmlToAdd);
                              $('#publicModalLabel').text("Have you received the device ?");
                              $('#AcceptBtn').click(function() {

                               var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                               var departmentName = departmentElement.data("departmentname");//it
                               var departmentUserName = departmentElement.data("departmentuser-name");//saho
                               var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

                                $.ajax({
                                        type: "POST",
                                        url: "/service/updateAccessoriesReceivedStatus",  // Replace with your controller endpoint
                                        data: {
                                            serviceId: serviceId,
                                            problemName: problemName,
                                            solutionName: solutionName,
                                            status: "Accepted",
                                            departmentName:departmentName,
                                            departmentUserName:departmentUserName,
                                            departmentUserId:departmentUserId,
                                            deviceId:deviceId
                                        },
                                        success: function(response) {
                                            // Handle success (e.g., show a message or close the modal)
                                            alert(response);
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
            $(document).on('click', '.view-button-availability', function() {
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
                                    if (data.categoryName === category && data.userName==='inventory') {
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

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};
