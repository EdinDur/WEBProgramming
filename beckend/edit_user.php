<?php
require_once __DIR__ . '/rest/services/UserService.class.php';

$body = file_get_contents('php://input');

// Parse the raw data (assuming it's in JSON format)
$data = json_decode($body, true);

// Retrieve the username and newPassword from the parsed data
$username = isset($data['username']) ? $data['username'] : null;
$password = isset($data['newPassword']) ? $data['newPassword'] : null;

$user = [
    'username' => $username,
    'newPassword' => $password
];

$user_service = new UserService();

$data = $user_service->edit_user($user);

echo json_encode([
    "Zavrseno"
]);
