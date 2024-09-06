<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $consent = isset($_POST['consent']) ? 'Yes' : 'No';

    // Check if the email is valid
    if ($email === false) {
        echo "Invalid email format.";
        exit;
    }

    // Set the recipient email address
    $to = 'contact@wbsofttech.com';

    // Set the email subject
    $subject = 'New Contact Form Submission';

    // Build the email content
    $message_body = "Name: $name\n";
    $message_body .= "Email: $email\n";
    $message_body .= "Phone: $phone\n";
    $message_body .= "Message: $message\n";
    $message_body .= "Consent: $consent\n";

    // Set the email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $message_body, $headers)) {
        // Email sent successfully
        echo '<script>window.location.href = "index.html";</script>';
        exit; // Stop further execution
    } else {
        // Error sending email
        echo '<script>alert("Failed to send the message."); window.location.href = "index.html";</script>';
        exit; // Stop further execution
    }
} else {
    // Not a POST request
    echo '<script>window.location.href = "index.html";</script>';
    exit; // Stop further execution
}
?>