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


    $sql = "SELECT userId from users where email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    $deiOfficerId = $ret['userId'];

    $sql2 = "UPDATE JobPosting SET approverId = :deiOfficerId WHERE jobPostId = :jobPostId";
    
    $stmt1 = $conn->prepare($sql2);
    $stmt1->bindParam(':jobPostId', $user->jobPostId);
    $stmt1->bindParam(':deiOfficerId', 100001);
    

    if($stmt1->execute()){
        $response = ['status' => 0, 'message' => 'Rejected the Job post'];
    }

    else{
        $response = ['status' => 0, 'message' => 'Facing some error'];
    }

    echo json_encode($response);

}