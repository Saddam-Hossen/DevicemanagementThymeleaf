// JavaScript to add a class to the container when offcanvas is shown

    document.addEventListener('DOMContentLoaded', function () {
            var offcanvas = document.querySelector('.sideoffcanvus');
            var mainBody = document.querySelector('.mainBody');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
            offcanvas.addEventListener('shown.bs.offcanvas', function () {

                // Set margin for the mainBody div when offcanvas is shown
                mainBody.style.marginLeft = '0px '; // Adjust the margin as needed
            });

            offcanvas.addEventListener('hidden.bs.offcanvas', function () {
                // Reset margin for the mainBody div when offcanvas is hidden
                mainBody.style.marginLeft = '0';
            });
         // Click outside offcanvas to close it
            document.addEventListener('click', function (event) {
                const isClickInside = offcanvas.contains(event.target);
                const isToggler = event.target.closest('[data-bs-toggle="offcanvas"]');

                if (!isClickInside && !isToggler && offcanvas.classList.contains('show')) {
                    bsOffcanvas.hide();
                }
            });
             var sectionContainer = document.querySelector('.container.mb-4');
             // Count the number of child elements in the section
             var numberOfChildren = sectionContainer.childElementCount;
             console.log('Number of children in <section class="container mb-4">:', numberOfChildren);
             // Loop through the child elements of the section
              for (var i = 0; i < numberOfChildren; i++) {

                  // Compare with the provided pageName
                  if (i === 0) {
                      sectionContainer.children[i].style.display = 'block'; // Show the corresponding element
                  } else {
                      sectionContainer.children[i].style.display = 'none'; // Hide other elements
                  }
              }


    });



function toggleList(item) {
        // Hide all nested ul lists
        const nestedLists = document.querySelectorAll('.nested-list');
        nestedLists.forEach(list => {
            list.style.display = 'none';
        });

        // Show the clicked list's nested ul
        const nestedList = item.querySelector('.nested-list');
        if (nestedList) {
            nestedList.style.display = 'block';
        }

    }
        function toggleListItem(item) {


               }

             function toggleListItem(item, pageName) {
                 // Get the <section class="container mb-4">
                 var sectionContainer = document.querySelector('.container.mb-4');

                 // Count the number of child elements in the section
                 var numberOfChildren = sectionContainer.childElementCount;
                 console.log('Number of children in <section class="container mb-4">:', numberOfChildren);

                 // Loop through the child elements of the section
                 for (var i = 0; i < numberOfChildren; i++) {
                     // Get the data-page attribute of the current child element
                     var dataPage = sectionContainer.children[i].getAttribute('data-page');
                     console.log(dataPage);

                     // Compare with the provided pageName
                     if (dataPage === pageName) {
                         sectionContainer.children[i].style.display = 'block'; // Show the corresponding element
                     } else {
                         sectionContainer.children[i].style.display = 'none'; // Hide other elements
                     }
                 }
             }

