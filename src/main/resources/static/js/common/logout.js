 $(document).ready(function () {
 // logout feature
        let logoutTimer;

        function resetTimer() {
            clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => {
                alert("You have been logged out due to inactivity1.");
                window.location.href = "/login/login"; // Change to your logout URL
            }, 1200000); // 2hours minutes (12000 milliseconds)
        }

        // Reset timer on any user activity
        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("keypress", resetTimer);
        document.addEventListener("click", resetTimer);
        document.addEventListener("scroll", resetTimer);

        // Initialize the timer
        resetTimer();

        // Function to ensure all tabs open the same page
        function syncTabs() {
            // Store the current URL in localStorage
            localStorage.setItem("lastPage", window.location.href);

            // Listen for changes in other tabs
            window.addEventListener("storage", function(event) {
                if (event.key === "lastPage") {
                    if (window.location.href !== event.newValue) {
                        window.location.href = event.newValue; // Redirect to the same page
                    }
                }
            });
        }

        // Run the function on page load
        syncTabs();




    });

