<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'dbconnect.php';

$objDb = new dbconnect;
$conn = $objDb->connect();


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = json_decode(file_get_contents('php://input'));
    $email = $user->email;
 
    $sql2 = "SELECT jp.title, jp.description, jp.position
    FROM JobPosting jp
    JOIN deiOfficer doi ON jp.creatorId = doi.academiaId
    JOIN users u ON doi.deiId = u.userId
    WHERE u.email = :email AND jp.approverId IS NULL" ;
    

    $stmt1 = $conn->prepare($sql2);
    $stmt1->bindParam(':email', $email);
    $stmt1->execute();
    $ret = $stmt1->fetchAll(PDO::FETCH_ASSOC); 
    echo json_encode($ret);

}