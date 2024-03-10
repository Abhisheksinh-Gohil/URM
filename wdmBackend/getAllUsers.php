<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'dbconnect.php';

$objDb = new dbconnect;
$conn = $objDb->connect();


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $sql = "SELECT email, firstName, lastName FROM users";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response = ['status' => 2, 'message' => 'Incorrect Password','user' => $ret];
    echo json_encode($ret);
}