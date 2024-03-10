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


    // $sql1 = "SELECT userId from users where email = :email";
    // $stmt = $conn->prepare($sql1);
    // $stmt1->bindParam(':email', $user->email);
    // $ret = $stmt->fetch(PDO::FETCH_ASSOC);
    // $deiOfficerId = $ret['userId'];


    // $sql = "SELECT * from JobPosting where approverId = :deiOfficerId";
    // $stmt = $conn->prepare($sql);

    // $stmt->bindParam(':deiOfficerId', $deiOfficerId);
    // $stmt->execute();
    // $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    // print_r($ret);

    $sql2 = "SELECT jp.title, jp.description, jp.position
    FROM JobPosting jp
    JOIN deiOfficer doi ON jp.creatorId = doi.academiaId
    JOIN users u ON doi.deiId = u.userId
    WHERE u.email = :email AND jp.approverId IS NOT NULL" ;
    
    $stmt1 = $conn->prepare($sql2);
    $stmt1->bindParam(':email', $user->email);
    $stmt1->execute();
    $ret = $stmt1->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    print_r($ret);
}