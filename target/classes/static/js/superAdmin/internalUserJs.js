
function saveInternalUserBtn(branchName,userName,userId,userPassword) {

          var internalUserTableBody = $('#internalUserTableBody');
          var totalRows = internalUserTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);


          // Send AJAX request to add category
          $.ajax({
              type: "POST",
              url: "/superAdmin/addInternalUser", // URL to your controller method
               data: {
                 branchName:branchName,
                 userName:userName,
                 userId:userId,
                 userPassword:userPassword
              },
              success: function(response) {
                   alert(response);
/*

                       var rowHtml = '<tr>' +
                           '<th scope="row">' + totalRows + '</th>' +
                           '<td>' + branchName + '</td>' +
                           '<td>' + userName + '</td>' +
                            '<td>' + userId + '</td>' +
                             '<td>' + userPassword + '</td>' +
                           '<td>' +
                           '<button class="btn btn-primary btn-sm">Edit</button> ' +
                           '<button class="btn btn-danger btn-sm">Delete</button>' +
                           '</td>' +
                           '</tr>';

                       internalUserTableBody.append(rowHtml);

                       hideModal();*/

                        location.reload();

              },
              error: function(error) {
                  console.error("Error saving category:", error);
              }
          });

}
function editInternalUserBtn($row) {
       var branchName = $row.find('td:nth-child(2)').text();
       var userName = $row.find('td:nth-child(3)').text();
       var userId = $row.find('td:nth-child(4)').text();
       var userPassword = $row.find('td:nth-child(5)').text();

          var internalUserTableBody = $('#internalUserTableBody');
          var totalRows = internalUserTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);


            var newBranchName=$('#internalUserBranchNameEdit').val();
            var newUserName=$('#internalUserNameEdit').val();
            var newUserId=$('#internalUserIdEdit').val();
            var newUserPassword=$('#internalUserPasswordEdit').val();

          // Send AJAX request to add category
          $.ajax({
              type: "POST",
              url: "/superAdmin/editInternalUser", // URL to your controller method
              data: {
                 oldBranchName:branchName,
                 oldUserName:userName,
                 oldUserId:userId,
                 oldUserPassword:userPassword,
                 newBranchName:newBranchName,
                 newUserName:newUserName,
                 newUserId:newUserId,
                 newUserPassword:newUserPassword
              },
              success: function(response) {
                   alert(response);
               location.reload();
              },
              error: function(error) {
                  console.error("Error saving category:", error);
              }
          });

}
 window.initInternalUserGeneral = function () {
    $('#internalUserTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var branchName = $row.find('td:nth-child(2)').text();
         var userName = $row.find('td:nth-child(3)').text();
          var userId = $row.find('td:nth-child(4)').text();
           var userPassword = $row.find('td:nth-child(5)').text();

       var buttonPressed = $(event.target).closest('button');
        console.log("Button Pressed: " + buttonPressed);

        var rowIndex = $(this).index();

        if (buttonPressed.hasClass('Edit')) {
            var htmlToAdd = `
               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <div class="dropdown">
                       <label for="internalUserBranchNameEdit" class="form-label">Branch Name</label>
                       <input type="text" class="form-control dropdown-toggle custom-width" id="internalUserBranchNameEdit" data-bs-toggle="dropdown" placeholder="Branch Name" aria-expanded="false" value="${branchName}" readonly>

                   </div>
               </div>

                <div class="mb-3" style="margin-left: 0%;text-align:left;">
                     <label for="internalUserNameEdit" class="form-label">User Name</label>
                     <input type="text" class="form-control" id="internalUserNameEdit" placeholder="Enter user name" value="${userName}" >
                 </div>
                 <div class="mb-3" style="margin-left: 0%;text-align:left;">
                     <label for="internalUserIdEdit" class="form-label">User Id </label>
                     <input type="text" class="form-control" id="internalUserIdEdit" placeholder="Enter Id name" value="${userId}" >
                 </div>
                 <div class="mb-3" style="margin-left: 0%;text-align:left;">
                     <label for="internalUserPasswordEdit" class="form-label">User Password</label>
                     <input type="text" class="form-control" id="internalUserPasswordEdit" placeholder="Enter Password" value="${userPassword}" >
                 </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="EditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            // edit individual column header
             $('#publicModalLabel').text("Edit Individual Column")

            // Show the modal
            $('#publicModal').modal('show');
         // Bind the click event to the Save button inside the modal
                $('#EditBtn').click(function() {
                    editInternalUserBtn($row);
                });
            // method to list item add

             addListItem();


        } else if (buttonPressed.hasClass('Delete')) {
            $.ajax({
                url: '/superAdmin/deleteInternalUser', // URL to your delete endpoint
                type: 'POST',
                data: {
                    branchName:branchName,
                    userName:userName,
                    userId:userId,
                    userPassword:userPassword
                }, // Send category name as data
                success: function(result) {
                    // Remove the row from the table body
                  //  $row.remove();
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
function addInternalUser(){
               var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <div class="dropdown">
                        <label for="internalUserBranchName" class="form-label">Branch Name</label>
                        <input type="text" class="form-control dropdown-toggle custom-width" id="internalUserBranchName" data-bs-toggle="dropdown" placeholder="Branch Name" aria-expanded="false">
                        <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="internalUserBranchIdUlList" id="internalUserBranchIdUlList">
                           <div id="categoriesPlaceholder"></div>
                        </ul>
                    </div>
                </div>

                 <div class="mb-3" style="margin-left: 0%;text-align:left;">
                      <label for="internalUserName" class="form-label">User Name</label>
                      <input type="text" class="form-control" id="internalUserName" placeholder="Enter user name" >
                  </div>
                  <div class="mb-3" style="margin-left: 0%;text-align:left;">
                      <label for="internalUserId" class="form-label">User Id </label>
                      <input type="text" class="form-control" id="internalUserId" placeholder="Enter Id name" >
                  </div>
                  <div class="mb-3" style="margin-left: 0%;text-align:left;">
                      <label for="internalUserPassword" class="form-label">User Password</label>
                      <input type="password" class="form-control" id="internalUserPassword" placeholder="Enter Password" >
                  </div>

                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Add Internal User")
             addListItem();
            // selection and input handler.
            selectionAndInputHandler();
             $('#saveEditBtn').click(function() {
             var branchName=$('#internalUserBranchName').val();
             var userName=$('#internalUserName').val();
             var userId=$('#internalUserId').val();
             var userPassword=$('#internalUserPassword').val();

                  saveInternalUserBtn(branchName,userName,userId,userPassword);
                });

showModal();
}
function selectionAndInputHandler(){
// Event delegation for dynamically added items
        $(document).on('click', '.internalUserEachItem', function(event) {
                var text = $(this).text();
                $('#internalUserBranchName').val(text);
        });

        // Filter items based on input
            $(document).on('keyup', '#internalUserBranchName', function() {
                var filter = $(this).val().toUpperCase();
                $('#internalUserBranchIdUlList li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}
function addListItem(){
       print('allUser', function(allUser) {
               if (allUser) {
                   // Generate HTML for categories
                   var allUserHtml = '';
                   allUser.forEach(function(user) {
                   console.log(user.userName);
                       allUserHtml += `<li><a class="dropdown-item internalUserEachItem" href="#" th:text="${user.userName}">${user.userName}</a></li>`;
                   });

                   // Insert evaluated Thymeleaf expression
                   $('#categoriesPlaceholder').html(allUserHtml);
               }
           });
}
         // top search bar
$(document).ready(function() {
          // Handle item selection
          $('.internalUserItemTop').on('click', function() {
              var text = $(this).text().trim().toLowerCase();
              $('#internalUser').val(text);

              console.log('Selected text:', text);

              // Filter table rows based on the selected text in the first column
              $('#internalUserTable tbody tr').each(function() {
                  var cellText = $(this).find('td').eq(0).text().trim().toLowerCase(); // Target the first column (index 0)
                  var match = cellText.indexOf(text) > -1;
                  $(this).toggle(match);
              });
          });

          // Filter items based on input
          $('#internalUser').on('keyup', function() {
              var filter = $(this).val().trim().toLowerCase();
              console.log('Filter input:', filter);

              // Show all rows if the input is empty
              if (filter === '') {
                  console.log('Input is empty, showing all rows.');
                  $('#internalUserTable tbody tr').show();
              } else {
                  console.log('Filtering rows...');
                  $('#internalUserTable tbody tr').each(function() {
                      var cellText = $(this).find('td').eq(0).text().trim().toLowerCase(); // Target the first column (index 0)
                      var match = cellText.indexOf(filter) > -1;
                      console.log('Row text:', cellText, 'Match:', match);
                      $(this).toggle(match);
                  });
              }

              // Filter list items based on input
              $('#internalUserUlList li').each(function() {
                  var text = $(this).text().trim().toLowerCase();
                  var match = text.indexOf(filter) > -1;
                  $(this).toggle(match);
              });
          });
      });