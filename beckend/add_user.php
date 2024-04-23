<?php
require_once __DIR__ . '/rest/services/UserService.class.php';

$payload = json_decode(file_get_contents("php://input"), true);

$user_service = new UserService();

$user = $user_service->add_user($payload);

if ($user) {
    echo json_encode(['message' => "You have successfully added the user", 'data' => $user]);
} else {
    echo json_encode(['message' => "Failed to add the user", 'data' => null]);
}

