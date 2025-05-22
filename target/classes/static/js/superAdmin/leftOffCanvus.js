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
// Function to hide offcanvas when mainBody is clicked
    $(mainBody).click(function () {
        if ($(window).width() <= 768) { // Check if it's a mobile view
            $(offcanvas).offcanvas('hide'); // Hide the offcanvas
        }
    });
    function adjustMainBodyMargin() {
        if ($(window).width() > 768) { // Laptop/Desktop
            $(".mainBody").css("margin-left", "260px"); // Adjust for larger screens
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

    // Section visibility handling
    var sectionContainer = document.querySelector('.container.mb-4');
    var numberOfChildren = sectionContainer.childElementCount;
    console.log('Number of children in <section class="container mb-4">:', numberOfChildren);

    for (var i = 0; i < numberOfChildren; i++) {
        sectionContainer.children[i].style.display = (i === 0) ? 'block' : 'none';
    }

    // Toggle nested list visibility
    window.toggleList = function (item) {
        $(".nested-list").hide(); // Hide all nested lists
        $(item).find(".nested-list").show(); // Show only the clicked list
    };

    // Toggle sections based on menu selection
    window.toggleListItem = function (item, pageName) {
        $(".container.mb-4").children().each(function () {
            $(this).toggle($(this).attr("data-page") === pageName);
        });
    };

    // Adjust styles on window resize
    $(window).resize(adjustMainBodyMargin);



});
