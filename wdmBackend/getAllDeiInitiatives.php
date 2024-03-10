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

if ($_SERVER["REQUEST_METHOD"] === "POST") { // Corrected method check

    $user = json_decode(file_get_contents('php://input'));
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $deiId = $ret[0]['userId'];
    
    $sql = "SELECT initiative from deiOfficerInitiatives where deiId = :deiId";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':deiId', $deiId);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ret);
}
?>