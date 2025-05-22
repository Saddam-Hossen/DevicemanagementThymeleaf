
function setPriceData1(rowData) {
    console.log("Sending Row Data:", rowData);

    // Send the data to the controller using AJAX
    $.ajax({
        url: '/purchase/setPrice', // Replace with your controller's endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(rowData), // Send the data as JSON
        success: function (response) {
            console.log("Server Response:", response);
            // Display a success message to the user
            alert("Data saved successfully!");
            location.reload();
            // Optionally refresh the table or update the UI
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", error);
            console.error("Response Text:", xhr.responseText); // Log error details
            // Display an error message to the user
            alert("An error occurred while saving the data!");
        }
    });
}

$(document).ready(function() {
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging

            var allData = data['serviceRequests'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("servicePriceTableBody1");

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

               // Loop through each problem in the allProblem array for the device
               device.allProblem.forEach(function(problem) {
                   console.log("Problem Name:", problem.name);
                   console.log("Proposal Solutions:");

                   // Loop through each proposalSolution in the problem
                   problem.proposalSolution.forEach(function(solution) {
                      // if (solution.action === "accept" && device.cooAcceptOfServiceRequest === 'Accepted') {
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

                            console.log("inventoryToServiceCenterDeviceStatus:", solution.inventoryToServiceCenterDeviceStatus);

                           // Determine availability
                           const availability = getAvailability(solution.category);

                           // Create and append cells to the row
                           row.innerHTML = `
                               <td >${sn}</td>  <!-- Dynamic Counter -->
                               <td>${bivagName}</td>
                               <td>${categoryName}</td>
                               <td>${problem.name}</td>
                               <td>${solution.category}(${solution.name}-${solution.value})</td>
                                <td>
                                    <input type="text" name="inputField" id="inputField" placeholder="Enter Price" class="form-control" value="${solution.price}">
                                </td>

                               <td>
                               ${status}
                               </td>

                               <td>

                                  <div class="d-flex justify-content-center align-items-center action-button-container">
                                               ${solution.cooManInfoOfPriceAcceptanceCommentStatus !== "Accepted" ? `
                                                <button class="btn btn-sm text-white setPriceBtn" data-category="${solution.category}" data-solution-name="${solution.name}" data-problem-name="${problem.name}" data-service-id="${device.id}" data-button-id="accepted" style="background-color:green;" title="Set Price">✔</button>
                                            ` : ""}
                                            <button class="btn btn-info btn-sm view-button-selected-device"  data-category="${solution.category}" data-service-id="${device.id}" data-button-id="view" data-device-id="${solution.inventoryToServiceCenterDeviceId}" >
                                            &#128065;
                                        </button>
                                          </div>
                               </td>
                           `;

                           // Increment the counter for the next row
                           counter++;

                           // Append the row to the table body
                           tableBody.appendChild(row);
                      // }


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

                    setPriceData1(rowData);



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
});