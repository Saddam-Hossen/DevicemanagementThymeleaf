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


function formatDateTimeToAmPm(datetimeStr) {
     const [datePart, timePart] = datetimeStr.split(" ");
     const date = new Date(`${datePart}T${timePart}`);
     let hours = date.getHours();
     const minutes = date.getMinutes();
     const seconds = date.getSeconds();
     const ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12 || 12; // Convert hour '0' to '12'
     const formattedTime = [
       hours.toString().padStart(2, '0'),
       minutes.toString().padStart(2, '0')

     ].join(':');
     return `${datePart} ${formattedTime} ${ampm}`;
   }
 function sortAndFormatTable(table) {
     const tbody = table.querySelector("tbody");
     if (!tbody) return;

     const rows = Array.from(tbody.querySelectorAll("tr"));
     if (rows.length === 0) return;

     const colCount = table.querySelector("thead tr").cells.length;
     const lastColIndex = colCount - 2;

     rows.sort((a, b) => {
       const aText = a.cells[lastColIndex]?.innerText.trim() || "";
       const bText = b.cells[lastColIndex]?.innerText.trim() || "";

       const dateA = new Date(aText);
       const dateB = new Date(bText);

       return dateB - dateA; // descending
     });

     tbody.innerHTML = "";
     rows.forEach(row => {
       const raw = row.cells[lastColIndex]?.innerText;
       if(raw) {
         row.cells[lastColIndex].innerText = formatToAmPm(raw);
       }
       tbody.appendChild(row);
     });
   }
    // update direct table without js using
  function formatToAmPm(dateStr) {
    const date = new Date(dateStr.replace(" ", "T"));
    if (isNaN(date)) return dateStr;

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    let hh = date.getHours();
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    const hhStr = String(hh).padStart(2, '0');

    return `${yyyy}-${MM}-${dd} ${hhStr}:${mm} ${ampm}`;
  }

  function sortAndFormatAllTables() {
    const tables = document.querySelectorAll("table");
    tables.forEach(sortAndFormatTable);
  }

  function globallyFormatAndSortTables() {
    const tables = document.querySelectorAll("table");
    tables.forEach(table => {
      const tbody = table.querySelector("tbody");
      if (!tbody) return;

      const rows = Array.from(tbody.querySelectorAll("tr"));
      if (rows.length === 0) return;

      const timeColIndex = table.rows[0].cells.length - 2;

      const validRows = rows.filter(row => row.cells.length > timeColIndex);

      validRows.sort((a, b) => {
        const aCell = a.cells[timeColIndex];
        const bCell = b.cells[timeColIndex];
        if (!aCell || !bCell) return 0;

        const aText = aCell.textContent.trim().replace(" ", " "); // handles weird space
        const bText = bCell.textContent.trim().replace(" ", " ");

        const aDate = new Date(aText.replace(" ", "T"));
        const bDate = new Date(bText.replace(" ", "T"));

        return bDate - aDate; // Latest first
      });

      // Clear tbody and re-insert sorted + formatted rows
      tbody.innerHTML = "";
      validRows.forEach(row => {
        const cell = row.cells[timeColIndex];
        const raw = cell.textContent.trim().replace(" ", " ");
        cell.textContent = formatDateTimeToAmPm(raw);
        tbody.appendChild(row);
      });
    });
  }

  window.addEventListener("DOMContentLoaded", globallyFormatAndSortTables);
