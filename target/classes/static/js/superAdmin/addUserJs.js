function saveUserBtn(Id) {
  // Capture the category name from the input field
          var userName = $("#userName").val();
          var userId = $("#userId").val();
          var userPassword = $("#userPassword").val();
          var userTableBody = $('#userTableBody');
          var totalRows = userTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);

        // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/addUser", // URL to your controller method
            data: {
            userName: userName ,
            userId:userId,
            userPassword:userPassword
            },
            success: function(response) {


                alert(response);
                /*var content = document.getElementById(Id);
               if (content.style.display === "none") {
                   content.style.display = "block";
               } else {
                   content.style.display = "none";
                   $("#categoryName").val(" ");
               }

              //updateTable();
              // add categoryName to Bottom.

                var rowHtml = '<tr>' +
                           '<th scope="row">' + totalRows + '</th>' +
                           '<td>' + userName + '</td>' +
                            '<td>' + userId + '</td>' +
                             '<td>' + userPassword + '</td>' +
                           '<td>' +
                           '<button class="btn btn-primary btn-sm">Edit</button> ' +
                           '<button class="btn btn-danger btn-sm">Delete</button>' +
                           '</td>' +
                           '</tr>';

                       userTableBody.append(rowHtml);*/

                        location.reload();


            },
            error: function(error) {
                console.error("Error saving category:", error);
            }
        });

}

function editUserBtn($row) {
         var userName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
         var userId = $row.find('td:nth-child(3)').text();
         var userPassword = $row.find('td:nth-child(4)').text();


           var newUserName = $("#userNameEdit").val();
           var newUserId = $("#userIdEdit").val();
           var newUserPassword = $("#userPasswordEdit").val();


          // Send AJAX request to add category
          $.ajax({
              type: "POST",
              url: "/superAdmin/editUser", // URL to your controller method
              data: {
                  oldUserName:userName,
                  oldUserId:userId,
                  oldUserPassword:userPassword,
                  newUserName:newUserName,
                  newUserId:newUserId,
                  newUserPassword:newUserPassword
              },
              success: function(response) {
                   alert(response);
                  /* hideModal();
                   // update table
                 $row.find('td:nth-child(2)').text(newUserName );
                 $row.find('td:nth-child(3)').text(newUserId);
                  $row.find('td:nth-child(4)').text(newUserPassword);*/

                   location.reload();

              },
              error: function(error) {
                  console.error("Error saving category:", error);
              }
          });

}

 window.initAddUserGeneral = function () {

  $('#userTable tbody tr').click(function(event) {
       var $row = $(this); // Store the clicked row element
        var userName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
        var userId = $row.find('td:nth-child(3)').text();
        var userPassword = $row.find('td:nth-child(4)').text();
       var buttonPressed = $(event.target).closest('button');

        console.log("Button Pressed: " + buttonPressed);

        var rowIndex = $(this).index();

        if (buttonPressed.hasClass('Edit')) {
            var htmlToAdd = `
                   <div class="mb-3" style="margin-left: 0%;text-align:left;">
                              <label for="userNameEdit" class="form-label">User Name</label>
                              <input type="text" class="form-control" id="userNameEdit" placeholder="Enter user name" value="${userName}">
                          </div>
                          <div class="mb-3" style="margin-left: 0%;text-align:left;">
                              <label for="userIdEdit" class="form-label">User Id </label>
                              <input type="text" class="form-control" id="userIdEdit" placeholder="Enter Id name" value="${userId}">
                          </div>
                          <div class="mb-3" style="margin-left: 0%;text-align:left;">
                              <label for="userPasswordEdit" class="form-label">User Password</label>
                              <input type="text" class="form-control" id="userPasswordEdit" placeholder="Enter Password" value="${userPassword}">
                          </div>
                          <div class="mb-3" style="margin-left: 0%;text-align:left;">
                              <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                       `;

                       // Add the HTML code to the modal body using jQuery
                       $('.modal-body').html(htmlToAdd);
                       // edit individual column header
                        $('#publicModalLabel').text("Edit User Information")
                         $('#userNameEdit').val(userName);
                        $('#userIdEdit').val(userId);
                         $('#userPasswordEdit').val(userPassword);
                       // Show the modal
                       $('#publicModal').modal('show');
                    // Bind the click event to the Save button inside the modal
                           $('#saveEditBtn').click(function() {
                              editUserBtn($row);
                           });




        }  else if (buttonPressed.hasClass('Delete')) {
         console.log("Row Index: " + rowIndex);
            // Perform actions for Delete button

            $.ajax({
                url: '/superAdmin/deleteUser', // URL to your delete endpoint
                type: 'POST',
                data: {
                userName: userName,
                userId:userId,
                userPassword:userPassword
                 }, // Send category name as data
                success: function(result) {
                   // i want to remove rowIndex row remove from table body
                     $row.remove();
                      alert(result);
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting user: " + error);
                }
            });
        } else {
            // Perform actions for other buttons, if needed
            console.log("Other action here");
        }
    });
};

function addUerToggle() {
        var content = document.getElementById("userForm");
        if (content.style.display === "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
             $("#userName").val(" ");
        }
    }

     function closeToggle(id) {
            var element = document.getElementById(id);
            element.style.display = "none";
              $("#userName").val(" ");
        }





