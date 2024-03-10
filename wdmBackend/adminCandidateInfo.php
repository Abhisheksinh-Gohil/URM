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
    $sql = "SELECT c.candidateId, u.firstName, COUNT(a.candidateId) AS totalApplications FROM urmCandidate c INNER JOIN users u ON c.candidateId = u.userId LEFT JOIN urmCandidateApplication a ON c.candidateId = a.candidateId GROUP BY c.candidateId, u.firstName;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ret);
}
?>
