<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('de', 'phpmailer/language/');
$mail->IsHTML(true);

// Set the "From" address and sender's name
$mail->setFrom('benzinger.komola@gmail.com', 'KomB');

// Add recipient's email address
$mail->addAddress('benzinger.komola@gmail.com');

// Set the subject
$mail->Subject = 'Hey, it is just a test';

// Collect form data
$firstname = trim($_POST['firstname']);
$surname = trim($_POST['surname']);
$email = trim($_POST['email']);
$oldClient = (isset($_POST['oldClient']) && trim($_POST['oldClient']) == "no") ? "no" : "yes"; // Set oldClient based on POST value
$chosenLanguage = trim($_POST['chosenLanguage']);
$destination = trim($_POST['destination']);
$season = trim($_POST['season']);
$message = trim($_POST['message']);

// Construct email body
$body = '<h1>Super, your new email is just arrived</h1>';
if (!empty($firstname)) {
    $body .= '<p><strong>Vorname:</strong> ' . $firstname . '</p>';
}
if (!empty($surname)) {
    $body .= '<p><strong>Nachname:</strong> ' . $surname . '</p>';
}
if (!empty($email)) {
    $body .= '<p><strong>Email:</strong> ' . $email . '</p>';
}
$body .= '<p><strong>Old client:</strong> ' . $oldClient . '</p>';
if (!empty($chosenLanguage)) {
    $body .= '<p><strong>Chosen language:</strong> ' . $chosenLanguage . '</p>';
}
if (!empty($destination)) {
    $body .= '<p><strong>Chosen destination:</strong> ' . $destination . '</p>';
}
if (!empty($season)) {
    $body .= '<p><strong>Chosen season:</strong> ' . $season . '</p>';
}
if (!empty($message)) {
    $body .= '<p><strong>Message:</strong> ' . $message . '</p>';
}

// Set the email body
$mail->Body = $body;

// Sending
if ($mail->send()) {
    $message = 'Daten werden gesendet';
} else {
    $message = 'Error: ' . $mail->ErrorInfo;
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>