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
    $sql = "SELECT userId FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $email = $user->email;
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch(PDO::FETCH_ASSOC) instead of fetchAll(PDO::FETCH_ASSOC)
    
    if ($ret) {
        $recruiterId = $ret['userId'];

        $sql = "SELECT title, description, location, position FROM JobPosting j JOIN recruiter r ON j.creatorId = r.recruiterId WHERE j.creatorId = :recruiterId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':recruiterId', $recruiterId);
        $stmt->execute();
        $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($ret);
    } else {
        // Handle the case when no user is found with the given email
        echo json_encode([]);
    }
}

?>