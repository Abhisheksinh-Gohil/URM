<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods:  *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/src/Exception.php';
require 'phpMailer/src/PHPMailer.php';
require 'phpMailer/src/SMTP.php';

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {

    $user = json_decode(file_get_contents('php://input'));
    $role = strtolower(str_replace(' ', '', $user->role)); // Convert role to lowercase and remove spaces
    $sql = "SELECT email FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->execute();
    $user1 = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user1 == null) {

        //User Does not exist, register user

        $verificationCode = bin2hex((random_bytes(8)));
    

        $sql = "INSERT INTO users (firstName, lastName, email, password, role, phonenumber, verificationCode, isverified) 
                VALUES (:firstName, :lastName, :email, :password, :role, :phonenumber, :verificationCode, 0)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstName', $user->firstName);
        $stmt->bindParam(':lastName', $user->lastName);
        $email = $user->email;
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
        $stmt->bindParam(':role', $user->role); // Use the processed role value
        $stmt->bindParam(':phonenumber', $user->phonenumber);
        $stmt->bindParam(':verificationCode', $verificationCode);

        if ($stmt->execute()) {
            
            $userId = $conn->lastInsertId();

            // Role-specific information handling using switch case
            switch ($role) {
                case 'urmcandidate':
                    
                    $sql = "INSERT INTO urmCandidate (candidateId,gender,city,ethnicity,studyField,latestEducation,age,resumeLocation) 
                VALUES (:candidateId , :gender , :city , :ethnicity , :studyField , :latestEducation , :age ,:resumeLocation)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':gender', $user->gender);
                    $stmt->bindParam(':city', $user->city);
                    $stmt->bindParam(':ethnicity', $user->ethnicity);
                    $stmt->bindParam(':studyField', $user->studyField);
                    $stmt->bindParam(':latestEducation', $user->latestEducation);
                    $stmt->bindParam(':age', $user->age);
                    $stmt->bindParam(':resumeLocation', $user->resumeLocation);
                    $stmt->execute();
                    
                    
                    $sql = "INSERT INTO urmJobPref (candidateId,jobPref) 
                VALUES (:candidateId, :jobPref)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':jobPref', $user->jobPref);
                    $stmt->execute();
                    
                    
                    $sql = "INSERT INTO urmLocPref (candidateId,locPref) 
                VALUES (:candidateId, :locPref)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':locPref', $user->locPref);
                    $stmt->execute();
                    
                    
                    
                    $sql = "INSERT INTO urmPublication (candidateId,nameOfPublication) 
                VALUES (:candidateId, :nameOfPublication)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':nameOfPublication', $user->nameOfPublication);
                    $stmt->execute();
                    
                    $sql = "INSERT INTO urmResearchExp (candidateId,researchExp) VALUES (:candidateId, :researchExp)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':researchExp', $user->researchExp);
                    $stmt->execute();
                    break;

                case 'academia':
                    // Save Academia specific info
                    // You can add additional code here to handle Academia specific data
                    $sql = "INSERT INTO academia (academiaId,logoLocation,aboutUs) 
                VALUES (:academiaId , :logoLocation ,:aboutUs )";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':academiaId', $userId);
                    $stmt->bindParam(':logoLocation', $user->logoLocation);
                    $stmt->bindParam(':aboutUs', $user->aboutUs);
                    $stmt->execute();
                    
                    
                    $sql = "INSERT INTO academiaFaculty (academiaId,facultyName,courses,researchWork,emailId) 
                VALUES (:academiaId, :facultyName, :courses, :facultyResearchWork,
                :facultyEmailId)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':academiaId', $userId);
                    $stmt->bindParam(':facultyName', $user->facultyName);
                    $stmt->bindParam(':courses', $user->courses);
                    $stmt->bindParam(':facultyResearchWork', $user->facultyResearchWork);
                    $stmt->bindParam(':facultyEmailId', $user->facultyEmailId);
                    $stmt->execute();
                    
                    
                    $sql = "INSERT INTO academiaResearchFocusArea (academiaId,research) VALUES (:academiaId, :research)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':academiaId', $userId);
                    $stmt->bindParam(':research', $user->research);
                    $stmt->execute();
                    break;

                case 'recruiter':
                    // Save Recruiter specific info
                   $email = $user->academiaEmail;

                    // Prepare and execute the first query to get the academiaId
                    $sql = "SELECT userId FROM users WHERE email = :email";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();
                    $academiaId = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    // Check if the academiaId exists and extract the userId value
                    if ($academiaId) {
                        $academiaId = $academiaId['userId'];
                    
                        // Now, proceed to insert into the recruiter table
                        $sql = "INSERT INTO recruiter (recruiterId, academiaId) VALUES (:userId, :academiaId)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':userId', $userId);
                        $stmt->bindParam(':academiaId', $academiaId);
                        $stmt->execute();
                
                    } else {
                        echo "Academia email not found in the users table.";
                    }
                    
                    break;

                case 'deiofficer':
                    $email = $user->academiaEmail;
                    $sql = "SELECT userId FROM users WHERE email = :email";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();
                    $ret = $stmt->fetch(PDO::FETCH_ASSOC);
                    $academiaId = $ret['userId'];
                    
                    $sql = "INSERT INTO deiOfficer (deiId,academiaId) VALUES (:userId, :academiaId)";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':userId', $userId);
                    $stmt->bindParam(':academiaId', $academiaId);
                    
                    $stmt->execute();
                    
                    
                    $sql1 = "INSERT INTO deiOfficerGoals (goal,deiId)
                    VALUES(:goal,:deiId)";
                    $stmt1 = $conn->prepare($sql1);
                    $stmt1->bindParam(':goal', $user->goal);
                    $stmt1->bindParam(':deiId', $userId);
                    $stmt1->execute();
                    
                    $sql2 = "INSERT INTO deiOfficerInitiatives (deiId,initiative) VALUES (:deiId, :initiative)";
                    $stmt2 = $conn->prepare($sql2);
                    $stmt2->bindParam(':deiId', $userId);
                    $stmt2->bindParam(':initiative', $user->initiative);
                    $stmt2->execute();
                    
                default:
                    // Handle the case if an invalid role is provided
                    break;
            }

            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'mail.aag0621.uta.cloud';
            $mail->SMTPAuth = true;
            $mail->Username = 'wdm@aag0621.uta.cloud';
            $mail->Password = '*?0ltLT9D}*x';
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            $mail->setFrom('wdm@aag0621.uta.cloud');
            $mail->addAddress($user->email);
            $email = $user->email;
            $mail->isHTML(true);
            $mail->Subject = "Email Verification from URM Application";
            $mail->Body = "Thank you for registering with our service! We're excited to have you on board.To complete your registration and verify your email address, please click the link
            <a href='https://aag0621.uta.cloud/wdmBackend/Mailer/verifyMail.php?email=$email&verificationCode=$verificationCode'>Verify</a>";
            $mail->send();

            $response = ['status' => 0, 'message' => 'Registration successful.'];
        } else {
            $response = ['status' => 0, 'message' => 'User already exists.'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'User already exists.'];
    }

    echo json_encode($response);
}
