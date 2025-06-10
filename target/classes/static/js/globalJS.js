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

  function showModal(){
  $('#publicModal').modal('show');
  }
  function hideModal(){
       $('#publicModal').modal('hide');
       $('#publicModal').on('hidden.bs.modal', function () {
             $('.modal-backdrop').remove(); // Ensure backdrop is removed
        });
  }
function print(dataType, callback) {
      // Ensure callback is a function
      if (typeof callback !== 'function') {
          console.error('Callback is not a function');
          return;
      }

      $.ajax({
          url: '/superAdmin/allData1',
          type: 'POST',
          dataType: 'json',
           data: { dataType: dataType }, // send dataType in POST body
          success: function(data) {
             // console.log(data);
              // Execute the callback with the requested dataType
              callback(data[dataType]);
          },
          error: function(xhr, status, error) {
              console.error('Error fetching data:', error);
          }
      });
  }
function print1(dataType) {
      return new Promise(function(resolve, reject) {
          $.ajax({
              url: '/superAdmin/allData1',
              type: 'POST',
              dataType: 'json',
              data: { dataType: dataType }, // send dataType in POST body
              success: function(data) {
                //  console.log(data);
                  // Resolve the Promise with the requested dataType
                  resolve(data[dataType]);
              },
              error: function(xhr, status, error) {
                  console.error('Error fetching data:', error);
                  reject(error); // Reject the Promise if there's an error
              }
          });
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
function columnValue1(deviceId, columnName, callback) {
            print('allAddData', function(allAddData) {
                const deviceData = allAddData.find(item => item.id === deviceId);

                if (deviceData) {
                    const columnData = deviceData.allData;

                    if (columnData && columnData.hasOwnProperty(columnName)) {
                        callback(columnData[columnName]);
                    } else {
                        console.warn(`Column "${columnName}" not found in device data.`);
                        callback(undefined);
                    }
                } else {
                    console.warn(`No data found for Device ID ${deviceId}`);
                    callback(undefined);
                }
            });
        }
function formatDate(inputDate) {
                                     // Split the input date into components
                                     var parts = inputDate.split('-'); // parts[0] = '2024', parts[1] = '08', parts[2] = '20'

                                     // Reformat the date to 'DD/MM/YY'
                                     var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0].slice(2); // '20/08/24'

                                     return formattedDate;
                                 }
function formatDateTime(inputDateTime) {
                            // Check if inputDateTime is undefined or null
                            if (!inputDateTime) {
                                console.error("inputDateTime is undefined or null");
                                return ""; // or return a default value
                            }

                            // Split the input datetime into date and time components
                            var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                            // Check if the split was successful
                            if (dateTimeParts.length !== 2) {
                                console.error("inputDateTime format is incorrect, expected 'YYYY-MM-DD HH:MM:SS'");
                                return ""; // or handle the error as needed
                            }

                            // Extract the date part
                            var datePart = dateTimeParts[0]; // '2024-08-20'

                            // Split the date into components
                            var dateComponents = datePart.split('-'); // ['2024', '08', '20']

                            // Check if the date split was successful
                            if (dateComponents.length !== 3) {
                                console.error("Date part of inputDateTime is incorrect, expected 'YYYY-MM-DD'");
                                return ""; // or handle the error as needed
                            }

                            // Reformat the date to 'DD/MM/YY'
                            var formattedDate = dateComponents[2] + '/' + dateComponents[1] + '/' + dateComponents[0].slice(2); // '20/08/24'

                            return formattedDate;
                        }

function formatTime(inputDateTime) {
                            // Split the input datetime to separate date and time
                            var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                            // Extract the time part
                            var timePart = dateTimeParts[1]; // '15:02:26'

                            // Split the time into components
                            var timeComponents = timePart.split(':'); // ['15', '02', '26']

                            // Convert hour from 24-hour format to 12-hour format
                            var hour = parseInt(timeComponents[0], 10); // Convert '15' to 15
                            var minutes = timeComponents[1]; // '02'
                            var period = 'AM';

                            // Determine AM or PM period and adjust hour accordingly
                            if (hour >= 12) {
                                period = 'PM';
                                if (hour > 12) {
                                    hour -= 12; // Convert 13-23 hours to 1-11 PM
                                }
                            } else if (hour === 0) {
                                hour = 12; // Midnight case, show as 12 AM
                            }

                            // Format time string as 'H:MM AM/PM'
                            var formattedTime = hour + ':' + minutes + ' ' + period;

                            return formattedTime;
                        }

window.initGlobalDivToggle = function () {
        $('.hideButton').click(function() {
        // Hide the second column
        $('.secondDiv').hide();

        // Show the showButton and set display to inline-block
        $('.showButton').css('display', 'inline-block');

        // Change the class of the first column to make it full-width
        $('.firstDiv').removeClass('col-sm-9').addClass('col-sm-12');
        });

        $('.showButton').click(function() {
        // Show the second column
        $('.secondDiv').show();

        // Hide the showButton again
        $('.showButton').hide();

        // Revert the class of the first column back to original
        $('.firstDiv').removeClass('col-sm-12').addClass('col-sm-9');
        $('.secondDiv').addClass('col-sm-3');
        });
};