<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods:  *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/src/Exception.php';
require 'phpMailer/src/PHPMailer.php';
require 'phpMailer/src/SMTP.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {
    $mailer = json_decode(file_get_contents('php://input'));
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'mail.aag0621.uta.cloud';
    $mail->SMTPAuth = true;
    $mail->Username = 'wdm@aag0621.uta.cloud';
    $mail->Password = '*?0ltLT9D}*x';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('wdm@aag0621.uta.cloud');

    $mail->addAddress("madhuri201096@gmail.com");
    $mail->isHTML(true);
    $mail->Subject = "Verification Mail";
    $mail->Body = "This is a verification mail";
    $mail->send();

    echo "Mail sent";

}

?>