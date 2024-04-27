<?php
require_once __DIR__ . '/rest/services/UserService.class.php';

$username = isset($_GET['username']) ? $_GET['username'] : null;
$password = isset($_GET['psw']) ? $_GET['psw'] : null;

$user = [
    'username' => $username,
    'psw' => $password
];

$user_service = new UserService();

$data = $user_service->get_user_login($user);

echo json_encode([
    'data' => $data,
]);

