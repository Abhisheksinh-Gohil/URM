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

if ($_SERVER["REQUEST_METHOD"] === "GET") { // Corrected method check
    $sql = "SELECT r.recruiterId, u.firstName, COUNT(j.jobPostId) AS totalApplications FROM recruiter r JOIN users u ON r.recruiterId = u.userId LEFT JOIN JobPosting j ON r.recruiterId = j.creatorId GROUP BY r.recruiterId, u.firstName";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ret);
}
?>


