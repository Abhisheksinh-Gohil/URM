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
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':email', $_POST['email']);
    echo "the current email is";
    print_r($_POST['email']);
    $stmt->execute();
    $ret = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch() instead of fetchAll()
    print_r($ret);

    if ($ret === false) {
        // Assuming the $user object contains the necessary data for insertion
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $role = $_POST['role'];
        $phonenumber = $_POST['phonenumber'];
        $verificationCode = bin2hex(random_bytes(16));
        $isVerified = 0;

        // Prepare the INSERT query for users table
        $sql = "INSERT INTO users (firstName, lastName, email, password, role, phonenumber) 
                VALUES (:firstName, :lastName, :email, :password, :role, :phonenumber)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstName', $firstName);
        $stmt->bindParam(':lastName', $lastName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':role', $role);
        $stmt->bindParam(':phonenumber', $phonenumber);

        if ($stmt->execute()) {
            // Insertion in users table was successful
            $response = array('status' => 1, 'message' => 'User inserted successfully.');
            echo json_encode($response);

            // Fetch the inserted user's ID
            $userId = $conn->lastInsertId();

            echo "The last user ID is";
            echo $userId;
            echo $role;
            switch ($role) {
                case 'urmcandidate':
                    // Logic for URMCANDIDATE role
                    // ...

                case 'admin':
                    // Logic for Admin role
                    // ...

                case 'deiofficer':
                    // Logic for DEIOFFICER role
                    // ...

                case 'recruiter':
                    // Logic for RECRUITER role
                    // ...

                case 'academia':
                    // Logic for ACADEMIA role
                    // ...
                    echo "we are here";
                    // BELOW IS CODE FOR LOGO OF ACADEMIA ----------------------------------------------
                    if (isset($_FILES['logo'])) {
                        $image = $_FILES['logo'];
                        $aboutUs=$_POST['aboutUs'];
                        $imageFileName = $image['name'];
                        $imageFileTemp = $image['tmp_name'];

                        $fileNameSeparate = explode('.', $imageFileName);
                        $fileExtension = strtolower(end($fileNameSeparate));
                        $allowedExtensions = array('jpeg', 'png', 'jpg');

                        if (in_array($fileExtension, $allowedExtensions)) {
                            $uniqueFileName = $email . '.' . $fileExtension;
                            $uploadImage = 'academiaLogo/' . $uniqueFileName;
                            move_uploaded_file($imageFileTemp, $uploadImage);
                            $sql = "INSERT INTO academia (academiaId, logoLocation, aboutUs) VALUES (:userId, :logoLocation, :aboutUs)";
                            $stmt = $conn->prepare($sql);
        
                            // Use the same $uploadImage variable here
                            $stmt->bindParam(':userId', $userId);
                            $stmt->bindParam(':aboutUs', $_POST['aboutUs']);
                            $stmt->bindParam(':logoLocation', $uploadImage);
        
                            if ($stmt->execute()) {
                                echo "Academia Registered";
                            } else {
                                // Insertion in academia table failed
                                $response = array('status' => 0, 'message' => 'Failed to insert academia data.');
                                echo json_encode($response);
                            }
                        } else {
                            // Invalid file extension
                            $response = array('status' => 0, 'message' => 'Invalid file extension. Allowed extensions: jpeg, png, jpg.');
                            echo json_encode($response);
                            exit; // Exit the script to prevent further execution
                        }
                    }
                    // ABOVE IS CODE FOR IMAGE OR LOGO OF ACADEMIA -----------------------------------------

                    // INSERT query for academia table
                   

                    break;

                default:
                    // Default case if the role is not recognized
                    // ...
                    break;
            }
        } else {
            // Insertion in users table failed
            $response = array('status' => 0, 'message' => 'Failed to insert user.');
            echo json_encode($response);
        }
    } else {
        $response = array('status' => 2, 'message' => 'User with the same email already exists');
        echo json_encode($response);
    }
}
