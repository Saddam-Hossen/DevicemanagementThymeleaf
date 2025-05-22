// JavaScript to add a class to the container when offcanvas is shown
    document.addEventListener('DOMContentLoaded', function () {

               // Initially display only the first content inside the section
               var sectionContainer = document.querySelector('.container.mb-4');
               var children = sectionContainer.children;
               var itemList = document.getElementById('itemListLeftOffCanvas');
               var listItems = itemList.getElementsByTagName('li');
               var indexNumber = 0;

               fetch('/superAdmin/retrieveFile', {
                   method: 'GET',
               })
               .then(response => {
                   if (response.ok) {
                       return response.text();
                   } else {
                       throw new Error('Error retrieving file');
                   }
               })
               .then(data => {
                   indexNumber = parseInt(data, 10); // Ensure indexNumber is a number
                   console.log(indexNumber); // Log the index number after fetching it

                   // Update the display of the sections after fetching the index number
                   for (var i = 0; i < children.length; i++) {
                       if (i === indexNumber) {
                           children[i].style.display = 'block'; // Show the element at indexNumber
                       } else {
                           children[i].style.display = 'none'; // Hide other elements
                       }
                   }

                   // Set the background color of the corresponding list item
                   if (indexNumber >= 0 && indexNumber < listItems.length) {
                     //  listItems[indexNumber].style.backgroundColor = '#9FE2BF'; // Set your desired color here
                   }
               })
               .catch(error => console.error('Error:', error));


        var offcanvas = document.querySelector('.sideoffcanvus');
        var mainBody = document.querySelector('.mainBody');

        offcanvas.addEventListener('shown.bs.offcanvas', function () {

            // Set margin for the mainBody div when offcanvas is shown
            mainBody.style.marginLeft = '260px'; // Adjust the margin as needed
        });

        offcanvas.addEventListener('hidden.bs.offcanvas', function () {
            // Reset margin for the mainBody div when offcanvas is hidden
            mainBody.style.marginLeft = '0';
        });
    });


    document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Remove the 'active' class from all list items
            listItems.forEach(function (listItem) {
                listItem.classList.remove('active');
            });

            // Add the 'active' class to the clicked list item
            this.classList.add('active');
        });
    });
});
function printValue(value, element) {

    var index = Array.prototype.indexOf.call(element.parentNode.children, element);
     saveTextToFile(index);
      var itemList = document.getElementById('itemListLeftOffCanvas');
      var listItems = itemList.getElementsByTagName('li');
      // i want without index item other list background will white


    // Get the <section class="container mb-4">
    var sectionContainer = document.querySelector('.container.mb-4');

    // Count the number of child elements in the section
    var numberOfChildren = sectionContainer.childElementCount;
    console.log('Number of children in <section class="container mb-4">:', numberOfChildren);

            // Loop through the child elements of the section
            for (var i = 0; i < numberOfChildren; i++) {
                // If the index matches the clicked item's index, show it; otherwise, hide it
                if (i === index) {
                    sectionContainer.children[i].style.display = 'block'; // Show the corresponding element
                } else {
                    sectionContainer.children[i].style.display = 'none'; // Hide other elements
                }
            }
        }

         function saveTextToFile(index) {
           fetch('/superAdmin/saveFile', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({ data: index })
               })
               .then(response => {

               })
               .catch(error => console.error('Error:', error))
        }

