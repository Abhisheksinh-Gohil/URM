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
    $academia = json_decode(file_get_contents('php://input'));
    $sql = "SELECT arf.research FROM academiaResearchFocusArea arf JOIN academia aca ON arf.academiaId=aca.academiaId JOIN users u ON u.userId=aca.academiaId WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $academia->email);

    $stmt->execute();
    $academia = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($academia);
}