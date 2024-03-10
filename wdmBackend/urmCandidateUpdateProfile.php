<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization ");
header("Access-Control-Allow-Methods:  *");

include 'dbconnect.php';
$objDb = new dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "PUT") {
    $user = json_decode(file_get_contents('php://input'));


    
    $sql = "UPDATE users SET firstName= :firstName, password= :password, phonenumber = :phonenumber WHERE email= :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':firstName', $user->firstName);
    $stmt->bindParam(':password', $user->password);
    $stmt->bindParam(':phonenumber', $user->phonenumber);
    

    if($stmt->execute()){
        $sql = "SELECT userId from users where email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->execute();
        $ret = $stmt->fetch(PDO::FETCH_ASSOC);
        print_r($ret);
        $userId = $ret['userId'];
        print_r($userId);

        $sql1 = "UPDATE urmCandidate SET candidateId = :candidateId , gender = :gender , city = :city , ethnicity = :ethnicity , studyField = :studyField , latestEducation = :latestEducation , age = :age , resumeLocation = :resumeLocation WHERE candidateId = :candidateId";
 
                    
        $stmt1 = $conn->prepare($sql1);
        
        
                    
        $stmt1->bindParam(':candidateId', $userId);
        $stmt1->bindParam(':gender', $user->gender);
        $stmt1->bindParam(':city', $user->city);
        $stmt1->bindParam(':ethnicity', $user->ethnicity);
        $stmt1->bindParam(':studyField', $user->studyField);
        $stmt1->bindParam(':latestEducation', $user->latestEducation);
        $stmt1->bindParam(':age', $user->age);
        $stmt1->bindParam(':resumeLocation', $user->resumeLocation);
        $stmt1->execute();
                    
                    
                    $sql = "UPDATE urmJobPref
                    SET jobPref = :jobPref
                    WHERE candidateId = :candidateId;
                    ";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':jobPref', $user->jobPref);
                    $stmt->execute();
                    
                    
                    $sql = "UPDATE urmLocPref
                    SET locPref = :locPref
                    WHERE candidateId = :candidateId;
                    ";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':locPref', $user->locPref);
                    $stmt->execute();
                    
                    
                    
                    $sql = "UPDATE urmPublication 
                    SET nameOfPublication = :nameOfPublication
                    WHERE candidateId = :candidateId;
                    ";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':nameOfPublication', $user->nameOfPublication);
                    $stmt->execute();
                    
                    $sql = "UPDATE urmResearchExp
                    SET researchExp = :researchExp
                    WHERE candidateId = :candidateId;
                    ";
                    
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':candidateId', $userId);
                    $stmt->bindParam(':researchExp', $user->researchExp);
                    $stmt->execute();

                    $response = array('status' => 0, 'message' => 'updated profile.');
                    echo json_encode($response);

    }

    else{
        $response = array('status' => 1, 'message' => 'error');
        echo json_encode($response);
    }

    
}

