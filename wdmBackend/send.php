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
    // Assuming you have received the message and the target user ID from the frontend
    $messageText = $_POST['message'];
    $senderEmail = $_POST['senderEmail'];
    $sql = "SELECT userId from users where email = :senderEmail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':senderEmail', $senderEmail);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    $senderId = $ret['userId'];

    $messageText = $_POST['message'];
    $receiverEmail = $_POST['receiverEmail'];
    $sql = "SELECT userId from users where email = :receiverEmail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':receiverEmail', $receiverEmail);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    $receiverId = $ret['userId'];


    // Insert the new message into the database
    $sql = "INSERT INTO messages (chatId, senderId, receiverId, messageText) 
            VALUES (:chatId, :senderId, :receiverId, :messageText)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':chatId', $chatId);
    $stmt->bindParam(':senderId', $senderId);
    $stmt->bindParam(':receiverId', $receiverId);
    $stmt->bindParam(':messageText', $messageText);

    // Find or create the chat ID for the conversation between the sender and receiver
    $sqlFindChat = "SELECT chatId FROM chats 
                    WHERE (user1Id = :user1Id AND user2Id = :user2Id) OR 
                          (user1Id = :user2Id AND user2Id = :user1Id)";

    $stmtFindChat = $conn->prepare($sqlFindChat);
    $stmtFindChat->bindParam(':user1Id', $senderId);
    $stmtFindChat->bindParam(':user2Id', $receiverId);
    $stmtFindChat->execute();

    $chatId = $stmtFindChat->fetchColumn();

    if (!$chatId) {
        // Chat not found, create a new chat
        $sqlCreateChat = "INSERT INTO chats (user1Id, user2Id) VALUES (:user1Id, :user2Id)";
        $stmtCreateChat = $conn->prepare($sqlCreateChat);
        $stmtCreateChat->bindParam(':user1Id', $senderId);
        $stmtCreateChat->bindParam(':user2Id', $receiverId);
        $stmtCreateChat->execute();

        $chatId = $conn->lastInsertId();
    }

    // Now insert the message into the messages table
    if ($stmt->execute()) {
        // Message sent successfully
        $response = array('status' => 1, 'message' => 'Message sent successfully.');
        echo json_encode($response);
    } else {
        // Failed to send message
        $response = array('status' => 0, 'message' => 'Failed to send message.');
        echo json_encode($response);
    }
}
?>
