<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();
$ret;

if ($_SERVER["REQUEST_METHOD"] === "POST") { 

    $user = json_decode(file_get_contents('php://input'));
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC);
    $candidateId = $ret['userId'];


    $sql = "SELECT jp.* FROM JobPosting jp LEFT JOIN urmCandidateApplication ca ON jp.jobPostId = ca.jobPostId AND ca.candidateId = :candidateId WHERE ca.candidateId IS NULL;";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':candidateId', $candidateId);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ret);





}