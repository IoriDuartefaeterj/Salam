<?php
header("Content-Type: application/json");
session_start();
require 'config.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) && isset($data->password)) {
    $email =$data->email;
    $password =$data->password;

    $stmt =$pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user =$stmt->fetch();

    if($user && password_verify($password,$user['password'])) {
        // Login bem-sucedido, cria sessão
        $_SESSION['user_id'] =$user['id'];
        echo json_encode(["status" => "success", "message" => "Login aprovado."]);
    } else {
        // Falha no login
        echo json_encode(["status" => "error", "message" => "Email ou senha incorretos."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Dados incompletos."]);
}
?>