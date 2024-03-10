<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();
$ret;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $user = json_decode(file_get_contents('php://input'));
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    // print_r($ret);
    if ($ret == null) {
        $response = ['status' => 1, 'message' => 'User does not Exist'];
    } else {
        // echo($user->password);
        // echo($ret['password']); // Use $ret['password'] instead of $ret->password
        
        if($ret['isVerified'] == 0){
            $response = ['status' => 1, 'message' => 'Verify Your Email Address', 'user'=>$ret];
        }
        else if ($user->password == $ret['password']) { // Use $ret['password'] instead of $ret->password
            $response = ['status' => 0, 'message' => 'Successful Login', 'user'=>$ret];
        } else {
            $response = ['status' => 2, 'message' => 'Incorrect Password','user' => $ret];
        }
    }

    echo json_encode($response);
}
