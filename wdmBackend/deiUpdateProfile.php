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

if ($_SERVER["REQUEST_METHOD"] === "PUT") {

    $user = json_decode(file_get_contents('php://input'));

    $sql = "UPDATE users SET firstName= :firstName, lastName= :lastName, password= :password, phonenumber = :phonenumber WHERE email= :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':firstName', $user->firstName);
    $stmt->bindParam(':lastName', $user->lastName);
    $stmt->bindParam(':password', $user->password);
    $stmt->bindParam(':phonenumber', $user->phonenumber);

    if($stmt->execute()){
        $response = ['status' => 0, 'message' => 'Updated Successfully'];
    }
    else {
        $response = ['status' => 1, 'message' => 'Error'];
    }

    echo json_encode($response);

}
