<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods:  *");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();

if(isset($_GET['email']) && isset($_GET['verificationCode']))
{
    $email = $_GET['email'];
    $verificationCode = $_GET['verificationCode'];

    $query = "SELECT * FROM users WHERE email = :email AND verificationCode = :verificationCode";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':verificationCode', $verificationCode);
    $stmt->execute();
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($user == null) {
        echo"
            <script>
                alert('Cannot run query');
                window.location.href='https://aag0621.uta.cloud/wdmBackend/Mailer/register.php';
            </script>
        ";
    }
    else{
        if($user['isVerified'] == 0){
            $update = "UPDATE users SET isVerified = 1 WHERE email= :email";
            $stmt1 = $conn->prepare($update);
            $stmt1->bindParam(':email', $email);
            if($stmt1->execute()){
                echo"
                <script>
                    alert('User verification successful.');
                    window.location.href='https://aag0621.uta.cloud/wdmBackend/Mailer/register.php';
                </script>
            "; 
            }
            else{
                echo"
                <script>
                    alert('User verification failed!');
                    window.location.href='https://aag0621.uta.cloud/wdmBackend/Mailer/register.php';
                </script>
            "; 
            }
        }
        else{
            echo"
            <script>
                alert('User already verified');
                window.location.href='https://aag0621.uta.cloud/wdmBackend/Mailer/register.php';
            </script>
        ";  
        }
    }
}