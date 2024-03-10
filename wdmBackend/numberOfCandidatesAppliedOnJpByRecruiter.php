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
    $sql = "SELECT jp.jobPostId, COUNT(urm.candidateId) AS totalApplicants FROM JobPosting jp LEFT JOIN recruiter r ON jp.creatorId = r.recruiterId LEFT JOIN urmCandidateApplication urm ON jp.jobPostId = urm.jobPostId GROUP BY jp.jobPostId";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ret);
}
?>
