$(document).ready(function () {
    function applyMobileStyles() {
        if ($(window).width() <= 768) { // Mobile screen
            $("body").css("background-color", "#f5f5f5");
            $(".mainBody").css("margin-top", "30em");
            $(".container").css("font-size", "14px"); // Adjust font size
            $(".sideoffcanvus").removeClass("show"); // Hide offcanvas initially on mobile
            $(".sideoffcanvus").css("margin-top", "8em");

        } else { // Desktop screen
            $("body").css("background-color", "#fff5ec");
            $(".mainBody").css("padding-top", "5em");
            $(".container").css("font-size", "16px");
        }
    }

    applyMobileStyles(); // Apply styles on page load
    $(window).resize(applyMobileStyles); // Apply styles when resizing the window

    // Offcanvas event handling
    var offcanvas = document.querySelector('.sideoffcanvus');
    var mainBody = document.querySelector('.mainBody');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
// Function to hide offcanvas when mainBody is clicked
    $(mainBody).click(function () {
        if ($(window).width() <= 768) { // Check if it's a mobile view
            $(offcanvas).offcanvas('hide'); // Hide the offcanvas
        }
    });
    function adjustMainBodyMargin() {
        if ($(window).width() > 768) { // Laptop/Desktop
            $(".mainBody").css("margin-left", "0px"); // Adjust for larger screens
        } else { // Android/Mobile
            $(".mainBody").css("margin-left", "0"); // Keep default for mobile
        }
    }

    $(offcanvas).on('shown.bs.offcanvas', function () {
        adjustMainBodyMargin();
    });

    $(offcanvas).on('hidden.bs.offcanvas', function () {
        $(".mainBody").css("margin-left", "0"); // Reset for all screen sizes
    });
 // Click outside offcanvas to close it
    document.addEventListener('click', function (event) {
        const isClickInside = offcanvas.contains(event.target);
        const isToggler = event.target.closest('[data-bs-toggle="offcanvas"]');

        if (!isClickInside && !isToggler && offcanvas.classList.contains('show')) {
            bsOffcanvas.hide();
        }
    });
    // Section visibility handling
    var sectionContainer = document.querySelector('.container.mb-4');
    var numberOfChildren = sectionContainer.childElementCount;
    console.log('Number of children in <section class="container mb-4">:', numberOfChildren);

    for (var i = 0; i < numberOfChildren; i++) {
        sectionContainer.children[i].style.display = (i === 0) ? 'block' : 'none';
    }

    // Toggle nested list visibility
   window.toggleList = function (item) {
           const $nested = $(item).find(".nested-list");
           const $icon = $(item).find("i.fas");

           // If this list is already open, close it
           if ($nested.is(":visible")) {
               $nested.slideUp(); // Hide submenu with animation
               $icon.removeClass("fa-chevron-up").addClass("fa-chevron-down"); // Icon down
           } else {
               // Close all others
               $(".nested-list").slideUp();
               $(".fas.fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");

               // Open current
               $nested.slideDown();
               $icon.removeClass("fa-chevron-down").addClass("fa-chevron-up"); // Icon up
           }
       };
     $(function() {
      // Hide all pages by default
      $(".container.mb-4 > div").hide();

      // Get last active page from localStorage
      var lastPage = localStorage.getItem("lastActivePage");

      if (lastPage) {
        // Show last active page only
        $(".container.mb-4 > div").each(function () {
          $(this).toggle($(this).attr("data-page") === lastPage);
        });
      } else {
        // Optionally show the first page by default
        $(".container.mb-4 > div").first().show();
      }
    });
    // Updated toggleListItem saves to localStorage and toggles visibility
        window.toggleListItem = function (item, pageName) {
          localStorage.setItem("lastActivePage", pageName);
          $(".container.mb-4 > div").each(function () {
            $(this).toggle($(this).attr("data-page") === pageName);
          });
        };

    // Adjust styles on window resize
    $(window).resize(adjustMainBodyMargin);



});
