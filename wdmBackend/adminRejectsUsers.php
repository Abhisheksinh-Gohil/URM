<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();
$ret;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $user = json_decode(file_get_contents('php://input'));
    $sql = "UPDATE users
    SET isAdminVerified = 2
    WHERE email = :email;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    
    if ($stmt->execute()) { 
        $response = ['status' => 0, 'message' => 'Admin has rejected user'];
    } else {
        $response = ['status' => 2, 'message' => 'Error'];
    }


    echo json_encode($response);
}
