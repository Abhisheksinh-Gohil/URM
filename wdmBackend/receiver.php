<?php
// Your code to handle authentication and user roles
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'dbconnect.php';

$objDb = new dbconnect;
$conn = $objDb->connect();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Assuming you have received the senderEmail and receiverEmail from the frontend
    $senderEmail = $_GET['senderEmail'];
    $receiverEmail = $_GET['receiverEmail'];

    $sql = "SELECT userId from users where email = :senderEmail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':senderEmail', $senderEmail);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    $senderId = $ret['userId'];

    $sql = "SELECT userId from users where email = :receiverEmail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':receiverEmail', $receiverEmail);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    $receiverId = $ret['userId'];

    // Find or create the chat ID for the conversation between the sender and receiver
    $sqlFindChat = "SELECT chatId FROM chats 
                    WHERE (user1Id = :user1Id AND user2Id = :user2Id) OR 
                          (user1Id = :user2Id AND user2Id = :user1Id)";

    $stmtFindChat = $conn->prepare($sqlFindChat);
    $stmtFindChat->bindParam(':user1Id', $senderId);
    $stmtFindChat->bindParam(':user2Id', $receiverId);
    $stmtFindChat->execute();

    $chatId = $stmtFindChat->fetchColumn();

    if ($chatId) {
        // Get all messages for the given chat, including senderEmail and receiverEmail
        $sqlGetMessages = "SELECT m.messageId, m.chatId, u1.email AS senderEmail, u2.email AS receiverEmail, 
                                m.messageText, m.sentAt 
                           FROM messages m 
                           JOIN users u1 ON m.senderId = u1.userId 
                           JOIN users u2 ON m.receiverId = u2.userId 
                           WHERE m.chatId = :chatId 
                           ORDER BY m.sentAt ASC";

        $stmtGetMessages = $conn->prepare($sqlGetMessages);
        $stmtGetMessages->bindParam(':chatId', $chatId);
        $stmtGetMessages->execute();

        $messages = $stmtGetMessages->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($messages);
    } else {
        // Chat not found, no messages to fetch
        $response = array('status' => 0, 'message' => 'No messages found for this chat.');
        echo json_encode($response);
    }
}
?>
