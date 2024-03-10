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
    $ret = $stmt->fetch(PDO::FETCH_ASSOC);
    $userId = $ret['userId'];



    $sql = "SELECT u.userId, u.role, u.firstName, u.lastName, u.email
    FROM users u
    WHERE u.userId IN (
        SELECT DISTINCT CASE
            WHEN c.user1Id = :userId THEN c.user2Id
            ELSE c.user1Id
        END AS chat_partner
        FROM chats c
        WHERE c.user1Id = :userId OR c.user2Id = :userId
    ) AND u.userId != :userId;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    $ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ret);
}
?>