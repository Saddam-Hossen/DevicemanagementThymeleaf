    function saveCategoryBtn(Id) {
  // Capture the category name from the input field
          var categoryName = $("#categoryName").val();
          var categoryTableBody = $('#categoryTableBody');
          var totalRows = categoryTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);

        // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/addCategory", // URL to your controller method
            data: { categoryName: categoryName },
            success: function(response) {

                alert(response);

               location.reload(); // Refresh the page

            },
            error: function(error) {
                console.error("Error saving category:", error);
            }
        });

}
 window.initAddCategoryGeneral = function () {
    $('#categoryTable tbody tr').click(function(event) {
       var $row = $(this); // Store the clicked row element
        var categoryName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
        var buttonPressed = $(event.target).closest('button'); // Get the clicked button element
        console.log("Button Pressed: " + buttonPressed);

        var rowIndex = $(this).index();

        if (buttonPressed.hasClass('Edit')) { // i want to check accept,denied, view and chat button
            // Perform actions for Edit button
            console.log("Edit action here");

            // Display category name in a text field
            var newCategoryName = prompt("Edit Category Name:", categoryName);
            if (newCategoryName !== null) {
                alert("New Category Name: " + newCategoryName);

                // AJAX request to update the category
                $.ajax({
                    url: '/superAdmin/updateCategory', // URL to your update endpoint
                    type: 'POST',
                    data: {
                        oldCategoryName: categoryName,
                        newCategoryName: newCategoryName
                    },
                    success: function(result) {

                 // i want to update categoryName by new name . $row.find('td:nth-child(2)').text();

                        $row.find('td:nth-child(2)').text(newCategoryName);
                        alert(result);
                        location.reload(); // Refresh the page

                    },
                    error: function(xhr, status, error) {
                        console.error("Error updating category: " + error);
                    }
                });
            } else {
                // User cancelled the edit
                alert("Edit cancelled");
            }
        }  else if (buttonPressed.hasClass('Delete')) {
         console.log("Row Index: " + rowIndex);
            // Perform actions for Delete button
            console.log("Category Name: " + categoryName);
            $.ajax({
                url: '/superAdmin/deleteCategory', // URL to your delete endpoint
                type: 'POST',
                data: { categoryName: categoryName }, // Send category name as data
                success: function(result) {
                   // i want to remove rowIndex row remove from table body

                      alert(result);
                      location.reload(); // Refresh the page
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

function addCategoryToggle() {
        var content = document.getElementById("categoryForm");
        if (content.style.display === "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
             $("#categoryName").val(" ");
        }
    }

function closeToggle(id) {
            var element = document.getElementById(id);
            element.style.display = "none";
              $("#categoryName").val(" ");
        }





