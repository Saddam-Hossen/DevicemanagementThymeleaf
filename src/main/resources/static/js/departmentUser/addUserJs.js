function saveUserBtn(Id) {

   var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
   //var departmentUserName = departmentElement.data("department_name"); // Fetch data-department_name
   var departmentUserName = departmentElement.data("departmentuser-name"); // Fetch data-departmentuser-name
   // var userId = departmentElement.data("user-id"); // Fetch data-user-Id


   // var departmentUserName = $(".departmentName").text();
    var userName = $("#userName").val();
    var userId = $("#userId").val();
    var userJoinDate = $("#userJoinDate").val();
    var userDesignation = $("#designation").val();

    $.ajax({
        type: "POST",
        url: "/departmentUser/addUser",
        data: {
            departmentUserName: departmentUserName,
            userName: userName,
            userId: userId,
            userJoinDate: userJoinDate,
            userDesignation: userDesignation
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

function editUserBtn($row, userIdData) {
    var newUserName = $("#userNameEdit").val();
    var newUserId = $("#userIdEdit").val();
    var newUserJoinDate = $("#userJoinDateEdit").val();
    var newUserDesignation = $("#userDesignationEdit").val();
     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
      //var departmentUserName = departmentElement.data("department_name"); // Fetch data-department_name
      var departmentUserName = departmentElement.data("departmentuser-name"); // Fetch data-departmentuser-name
      // var userId = departmentElement.data("user-id"); // Fetch data-user-Id

    $.ajax({
        type: "POST",
        url: "/departmentUser/editUser",
        data: {
            userId: userIdData,
            branchName: departmentUserName,
            newUserName: newUserName,
            newUserId: newUserId,
            newUserJoinDate: newUserJoinDate,
            newUserDesignation: newUserDesignation
        },
        success: function(response) {
            alert(response);
            location.reload();
        },
        error: function(error) {
            console.error("Error updating user:", error);
        }
    });
}

$(document).ready(function() {
    $('#branchUserTable tbody tr').click(function(event) {
        var $row = $(this);
        var userName = $row.find('td:nth-child(2)').text();
        var userId = $row.find('td:nth-child(3)').text();
        var userJoinDate = $row.find('td:nth-child(4)').text();
        var userDesignation = $row.find('td:nth-child(5)').text();
        var buttonPressed = $(event.target).closest('button').text();
        const button = $(event.target).closest('button');
         var buttonId = button.data('buttonId');
        if (buttonId === "Edit") {
            const userIdData = button.data('userId');
            if (!userIdData) {
                console.error("Missing data-user-id attribute on delete button!");
                return;
            }

            var htmlToAdd = `
                <div class="mb-3">
                    <label for="userNameEdit" class="form-label">User Name</label>
                    <input type="text" class="form-control" id="userNameEdit" value="${userName}">
                </div>
                <div class="mb-3">
                    <label for="userIdEdit" class="form-label">User Id</label>
                    <input type="text" class="form-control" id="userIdEdit" value="${userId}">
                </div>
                <div class="mb-3">
                    <label for="userJoinDateEdit" class="form-label">User Join Date</label>
                    <input type="date" class="form-control" id="userJoinDateEdit" value="${userJoinDate}">
                </div>
                <div class="mb-3">
                    <label for="userDesignationEdit" class="form-label">User Designation</label>
                    <input type="text" class="form-control" id="userDesignationEdit" value="${userDesignation}">
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Edit User Information");
            $('#publicModal').modal('show');

            $('#saveEditBtn').click(function() {
                editUserBtn($row, userIdData);
            });
        } else if (buttonId === "Delete") {
            const userId = button.data('userId');
            if (!userId) {
                console.error("Missing data-user-id attribute on delete button!");
                return;
            }

            $.ajax({
                url: '/departmentUser/deleteUser',
                type: 'POST',
                data: { userId: userId },
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
});

function addUerToggle() {
    var content = document.getElementById("userForm");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
        $("#userName").val("");
    }
}

function closeToggle(id) {
    var element = document.getElementById(id);
    element.style.display = "none";
    $("#userName").val("");
}
