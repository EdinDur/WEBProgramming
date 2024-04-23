<?php
require_once __DIR__ . '/rest/services/UserService.class.php';

$body = file_get_contents('php://input');

$data = json_decode($body, true);

$username = isset($data['username']) ? $data['username'] : null;

$user_service = new UserService();

$data = $user_service->delete_user($username);

echo json_encode([
    "Zavrseno"
]);
