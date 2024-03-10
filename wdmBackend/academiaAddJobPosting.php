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
    $job = json_decode(file_get_contents('php://input'));
    $sql1 = "SELECT userId from users WHERE email=:email";
    $stmt1 = $conn->prepare($sql1);
    $stmt1 -> bindParam(':email', $job->email);
    if($stmt1->execute()){

        $academia = $stmt1->fetch(PDO::FETCH_ASSOC);

        $sql = "INSERT INTO JobPosting(jobPostId, title, description, location, position, creatorId)VALUES(null, :Title, :Description, :Location, :Position, :CreatorID)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Title', $job->title);
        $stmt->bindParam(':Description', $job->description);
        $stmt->bindParam(':Location', $job->location);
        $stmt->bindParam(':Position', $job->position);
        $stmt->bindParam(':CreatorID', $academia['userId']);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Job added successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to add new job posting.'];
        }
    }
    else{
        $response = ['status' => 0, 'message' => 'Failed to add new job posting.'];
    }
    echo json_encode($response);
}