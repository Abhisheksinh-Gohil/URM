<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods:  *");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "PUT") {
    $academia = json_decode(file_get_contents('php://input'));
    $sql = "UPDATE users SET firstName= :firstName, password= :password,phonenumber = :phonenumber WHERE email= :email";
    $sql2 = "UPDATE academia JOIN users ON academiaId = userId SET logoLocation= :logoLocation, aboutUs= :aboutUs WHERE email= :email";
    $stmt = $conn->prepare($sql);
    $stmt2 = $conn->prepare($sql2);


    $stmt->bindParam(':firstName', $academia->firstName);
    $stmt->bindParam(':email', $academia->email);
    $stmt->bindParam(':password', $academia->password);
    $stmt->bindParam(':phonenumber', $academia->phonenumber);
    $stmt2->bindParam(':logoLocation', $academia->logoLocation);
    $stmt2->bindParam(':aboutUs', $academia->aboutUs);
    $stmt2->bindParam(':email', $academia->email);

    if ($stmt->execute()) {
        if ($stmt2->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {

            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Failed to update record.'];
    }
    echo json_encode($response);
}