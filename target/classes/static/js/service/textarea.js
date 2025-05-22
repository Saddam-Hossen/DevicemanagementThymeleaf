$(document).ready(function() {
    function autoResizeTextarea(element) {
        element.style.height = 'auto'; // Reset height to compute the new height correctly
        element.style.height = (element.scrollHeight) + 'px'; // Set the height to scrollHeight
    }

    $('.plain-textarea').each(function() {
        autoResizeTextarea(this); // Initialize the height based on the current content

        $(this).on('input', function() {
            autoResizeTextarea(this);
        });
    });
});
