<?php
require_once __DIR__ . '/rest/services/CartService.class.php';

$username = $_GET['username'];

$cart_service = new CartService();

$data = $cart_service->get_cart($username);

echo json_encode([
    'data' => $data,
]);