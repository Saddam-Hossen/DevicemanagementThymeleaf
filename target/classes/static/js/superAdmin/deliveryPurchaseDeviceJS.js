function addTableInformationAlternativeDeviceRequest(requestId){
 // Define the Service class


         var mergedFormData = {}; // Object to hold all form data based on formId

         const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

         // Create an empty array to store service IDs
         let selectedDeviceIds = [];


         // Loop through each checked checkbox and get the data-service-id
         checkboxes.forEach(function(checkbox) {
           // Get the serviceId from the checkbox's data-service-id attribute
             const deviceId = checkbox.getAttribute('data-device-id');


           // Add the serviceId to the selectedServiceIds array
           if (deviceId) {

             selectedDeviceIds.push(deviceId);

           }

         });

          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s

              console.log("xyz "+selectedDeviceIds)

         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/addAlternativeDeviceList",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  requestId: requestId,
                  deviceIds: selectedDeviceIds ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
                  }),
             success: function (response) {
                 alert(response); // Display success response
                 location.reload(); // Refresh the page
             },
             error: function (xhr, status, error) {
                 alert("Error: " + error); // Display error response
                 console.error("Error:", error);
             }
         });
}
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
function listRequest(requestId,deviceIds) {
    // AJAX code
    $.ajax({
        url: '/inventory/addListRequest', // Replace with your endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({requestId: requestId, deviceIds: deviceIds }),
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
function setRequestStatusCheckAvailability(requestId,status){
            $.ajax({
                    url: '/inventory/checkProductAvailability',
                    type: 'POST',
                    data: {
                    requestId: requestId,
                    status:status

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
function setRequestStatus(requestId,status){
    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                var departmentName = departmentElement.data("departmentname");//it
                var departmentUserName = departmentElement.data("departmentuser-name");//saho
                var departmentUserId = departmentElement.data("departmentuser-id");//s
            if(status=="Direct Delivery"){

             $.ajax({
                     url: '/inventory/deliverRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     status:status

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
            else if(status=="Purchased"){

            $.ajax({
                     url: '/inventory/purchaseRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     departmentName:departmentName,
                     departmentUserName:departmentUserName,
                     departmentUserId:departmentUserId,
                     status:status

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
function sendDeliveryDevice(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/sendDeliveryDeviceInventoryToCustomerCare",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  requestId: requestId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
                  }),
             success: function (response) {
                 alert(response); // Display success response
                 location.reload(); // Refresh the page
             },
             error: function (xhr, status, error) {
                 alert("Error: " + error); // Display error response
                 console.error("Error:", error);
             }
         });
}
function approveFinalPurchaseDeviceDelivery(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/superAdmin/approveFinalPurchaseDeviceDelivery",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  requestId: requestId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
                  }),
             success: function (response) {
                 alert(response); // Display success response
                 location.reload(); // Refresh the page
             },
             error: function (xhr, status, error) {
                 alert("Error: " + error); // Display error response
                 console.error("Error:", error);
             }
         });
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
function columnValue(requestId, columnName, callback) {
            print('requestData', function(allAddData) {
                const deviceData = allAddData.find(item => item.id === requestId);

                if (deviceData) {
                    const columnData = deviceData.allData;

                    if (columnData && columnData.hasOwnProperty(columnName)) {
                        callback(columnData[columnName]);
                    } else {
                        console.warn(`Column "${columnName}" not found in request data.`);
                        callback(undefined);
                    }
                } else {
                    console.warn(`No data found for Device ID ${requestId}`);
                    callback(undefined);
                }
            });
        }

 window.initDeliveryPurchaseDeviceGeneral = function () {
    // Perform a single AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var allData = data['requestData'];
            var requestColumns = data['requestColumns'];
            var allAddData = data['allAddData'];
            const tableBody = document.getElementById("deliveryDeviceTableBody");

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
          allData.forEach(function (device) {
          if(device.inventory?.inventoryStatus==='Purchased' && device.inventory?.inventoryToCustomerCareDeviceSendingStatus==='Pending' ){

              // Extract required variables
              const bivagName = device.departmentName || "N/A"; // Handle undefined cases
              const categoryName = device.allData["category"] || "N/A";
              const sn = device.visibleRequestId || "N/A";
              console.log(bivagName);
                 let content = '';

                  if (device.inventory?.inventoryStatus === "Purchased") {
                      content = device.inventory?.inventoryToCustomerCareDeviceSendingStatus || ' ';
                  } else if (device.inventory?.inventoryStatus === "Alternative Proposal Accepted") {
                      content = device.inventory?.cooDeliveryAns || ' ';
                  } else {
                      content = ' ';
                  }
             const availability = getAvailability(categoryName);
              // Create a new row
              const row = document.createElement("tr");
                // Add the onclick attribute dynamically
                row.setAttribute("onclick", "printRowDataForCustomerCare(this)");
              // Base table row HTML
              let htmlData = `
                  <td>${sn}</td>  <!-- Serial Number -->
                  <td>${bivagName}</td>
                  <td>${device.allData["category"] || "N/A"}</td>
              `;

              // Conditional cell for request information
              htmlData += `
                  <td style="text-align: left;" data-request-id="${device.id}" class="viewInfo">
                      <div th:if="${device.requestMode === 'Accepted' && device.inventory?.inventoryStatus === 'Purchased'}">
              `;

              // Loop through request columns to add additional data
              requestColumns.forEach(function (column) {
                  if (column.visibleType === "yes") {
                      const columnName = column.columnName || "N/A";
                      const columnType = column.dataType || "text";
                      const value = device.allData[columnName] || "N/A";

                      if (columnType === "textarea") {
                          // Add textarea for columns with 'textarea' data type
                          htmlData += `
                              <div>
                                  <textarea class="plain-textarea">${value}</textarea>
                              </div>
                          `;
                      } else {
                          // Add spans for other data types
                          htmlData += `
                              <div>
                                  <span>${columnName}</span>: <span>${value}</span>
                              </div>
                          `;
                      }
                  }
              });

              // Close the div in the dynamic cell
              htmlData += `
                      </div>
                      <p  data-request-id="${device.id}" data-button-id="viewInfo">
                          &#128065;
                      </p>
                  </td>
              `;

              // Add other inventory data
              htmlData += `
                  <td>${device.inventory?.deliveryMode || "Not Delivered"}</td>
                  <td>${device.inventory?.inventoryStatus || "N/A"}</td>
              `;

          // Add new cells for `cooDeliveryAns` and `checkAvailability`
              htmlData += `
                <td>${device.inventory?.cooDeliveryAns || 'Pending'}</td>
                  <td>${device.inventory?.inventoryToCustomerCareDeviceSendingStatus || 'Pending'}</td>
                  <td>
                      <button class="btn btn-info btn-sm viewAvailability" data-category-id="${categoryName}" data-request-id="${device.id}" data-button-id="viewAlternative" title="View Available Same Accessories Category Devices" >
                          ${availability}
                      </button>
                  </td>
                   <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>
              `;

            // Action buttons column
                htmlData += `
                    <td>
                        <div class="d-flex justify-content-center align-items-center action-button-container">


                             ${ device.inventory?.inventoryToCustomerCareDeviceSendingStatus === "Pending" ? `
                               <button class="btn btn-primary btn-sm text-white fas  approveDeliveryDevice"  data-category-id="${device.allData['category']}" data-alternativedevice-id="${device.inventory.acceptedId}" data-request-id="${device.id}" data-button-id="deliver" title="Approve device delivery">
                                  ✔
                               </button>
                             ` : ""}


                        </div>
                    </td>
                `;

              // Assign the HTML to the row and append it to the table body
              row.innerHTML = htmlData;
              tableBody.appendChild(row);
            }
          }
          );
          $(document).on('click', '.approveDeliveryDevice', function() {
              var requestId = $(this).data('request-id');
              var deviceId = $(this).data('buyingdevice-id');
              var category = $(this).data('category-id');

              // Add confirmation
              if (confirm("Are you sure you want to approve delivery for this device?")) {
                  approveFinalPurchaseDeviceDelivery(requestId, deviceId);
              }
          });


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};