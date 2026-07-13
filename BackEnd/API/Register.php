<?php
header("Content-Type: application/json");
require 'config.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT); // Criptografia da senha
    $dob = $data->dob;
    $phone = $data->phone;

    $stmt = $pdo->prepare("INSERT INTO users (email, password, dob, phone) VALUES (?, ?, ?, ?)");
    
    try {
        $stmt->execute([$email, $password, $dob, $phone]);
        echo json_encode(["status" => "success", "message" => "Usuário registrado com sucesso!"]);
    } catch(PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Erro: " . $e->getMessage()]);
    }
}
?>
