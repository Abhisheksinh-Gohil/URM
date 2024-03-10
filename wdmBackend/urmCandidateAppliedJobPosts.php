<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods:  GET, POST, OPTIONS");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dei = json_decode(file_get_contents('php://input'));
    $sql = "SELECT jp.jobPostId, jp.title, jp.description, jp.position FROM JobPosting jp JOIN urmCandidateApplication urc ON jp.jobPostID=urc.jobPostID JOIN urmCandidate can ON urc.candidateId=can.candidateId JOIN users u ON u.userId=can.candidateId WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $dei->email);

    $stmt->execute();
    $academia = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($academia);
}