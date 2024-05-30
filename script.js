$(document).ready(function () {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxw5WzdpgsEg1t-rG0Slo5FGxehbR7oO7GgxqQhAR9ruYxn7i8Yl2efRLiZnDS2JYWA/exec'; // Replace with your Google Apps Script URL

    // Handle form submission to add user
    $('#user-form').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        const formData = $(this).serializeArray(); // Get form data as an array
        const data = {};
        formData.forEach(field => {
            data[field.name] = field.value;
        });

        $.ajax({
            url: SCRIPT_URL,
            method: 'POST',
            data: { data: JSON.stringify(data) },
            success: function (response) {
                alert('User added successfully!');
                fetchSheetData();
            },
            error: function () {
                alert('Failed to add user. Please try again.');
            }
        });

        this.reset(); // Reset the form
    });

    // Handle form submission to search user
    $('#search-form').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        const searchName = $('#search-name').val().toLowerCase();

        $.ajax({
            url: SCRIPT_URL + '?searchName=' + searchName,
            method: 'GET',
            success: function (data) {
                $('#search-results').empty(); // Clear existing list
                const rows = JSON.parse(data);
                if (rows.length === 0) {
                    $('#search-results').append('<li>No user found.</li>');
                } else {
                    rows.forEach(row => {
                        $('#search-results').append(`<li>${row[0]} - ${row[1]}</li>`); // Display each user
                    });
                }
            },
            error: function () {
                alert('Failed to fetch data. Please try again.');
            }
        });

        this.reset(); // Reset the form
    });

    // Fetch data from Google Sheet and update the HTML
    function fetchSheetData() {
        $.ajax({
            url: SCRIPT_URL,
            method: 'GET',
            success: function (data) {
                $('#user-list').empty(); // Clear existing list
                const rows = JSON.parse(data);
                rows.forEach(row => {
                    $('#user-list').append(`<li>${row[0]} - ${row[1]}</li>`); // Display each user
                });
            },
            error: function () {
                alert('Failed to fetch data. Please try again.');
            }
        });
    }

    // Initial data fetch on page load
    fetchSheetData();
});
